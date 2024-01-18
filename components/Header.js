"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdClose } from "react-icons/io";
import { RiAccountCircleFill, RiLogoutBoxRFill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import desktopLogo from "./assets/tweeter.svg";
import mobileLogo from "./assets/tweeter-small.svg";
import profilePic from "./assets/pic.avif";
import { redirect, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Loader from "./Loader";
import defaultPic from "../components/assets/defaultPic.png";
import { fetchUser, signOutUser } from "@/reducers/userSlice";

export default function Header() {
  const path = usePathname();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userData);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  async function checkuser() {
    setLoading(true);
    const supabase = createClient();
    const { data: user } = await supabase.auth.getUser();
    dispatch(fetchUser({ userId: user?.user?.id }));
    setUserData(user);
    setLoading(false);
  }

  useEffect(() => {
    checkuser();
  }, [dispatch]);

  async function signout() {
    dispatch(signOutUser());
  }

  const isAuthenticated = false;
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div
      className={` ${
        path === "/login" ? "hidden" : "flex"
      } justify-between px-4 md:px-16 bg-white `}
    >
      <div className="py-3 flex items-center">
        <Image
          src={desktopLogo}
          alt="desktop logo"
          width={100}
          height={70}
          className="hidden md:block"
        />
        <Image
          src={mobileLogo}
          alt="Mobile logo"
          width={50}
          height={50}
          className="md:hidden"
          onClick={openDrawer}
        />
        <Drawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          isAuthenticated={isAuthenticated}
        />
      </div>
      <div className="hidden md:flex">
        <NavLink userData={userData} />
      </div>
      <div className="relative py-3 flex gap-2 items-center">
        {loading && <Loader size="sm" />}
        {userData ? (
          <div className="flex items-center gap-2">
            <Image
              src={userData?.user_pic || defaultPic}
              alt="profile pic"
              width={40}
              height={40}
              className="rounded-xl"
            />
            <p className="hidden md:block font-semibold">
              {userInfo?.user_name || userInfo?.user_email}
            </p>
            {openDropdown ? (
              <button onClick={() => setOpenDropdown(false)}>
                <IoMdArrowDropup size={25} />
              </button>
            ) : (
              <button onClick={() => setOpenDropdown(true)}>
                <IoMdArrowDropdown size={25} />
              </button>
            )}
          </div>
        ) : (
          <Link href={"/login"}>SignIn</Link>
        )}
        {openDropdown && (
          <DropDown onClose={() => setOpenDropdown(false)} signout={signout} />
        )}
      </div>
    </div>
  );
}

const DropDown = ({ onClose, signout }) => {
  return (
    <div
      className="absolute top-12 right-3 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 "
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      <div className="py-1" role="none">
        <Link
          href="/profile"
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
          <RiAccountCircleFill size={20} />
          Profile
        </Link>
        <Link
          href="/profile/edit"
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
          <FaUserEdit size={20} />
          Edit Profile
        </Link>
        <Link
          href="/login"
          onClick={() => {
            onClose();
            signout();
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm text-[#EB5757] hover:bg-gray-100"
        >
          <RiLogoutBoxRFill size={20} />
          Logout
        </Link>
      </div>
    </div>
  );
};

const Drawer = ({ isOpen, onClose, userData }) => {
  return (
    <div
      className={`fixed inset-0 overflow-hidden transition-transform ease-in-out duration-300 ${
        isOpen ? "translate-x-[-50%]" : "translate-x-[-100%]"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden z-40">
        <div className="fixed inset-y-0 right-0 max-w-[50%] flex">
          {/* Drawer panel */}
          <div className="relative w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              {/* Header */}
              <div className="flex-shrink-0">
                {/* Add your header content here */}
                <div className="px-4 py-6 bg-gray-800 text-white">
                  <button className="absolute top-2 right-2" onClick={onClose}>
                    <IoMdClose size={20} />
                  </button>
                  <Image
                    src={mobileLogo}
                    alt="Mobile logo"
                    width={50}
                    height={50}
                    className="md:hidden"
                  />
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 relative px-4 py-6">
                {/* Add your drawer content here */}
                <NavLink userData={userData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavLink = ({ userData }) => {
  const path = usePathname();
  return (
    <div className="flex flex-col md:flex-row mt-4 gap-3 md:gap-16 text-[#828282]">
      <Link
        href={"/"}
        className={`${
          path === "/" ? "text-[#2F80ED] border-b-4 border-[#2F80ED]" : ""
        } `}
      >
        Home
      </Link>
      <Link
        href={"/explore"}
        className={`${
          path === "/explore"
            ? "text-[#2F80ED] border-b-4 border-[#2F80ED]"
            : ""
        } `}
      >
        Explore
      </Link>
      {userData && (
        <Link
          href={"/bookmarks"}
          className={`${
            path === "/bookmarks"
              ? "text-[#2F80ED] border-b-4 border-[#2F80ED]"
              : ""
          } `}
        >
          Bookmarks
        </Link>
      )}
    </div>
  );
};
