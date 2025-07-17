import Sprint from '../models/sprint.model.js';

export const getMySprints = async (req, res) => {
  const filter = { assignedTo: req.user._id };
  if (req.query.completed === 'true') filter.completed = true;
  const sprints = await Sprint.find(filter);
  res.json(sprints);
};

export const assignSprint = async (req, res) => {
  const sprint = await Sprint.create(req.body);
  res.status(201).json(sprint);
};

export const markSprintComplete = async (req, res) => {
  const sprint = await Sprint.findById(req.params.id);
  if (!sprint || sprint.assignedTo.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Unauthorized' });

  sprint.completed = true;
  await sprint.save();
  res.json({ message: 'Sprint marked as complete' });
};
