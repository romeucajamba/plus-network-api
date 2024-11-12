import { Job, Application } from "@prisma/client";


export interface JobFilters {   
    company?: string;   
    title?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    pageSize?: number;
}

export interface JobRepository {
    applyToJob(userId: string, jobId: number): Promise<void>;
    saveJob(userId: string, jobId: number): Promise<void>;
    getJobs(): Promise<Job[]>;
    finJobById(jobId: number): Promise<Job | null>
    getUserApplications(userId: string): Promise<Application[]>;
    getUserSavedJobs(userId: string): Promise<Job[]>;
    getJob(filters: JobFilters): Promise<Job[]>;
}