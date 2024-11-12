import { JobRepository } from "../../../entity/job/jobRepository";
import { ResourceNotFound } from "../../../shared/error/error";

export class GetJobsUseCase {
    constructor(
        private jobRepository: JobRepository,
    ){}

    async execute(){

        const job = await this.jobRepository.getJobs()

        if(!job){
            throw new ResourceNotFound("Vaga não encontrada!")
        }
        return { job };
    

    }
}