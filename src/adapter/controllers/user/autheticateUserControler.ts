import { FastifyRequest, FastifyReply } from "fastify";
import z  from "zod";
import { InvalidCredentials, BadRequest } from "../../../shared/error/error";
import { autheticateUserFactory } from "../../factories/autheticateUserFactory";

export async function autheticateUserController(request: FastifyRequest, reply: FastifyReply){
      
    const authBodySchema = z.object({
        email: z.string({required_error: "O email é obrigatório"}).email(),
        password: z.string({required_error:"A palavra-passe é obrigatória"}).min(8),
    });

    const {email, password } = authBodySchema.parse(request.body);

      
    try {
      const authUserUsecase = autheticateUserFactory()
       const { user } = await authUserUsecase.execute({
          email, 
          password,
      });

      const token = await reply.jwtSign(
        {},
        {
            sign: {
                sub: user.id
            },
        }, 
      );

      const refreshToken = await reply.jwtSign(
        {},
        {
            sign: {
                sub: user.id,
                expiresIn: '7d'
            },
        }, 
      );


    return reply.setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true
    } ).status(200).send({token});

  } catch (err) {
      if(err instanceof InvalidCredentials){
          return reply.status(404).send({message: err.message});
      }
      
      if(err instanceof BadRequest){
        return reply.status(402).send({message: "Não foi possível fazer o cadastro, por favor tente mais tarde"})
     }

      throw err
  }
}