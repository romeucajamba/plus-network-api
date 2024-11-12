import { PrismaJobRepository } from "../../../entity/job/implementations/jobDataBase";
import { GetApplyJobsUseCase } from "../../../service/useCase/job/getApplyJobsUseCse";
import { UserDataBase } from "../../../entity/user/implementations/userDataBase";

export const getApplyJobFactory = () => {
    const userRepository = new UserDataBase();
    const jobRepository = new PrismaJobRepository();
    const useCase = new GetApplyJobsUseCase(jobRepository, userRepository)

    return useCase
}