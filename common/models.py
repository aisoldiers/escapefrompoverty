from datetime import datetime
from enum import Enum
from typing import Optional
from sqlmodel import SQLModel, Field, Column, DateTime, Enum as SQLEnum
import uuid

class PaymentStatus(str, Enum):
    PENDING = 'PENDING'
    PROCESSING = 'PROCESSING'
    SUCCEEDED = 'SUCCEEDED'
    FAILED = 'FAILED'

class Transaction(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    amount: int
    currency: str
    status: PaymentStatus = Field(sa_column=Column(SQLEnum(PaymentStatus)))
    created_at: datetime = Field(default_factory=datetime.utcnow, sa_column=Column(DateTime(timezone=True)))

class LedgerPosting(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    tx_id: uuid.UUID = Field(index=True)
    debit_account: str
    credit_account: str
    amount: int

class IdempotencyKey(SQLModel, table=True):
    key: str = Field(primary_key=True)
    response_json: str
    created_at: datetime = Field(default_factory=datetime.utcnow, sa_column=Column(DateTime(timezone=True)))
