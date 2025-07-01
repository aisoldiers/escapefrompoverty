import os
import json
import uuid
from fastapi import FastAPI
from common.db import engine, get_session
from common.models import Transaction, PaymentStatus
from sqlmodel import SQLModel
import pika
import requests

RABBITMQ_URL = os.getenv('RABBITMQ_URL', 'amqp://guest:guest@rabbitmq:5672/')
ADAPTER_URL = os.getenv('ADAPTER_URL', 'http://adapter-kora:8000')

app = FastAPI(title="Core Payments")

SQLModel.metadata.create_all(engine)

connection = pika.BlockingConnection(pika.URLParameters(RABBITMQ_URL))
channel = connection.channel()
channel.exchange_declare(exchange='payments.events', exchange_type='topic', durable=True)
channel.queue_declare(queue='core', durable=True)
channel.queue_bind(queue='core', exchange='payments.events', routing_key='payment.created')
channel.queue_bind(queue='core', exchange='payments.events', routing_key='payment.status.changed')

@app.get("/health")
async def health():
    return {"status":"ok"}

from threading import Thread

def consume():
    def callback(ch, method, properties, body):
        data = json.loads(body)
        if method.routing_key == 'payment.created':
            requests.post(f"{ADAPTER_URL}/payments", json=data)
            with get_session() as s:
                tx = s.get(Transaction, uuid.UUID(data['id']))
                if tx:
                    tx.status = PaymentStatus.PROCESSING
                    s.add(tx)
                    s.commit()
        elif method.routing_key == 'payment.status.changed' and data.get('status') == 'SUCCEEDED':
            with get_session() as s:
                tx = s.get(Transaction, uuid.UUID(data['id']))
                if tx:
                    tx.status = PaymentStatus.SUCCEEDED
                    s.add(tx)
                    s.commit()
                    channel.basic_publish(exchange='payments.events', routing_key='payment.succeeded', body=json.dumps({'id':data['id']}).encode())
    channel.basic_consume(queue='core', on_message_callback=callback, auto_ack=True)
    channel.start_consuming()

Thread(target=consume, daemon=True).start()
