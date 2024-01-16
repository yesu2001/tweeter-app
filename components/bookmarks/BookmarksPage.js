"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filters from "../explore/Filters";
import Posts from "../home/Posts";
import Loader from "../Loader";
import { fetchUser } from "@/reducers/userSlice";
import { fetchPosts } from "@/reducers/postSlice";

export default function BookmarksPage({ userData }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const userInfo = useSelector((state) => state.user.userData);
  const posts = useSelector((state) => state.posts.posts);
  const filters = ["tweets", "tweets & replies", "media", "likes"];

  useEffect(() => {
    dispatch(fetchUser({ userId: userData.id }));
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="flex-1 w-full flex flex-col md:flex-row gap-8 mx-4 md:mx-60 my-6">
      <div className="flex-[0.3]">
        <Filters filters={filters} defaultFilter={"tweets"} />
      </div>
      <div className="flex-[0.7] flex flex-col space-y-4">
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
