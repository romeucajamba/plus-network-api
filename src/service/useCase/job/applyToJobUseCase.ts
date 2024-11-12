import { JobRepository } from "../../../entity/job/jobRepository";
import { ResourceNotFound } from "../../../shared/error/error";
import { ApplicationJob } from "../../interface/jobDTO";
import { UserRepository } from "../../../entity/user/userRepository";
import {  sendEmail } from "../../../adapter/maillerAdapter/sendEmail";

export class ApplyToJobsUseCase {
    constructor(
        private jobRepository: JobRepository,
        private userRepository: UserRepository
    ){}

    async execute({ userId, jobId}: ApplicationJob){

            const getUser = await this.userRepository.getUserById(userId);

            if (!getUser) {
                throw new  ResourceNotFound("Usuário não encontrado!")
            }

            const getJob = await this.jobRepository.finJobById(jobId)

            if(!getJob){
                throw new  ResourceNotFound("Trabalho não encontrado!")
            }

            const job = await this.jobRepository.applyToJob(userId, jobId)

            const code = Math.floor(Math.random() * 100000);
            await sendEmail(getUser.email, "candidatura",  getUser.fullName, code);


            return { job };
    

    }
}