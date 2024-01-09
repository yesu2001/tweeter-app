import React from "react";

export default function Trends() {
  return (
    <div className="bg-white p-4 rounded-md">
      <p className="text-[#4F4F4F] text-sm">Trends for you</p>
      <hr className="my-2" />
      <div className="space-y-4 my-6">
        {data?.map((item, index) => (
          <div key={index} className="space-y-1">
            <p>#{item.name}</p>
            <p className="text-[#828282] text-xs">{item.total}k tweets</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const data = [
  {
    name: "programming",
    total: 213,
  },
  {
    name: "devchallenges",
    total: 256,
  },
  {
    name: "frontend",
    total: 264,
  },
  {
    name: "fullstack",
    total: 113,
  },
  {
    name: "backend",
    total: 213,
  },
  {
    name: "gamedev",
    total: 613,
  },
  {
    name: "security",
    total: 713,
  },
];
