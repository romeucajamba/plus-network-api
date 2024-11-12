import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../shared/middlewares/verify-jwt";
import { autheticateUserController } from '../controllers/user/autheticateUserControler';
import { insertUserController } from '../controllers/user/insertUserController';
import { userProfileController } from "../controllers/user/profileController";
import { updatePasswordController } from "../controllers/user/updatePasswordUseCase";
import { refreshTokenController } from "../controllers/user/refreshTokent"


export async function UserRouter(app: FastifyInstance) {

  app.post('/user', {
    schema: {
      description: 'Create a new user',
      tags: ['User'],
      body: {
        type: 'object',
        required: ['userPicture', 'fullName', 'email', 'gender', 'age', 'phone', 'country', 'password'],
        properties: {
          userPicture: { type: 'string' },
          fullName: { type: 'string' },
          email: { 
            type: 'string',
            format: 'email' // Validação para garantir que o email esteja no formato correto
          },
          gender: { 
            type: 'string', 
            enum: ['FEMALE', 'MALE'], // O valor de gender deve ser 'FEMALE' ou 'MALE'
          },
          age: { 
            type: 'number', // O campo age agora é um número (não string)
          },
          phone: { type: 'string' },
          country: { type: 'string' },
          password: { type: 'string' }
        }
      },
      response: {
        201: {
          description: 'User created successfully',
          type: 'object',
          properties: {
            userPicture: { type: 'string' },
            fullName: { type: 'string' },
            email: { type: 'string' },
            gender: { type: 'string', enum: ['FEMALE', 'MALE'] },
            age: { type: 'number' }, // O campo age agora é um número
            phone: { type: 'string' },
            country: { type: 'string' },
            password: { type: 'string' }
          }
        }
      }
    }
  }, insertUserController);

  app.post('/session', {
    schema: {
      description: 'Authenticate user',
      tags: ['Session'],
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string' },
          password: { type: 'string' }
        }
      },
      response: {
        200: {
          description: 'User authenticated successfully',
          type: 'object',
          properties: {
            token: { type: 'string' }
          }
        }
      }
    }
  }, autheticateUserController);

  app.patch('/token/refresh', {
    schema: {
      description: 'Refresh token',
      tags: ['Token'],
      response: {
        200: {
          description: 'Token refreshed successfully',
          type: 'object',
          properties: {
            token: { type: 'string' }
          }
        }
      }
    }
  }, refreshTokenController);

  app.get('/me', { onRequest: [verifyJWT]}, userProfileController);

  app.put('/user/:id/password', {
    schema: {
      description: 'Update user password',
      tags: ['User'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      body: {
        type: 'object',
        required: ['password'],
        properties: {
          password: { type: 'string' }
        }
      },
      response: {
        200: {
          description: 'Password updated successfully',
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, updatePasswordController);
}