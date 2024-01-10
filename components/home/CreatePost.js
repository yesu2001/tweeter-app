"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaRegImage, FaGlobeAfrica } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import profilePic from "../assets/pic.avif";

export default function CreatePost() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white p-3 rounded-md">
      <p className="text-[#4F4F4F] font-semibold text-sm">Tweet something</p>
      <hr className="my-2" />
      <div className="flex items-center gap-3 mb-6">
        <Image
          src={profilePic}
          alt="profile pic"
          width={50}
          className="rounded-md"
        />
        <input
          type="text"
          placeholder="What's happening?"
          className="w-full outline-none p-1"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="relative flex items-center gap-3 ml-14 text-[#2F80ED]">
          <button>
            <FaRegImage />
          </button>
          <button
            className="flex items-center gap-2"
            onClick={() => setOpen(true)}
          >
            <FaGlobeAfrica />
            <p className="text-xs">Everyone can reply</p>
          </button>
          {open && <DropDown />}
        </div>
        <button className="bg-[#2F80ED] rounded-md px-6 py-1 text-white">
          Tweet
        </button>
      </div>
    </div>
  );
}

const DropDown = () => {
  return (
    <div
      className="absolute top-4 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 "
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      <div className="py-1" role="none">
        <a
          href="#"
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          <FaGlobeAfrica size={20} />
          Everyone
        </a>
        <a
          href="#"
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          <IoMdPeople size={20} />
          People you follow
        </a>
      </div>
    </div>
  );
};
