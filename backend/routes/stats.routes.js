import express from 'express';
import { getTopPerformers } from '../controllers/stats.controller.js';
import { auth, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.get('/top-performers', auth, authorize('admin'), getTopPerformers);

export default router;
