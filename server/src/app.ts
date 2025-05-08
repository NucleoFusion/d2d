// Express App configuration

import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import authRouter from './routes/auth';
import cors from 'cors';
import authMiddleware from './middleware/auth';
import logger from './middleware/logger';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors<Request>());

//Middleware
app.use(authMiddleware);
app.use(logger);

// Routes
app.use('/auth', authRouter);

app.get('/ping', (_: Request, res: Response) => {
  res.json({
    message: 'PONG',
  });
});

// Global error handler (should be after routes)

export default app;
