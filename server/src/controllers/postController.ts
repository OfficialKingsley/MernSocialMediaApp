import { Request, RequestHandler, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import errorResponse from "../utils/errorResponse";
import Post from "./../models/postModel";

export const getPosts: RequestHandler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const posts = await Post.find({});
      res.status(200).json(posts);
    } catch (error) {
      errorResponse(res, 400, error, "");
    }
  }
);

export const addPost: RequestHandler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { user, content } = req.body;

    const postImagePath = req.file?.path;

    const newPost = new Post({
      user,
      content,
      postImage: postImagePath,
    });
    const savedPost = await newPost.save();
    await res.status(200).json(savedPost);
  }
);
