import mongoose from 'mongoose';
import Sprint from '../models/sprint.model.js';
import User from '../models/user.model.js';

// GET all sprints assigned to the logged-in developer
export const getMySprints = async (req, res) => {
  const filter = { assignedTo: req.user._id };
  if (req.query.completed === 'true') filter.completed = true;

  try {
    const sprints = await Sprint.find(filter);
    res.json(sprints);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch sprints' });
  }
};

// POST assign a new sprint (mentor only)
export const assignSprint = async (req, res) => {
  const { title, goal, assignedTo, startDate, endDate, points } = req.body;

  if (!assignedTo || !mongoose.Types.ObjectId.isValid(assignedTo)) {
    return res.status(400).json({ message: 'Invalid or missing developer ID' });
  }

  const user = await User.findById(assignedTo);
  if (!user || user.role !== 'developer') {
    return res.status(400).json({ message: 'Assigned user must be a developer' });
  }

  try {
    const sprint = await Sprint.create({
      title,
      goal,
      assignedTo,
      startDate,
      endDate,
      points,
      completed: false,
    });

    res.status(201).json(sprint);
  } catch (err) {
    res.status(500).json({ message: 'Sprint assignment failed' });
  }
};

// PATCH mark a sprint as complete (developer only)
export const markSprintComplete = async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.id);
    if (!sprint || sprint.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    sprint.completed = true;
    await sprint.save();
    res.json({ message: 'Sprint marked as complete' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update sprint status' });
  }
};
