import { FastifyReply, FastifyRequest } from 'fastify';
import { applyToJobFactory } from '../../factories/job/applyJobFactory';
import z from "zod";
import { BadRequest} from "../../../shared/error/error";

export const applyJobController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
        const applySchema = z.object({
          userId: z.string().uuid(),
          jobId: z.number(),
        });
    
        const { userId, jobId } = applySchema.parse(request.body);
    
        const jobUseCase = applyToJobFactory();

    await jobUseCase.execute({userId, jobId});

    return reply.status(201).send({ message: 'Candidatura realizada com sucesso.' });

  } catch (err) {
    if(err instanceof BadRequest){
      return reply.status(402).send({message: "Não foi possível realizar a candidatura, por favor tente mais tarde"})
   }

   throw err
  }
};