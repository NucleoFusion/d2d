import { Router } from 'express';
import * as postsController from '../controllers/postsController';
import authMiddleware from '../middleware/auth';

const router = Router();

// Tag-based posts (must be before /:id)
router.get('/tag/:tagId', postsController.getPostsByTag);

// Public routes
router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);

// Authenticated routes
router.post('/', authMiddleware, postsController.createPost);
router.put('/:id', authMiddleware, postsController.updatePost);
router.delete('/:id', authMiddleware, postsController.deletePost);

export default router;