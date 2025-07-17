import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';

import authRoutes from './routes/auth.routes.js';
import skillRoutes from './routes/skill.routes.js';
import sprintRoutes from './routes/sprint.routes.js';
import statsRoutes from './routes/stats.routes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/sprints', sprintRoutes);
app.use('/api/stats', statsRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
