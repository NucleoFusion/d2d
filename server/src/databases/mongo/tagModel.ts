import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema({
  tagId: { type: String, required: true, unique: true }, // e.g., "ui-ux"
  name: { type: String, required: true },                // e.g., "UI/UX"
  description: { type: String }
});

const Tag = mongoose.model('Tag', TagSchema);

export default Tag;