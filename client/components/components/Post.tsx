import React from "react";
import { IPost } from "../../types/PostInterface";

const Post = ({ post }: { post: IPost }) => {
  return (
    <div>
      <cite>{post.user.firstName}</cite>
      <p>{post.content}</p>
    </div>
  );
};

export default Post;
