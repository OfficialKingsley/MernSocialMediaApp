import { Response } from "express";

const errorResponse = (
  res: Response,
  status: number,
  err: Error | any,
  message: string | undefined
) => {
  return res.status(status).json({
    statusCode: status,
    message:
      message !== undefined && message.length > 0 ? message : err.message,
    stack: process.env.NODE_ENV === "dev" ? err.stack : null,
  });
};

export default errorResponse;
