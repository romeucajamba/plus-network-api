import { UserDataBase } from "../../entity/user/implementations/userDataBase";
import { UpdateUserPasswordUseCase } from "../../service/useCase/user/updateUserPasswordUseCase";

export const updatePaswordFactory = () => {
    const repository = new UserDataBase();
    const useCase = new UpdateUserPasswordUseCase(repository)

    return useCase
}
