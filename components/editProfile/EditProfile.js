"use client";
import React, { useState } from "react";
import pic1 from "../assets/pic1.avif";

export default function EditProfile() {
  const [activeStep, setActiveStep] = useState(1);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };

  const renderStepComponent = (step) => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      default:
        return <StepOne />;
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-start md:flex-row md:mx-56 gap-4">
      <div className="flex-[0.2] bg-white rounded-md py-4">
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
      <div className="relative flex-[0.8] bg-white p-4 rounded-md">
        <form>
          {renderStepComponent(activeStep)}
          <div className="absolute bottom-3 right-6 flex items-center gap-3">
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

const StepOne = () => {
  return (
    <div>
      <p className="text-slate-500">Enter Your Basic Details</p>
      <div className="my-3 mb-8 flex flex-col space-y-4">
        <input
          name="username"
          type="text"
          placeholder="Enter A Unique Username"
          className="py-1 w-full px-2 rounded-md border border-slate-400 outline-none"
        />
        <input
          name="fullname"
          type="text"
          placeholder="Enter Your Full Name"
          className="py-1 w-full px-2 rounded-md border border-slate-400 outline-none"
        />
        <textarea
          rows={3}
          name="bio"
          type="text"
          placeholder="Write about yourself"
          className="resize-none py-1 w-full px-2 rounded-md border border-slate-400 outline-none"
        />
      </div>
    </div>
  );
};

const StepTwo = () => {
  return (
    <div className="mb-8">
      <p className="text-slate-500">
        Upload your Profile picture and Cover picture
      </p>
      <div className="my-3 space-y-4">
        <div className="flex flex-col gap-2">
          <label>Upload Profile Picture</label>
          <div>
            <input type="file" />
          </div>
        </div>
        <div>
          <label>Upload Cover Picture</label>
          <div>
            <input type="file" />
          </div>
        </div>
      </div>
    </div>
  );
};
