"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaRegCommentAlt,
  FaRetweet,
  FaRegHeart,
  FaRegBookmark,
} from "react-icons/fa";
import { IoClose, IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { parseAndFormatDate } from "@/utils/clientHelpers";
import Loader from "../Loader";
import {
  addComment,
  likePost,
  retweetPost,
  savePost,
} from "@/reducers/postSlice";
import {
  checkLikedByUser,
  checkRetweetedByUser,
  checkSavedByUser,
  fetchCommentsFromDB,
} from "@/utils/dbcalls/postApi";

export default function Post({ post, userInfo }) {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const isLoading = false;
  const [showComment, setShowComment] = useState(false);
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [retweet, setRetweet] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const isRetweeted = await checkRetweetedByUser(post, userInfo);
      setRetweet(isRetweeted);
      const isLiked = await checkLikedByUser(post, userInfo);
      setLike(isLiked);
      const isSaved = await checkSavedByUser(post, userInfo);
      console.log(isSaved);
      setSave(isSaved);
      const { data, error } = await fetchCommentsFromDB(post?.id);
      if (error) {
        console.log("Error while fetching comments", error);
      }
      setComments(data);
    };

    fetchComments();
  }, [dispatch, post]);

  const handleShowComments = () => {
    setShowComment(!showComment);
  };

  const handleLike = () => {
    if (!like) {
      const likeRef = {
        user_id: userInfo?.id,
        post_id: post?.id,
      };
      dispatch(likePost({ likeRef, method: "add" }));
      setLike(true);
    } else {
      console.log("retweet false");
      const likeRef = {
        user_id: userInfo?.id,
        post_id: post?.id,
      };
      dispatch(likePost({ likeRef, method: "delete" }));
      setLike(false);
    }
  };

  const handleRetweet = () => {
    if (!retweet) {
      const retweetRef = {
        user_id: userInfo?.id,
        post_id: post?.id,
      };
      dispatch(retweetPost({ retweetRef, method: "add" }));
      setRetweet(true);
    } else {
      console.log("retweet false");
      const retweetRef = {
        user_id: userInfo?.id,
        post_id: post?.id,
      };
      dispatch(retweetPost({ retweetRef, method: "delete" }));
      setRetweet(false);
    }
  };

  const handleSave = () => {
    const saveRef = {
      user_id: userInfo?.id,
      post_id: post?.id,
    };
    if (!save) {
      dispatch(savePost({ saveRef, method: "add" }));
      setSave(true);
    } else {
      console.log("Save false");
      dispatch(savePost({ saveRef, method: "delete" }));
      setSave(false);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    const commentMessage = {
      message,
      user_id: userInfo?.id,
      user_name: userInfo?.user_name,
      user_pic: userInfo?.user_pic,
      post_id: post?.id,
      created_at: new Date(),
    };
    dispatch(addComment(commentMessage));
    setComments((prevState) => [commentMessage, ...prevState]);
    setMessage("");
  };

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
          <p className="text-[#BDBDBD] text-xs">
            {parseAndFormatDate(post?.created_at)}
          </p>
        </div>
      </div>
      {/* post title */}
      <div className="my-4">
        <p className="text-[#4F4F4F]">{post?.caption}</p>
      </div>
      {/* post image */}
      {post?.post_pic && (
        <div className="h-[300px] w-full">
          <Image
            src={post?.post_pic}
            alt="cover image"
            width={300}
            height={300}
            className="h-full w-full  object-center object-contain"
          />
        </div>
      )}
      {/* post status counts */}
      <div className="flex items-center justify-end gap-3 p-2 text-sm text-[#BDBDBD]">
        <p>{post?.comments_array?.length || 0} Comments</p>
        <p>{post?.retweets_array?.length || 0} Retweets</p>
        <p>{post?.saved_array?.length || 0} Saved</p>
      </div>
      {/* post icons */}
      <div className="text-[#4F4F4F] px-2 flex items-center justify-around">
        <button
          className="flex items-center gap-2 hover:bg-[#F2F2F2] py-1 px-2 rounded-md "
          onClick={handleShowComments}
        >
          <FaRegCommentAlt />
          <p>Comment</p>
        </button>
        <button
          className={`flex items-center gap-2 hover:bg-[#F2F2F2] py-1 px-2 rounded-md ${
            retweet ? "text-[#27AE60]" : ""
          }`}
          onClick={handleRetweet}
        >
          <FaRetweet />
          <p>{retweet ? "Retweeted" : "Retweet"}</p>
        </button>
        <button
          className={`flex items-center gap-2 hover:bg-[#F2F2F2] py-1 px-2 rounded-md ${
            like ? "text-[#EB5757]" : ""
          }`}
          onClick={handleLike}
        >
          <FaRegHeart />
          <p>{like ? "Liked" : "Like"}</p>
        </button>
        <button
          className={`flex items-center gap-2 hover:bg-[#F2F2F2] py-1 px-2 rounded-md ${
            save ? "text-[#2D9CDB]" : ""
          }`}
          onClick={handleSave}
        >
          <FaRegBookmark />
          <p>{save ? "Saved" : "Save"}</p>
        </button>
      </div>
      {/* comment list modal */}
      {showComment && (
        <CommentsPopUp
          toggleModal={handleShowComments}
          comments={comments}
          isLoading={isLoading}
        />
      )}
      {/* comment input */}
      <div className="p-2">
        <form onSubmit={handleAddComment}>
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="tweet your reply"
              className="w-full py-1 px-2 outline-none"
            />
            <button type="submit">
              <IoSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const CommentsPopUp = ({ toggleModal, comments, isLoading }) => {
  return (
    <div
      className={`fixed z-50 inset-0
 
overflow-y-auto block`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white h-[500px] overflow-y-auto rounded-lg text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <button className="absolute top-2 right-2">
            <IoClose onClick={toggleModal} fontSize={25} />
          </button>
          <div className="bg-white w-full px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start w-full">
              <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Comments
                </h3>
                <div className="mt-2">
                  {isLoading ? (
                    <div className="w-full flex items-center justify-center my-8">
                      <Loader size="sm" />
                    </div>
                  ) : (
                    <div className="space-y-4 mt-6">
                      {comments?.length === 0 && (
                        <p className="text-center text-slate-500 my-8">
                          No comments
                        </p>
                      )}
                      {comments?.map((item) => (
                        <div className="flex gap-4" key={item?.comment_id}>
                          <div>
                            <Image
                              src={item?.user_pic}
                              alt="profile pic"
                              width={40}
                              height={40}
                              className="rounded-lg"
                            />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">
                              {item?.user_name} -{" "}
                              {parseAndFormatDate(item?.created_at)}
                            </p>
                            <p className="text-sm">{item?.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
