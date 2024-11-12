import { Job } from "@prisma/client";
import { prisma } from "../../../infra/orm/prisma";
import { JobRepository, JobFilters } from "../jobRepository";

export class PrismaJobRepository implements JobRepository {

    async applyToJob(userId: string, jobId: number): Promise<void> {
  
      await prisma.application.create({
        data: {
          userId,
          jobId,
        },
      });
    }
  
    async saveJob(userId: string, jobId: number): Promise<void> {
      await prisma.savedJob.create({
        data: {
          userId,
          jobId,
        },
      });
    }

    async getJobs() {
      return await prisma.job.findMany({});
    }

    async getUserApplications(userId: string) {

      return await prisma.application.findMany({
        where: { userId },
      });
    }

    async getUserSavedJobs(userId: string) {

      const getJobs = await prisma.savedJob.findMany({
        where: { userId },
        select: {
          job: {
            select: {
              id: true,
              title: true,
              description: true,
              company: true,
            }
          }
        }
      });
    
      return getJobs.map(j => j.job);
    }

    async finJobById(jobId: number): Promise<Job | null> {
      const job = await prisma.job.findUnique({
        where: { id: jobId },
      });

      return job
    }

    async getJob(filters: JobFilters) {
      const {
        company,
        title,
        sortBy = 'createdAt', 
        sortOrder = 'desc', 
        page = 1,         
        pageSize = 10,        
      } = filters;
  
      // Criação do filtro dinâmico
      const whereConditions: any = {};
  
      if (company) {
        whereConditions.company = { contains: company, mode: 'insensitive' };
      }
  
      if (title) {
        whereConditions.title = { contains: title, mode: 'insensitive' };
      }
  
      // Consulta ao banco de dados com paginação e ordenação
      const jobs = await prisma.job.findMany({
        where: whereConditions,
        orderBy: {
          [sortBy]: sortOrder,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,              
      });
      return jobs;
    }
}
