import { JobRepository } from "../../../entity/job/jobRepository";
import { ResourceNotFound } from "../../../shared/error/error";
import { UserRepository } from "../../../entity/user/userRepository";

export class GetApplyJobsUseCase {
    constructor(
        private jobRepository: JobRepository,
        private userRepository: UserRepository
    ){}

    async execute(userId: string){
        const getUser = await this.userRepository.getUserById(userId);

        if (!getUser) {
            throw new  ResourceNotFound("Usuário não encontrado!")
        }

        const getJob = await this.jobRepository.getUserApplications(userId)

            return { getJob };
    }
}