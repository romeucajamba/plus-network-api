import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { savedJobFactory } from "../../factories/job/savedJobFactory";
import { BadRequest} from "../../../shared/error/error";

export const saveJobController = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const jobSchema = z.object({
          userId: z.string().uuid(),
          jobId: z.number(),
        });

      const { userId, jobId } = jobSchema.parse(request.body);

      const jobRepository = savedJobFactory();

      await jobRepository.execute({userId, jobId});

      return reply.status(201).send({ message: 'Trabalho salvo com sucesso.' });
      
    } catch (err) {
      
      if(err instanceof BadRequest){
        return reply.status(402).send({message: "Não foi possível salvar a empresa, por favor tente mais tarde"})
     }
  
     throw err
    }
};