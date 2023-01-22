import mongoose from "mongoose";
import User from "./userModel";

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: User },
    content: {
      type: String,
      max: 280,
    },
    postImage: { type: String },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
