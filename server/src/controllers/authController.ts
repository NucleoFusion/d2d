import { Request, Response } from 'express';
import pgdb from '../databases/postgres';
import { users } from '../databases/postgres/schema/users';
import { genSalt, hash } from 'bcrypt-ts';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, dob } = req.body;

  //Validations
  if (!(name && email && password && dob)) {
    res.status(400).json({
      error: 'Missing parameters',
    });
    return;
  }

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!validEmail) {
    res.status(400).json({
      error: 'Invalid email format',
    });
    return;
  }

  const dobFormatted = new Date(dob);
  if (isNaN(dobFormatted.getTime())) {
    res.status(400).json({
      error: 'Invalid date format',
    });
    return;
  }

  // Hashing password
  const hashed = await hash(password, await genSalt(10));

  try {
    await pgdb.insert(users).values({
      name,
      email,
      password: hashed,
      dob,
    });
  } catch (err) {
    res.status(500).json({
      error: 'database error',
      message: err,
    });
    return;
  }

  res.sendStatus(200);
};
