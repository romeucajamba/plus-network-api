import { UserRepository } from "../../../entity/user/userRepository";
import { ResourceNotFound } from "../../../shared/error/error";
import { UserResponse } from "../../interface/userDTO";

export class GetUserUseCase {
    constructor(private userRepository: UserRepository){}

    async execute( id: string): Promise<UserResponse>{

            const user = await this.userRepository.getUserById(id);

            if (!user) {
                throw new  ResourceNotFound("Usuário não encontrado!")
            }


            return { user };
    

    }
}