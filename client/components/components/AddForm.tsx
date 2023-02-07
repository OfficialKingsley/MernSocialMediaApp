import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import addPost from "../../utils/addPost";
import ProfileImage from "./../../public/code-img1.jpg";
import fetchPosts from "../../utils/fetchPosts";
import { setPosts } from "../../state/postSlice";

const AddForm = () => {
  const blob = new Blob(["some-image"], { type: "image/png" });
  const file = new File([blob], "");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(file);
  const dispatch = useDispatch();

  const userState = useSelector((state) => {
    return state.userState;
  });

  const formData = new FormData();
  const user = userState.user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.append("content", content);
    image.name.length > 0 && formData.append("postImage", image);
    if (!content && content.length == 0 && image.name.length == 0) {
      toast("You need to add either some content or a message", {
        type: "warning",
      });
    } else {
      formData.append("user", user._id);
      const res = await addPost(formData, user.token);
      if (res._id) {
        const data = await fetchPosts(user.token);
        if (data.length) {
          dispatch(setPosts(data));
          toast("Successfully added a new post", {
            type: "success",
            autoClose: 3000,
          });
        }
      }
    }
  };

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
        <form action="" className="flex flex-col w-full gap-y-1">
          <div className="flex gap-2 flex-1 bg-gray-600 rounded text-white gap-x-4">
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
              required
            ></textarea>
          </div>
          <div className="flex gap-x-3">
            <div className="flex-1 flex">
              <label
                htmlFor="postImage"
                className="w-full h-full p-2 cursor-pointer rounded dark:hover:bg-gray-400 dark:hover:text-black dark:bg-gray-700 text-center bg-gray-900 text-white"
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
                }}
              />
            </div>
            <div className="flex-1">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-gray-900 text-white block w-full h-full dark:bg-gray-700 rounded dark:hover:bg-gray-400 dark:hover:text-black"
              >
                Add Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
