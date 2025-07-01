set -e
ID=$(curl -s -X POST http://localhost:8000/v1/payments \
  -H "Authorization: Bearer sk_test_123" \
  -H "Content-Type: application/json" \
  -d '{"amount":5000,"currency":"NGN","method":"bank_transfer","customer":{"email":"demo@ex.com"}}' | jq -r '.id')
sleep 7
curl -s http://localhost:8000/v1/payments/$ID \
  -H "Authorization: Bearer sk_test_123" | jq .
