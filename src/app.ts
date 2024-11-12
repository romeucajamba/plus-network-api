import fastify from 'fastify';
import { swaggerSetup } from './swagger';
import { env } from './infra/config/env';
import { ZodError } from 'zod';
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { UserRouter } from "./adapter/routes/userRoute.routes";
import {jobRoutes} from "./adapter/routes/jobRoutes.routes";

export const app = fastify();

app.register(fastifyCors, {
  origin: '*',
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
      cookieName:'refreshToken',
      signed: false
  },
  
  sign: { expiresIn: '7d' }
});

app.register(fastifyCookie);

swaggerSetup(app);

app.register(UserRouter)
app.register(jobRoutes)
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