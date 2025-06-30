import { Request, Response } from 'express';
import pgdb from '../databases/postgres';
import { posts } from '../databases/postgres/schema/posts';
import { eq } from 'drizzle-orm';
import { desc } from 'drizzle-orm';

// Create a new post (auth required)
export const createPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const userId = req.userId;

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
    const [post] = await pgdb
      .insert(posts)
      .values({ userId, title, content })
      .returning();
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