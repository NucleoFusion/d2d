import { NextFunction, Request, Response } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `[INFO] ${new Date(Date.now()).toString()} -- ${req.method} ${req.path} - ${req.hostname}`,
  );

  next();
};

export default logger;
