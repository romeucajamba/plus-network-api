import { JobRepository, JobFilters } from "../../../entity/job/jobRepository";
      
export class FilterJobsUseCase {
      
    constructor(private jobRepository: JobRepository) {}
      
        async execute(filters: JobFilters) {
          const jobs = await this.jobRepository.getJob(filters);
          
          return { jobs };
        }
    
}