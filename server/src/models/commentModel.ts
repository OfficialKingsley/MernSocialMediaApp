import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: { type: String, max: 280 },
  likes: {
    type: Map,
    of: Boolean,
  },
  replies: { type: [String] },
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
