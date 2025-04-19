import { Router } from 'express';
import db from '../db';
import { users } from '../db/schema/users';

const authRouter = Router();

authRouter.get('/', async () => {
  console.log('CALLED');

  const res = await db
    .insert(users)
    .values({
      name: 'a',
      dob: new Date().toDateString(),
      email: 'smth',
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
    });

  console.log(res);
});

export default authRouter;
