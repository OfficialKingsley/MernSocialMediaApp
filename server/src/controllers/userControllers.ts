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

    const user = await User.findOne({ username }).select("-__v");

    if (!user) {
      res.status(404);
      throw new Error("No user with that username was found");
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (user && passwordIsCorrect) {
      const newToken = generateToken(user._id);

      user.token = newToken;
      await user.save();

      res.status(200).json(user);
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

export const getUserFriends: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (user) {
        const friends = await Promise.all(
          user?.friends.map((_id) =>
            User.findById(_id).select("-password -__v")
          )
        );

        res.status(200).json(friends);
      }
    } catch (error) {
      errorResponse(res, 404, error, "The user with that id was not found");
    }
  }
);

export const addFriend: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id, friendId } = req.params;
      // const {  } = req.body;

      const user = await User.findById(id).select("-password -__v");
      const friend = await User.findById(friendId);
      if (user && friend) {
        if (user.friends.includes(friend._id)) {
          res.status(400);
          throw new Error(
            "This user is already a friend and therfore can't be added"
          );
        } else {
          user.friends.push(friend._id);
          friend.friends.push(user._id);
        }
        await user.save();
        await friend.save();
        res.status(200).json(user);
      }
    } catch (error) {
      errorResponse(res, 400, error, "Cannot ");
    }
  }
);

export const removeFriend: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id, friendId } = req.params;
      // const {  } = req.body;

      const user = await User.findById(id).select("-password -__v");
      const friend = await User.findById(friendId);

      if (user === friend) {
        res.status(400);
        throw new Error("You cannot be a friend of yourself");
      }
      if (user && friend) {
        if (user.friends.includes(friend._id)) {
          user.friends.filter((id) => id !== friend._id);
          friend.friends.filter((id) => id !== user._id);
        } else {
          res.status(400);
          throw new Error(
            "This user is not a friend and therfore can't be removed"
          );
        }
        await user.save();
        await friend.save();
        res.status(200).json(user);
      }
    } catch (error) {
      errorResponse(res, 400, error, "");
    }
  }
);
