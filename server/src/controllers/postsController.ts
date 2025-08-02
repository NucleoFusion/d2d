import { Request, Response, NextFunction } from 'express';
import pgdb from '../databases/postgres';
import { posts } from '../databases/postgres/schema/posts';
import { eq } from 'drizzle-orm';
import { desc } from 'drizzle-orm';
import { inArray } from 'drizzle-orm';
import { isValidTag, linkPostToTag, getPostIdsByTag} from '../services/tagService';
import PostWithTag from '../databases/mongo/postTagModel';
import Tag from '../databases/mongo/tagModel';


export const getPostsWithTags = async (_req: Request, res: Response) => {
  try {
    // 1. Fetch all posts from PostgreSQL
    const postResults = await pgdb.select().from(posts).orderBy(desc(posts.createdAt));

    // 2. Fetch all post-tag mappings from MongoDB
    const tagMappings = await PostWithTag.find(); // contains postId, tagId

    // 3. Fetch all tag definitions from MongoDB
    const allTags = await Tag.find(); // contains tagId, name

    // 4. Build a tagId -> tagName map
    const tagIdToName: Record<string, string> = {};
    allTags.forEach(tag => {
      tagIdToName[tag.tagId] = tag.name;
    });

    // 5. Build a postId -> [tagName] map
    const postIdToTags: Record<number, string[]> = {};
    tagMappings.forEach(mapping => {
      const tagName = tagIdToName[mapping.tagId];
      if (!tagName) return;
      if (!postIdToTags[mapping.postId]) postIdToTags[mapping.postId] = [];
      postIdToTags[mapping.postId].push(tagName);
    });

    // 6. Merge posts with their tag names
    const enrichedPosts = postResults.map(post => ({
      ...post,
      tags: postIdToTags[post.id] || []
    }));

    res.json(enrichedPosts);
  } catch (err) {
    console.error('❌ Error in /posts/with-tags:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};





export const getPostsByTag = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { tagId } = req.params;

  if (!(await isValidTag(tagId))) {
    res.status(400).json({ error: 'Invalid tag' });
    return;                       // ← no value returned
  }

  try {
    const postIds = await getPostIdsByTag(tagId);

    if (postIds.length === 0) {
      res.json([]);               // ← send and exit
      return;
    }

    const result = await pgdb
      .select()
      .from(posts)
      .where(inArray(posts.id, postIds));

    res.json(result);
  } catch (err) {
    console.error('Error fetching posts by tag:', err);
    next(err);
  }
};

export const getMyPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
   console.log('🔍 getMyPosts route hit');
  try {
    
 console.log('🔍 getMyPosts route hit');
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const result = await pgdb
      .select()
      .from(posts)
      .where(eq(posts.userId, userId))
      .orderBy(desc(posts.createdAt));

    res.json(result);
  } catch (err) {
    console.error('Error fetching my posts:', err);
    next(err); // propagate the error properly
  }
};


export const createPost = async (req: Request, res: Response) => {
  const { title, content, tagId } = req.body;
  const userId = req.userId;

  // Validations
  if (!(title && content && tagId)) {
    res.status(400).json({ error: 'Missing parameters' });
    return;
  }
  if (typeof userId !== 'number') {
    res.status(401).json({ error: 'Unauthorized: userId missing' });
    return;
  }
  if (!(await isValidTag(tagId))) {
    res.status(400).json({ error: 'Invalid tag selected' });
    return;
  }

  try {
    const [post] = await pgdb
      .insert(posts)
      .values({ userId, title, content })
      .returning();

    await linkPostToTag(post.id, tagId);

    res.status(201).json({
      message: 'Post created successfully!',
      post,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
// Get all posts (public)
export const getAllPosts = async (_: Request, res: Response) => {
  
  try {
    const result = await pgdb.select().from(posts).orderBy(desc(posts.createdAt));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Get single post by ID (public)
export const getPostById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const [post] = await pgdb.select().from(posts).where(eq(posts.id, id));
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Update post (auth required, only owner)
export const updatePost = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const userId = req.userId;
  const { title, content } = req.body;

  // Validations
  if (!(title && content)) {
    res.status(400).json({ error: 'Missing parameters' });
    return;
  }
  if (typeof userId !== 'number') {
    res.status(401).json({ error: 'Unauthorized: userId missing' });
    return;
  }

  try {
    const [post] = await pgdb.select().from(posts).where(eq(posts.id, id));
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    if (post.userId !== userId) {
      res.status(403).json({ error: 'Forbidden: Not your post' });
      return;
    }
    const [updated] = await pgdb
      .update(posts)
      .set({ title, content, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    res.json({
      message: 'Post updated successfully!',
      post: updated,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Delete post (auth required, only owner)
export const deletePost = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const userId = req.userId;

  if (typeof userId !== 'number') {
    res.status(401).json({ error: 'Unauthorized: userId missing' });
    return;
  }

  try {
    const [post] = await pgdb.select().from(posts).where(eq(posts.id, id));
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    if (post.userId !== userId) {
      res.status(403).json({ error: 'Forbidden: Not your post' });
      return;
    }
    await pgdb.delete(posts).where(eq(posts.id, id));
    res.json({ message: 'Post deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};