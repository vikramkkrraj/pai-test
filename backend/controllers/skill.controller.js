import Skill from '../models/skill.model.js';

export const getMySkills = async (req, res) => {
  const skills = await Skill.find({ owner: req.user._id });
  res.json(skills);
};

export const addSkill = async (req, res) => {
  const skill = await Skill.create({ ...req.body, owner: req.user._id });
  res.status(201).json(skill);
};

export const deleteSkill = async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill || skill.owner.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Unauthorized' });

  await skill.deleteOne();
  res.json({ message: 'Skill deleted' });
};
