import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'pg',
  database: 'd2d',
  password: 'postgres',
  port: 5432,
});

const db = drizzle(pool);

export default db;
