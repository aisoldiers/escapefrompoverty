import os
import uuid
import json
from fastapi import FastAPI
import requests

WEBHOOK_URL = os.getenv('WEBHOOK_URL', 'http://webhook-dispatcher:8000/webhooks/kora')

app = FastAPI(title='Adapter KoraPay')

@app.post('/payments')
async def create_payment(data: dict):
    payment_id = data['id']
    # simulate async confirmation after 5 seconds
    import threading, time
    def send_webhook():
        time.sleep(5)
        requests.post(WEBHOOK_URL, json={'id': payment_id, 'status':'SUCCEEDED'})
    threading.Thread(target=send_webhook).start()
    return {'id': payment_id, 'status':'created'}
