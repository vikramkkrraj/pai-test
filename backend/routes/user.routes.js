import express from 'express';
import { getUsersByRole } from '../controllers/user.controller.js';
import { auth, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(auth);
router.get('/', authorize('mentor'), getUsersByRole); // only mentors can assign

export default router;
