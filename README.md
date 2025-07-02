# PSP PayIn Go/TS

This repository contains a demo payment processing platform composed of several microservices written in Go and TypeScript.

## Prerequisites

- Docker Desktop for Windows or macOS
- Git
- Node.js 20 (LTS)

## Quick start

```bash
git clone <repo-url>
cd psp-payin-go-ts
cp .env.example .env
docker-compose up -d --build
```

The services will be available on the following ports:

- **gateway-api** – http://localhost:8000
- **core-payments** – REST :8080, gRPC :9090
- **adapter-kora** – http://localhost:8100
- **webhook-dispatcher** – http://localhost:8200
- **ledger** – http://localhost:8300
- **frontend** – http://localhost:5173
- **Kafka** broker – localhost:9092

Kafka topics: `payment.created`, `payment.status.changed`.

### curl examples

Create payment:
```bash
curl -X POST http://localhost:8000/v1/payments \
  -H 'Authorization: Bearer sk_test_123' \
  -H 'Content-Type: application/json' \
  -d '{"amount":{"value":"1000","currency":"NGN"},"method":"bank_transfer","customer":{"email":"cli@test.com"}}'
```

Get payment:
```bash
curl http://localhost:8000/v1/payments/<id> -H 'Authorization: Bearer sk_test_123'
```

Frontend UI will be available at http://localhost:5173

## Deploying to Ubuntu 22.04 VPS

Install Docker Engine and docker-compose on the VPS, copy the repository and `.env` file, then run `docker-compose up -d`. Adjust your firewall to allow the exposed ports or use an `env.override` file to map to different ports.

## Real KoraPay integration plans

Replace the mock `adapter-kora` with real API calls and secret keys. Insert your KoraPay credentials in the adapter service and webhook dispatcher, updating endpoint URLs accordingly.
