import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProfileImage from "./../../public/code-img1.jpg";

const blob = new Blob([]);
const file = new File([blob], "");

const AddForm = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(file);
  const userState = useSelector((state) => {
    return state.userState;
  });

  const formData = new FormData();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(image);
    formData.append("content", content);
    file.name.length > 0 && formData.append("image", image);
  };
  const user = userState.user;
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
          <textarea
            name=""
            id=""
            cols={30}
            rows={1}
            className="flex-1 p-2 rounded transparent outline-none bg-transparent resize-y"
            placeholder={`What's on your mind ${user.firstName}?`}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
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
            onChange={(e) => {
              setImage(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
          />
        </div>
        <div></div>
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          Add Post
        </button>
      </div>
    </div>
  );
};

export default AddForm;
