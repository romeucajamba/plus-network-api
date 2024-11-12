import { PrismaJobRepository } from "../../../entity/job/implementations/jobDataBase";
import { GetJobsUseCase } from "../../../service/useCase/job/getJobsUseCase";

export const getJobsFactory = () => {
    const jobRepository = new PrismaJobRepository();
    const useCase = new GetJobsUseCase(jobRepository)

    return useCase
}