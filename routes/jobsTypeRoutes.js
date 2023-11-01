import express from 'express';
const router = express.Router();
import { createJobType, allJobsType } from '../controllers/jobsTypeController.js';
import { isAuthenticated } from '../middleware/auth.js';



//job type routes

// /api/type/create
router.post('/type/create', isAuthenticated, createJobType)
// /api/type/jobs
router.get('/type/jobs', allJobsType)





export default router;