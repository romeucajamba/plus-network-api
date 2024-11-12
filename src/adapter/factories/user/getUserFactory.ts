import { UserDataBase } from "../../../entity/user/implementations/userDataBase";
import { GetUserUseCase } from "../../../service/useCase/user/getUserUseCase";

export const getUserFactory = () => {
    const repository = new UserDataBase();
    const useCase = new GetUserUseCase(repository)

    return useCase
}
