import React from "react";
import Image from "next/image";
import { MdPersonAddAlt1 } from "react-icons/md";

export default function ProfileInfo({ info }) {
  return (
    <div className="w-full bg-white flex flex-col md:flex-row gap-8 rounded-md p-4">
      <div className="h-[170px] w-[200px] mt-[-80px] mx-auto ">
        <Image
          src={info.user_pic}
          alt="profile picture"
          className="w-full h-full object-cover rounded-lg border-4 border-white"
        />
      </div>
      <div className="flex flex-col gap-8 justify-between w-full">
        <div className="flex flex-col md:flex-row gap-4 md:justify-between">
          <div className="flex flex-col md:flex-row items-center md:gap-8">
            <p className="text-2xl font-semibold">{info?.username}</p>
            <div className="flex items-center gap-4">
              <p className="flex gap-1 text-[#828282] text-sm">
                <span className="text-[#333333] font-semibold">
                  {info?.followers}
                </span>{" "}
                Followers
              </p>
              <p className="flex gap-1 text-[#828282] text-sm">
                <span className="text-[#333333] font-semibold">
                  {info?.following}
                </span>{" "}
                Following
              </p>
            </div>
          </div>
          <div className="mx-auto md:mx-0">
            <button className="flex items-center gap-3 bg-[#2F80ED] text-white text-sm rounded-md py-1 px-3">
              <MdPersonAddAlt1 />
              Follow
            </button>
          </div>
        </div>
        <div>
          <p className="text-md text-[#828282] md:w-[60%]">{info?.bio}</p>
        </div>
      </div>
    </div>
  );
}
