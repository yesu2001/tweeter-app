"use client";

import React, { useState } from "react";

export default function Filters({ filters, defaultFilter }) {
  const [filterName, setFilterName] = useState(defaultFilter);

  return (
    <div className="w-full bg-white py-4 pr-4 rounded-md">
      <div className="flex flex-col space-y-3">
        {filters.map((item, index) => (
          <button
            key={index}
            className={`${
              filterName === item
                ? "text-[#2F80ED] border-l-2 rounded-sm border-[#2F80ED]"
                : "text-[#828282] border-l-2 border-white"
            } text-sm font-semibold capitalize text-left pl-3 `}
            onClick={() => setFilterName(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
