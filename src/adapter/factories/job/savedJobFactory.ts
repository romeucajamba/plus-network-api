import { PrismaJobRepository } from "../../../entity/job/implementations/jobDataBase";
import { UserDataBase } from "../../../entity/user/implementations/userDataBase"
import { SaveJobsUseCase } from "../../../service/useCase/job/saveJobUseCase";

export const savedJobFactory = () => {
    const jobRepository = new PrismaJobRepository ();
    const userRepository = new UserDataBase()
    const useCase = new SaveJobsUseCase(jobRepository, userRepository)

    return useCase
}
