import { Request, Response } from 'express';
import pgdb from '../databases/postgres';
import { users } from '../databases/postgres/schema/users';
import { compare, genSalt, hash } from 'bcrypt-ts';
import { eq } from 'drizzle-orm';

//TODO: Forgot Password
//TODO: Cookie Auth
//TODO: Tests

export const register = async (req: Request, res: Response) => {
  const { name, email, password, dob } = req.body;

  //Validations
  if (!(name && email && password && dob)) {
    res.status(400).json({
      error: 'Missing parameters',
    });
    return;
  }

  if (!validEmail(email)) {
    res.status(400).json({
      error: 'Invalid email format',
    });
    return;
  }

  if (!validDate(dob)) {
    res.status(400).json({
      error: 'Invalid date format',
    });
    return;
  }

  const emailCheck = await pgdb
    .select({ id: users.id, password: users.password })
    .from(users)
    .where(eq(users.email, email))
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });

  if (emailCheck && emailCheck.length > 0) {
    res.status(400).json({
      error: 'User with given email already exists',
    });
    return;
  }

  // Hashing password
  const hashed = await hash(password, await genSalt(10));

  const result = await pgdb
    .insert(users)
    .values({
      name,
      email,
      password: hashed,
      dob,
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });

  if (!result) return; //return if error occured, since itll be caught by .catch();

  res.sendStatus(200);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log(req.body, req.headers);

  // Validations
  if (!(email && password)) {
    res.status(400).json({
      error: 'Missing parameters',
    });
    return;
  }

  if (!validEmail(email)) {
    res.status(400).json({
      error: 'Invalid email format',
    });
    return;
  }

  const result = await pgdb
    .select({ id: users.id, password: users.password })
    .from(users)
    .where(eq(users.email, email))
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });

  if (!result) return; //return if error occured, since itll be caught by .catch()

  if (result.length === 0) {
    res.status(400).json({
      error: 'No user with given email exists',
    });
    return;
  }

  const passwordMatch = await compare(password, result[0].password);
  if (!passwordMatch) {
    res.status(200).json({
      auth: false,
      message: "Password doesn't match",
    });
    return;
  }

  res.status(200).json({
    auth: true,
    message: 'Authentication successful',
    user: {
      id: result[0].id,
    },
  });
};

const validEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validDate = (date: string) => {
  const dobFormatted = new Date(date);
  const currDate = new Date();

  console.log(dobFormatted);

  if (isNaN(dobFormatted.getTime())) {
    return false;
  }

  return currDate > dobFormatted;
};
