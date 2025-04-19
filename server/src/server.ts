// Starting the server
import app from './app';
import config from './config/config';
import authRouter from './routes/auth';
import valkey from './databases/valkey/valkey';
import db from './databases/postgres';
import { sql } from 'drizzle-orm';
import mongoose, { connectToDatabase } from './databases/mongo/mongo';

app.use('/auth', authRouter);

async function startServer() {
  try {
    await connectToDatabase();
    if (mongoose.connection.readyState == 1) console.log('[MongoDB] Connected');
    else console.log('[MongoDB] Error connecting');

    await valkey.ping();
    console.log('[Valkey] Connected');

    await db.execute(sql`SELECT 1`);
    console.log('[PostgreSQL] Connected via Drizzle');

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (err) {
    console.log(`Failed starting server\nERROR -> ${err}`);
  }
}

startServer();
