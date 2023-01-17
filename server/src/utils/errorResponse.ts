import { Response } from "express";

const errorResponse = (
  res: Response,
  status: number,
  err: Error | any,
  message: string | undefined
) => {
  const statusCode: number = res.statusCode
    ? res.statusCode < 300
      ? status
      : res.statusCode
    : status;
  return res.status(statusCode).json({
    statusCode: statusCode,
    message:
      message !== undefined && message.length > 0 ? message : err.message,
    stack: process.env.NODE_ENV === "dev" ? err.stack : null,
  });
};

export default errorResponse;
