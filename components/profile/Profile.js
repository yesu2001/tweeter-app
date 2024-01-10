import React from "react";
import Image from "next/image";
import Filters from "../explore/Filters";
import Posts from "../home/Posts";
import ProfileInfo from "./ProfileInfo";
import profileCover from "../assets/profilecover.jpg";
import profilePic from "../assets/profile1.avif";

export default function Profile() {
  const filters = ["tweets", "tweets & replies", "media", "likes"];
  return (
    <div className="flex flex-col w-full">
      {/* cover picture */}
      <div className="h-[200px] md:h-[300px] w-full">
        <Image
          src={profileCover}
          alt="profile cover"
          className="h-[100%] w-full object-cover"
        />
      </div>

      {/* profile info */}
      <div className="w-[80%] md:w-[60%] flex items-center justify-center mx-auto mt-[-50px]">
        <ProfileInfo info={data} />
      </div>

      {/* profile posts */}
      <div className="flex flex-col md:flex-row gap-8 mx-4 md:mx-60 mt-6">
        <div className="flex-[0.3]">
          <Filters filters={filters} defaultFilter={"tweets"} />
        </div>
        <div className="flex-[0.7] flex flex-col space-y-4">
          <Posts />
        </div>
      </div>
    </div>
  );
}

const data = {
  username: "Daniel Jensen",
  user_pic: profilePic,
  bio: "Photographer & Filmmaker based in Copenhagen, Denmark ✵ 🇩🇰",
  following: 321,
  followers: 345,
};
