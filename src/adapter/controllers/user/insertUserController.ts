import { FastifyRequest, FastifyReply } from "fastify";
import z  from "zod";
import { EmailExists, BadRequest } from "../../../shared/error/error";
import { insertUserFactory } from "../../factories/insertUserFactory";

export async function insertUserController(request: FastifyRequest, reply: FastifyReply){
      
    const bodySchema = z.object({
        userPicture: z.string(),
        fullName: z.string({required_error: "O nome completo é obrigatório"}),
        email: z.string({required_error: "O email é obrigatório"}).email(),
        gender: z.enum(["MALE","FEMALE"]),
        age: z.number(),
        phone: z.string({required_error:" O número de telemóvel é obrigatório"}),
        country: z.string({required_error: "O país é obrigatório"}),
        password: z.string({required_error:" A palavra-passe é obrigatória"}).min(8)
    });

    const {userPicture, fullName, email, gender, age, phone, country, password } = bodySchema.parse(request.body);
      
    try {
      const insertUser = insertUserFactory()

      await insertUser.execute({
        userPicture,
        fullName, 
        email, 
        gender, 
        age, 
        phone, 
        country, 
        password
      });

  } catch (err) {
      if(err instanceof EmailExists){
          return reply.status(409).send({message: err.message});
      }
      
      if(err instanceof BadRequest){
        return reply.status(402).send({message: "Não foi possível fazer o cadastro, por favor tente mais tarde"})
     }

      throw err
  }

  return reply.status(201).send("Cadastro bem sucedido, seja bem-vindo ✔");
}