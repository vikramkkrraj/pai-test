import User from '../models/user.model.js';

export const signup = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.generateToken();
  res.status(201).json({ token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.json({ token: user.generateToken() });
};
