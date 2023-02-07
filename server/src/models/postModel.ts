import mongoose from "mongoose";
import Comment, { commentSchema } from "./commentModel";
// import User from "./userModel";

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: {
      type: String,
      max: 280,
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    postImage: { type: String },
    comments: { type: [commentSchema] },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
