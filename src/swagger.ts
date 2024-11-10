import { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

export async function swaggerSetup(app: FastifyInstance) {

  app.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'API',
        description: 'Documentação da API',
        version: '1.0.0',
      },
      host: 'localhost:4000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  });

  app.register(fastifySwaggerUi, {
    routePrefix: '/documentation', 
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
}
