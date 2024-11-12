import { FastifyReply, FastifyRequest } from "fastify";
import { getUserFactory } from "../../factories/user/getUserFactory";

export async function userProfileController(request: FastifyRequest, reply: FastifyReply){

    const getUserProfile = getUserFactory();
    
    const {  user } = await getUserProfile.execute(
        request.user.sub
    );

    return reply.status(200).send({
        user: {
            ...user,
            password_hash: undefined
        }
    });
}