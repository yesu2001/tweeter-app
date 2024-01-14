"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import pic1 from "../assets/pic1.avif";
import cover1 from "../assets/cover1.avif";
import { createClient } from "@/utils/supabase/client";
import Avatar from "./Avatar";
import { fetchUser, updateUser } from "@/reducers/userSlice";

export default function EditProfile({ user }) {
  const [activeStep, setActiveStep] = useState(1);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userData);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: userInfo?.user_name || "",
    fullname: userInfo?.full_name || "",
    bio: userInfo?.bio || "",
    user_pic: userInfo?.user_pic || "",
    cover_pic: userInfo?.cover_pic || "",
  });

  useEffect(() => {
    dispatch(fetchUser({ userId: user?.id }));
    if (userInfo) {
      console.log(userInfo);
      console.log(true);
      setUserData((prevState) => ({
        ...prevState,
        username: userInfo?.user_name,
        fullname: userInfo?.full_name,
        bio: userInfo?.bio,
        user_pic: userInfo?.user_pic,
        cover_pic: userInfo?.cover_pic,
      }));
    }
  }, [dispatch]);

  const handleChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    setLoading(true);

    const updates = {
      id: userInfo.id,
      user_name: userData.username,
      user_pic: userData.user_pic,
      bio: userData.bio,
      cover_pic: userData.cover_pic,
      full_name: userData.fullname,
    };

    dispatch(updateUser({ userData: updates }));

    setLoading(false);
  };

  const renderStepComponent = (step) => {
    switch (step) {
      case 1:
        return <StepOne userData={userData} handleChange={handleChange} />;
      case 2:
        return (
          <StepTwo
            userData={userData}
            handleChange={handleChange}
            setUserData={setUserData}
          />
        );
      default:
        return <StepOne userData={userData} handleChange={handleChange} />;
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-start md:flex-row md:mx-56 gap-4">
      <div className="flex-[0.3] bg-white rounded-md py-4">
        <p className="text-[#828282] px-4">Update Profile </p>
        <div className="mt-3 text-sm space-y-2">
          <p
            className={`${
              activeStep === 1
                ? "border-l-4 border-[#2F80ED]"
                : "border-l-4 border-white"
            } px-4`}
          >
            Basic Info
          </p>
          <p
            className={`${
              activeStep === 2
                ? "border-l-4 border-[#2F80ED]"
                : "border-l-4 border-white"
            } px-4`}
          >
            Edit Picture
          </p>
        </div>
      </div>
      <div className="relative flex-[0.7] h-[420px]  bg-white p-4 rounded-md">
        <form onSubmit={updateProfile}>
          {renderStepComponent(activeStep)}
          <div className="absolute bottom-3 right-6 flex items-center gap-8">
            {activeStep > 1 && <button onClick={handlePrev}>Back</button>}
            {activeStep === 2 ? (
              <input
                type="submit"
                value={"Submit"}
                className="bg-[#2F80ED] text-white px-2 py-1 rounded-md"
              />
            ) : (
              <button
                onClick={handleNext}
                className="text-[#2F80ED] font-semibold"
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

const StepOne = ({ userData, handleChange }) => {
  return (
    <div>
      <p className="text-slate-500">Enter Your Basic Details</p>
      <div className="my-3 mb-8 flex flex-col space-y-4">
        <input
          name="username"
          value={userData.username}
          onChange={handleChange}
          type="text"
          placeholder="Enter A Unique Username"
          className="py-1 w-full px-2 rounded-md border border-slate-400 outline-none"
        />
        <input
          name="fullname"
          value={userData.fullname}
          onChange={handleChange}
          type="text"
          placeholder="Enter Your Full Name"
          className="py-1 w-full px-2 rounded-md border border-slate-400 outline-none"
        />
        <textarea
          rows={3}
          name="bio"
          value={userData.bio}
          onChange={handleChange}
          type="text"
          placeholder="Write about yourself"
          className="resize-none py-1 w-full px-2 rounded-md border border-slate-400 outline-none"
        />
      </div>
    </div>
  );
};

const StepTwo = ({ userData, setUserData }) => {
  // const [images, setImages] = useState({
  //   profilePic: pic1,
  //   coverPic: cover1,
  // });

  return (
    <div className="mb-12">
      <p className="text-slate-500">
        Upload your Profile picture and Cover picture
      </p>
      <div className="my-3 space-y-4">
        <Avatar url={userData.user_pic} size={100} setUserData={setUserData} />
      </div>
    </div>
  );
};
// {/* <div className="flex flex-col gap-2">
//   <UploadPicture
//     pic={images.profilePic}
//     name={"profilePic"}
//     setImages={setImages}
//   />
// </div>
// <div>
//   <UploadPicture
//     pic={images.coverPic}
//     name={"coverPic"}
//     setImages={setImages}
//   />
// </div> */}

// const UploadPicture = ({ pic, name, setImages }) => {
//   const [profileImage, setProfileImage] = useState(pic);

//   async function storeIMageinDB(file) {
//     const supabase = createClient();
//     const filesample = file;
//     const fileExt = filesample.name.split(".").pop();
//     const filePath = `${Math.random()}.${fileExt}`;

//     const { data, error } = await supabase.storage
//       .from("avatars")
//       .upload(filePath, file);

//     console.log(error);
//     console.log(data);
//   }

//   const handleImageChange = (event) => {
//     const selectedFile = event.target.files[0];
//     console.log(name);
//     storeIMageinDB(selectedFile);
//     const reader = new FileReader();

//     console.log(event.target.name);
//     reader.onload = (e) => {
//       setProfileImage(e.target.result);
//       setImages((prevState) => ({
//         ...prevState,
//         [event.target.name]: e.target.result,
//       }));
//     };

//     reader.readAsDataURL(selectedFile);
//   };

//   return (
//     <div className="flex gap-4 relative m-3">
//       <div
//         className="cursor-pointer"
//         onClick={() => {
//           document.getElementById("profile-picture-input").click();
//         }}
//       >
//         <input
//           name={name === "profilePic" ? "coverPic" : "profilePic"}
//           type="file"
//           id="profile-picture-input"
//           accept="image/*"
//           onChange={handleImageChange}
//           style={{ display: "none" }}
//         />
//         <div className="rounded-xl h-full w-40 flex items-center justify-center p-2 border border-dashed border-slate-600">
//           <p className="text-slate-400 text-center">Upload {name} picture</p>
//         </div>
//       </div>
//       <Image
//         src={profileImage}
//         alt="Profile Picture"
//         width={name === "coverPic" ? 400 : 100}
//         height={name === "coverPic" ? 50 : 100}
//         className={`rounded-2xl ${
//           name === "coverPic" ? "h-[150px]" : "h-[100px]"
//         } object-center object-cover`}
//       />
//     </div>
//   );
// };
