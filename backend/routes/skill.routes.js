import express from 'express';
import { getMySkills, addSkill, deleteSkill } from '../controllers/skill.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(auth);
router.get('/me', getMySkills);
router.post('/', addSkill);
router.delete('/:id', deleteSkill);

export default router;
