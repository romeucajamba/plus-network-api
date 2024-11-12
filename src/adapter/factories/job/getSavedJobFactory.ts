import { PrismaJobRepository } from "../../../entity/job/implementations/jobDataBase";
import { UserDataBase } from "../../../entity/user/implementations/userDataBase"
import { GetSavedJobsUseCase } from "../../../service/useCase/job/getSavedJobsUseCse";

export const getSavedJobFactory = () => {
    const jobRepository = new PrismaJobRepository ();
    const userRepository = new UserDataBase()
    const useCase = new GetSavedJobsUseCase(jobRepository, userRepository)

    return useCase
}
