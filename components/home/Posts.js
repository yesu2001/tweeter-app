import React from "react";
import pic1 from "../assets/pic1.avif";
import pic2 from "../assets/pic2.avif";
import cover1 from "../assets/cover1.avif";
import cover2 from "../assets/cover2.avif";
import Post from "./Post";

export default function Posts() {
  return (
    <div className="space-y-6">
      {data.map((item) => (
        <Post key={item.post_id} post={item} />
      ))}
    </div>
  );
}

const data = [
  {
    post_id: "GUY4354FTY67",
    username: "Mikael Stanley",
    user_pic: pic1,
    created_at: "24 August at 20:43",
    title:
      "“We travel, some of us forever, to seek other places, other lives, other souls.” – Anais Nin",
    post_image: cover1,
    comment_counts: 0,
    comments: [],
    likes_counts: 0,
    liked_by: [],
    saved_counts: 0,
    saved_by: [],
    retweeted_by: [],
    retweeted_counts: 0,
  },
  {
    post_id: "UYAIUYI67653GG57",
    username: "Peyton Lyons",
    user_pic: pic2,
    created_at: "24 August at 20:43",
    title:
      "“Traveling – it leaves you speechless, then turns you into a storyteller.",
    post_image: cover2,
    comment_counts: 0,
    comments: [],
    likes_counts: 0,
    liked_by: [],
    saved_counts: 0,
    saved_by: [],
    retweeted_by: [],
    retweeted_counts: 0,
  },
  {
    post_id: "YYTU77868GUYG65765G",
    username: "Mikael Stanley",
    user_pic: pic1,
    created_at: "24 August at 20:43",
    title:
      "“The gladdest moment in human life, methinks, is a departure into unknown lands.” – Sir Richard Burton",
    post_image: "",
    comment_counts: 422,
    comments: [],
    likes_counts: 244,
    liked_by: [],
    saved_counts: 102,
    saved_by: [],
    retweeted_counts: 211,
    retweeted_by: [],
  },
];
