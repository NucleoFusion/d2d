import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../services/tokenManager';

//TODO: store id

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.path.startsWith('/auth')) {
    return next();
  }

  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({
      error: 'Missing Authorization token. Please make sure you are logged in.',
    });
    return;
  }

  const splits = bearer.split(' ');
  const token = splits[1];

  if (!token) {
    res.status(401).json({
      error: 'Missing Authorization token. Please make sure you are logged in.',
    });
    return;
  }

  const id = await verifyToken(token);

  if (id == null) {
    res.status(401).json({
      error: 'Expired and/or Invalid token.',
    });

    return;
  }

  next();
};

export default authMiddleware;
