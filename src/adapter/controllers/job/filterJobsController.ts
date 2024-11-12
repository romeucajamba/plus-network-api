import { FastifyRequest, FastifyReply } from "fastify";
import { BadRequest } from "../../../shared/error/error";
import { filterJobFactory}from "../../factories/job/filterJobFactory";
import z from "zod"


export const filterJobController =  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const bodySchema = z.object({
            company: z.string(),   
            title: z.string(),
            sortBy: z.string(),
            sortOrder: z.enum(["asc", "desc"]),
            page: z.number(),
            pageSize: z.number()
        });

      const filters = bodySchema.parse(request.query);  // Pega os parâmetros de filtro da query string
      
      const filter = filterJobFactory()

      // Executa a função de filtragem com os filtros fornecidos e retorna o resultado
      const result = await filter.execute(filters);
      
      return reply.status(200).send(result);

    } catch (err) {
              
      if(err instanceof BadRequest){
        return reply.status(404).send({message: "Não foi encontrar empresas!"})
     }
  
     throw err
    }
  }
