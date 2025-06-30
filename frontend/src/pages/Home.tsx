import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiBase = import.meta.env.VITE_API_BASE;

export default function Home() {
  const [amount, setAmount] = useState('100.00');
  const [email, setEmail] = useState('test@example.com');
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`${apiBase}/v1/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer sk_test_123',
      },
      body: JSON.stringify({
        amount: { value: amount, currency: 'NGN' },
        method: 'bank_transfer',
        customer: { email },
        callback_url: 'https://example.com/callback',
      }),
    });
    const json = await res.json();
    navigate(`/payments/${json.id}`);
  }

  return (
    <form onSubmit={submit}>
      <label>
        Amount
        <input value={amount} onChange={e => setAmount(e.target.value)} />
      </label>
      <label>
        Email
        <input value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
