import { PrismaJobRepository } from "../../../entity/job/implementations/jobDataBase";
import { FindJobsUseCase } from "../../../service/useCase/job/findJobUseCase";

export const findJobFactory = () => {
    const jobRepository = new PrismaJobRepository ();
    const useCase = new FindJobsUseCase(jobRepository)

    return useCase
}
