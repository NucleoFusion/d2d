import Tag from '../databases/mongo/tagModel';
import PostTag from '../databases/mongo/postTagModel';

export const PREDEFINED_TAGS = [
  { tagId: 'ui-ux', name: 'UI/UX' },
  { tagId: 'frontend', name: 'Frontend' },
  { tagId: 'backend', name: 'Backend' },
  { tagId: 'web-development', name: 'Web Development' },
  { tagId: 'graphic-design', name: 'Graphic Design' },
  { tagId: 'javascript', name: 'JavaScript' },
  { tagId: 'react', name: 'React' },
  { tagId: 'figma', name: 'Figma' },
  { tagId: 'css', name: 'CSS' },
  { tagId: 'api', name: 'API' },
];

// Seed tags if not present
export async function seedTags() {
  for (const tag of PREDEFINED_TAGS) {
    await Tag.updateOne(
      { tagId: tag.tagId },
      { $setOnInsert: tag },
      { upsert: true }
    );
  }
}

// Get all tags
export async function getAllTags() {
  return Tag.find({});
}

// Validate tagId is one of the predefined tags
export async function isValidTag(tagId: string) {
  return PREDEFINED_TAGS.some(tag => tag.tagId === tagId);
}

// Link a post to a tag
export async function linkPostToTag(postId: number, tagId: string) {
  return PostTag.create({ postId, tagId });
}

// Get all postIds for a tag
export async function getPostIdsByTag(tagId: string) {
  const postTags = await PostTag.find({ tagId });
  return postTags.map(pt => pt.postId);
}