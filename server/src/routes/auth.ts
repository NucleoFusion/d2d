import { Router } from 'express';
import { register } from '../controllers/authController';

const authRouter = Router();

authRouter.post('/register', register);

export default authRouter;
