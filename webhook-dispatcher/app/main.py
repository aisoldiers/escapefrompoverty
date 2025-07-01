import os
import json
from fastapi import FastAPI
import pika

RABBITMQ_URL = os.getenv('RABBITMQ_URL', 'amqp://guest:guest@rabbitmq:5672/')

app = FastAPI(title='Webhook Dispatcher')

connection = pika.BlockingConnection(pika.URLParameters(RABBITMQ_URL))
channel = connection.channel()
channel.exchange_declare(exchange='payments.events', exchange_type='topic', durable=True)

@app.post('/webhooks/kora')
async def kora_webhook(payload: dict):
    channel.basic_publish(exchange='payments.events', routing_key='payment.status.changed', body=json.dumps(payload).encode())
    return {'status':'accepted'}
