import { UserDataBase } from "../../../entity/user/implementations/userDataBase";
import { AuthenticateUserUseCase } from "../../../service/useCase/user/authUseCase";

export const autheticateUserFactory = () => {
    const repository = new UserDataBase();
    const useCase = new AuthenticateUserUseCase(repository)

    return useCase
}
