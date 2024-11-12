import { hash } from "bcryptjs";
import { UserRepository } from "../../../entity/user/userRepository";
import { EmailExists } from "../../../shared/error/error";
import { UserRequest, UserResponse } from "../../interface/userDTO";

export class InsertUserUseCase {
    constructor(private userRepository: UserRepository){}

    async execute(
        {
            userPicture,
            fullName,
            email,
            gender,
            age,
            phone,
            country,
            password,
        }: UserRequest): Promise<UserResponse>{

            const userWithSameEmail = await this.userRepository.findEmail(email);

            if ( userWithSameEmail) {
                throw new  EmailExists("Usuário já está cadastado na plataforma!")
            }
    
            const password_hash = await hash(password, 6);

            const user = await this.userRepository.insert({
                userPicture,
                fullName,
                email,
                gender,
                age,
                phone,
                country,
                password_hash
        });

        return { user };
    }
}