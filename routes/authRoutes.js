import Router from 'express';
const router=Router();

import {signup,signin,logout,userProfile} from '../controllers/authControllers.js';
import { isAuthenticated } from '../middleware/auth.js';
//auth routes
// /api/signup
router.post('/signup', signup);
// /api/signin
router.post('/signin', signin);
// /api/logout
router.get('/logout', logout);
// /api/me
router.get('/me', isAuthenticated, userProfile);
export default router;