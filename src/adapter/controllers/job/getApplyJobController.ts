import { FastifyReply, FastifyRequest } from 'fastify';
import { getApplyJobFactory } from '../../factories/job/getApplyJobfactory';
import z from "zod";
import { BadRequest} from "../../../shared/error/error";

export const getApplyJobController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
        const applySchema = z.object({
          userId: z.string().uuid(),
        });
    
        const { userId } = applySchema.parse(request.params);
    
        const jobUseCase = getApplyJobFactory();

        const jobs = await jobUseCase.execute(userId);

         return reply.status(200).send({jobs});

  } catch (err) {
    if(err instanceof BadRequest){
      return reply.status(404).send({message: "Nenhuma candidatura!"})
   }

   throw err
  }
};