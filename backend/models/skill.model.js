import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: String,
  level: { type: Number, min: 1, max: 5 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Skill', skillSchema);
