"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Posts from "../home/Posts";
import Loader from "../Loader";
import { fetchUser } from "@/reducers/userSlice";
import { fetchPosts } from "@/reducers/postSlice";
import Filters from "./Filters";
import Search from "./Search";
import { redirect } from "next/navigation";

export default function ExplorePage({ userData }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const userInfo = useSelector((state) => state.user.userData);
  const posts = useSelector((state) => state.posts.posts);
  const filters = ["top", "latest", "people", "media"];

  useEffect(() => {
    if (!userData) {
      redirect("/login");
    }
  }, []);

  useEffect(() => {
    dispatch(fetchUser({ userId: userData?.id }));
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="flex-1 w-full flex flex-col md:flex-row gap-8 mx-4 md:mx-60 my-6">
      <div className="flex-[0.3]">
        <Filters filters={filters} defaultFilter={"top"} />
      </div>
      <div className="flex-[0.7] flex flex-col space-y-4">
        <Search />
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader size="md" />
          </div>
        ) : (
          <Posts posts={posts} userInfo={userInfo} />
        )}
      </div>
    </div>
  );
}
