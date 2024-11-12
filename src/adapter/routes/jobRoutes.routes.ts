import { FastifyInstance } from "fastify";
import { applyJobController} from "../controllers/job/applyJobController";
import { findJobController} from "../controllers/job/findJobController";
import { saveJobController} from "../controllers/job/saveJobController";
import { getApplyJobController} from "../controllers/job/getApplyJobController";
import {getJobsController} from "../controllers/job/getJobsController";
import {getSavedJobController} from "../controllers/job/getSavedJobsController";
import { filterJobController } from "../controllers/job/filterJobsController";


   export const jobRoutes = async (app: FastifyInstance) => {
     app.get('/jobs/:userId', {
       schema: {
         description: 'Get saved jobs for a user',
         tags: ['Jobs'],
         params: {
           type: 'object',
           properties: {
             userId: { type: 'string' }
           }
         },
         response: {
           200: {
             description: 'List of saved jobs',
             type: 'array',
             items: {
               type: 'object',
               properties: {
                 jobId: { type: 'string' },
                 title: { type: 'string' },
                 company: { type: 'string' }
               }
             }
           }
         }
       }
     }, getSavedJobController);

     app.get('/jobs', {
       schema: {
         description: 'Get all jobs',
         tags: ['Jobs'],
         response: {
           200: {
             description: 'List of jobs',
             type: 'array',
             items: {
               type: 'object',
               properties: {
                 jobId: { type: 'string' },
                 title: { type: 'string' },
                 company: { type: 'string' }
               }
             }
           }
         }
       }
     }, getJobsController);

     app.get('/jobs/apply', {
       schema: {
         description: 'Get applied jobs',
         tags: ['Jobs'],
         params: {
          type: 'object',
          required: [ 'userId'],
          properties: {
            userId: { type: 'string' }
          }
        },
         response: {
           200: {
             description: 'List of applied jobs',
             type: 'array',
             items: {
               type: 'object',
               properties: {
                 jobId: { type: 'string' },
                 title: { type: 'string' },
                 company: { type: 'string' }
               }
             }
           }
         }
       }
     }, getApplyJobController);

     app.post('/jobs/save', {
       schema: {
         description: 'Save a job',
         tags: ['Jobs'],
         body: {
           type: 'object',
           required: ['jobId', 'userId'],
           properties: {
             jobId: { type: 'string' },
             userId: { type: 'string' }
           }
         },
         response: {
           201: {
             description: 'Job saved successfully',
             type: 'object',
             properties: {
               message: { type: 'string' }
             }
           }
         }
       }
     }, saveJobController);

     app.get('/user/jobs/:jobId', {
       schema: {
         description: 'Find a job by ID',
         tags: ['Jobs'],
         params: {
           type: 'object',
           properties: {
             jobId: { type: 'string' }
           }
         },
         response: {
           200: {
             description: 'Job details',
             type: 'object',
             properties: {
               jobId: { type: 'string' },
               title: { type: 'string' },
               company: { type: 'string' },
               description: { type: 'string' }
             }
           }
         }
       }
     }, findJobController);

     app.post('/job/apply', {
       schema: {
         description: 'Apply for a job',
         tags: ['Jobs'],
         body: {
           type: 'object',
           required: ['jobId', 'userId'],
           properties: {
             jobId: { type: 'string' },
             userId: { type: 'string' }
           }
         },
         response: {
           201: {
             description: 'Job application submitted successfully',
             type: 'object',
             properties: {
               message: { type: 'string' }
             }
           }
         }
       }
     }, applyJobController);

     app.post('/jobs/filter', {
       schema: {
         description: 'Filter jobs',
         tags: ['Jobs'],
         body: {
           type: 'object',
           properties: {
            sortBy: { type: 'string' },
            title: { type: 'string' },
            company: { type: 'string' },
             sortOrder: {type: 'string', enum:["asc", "desc"]}, 
             page: {type: 'number'}, 
             pageSize: {type: 'number'}
           }
         },
         response: {
           200: {
             description: 'Filtered jobs',
             type: 'array',
             items: {
               type: 'object',
               properties: {
                sortBy: { type: 'string' },
                 title: { type: 'string' },
                 company: { type: 'string' },
                  sortOrder: {type: 'string', enum:["asc", "desc"]}, 
               }
             }
           }
         }
       }
     }, filterJobController);
   }