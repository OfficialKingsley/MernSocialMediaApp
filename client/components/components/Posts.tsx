import React, { FunctionComponent } from "react";
import { IPost } from "../../types/PostInterface";
import Post from "./Post";

const Posts = ({ posts }: { posts: IPost[] }) => {
  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
