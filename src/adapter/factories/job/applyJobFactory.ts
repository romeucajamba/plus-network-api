import { PrismaJobRepository } from "../../../entity/job/implementations/jobDataBase";
import { UserDataBase } from "../../../entity/user/implementations/userDataBase"
import { ApplyToJobsUseCase } from "../../../service/useCase/job/applyToJobUseCase";

export const applyToJobFactory = () => {
    const jobRepository = new PrismaJobRepository ();
    const userRepository = new UserDataBase()
    const useCase = new ApplyToJobsUseCase(jobRepository, userRepository)

    return useCase
}
