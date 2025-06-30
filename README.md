# PSP Demo – Pay-In

This repository contains a minimal demo of a Pay‑In flow with a NestJS backend (TypeORM) and a React frontend.

## Local start

```bash
docker-compose up -d
```

TypeORM migrations can be executed via:

```bash
npm run typeorm:migration:run
```
The Docker image runs this command automatically on start.

Open <http://localhost:5173> and create a test payment. Use the test helper endpoint to succeed a payment:

```bash
curl -X POST http://localhost:3000/v1/testhelpers/payments/{id}/succeed \
  -H "Authorization: Bearer sk_test_123"
```
