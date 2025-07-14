import mongoose from 'mongoose';

const PostTagSchema = new mongoose.Schema({
  postId: { type: Number, required: true }, // PostgreSQL post id
  tagId: { type: String, required: true },  // e.g., "ui-ux"
});

PostTagSchema.index({ postId: 1, tagId: 1 }, { unique: true });

const PostTag = mongoose.model('PostTag', PostTagSchema);

export default PostTag;