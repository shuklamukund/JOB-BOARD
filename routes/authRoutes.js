import Router from 'express';
const router=Router();

import {signup,signin,logout} from '../controllers/authControllers.js'
//auth routes
// /api/signup
router.post('/signup', signup);
// /api/signin
router.post('/signin', signin);
// /api/logout
router.get('/logout', logout);

export default router;