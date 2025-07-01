import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Heading, Text } from '@chakra-ui/react';

export default function Payment() {
  const { id } = useParams();
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      const resp = await fetch(`/v1/payments/${id}`, {
        headers: { 'Authorization': 'Bearer sk_test_123' }
      });
      const data = await resp.json();
      setStatus(data.status);
    };
    fetchStatus();
    const t = setInterval(fetchStatus, 3000);
    return () => clearInterval(t);
  }, [id]);

  return (
    <Container centerContent>
      <Heading>Payment Status</Heading>
      <Text fontSize="2xl" mt={4}>{status}</Text>
    </Container>
  );
}
