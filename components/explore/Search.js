import React from "react";
import { IoSearch } from "react-icons/io5";

export default function Search() {
  return (
    <div className="bg-white flex items-center gap-4 py-2 px-3 rounded-md">
      <IoSearch className="text-[#828282]" />
      <input
        type="text"
        placeholder="search"
        className="flex-1 outline-none py-1"
      />
      <button className="bg-[#2F80ED] text-white rounded-md py-1 px-3">
        Search
      </button>
    </div>
  );
}
