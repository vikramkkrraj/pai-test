import User from '../models/user.model.js';

export const getUsersByRole = async (req, res) => {
  const role = req.query.role;

  if (!role) return res.status(400).json({ message: 'Role is required' });

  try {
    const users = await User.find({ role });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};
