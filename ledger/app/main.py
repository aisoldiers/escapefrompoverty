from fastapi import FastAPI
from sqlmodel import SQLModel
from common.db import engine

app = FastAPI(title='Ledger')

SQLModel.metadata.create_all(engine)

@app.get('/health')
async def health():
    return {"status":"ok"}
