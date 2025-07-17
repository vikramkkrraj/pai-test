import express from 'express';
import {
  getMySprints,
  assignSprint,
  markSprintComplete,
} from '../controllers/sprint.controller.js';
import { auth, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(auth);
router.get('/', getMySprints);
router.post('/', authorize('mentor'), assignSprint);
router.patch('/:id', authorize('developer'), markSprintComplete);

export default router;
