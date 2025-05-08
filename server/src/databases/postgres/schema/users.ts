import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id'),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  password: text('password').notNull(),
});
