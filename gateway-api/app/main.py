import os
import uuid
import json
from fastapi import FastAPI, Header, HTTPException, status, Depends
from pydantic import BaseModel, Field
import pika
from sqlmodel import SQLModel, select
from common.db import engine, get_session
from common.models import Transaction, PaymentStatus

API_KEY = os.getenv('API_KEY', 'sk_test_123')
RABBITMQ_URL = os.getenv('RABBITMQ_URL', 'amqp://guest:guest@rabbitmq:5672/')

app = FastAPI(title="PSP Gateway API", version="1.0")

# create tables
SQLModel.metadata.create_all(engine)

connection = pika.BlockingConnection(pika.URLParameters(RABBITMQ_URL))
channel = connection.channel()
channel.exchange_declare(exchange='payments.events', exchange_type='topic', durable=True)

class Customer(BaseModel):
    email: str

class PaymentCreate(BaseModel):
    amount: int
    currency: str
    method: str
    customer: Customer

class PaymentResponse(BaseModel):
    id: uuid.UUID
    status: PaymentStatus
    bank_account: dict | None = None

async def verify_token(authorization: str = Header(...)):
    if authorization != f"Bearer {API_KEY}":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

@app.post("/v1/payments", response_model=PaymentResponse, status_code=201, dependencies=[Depends(verify_token)])
async def create_payment(payload: PaymentCreate, session=Depends(get_session)):
    tx = Transaction(amount=payload.amount, currency=payload.currency, status=PaymentStatus.PENDING)
    session.add(tx)
    session.commit()
    channel.basic_publish(
        exchange='payments.events',
        routing_key='payment.created',
        body=json.dumps({'id': str(tx.id), 'amount': tx.amount, 'currency': tx.currency}).encode()
    )
    return PaymentResponse(id=tx.id, status=tx.status, bank_account={'account_number':'000123','bank_name':'Demo Bank'})

@app.get("/v1/payments/{payment_id}", response_model=PaymentResponse, dependencies=[Depends(verify_token)])
async def get_payment(payment_id: uuid.UUID, session=Depends(get_session)):
    tx = session.get(Transaction, payment_id)
    if not tx:
        raise HTTPException(status_code=404)
    return PaymentResponse(id=tx.id, status=tx.status, bank_account=None)

# consumer to update status
from threading import Thread

def consume():
    def cb(ch, method, properties, body):
        data = json.loads(body)
        if method.routing_key == 'payment.succeeded':
            with get_session() as s:
                tx = s.get(Transaction, uuid.UUID(data['id']))
                if tx:
                    tx.status = PaymentStatus.SUCCEEDED
                    s.add(tx)
                    s.commit()
    channel.basic_consume(queue='gateway', on_message_callback=cb, auto_ack=True)
    channel.queue_bind(queue='gateway', exchange='payments.events', routing_key='payment.succeeded')
    channel.start_consuming()

Thread(target=consume, daemon=True).start()
