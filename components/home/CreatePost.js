"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { FaRegImage, FaGlobeAfrica } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import defaultPic from "../assets/defaultPic.png";
import { createPost } from "@/reducers/postSlice";
import { uploadImage } from "@/utils/clientHelpers";

export default function CreatePost({ userInfo }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const fileRef = useRef(null);
  const [newPost, setNewPost] = useState({
    caption: "",
    post_pic: "",
    public_view: false,
  });

  const handleChange = (e) => {
    setNewPost((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const { data } = await uploadImage(file);
    const url = data?.publicUrl;
    setNewPost((prevState) => ({
      ...prevState,
      post_pic: url,
    }));
  };

  const selectPublicOption = (option) => {
    setNewPost((prevState) => ({
      ...prevState,
      public_view: option === "everyone" ? true : false,
    }));
    setOpen(false);
  };

  const handleSubmitPost = () => {
    const post = {
      caption: newPost.caption,
      post_pic: newPost.post_pic,
      public_view: newPost.public_view,
      user_id: userInfo.id,
      user_pic: userInfo.user_pic,
      user_name: userInfo.full_name,
      likes_count: 0,
      saved_count: 0,
      comments_count: 0,
      retweets_count: 0,
    };
    dispatch(createPost(post));
    setNewPost({
      caption: "",
      post_pic: "",
      public_view: "",
    });
  };

  return (
    <div className="bg-white p-3 rounded-md">
      <p className="text-[#4F4F4F] font-semibold text-sm">Tweet something</p>
      <hr className="my-2" />
      <div className="flex items-center gap-3 mb-6">
        <Image
          src={userInfo?.user_pic || defaultPic}
          alt="profile pic"
          width={50}
          height={50}
          className="rounded-md"
        />
        <input
          name="caption"
          type="text"
          value={newPost.caption}
          onChange={handleChange}
          placeholder="What's happening?"
          className="w-full outline-none p-1"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="relative flex items-center gap-3 ml-14 text-[#2F80ED]">
          <div
            onClick={() => fileRef.current.click()}
            className="cursor-pointer flex items-center gap-2"
          >
            <FaRegImage />
            <input
              type="file"
              ref={fileRef}
              onChange={handleFileChange}
              className="hidden"
            />
            {newPost.post_pic.length > 0 && (
              <p>{newPost.post_pic.substring(12, 17)}.image file</p>
            )}
          </div>
          <button
            className="flex items-center gap-2"
            onClick={() => setOpen(!open)}
          >
            <FaGlobeAfrica />
            <p className="text-xs">
              {newPost.public_view ? "Everyone" : "People you follow"} can reply
            </p>
          </button>
          {open && <DropDown selectPublicOption={selectPublicOption} />}
        </div>
        <button
          className="bg-[#2F80ED] rounded-md px-6 py-1 text-white"
          onClick={handleSubmitPost}
        >
          Tweet
        </button>
      </div>
    </div>
  );
}

const DropDown = ({ selectPublicOption }) => {
  return (
    <div
      className="absolute top-4 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 "
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      <div className="py-1" role="none">
        <div
          className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          onClick={() => selectPublicOption("everyone")}
        >
          <FaGlobeAfrica size={20} />
          Everyone
        </div>
        <div
          className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          onClick={() => selectPublicOption("onlyfollowers")}
        >
          <IoMdPeople size={20} />
          People you follow
        </div>
      </div>
    </div>
  );
};
