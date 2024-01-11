"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
import Trends from "./Trends";
import Reccomend from "./Reccomend";
import Loader from "../Loader";
import { fetchUser } from "@/reducers/userSlice";

export default function HomaPage({ userData }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const userInfo = useSelector((state) => state.user.userData);

  useEffect(() => {
    dispatch(fetchUser({ userId: userData.id }));
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <div className="flex w-full my-60 justify-center">
          <Loader size="lg" />
        </div>
      ) : (
        <div className="flex-1 w-full flex gap-4 mx-4 md:mx-60 my-6">
          <div className="flex-[0.7] space-y-6">
            <CreatePost />
            <Posts />
          </div>
          <div className="hidden md:block flex-[0.3] space-y-6">
            <Trends />
            <Reccomend />
          </div>
        </div>
      )}
    </>
  );
}
