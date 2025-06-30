import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const apiBase = import.meta.env.VITE_API_BASE;

export default function Payment() {
  const { id } = useParams();
  const [payment, setPayment] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`${apiBase}/v1/payments/${id}`, {
        headers: { Authorization: 'Bearer sk_test_123' },
      });
      const json = await res.json();
      setPayment(json);
    }, 3000);
    return () => clearInterval(interval);
  }, [id]);

  if (!payment) return <div>Loading...</div>;

  return (
    <div>
      <h3>Status: <span style={{color: payment.status === 'SUCCEEDED' ? 'green' : 'orange'}}>{payment.status}</span></h3>
      <pre>{JSON.stringify(payment, null, 2)}</pre>
    </div>
  );
}
