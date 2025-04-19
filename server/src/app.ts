// Express App configuration

import bodyParser from 'body-parser';
import express from 'express';
import authRouter from './routes/auth';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRouter);

// Global error handler (should be after routes)

export default app;
