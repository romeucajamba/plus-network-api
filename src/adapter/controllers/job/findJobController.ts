import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { findJobFactory } from "../../factories/job/findJobFactory";
import { BadRequest} from "../../../shared/error/error";

export const findJobController = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const jobSchema = z.object({
          jobId: z.number(),
        });

      const {jobId } = jobSchema.parse(request.params);

      const jobUseCase = findJobFactory();

      const getJob = await jobUseCase.execute(jobId);

      return reply.status(200).send({ getJob });
      
    } catch (err) {
      
      if(err instanceof BadRequest){
        return reply.status(402).send({message: "Não foi possível realizar a candidatura, por favor tente mais tarde"})
     }
  
     throw err
    }
};