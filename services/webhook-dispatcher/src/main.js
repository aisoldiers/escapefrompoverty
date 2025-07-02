const fastify = require('fastify')();

fastify.post('/webhooks/kora', async (request, reply) => {
  return { status: 'received' };
});

fastify.listen({ port: 8200, host: '0.0.0.0' }, (err) => {
  if (err) throw err;
  console.log('webhook-dispatcher running on :8200');
});
