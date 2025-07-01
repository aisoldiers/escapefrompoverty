import { useState } from 'react';
import { Container, Heading, Input, Button, VStack } from '@chakra-ui/react';

export default function Home() {
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');

  const submit = async () => {
    const resp = await fetch('/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk_test_123'
      },
      body: JSON.stringify({ amount: parseInt(amount), currency: 'NGN', method: 'bank_transfer', customer: { email } })
    });
    const data = await resp.json();
    window.location.href = `/payments/${data.id}`;
  };

  return (
    <Container centerContent>
      <Heading>Pay-In Demo</Heading>
      <VStack spacing={4} mt={4}>
        <Input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Button onClick={submit}>Pay</Button>
      </VStack>
    </Container>
  );
}
