import { UserDataBase } from "../../entity/user/implementations/userDataBase";
import { InsertUserUseCase } from "../../service/useCase/user/insertUserUseCase";

export const insertUserFactory = () => {
    const repository = new UserDataBase();
    const useCase = new InsertUserUseCase(repository)

    return useCase
}
