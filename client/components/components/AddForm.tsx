import Image from "next/image";
import React from "react";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import styles from "../../variables/styles";
import ProfileImage from "./../../public/code-img1.jpg";
const AddForm = () => {
  return (
    <div className={`bg-gray-400 rounded-3xl p-4 dark:bg-gray-900`}>
      <div className="mb-2 flex items-center gap-x-2">
        <div>
          <Image
            src={ProfileImage}
            alt="Profile Image"
            className="rounded-full w-12 h-12"
          />
        </div>
        <form
          action=""
          className="flex gap-2 flex-1 bg-gray-600 rounded text-white"
        >
          <input
            type="text"
            className="flex-1 p-2 rounded transparent outline-none bg-transparent"
          />
        </form>
      </div>
      <div>
        <div className="">
          <label
            htmlFor="postImage"
            className="w-full h-full cursor-pointer rounded p-2 block text-center bg-gray-900 text-white dark:hover:bg-gray-400 dark:hover:text-black"
          >
            Add Image
          </label>

          <input
            type="file"
            name=""
            id="postImage"
            className="hidden"
            accept=".jpg,.webp,.jpeg,.gif,.png"
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default AddForm;
