import { FastifyReply, FastifyRequest } from 'fastify';
import { getJobsFactory } from '../../factories/job/getJobsFactory';
import { BadRequest} from "../../../shared/error/error";

export const getJobsController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    
        const jobUseCase = getJobsFactory();

        const jobs = await jobUseCase.execute();

        return reply.status(200).send({jobs});

  } catch (err) {
    if(err instanceof BadRequest){
      return reply.status(404).send({message: "Nenhuma empresa!"})
   }

   throw err
  }
};