import { Request, RequestHandler, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import errorResponse from "../utils/errorResponse";

const generateToken = (id: string | object | Buffer) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "24h" });
};

export const registerUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, username, phone, password } = req.body;
    if (!email) {
      res.status(400);
      throw new Error("No email was sent. Please send an email");
    }
    if (!firstName) {
      res.status(400);
      throw new Error("No First Name was sent. Please send a firstName");
    }
    if (!username) {
      res.status(400);
      throw new Error("No username was sent. Please send a username");
    }
    if (!password) {
      res.status(400);
      throw new Error("No password was sent. Please send a password");
    }

    const emailUser = await User.findOne({ email });
    const usernameUser = await User.findOne({ username });
    if (emailUser) {
      res.status(400);
      throw new Error("The user with that email already exists");
    }
    if (usernameUser) {
      res.status(400);
      throw new Error("The user with that username already exists");
    }

    const profileImagePath = req.file?.path;

    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      phone,
      password,
      profileImagePath,
    });

    const user = await newUser.save();

    res.status(201).json(user);
  }
);

export const loginUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      res.status(404);
      throw new Error("No user with that username was found");
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (user && passwordIsCorrect) {
      const {
        _id,
        firstName,
        lastName,
        email,
        username,
        phone,
        profileImagePath,
        isAdmin,
        isSuperUser,
      } = user;

      const token = generateToken(user._id);

      res.status(200).json({
        _id,
        firstName,
        lastName,
        email,
        username,
        phone,
        profileImagePath,
        isAdmin,
        isSuperUser,
        token,
      });
    } else {
      res.status(400);
      throw new Error("Username or Password incorrect");
    }
  }
);

export const logoutUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json("Logged Out");
  }
);
export const getAllUsers: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const users = await User.find().select("-password");

    if (users) {
      res.status(200).json(users);
    }
  }
);

export const getUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await User.findOne({ _id: id }).select("-password -__v");
      res.status(200).json(user);
    } catch (error) {
      errorResponse(res, 404, error, "User with that id was not found");
    }
  }
);
