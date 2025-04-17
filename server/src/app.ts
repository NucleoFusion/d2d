// Express App configuration

import express from 'express';

const app = express();

app.use(express.json());

// Routes

// Global error handler (should be after routes)

export default app;
