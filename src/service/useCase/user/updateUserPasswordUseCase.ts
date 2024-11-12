import { hash } from "bcryptjs";
import { UserRepository } from "../../../entity/user/userRepository";
import { ResourceNotFound } from "../../../shared/error/error";
import { ChangeUserPassowordRequest } from "../../interface/userDTO";
import {  sendEmail } from "../../../adapter/maillerAdapter/sendEmail";

export class UpdateUserPasswordUseCase {
    constructor(private userRepository: UserRepository){}

    async execute(
        {
            id,
            password
        }: ChangeUserPassowordRequest){

            const getUser = await this.userRepository.getUserById(id);

            if (!getUser) {
                throw new  ResourceNotFound("Usuário não encontrado!")
            }
    
            const password_hash = await hash(password, 6);

            const user = await this.userRepository.updatePassword(
                id,
                password_hash
            );

            const code = Math.floor(Math.random() * 100000);
            await sendEmail(getUser.email, "password",  getUser.fullName, code);

            return { user };
    

    }
}