import React from "react";
import { IPost } from "../../types/PostInterface";
import { AiFillLike, AiOutlineComment, AiOutlineMenu } from "react-icons/ai";
const Post = ({ post }: { post: IPost }) => {
  return (
    <div className="bg-gray-400 rounded-3xl p-4 dark:bg-gray-900 my-3 dark:text-white">
      <div className="flex justify-between">
        <div>
          <cite className="text-red-600 inline-block mr-4">
            {post.user && `${post.user.firstName} ${post.user.lastName}`}
          </cite>
        </div>
        <div className="cursor-pointer">
          <AiOutlineMenu />
        </div>
      </div>
      <p>{post.content}</p>
      <div>
        <div>Likes</div>
        <div className="buttons flex gap-x-3 mt-2">
          <div className="flex-1 flex items-center justify-center cursor-pointer p-2 rounded-lg dark:bg-gray-800">
            <AiFillLike />
          </div>
          <div className="flex-1 flex items-center justify-center cursor-pointer p-2 rounded-lg dark:bg-gray-800">
            <AiOutlineComment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
