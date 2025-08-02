import { Router } from 'express';
import * as postsController from '../controllers/postsController';
import authMiddleware from '../middleware/auth';

const router = Router();

// Tag-based posts (must be before /:id)
router.get('/tag/:tagId', postsController.getPostsByTag);

// Authenticated "my posts" route should come before dynamic :id
router.get('/my', authMiddleware, postsController.getMyPosts);

// Public routes
router.get('/', postsController.getAllPosts);
router.get('/with-tags', postsController.getPostsWithTags);
router.get('/:id', postsController.getPostById);

// Authenticated CRUD routes
router.post('/', authMiddleware, postsController.createPost);
router.put('/:id', authMiddleware, postsController.updatePost);
router.delete('/:id', authMiddleware, postsController.deletePost);

export default router;