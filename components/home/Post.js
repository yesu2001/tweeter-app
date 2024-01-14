import React from "react";
import Image from "next/image";
import {
  FaRegCommentAlt,
  FaRetweet,
  FaRegHeart,
  FaRegBookmark,
} from "react-icons/fa";

export default function Post({ post, userInfo }) {
  return (
    <div className="bg-white p-4 rounded-md">
      {/* header */}
      <div className="flex items-center gap-3">
        <Image
          src={post?.user_pic}
          alt="profiel image"
          width={40}
          height={40}
          className="rounded-lg"
        />
        <div>
          <p className="font-semibold">{post?.user_name}</p>
          <p className="text-[#BDBDBD] text-xs">{post?.created_at}</p>
        </div>
      </div>
      {/* post title */}
      <div className="my-4">
        <p className="text-[#4F4F4F]">{post?.caption}</p>
      </div>
      {/* post image */}
      {post?.post_image && (
        <div className="h-[300px] w-full">
          <Image
            src={post?.post_pic}
            alt="cover image"
            className="h-full w-full  object-cover"
          />
        </div>
      )}
      {/* post status counts */}
      <div className="flex items-center justify-end gap-3 p-2 text-sm text-[#BDBDBD]">
        <p>{post?.comments_count} Comments</p>
        <p>{post?.retweets_count} Retweets</p>
        <p>{post?.saved_count} Saved</p>
      </div>
      {/* post icnos */}
      <div className="text-[#4F4F4F] p-2 flex items-center justify-around">
        <button className="flex items-center gap-2">
          <FaRegCommentAlt />
          <p>Comment</p>
        </button>
        <button className="flex items-center gap-2">
          <FaRetweet />
          <p>Retweet</p>
        </button>
        <button className="flex items-center gap-2">
          <FaRegHeart />
          <p>Like</p>
        </button>
        <button className="flex items-center gap-2">
          <FaRegBookmark />
          <p>Save</p>
        </button>
      </div>
      {/* comment input */}
      <div className="p-2">
        <div className="flex items-center gap-2">
          <Image
            src={userInfo?.user_pic}
            alt="profile pic"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <input
            type="text"
            placeholder="tweet your reply"
            className="w-full py-1 px-2 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
