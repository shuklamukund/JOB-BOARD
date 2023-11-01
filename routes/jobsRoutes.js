import express from 'express';
const router = express.Router();
import { createJob, singleJob, updateJob, showJobs } from '../controllers/jobsController.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';



//jobs routes

// /api/job/create
router.post('/job/create', isAuthenticated, isAdmin, createJob);
// /api/job/id
router.get('/job/:id', singleJob);
// /api/job/update/job_id
router.put('/job/update/:job_id', isAuthenticated, isAdmin, updateJob);
// /api/jobs/show
router.get('/jobs/show', showJobs);



export default router;