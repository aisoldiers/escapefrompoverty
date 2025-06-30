# PSP Demo – Pay-In

This repository contains a minimal demo of a Pay‑In flow with a NestJS backend and a React frontend.

## Local start

Before running the services for the first time apply the Prisma migrations:

```bash
cd backend
npx prisma migrate dev
cd ..
```

Then start all containers:

```bash
docker-compose up -d
```

Open <http://localhost:5173> and create a test payment. Use the test helper endpoint to succeed a payment:

```bash
curl -X POST http://localhost:3000/v1/testhelpers/payments/{id}/succeed \
  -H "Authorization: Bearer sk_test_123"
```
