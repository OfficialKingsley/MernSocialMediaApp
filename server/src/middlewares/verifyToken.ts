import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

const verifyToken = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let tokenString: string | undefined = req.header("Authorization");

    if (!tokenString) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }

    if (tokenString.startsWith("Bearer")) {
      let token: string;
      token = tokenString.slice(7, tokenString.length).trimStart();

      const user = await User.findOne({ token });

      if (!user) {
        res.status(400);
        throw new Error("The user with that token was not found");
      }

      if (user.token !== token) {
        res.status(400);
        throw new Error("The token sent is incorrect");
      }

      const verifiedToken = jwt.verify(user.token, process.env.JWT_SECRET!);
      if (!verifiedToken) {
        res.status(403);
        throw new Error("This token provided is either invalid or is expired");
      }

      if (typeof verifiedToken === "object") {
        const user = await User.findOne({ id: verifiedToken.id }).select(
          "-password"
        );
        if (user) {
          req.user = user;
        }
      }
      return next();
    } else {
      res.status(400);
      throw new Error("The token provided is invalid");
    }
  }
);

export default verifyToken;
