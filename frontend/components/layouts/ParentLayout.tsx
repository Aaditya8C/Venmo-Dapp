"use client";
import React from "react";
import LeftSection from "../sections/LeftSection";
import RightSection from "../sections/RightSection";

const ParentLayout = () => {
  return (
    <div className="grid grid-cols-2 gap-20 py-20 w-[80%] m-auto">
      <LeftSection />
      <RightSection />
    </div>
  );
};

export default ParentLayout;
