import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(res.statusCode);
  // console.log(err.message);
  const statusCode: number = res.statusCode
    ? res.statusCode < 300
      ? 500
      : res.statusCode
    : 500;
  res.status(statusCode);

  res.json({
    statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === "dev" ? err.stack : null,
  });

  next();
};

export default errorHandler;
