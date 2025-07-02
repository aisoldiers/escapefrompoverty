set -e
PAY=$(curl -s -X POST http://localhost:8000/v1/payments \
  -H 'Authorization: Bearer sk_test_123' \
  -H 'Content-Type: application/json' \
  -d '{"amount":{"value":"1000","currency":"NGN"},"method":"bank_transfer","customer":{"email":"cli@test.com"}}' | jq -r '.id')
echo "Payment id=$PAY"
sleep 8
curl -s http://localhost:8000/v1/payments/$PAY -H 'Authorization: Bearer sk_test_123' | jq .
