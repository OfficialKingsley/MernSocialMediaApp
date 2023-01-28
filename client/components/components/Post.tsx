import React from "react";
import { IPost } from "../../types/PostInterface";

const Post = ({ post }: { post: IPost }) => {
  console.log(post);
  return (
    <div className="bg-gray-400 rounded-3xl p-4 dark:bg-gray-900 my-3">
      <div className="">
        <cite className="text-3xl text-red-600">
          {post.user && `${post.user.firstName} ${post.user.lastName}`}
        </cite>
        <span>{post.updatedAt.toLocaleString()}</span>
      </div>
      <p>{post.content}</p>
    </div>
  );
};

export default Post;
