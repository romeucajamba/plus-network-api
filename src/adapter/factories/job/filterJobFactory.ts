import { PrismaJobRepository } from "../../../entity/job/implementations/jobDataBase";
import { FilterJobsUseCase } from "../../../service/useCase/job/filterJob";

export const filterJobFactory = () => {
    const jobRepository = new PrismaJobRepository ();
    const useCase = new FilterJobsUseCase(jobRepository)

    return useCase
}
