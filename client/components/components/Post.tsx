import React from "react";
import { IPost } from "../../types/PostInterface";
import { AiOutlineMenu } from "react-icons/ai";
const Post = ({ post }: { post: IPost }) => {
  return (
    <div className="bg-gray-400 rounded-3xl p-4 dark:bg-gray-900 my-3 dark:text-white">
      <div className="flex justify-between">
        <div>
          <cite className="text-red-600 inline-block mr-4">
            {post.user && `${post.user.firstName} ${post.user.lastName}`}
          </cite>
          {/* <span>{post.updatedAt.toLocaleString()}</span> */}
        </div>
        <div>
          <AiOutlineMenu />
        </div>
      </div>
      <p>{post.content}</p>
    </div>
  );
};

export default Post;
