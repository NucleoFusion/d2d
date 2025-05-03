// Express App configuration

import bodyParser from 'body-parser';
import express, { Request } from 'express';
import authRouter from './routes/auth';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors<Request>());

// Routes
app.use('/auth', authRouter);

// Global error handler (should be after routes)

export default app;
