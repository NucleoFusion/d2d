// Starting the server
import app from './app';
import config from './config/config';
import authRouter from './routes/auth';

app.use('/auth', authRouter);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
