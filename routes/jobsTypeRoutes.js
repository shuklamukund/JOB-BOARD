import express from 'express';
const router = express.Router();
import { createJobType, allJobsType } from '../controllers/jobsTypeController.js';
import { isAuthenticated } from '../middleware/auth.js';



//job type routes

// /api/type/create
router.post('/type/create', isAuthenticated, createJobType)
// /api/type/jobs
router.get('/type/jobs', allJobsType)
// /api/type/update/type_id
router.put('/type/update/:type_id', isAuthenticated, isAdmin, updateJobType)
// /api/type/delete/type_id
router.delete('/type/delete/:type_id', isAuthenticated, isAdmin, deleteJobType)





export default router;