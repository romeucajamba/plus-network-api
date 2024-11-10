import fastify from 'fastify';
import { swaggerSetup } from './swagger';
import { env } from './config/env';
import { ZodError } from 'zod';
import fastifyCors from "@fastify/cors";


export const app = fastify();

app.register(fastifyCors, {
  origin: '*',
});

swaggerSetup(app);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error.', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // Ferramenta de observação de erros
  }

  return reply.status(500).send({ message: 'Erro interno no servidor' });
});