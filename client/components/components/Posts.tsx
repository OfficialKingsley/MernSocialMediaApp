import React, { FunctionComponent } from "react";
import { IPost } from "../../types/PostInterface";
import Post from "./Post";

const Posts: FunctionComponent = ({ posts }: { posts: IPost[] }) => {
  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post}></Post>
      ))}
    </div>
  );
};

export default Posts;
