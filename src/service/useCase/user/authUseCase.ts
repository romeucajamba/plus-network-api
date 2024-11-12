import { compare } from "bcryptjs";
import { UserRepository } from "../../../entity/user/userRepository";
import { InvalidCredentials } from "../../../shared/error/error";
import { AuthenticateUseCaseRequest, UserResponse } from "../../interface/userDTO";

export class AuthenticateUserUseCase {
    constructor(
        private usersRepository: UserRepository
    ){}

    async execute({ email, password }: AuthenticateUseCaseRequest): Promise<UserResponse> {
        const user = await this.usersRepository.findEmail(email);

        if(!user) {
            throw new InvalidCredentials("E-mail ou palavra-passe não está correcto");
        }

        const doesPasswordMatches = await compare(password, user.password_hash);

        if(!doesPasswordMatches){
            throw new InvalidCredentials("E-mail ou palavra-passe não está correcto")
        }

        return {
            user
        }
    }
}