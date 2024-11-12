import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { BadRequest, EmailExists } from "../../../shared/error/error";
import { updatePaswordFactory } from "../../factories/user/updatePasswordFactory";

export async function updatePasswordController(request: FastifyRequest, reply: FastifyReply){
      const paramsSchema = z.object({
        id: z.string().uuid()
      });

    const bodySchema = z.object({
        password: z.string({required_error:" Password is required"}).min(8)
    });

    const { id } = paramsSchema.parse(request.params)
    const { password } = bodySchema.parse(request.body);
      
    try {
      const passwordUseCase = updatePaswordFactory()

       await passwordUseCase.execute({
        id, 
        password
      });

      return reply.status(204).send({message: "Palavra-passe alterada com sucesso"})

  } catch (err) {
      if(err instanceof EmailExists){
          return reply.status(409).send({message: err.message});
      }
      
      if(err instanceof BadRequest){
        return reply.status(402).send({message: "Não foi possível alterar a plavra-passe, por favor tente mais tarde"})
     }

      throw err
  }
}