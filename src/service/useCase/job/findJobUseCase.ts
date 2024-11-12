import { JobRepository } from "../../../entity/job/jobRepository";
import { ResourceNotFound } from "../../../shared/error/error";

export class FindJobsUseCase {
    constructor(
        private jobRepository: JobRepository
    ){}

    async execute(jobId: number){

            const findJob = await this.jobRepository.finJobById(jobId)

            if(!findJob){
                throw new  ResourceNotFound("Trabalho não encontrado!")
            }

            return { findJob };
    }
}