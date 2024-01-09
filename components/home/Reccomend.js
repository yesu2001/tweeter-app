import React from "react";
import { MdPersonAddAlt1 } from "react-icons/md";
import Image from "next/image";
import pic1 from "../assets/pic1.avif";
import pic2 from "../assets/pic2.avif";
import cover1 from "../assets/cover1.avif";
import cover2 from "../assets/cover2.avif";

export default function Reccomend() {
  return (
    <div className="bg-white p-4 rounded-md">
      <p className="text-sm text-[#4F4F4F]">Who to follow</p>
      <hr className="my-3" />
      <div>
        {data.map((item, index) => (
          <div key={index} className="h-60 space-y-2 flex flex-col">
            <div className="flex-[0.3] flex items-center  gap-2">
              <Image
                src={item.profile_pic}
                alt="profile picture"
                width={40}
                className="rounded-md"
              />
              <div className="flex-[1]">
                <p className="text-sm">{item.name}</p>
                <p className="text-xs text-[#828282]">{item.followers}K</p>
              </div>
              <button className="flex items-center gap-1 text-sm bg-[#2F80ED] text-white rounded-md py-1 px-2">
                <MdPersonAddAlt1 />
                follow
              </button>
            </div>
            <p className="flex-[0.1] text-sm text-[#828282]">{item.bio}</p>
            <Image
              src={item.cover_pic}
              alt="Cover picture"
              className="flex-[0.4] w-full h-full cover overflow-hidden rounded-md"
              width={100}
              height={20}
            />
            <div className="flex-[0.2] flex items-center">
              <hr className="w-full border" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const data = [
  {
    name: "Micheal Stanley",
    profile_pic: pic1,
    cover_pic: cover1,
    bio: "Photographer & Filmmaker based in Copenhagen, Denmark ✵ 🇩🇰",
    followers: 210,
  },
  {
    name: "Austin Neil",
    profile_pic: pic2,
    cover_pic: cover2,
    bio: "Follow me on IG: @arstyy",
    followers: 110,
  },
];
