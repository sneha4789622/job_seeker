// // // FEATURES SECTION--------------------------------------------


import React from "react";
import { Badge } from "./ui/badge";

const JobFeatures = ({ job }) => {
  if (!job) return null;

  const loginAlert = () => {
    alert("Login first");
  };

  return (
    <div className="text-white shadow-lg rounded-md w-80 p-5 bg-blue-950  cursor-pointer">
      
      {/* Job Info */}
      <div className="mb-4">
        <h1 className="font-bold text-lg">{job.title}</h1>
        <p className="text-sm">
          {job.company}<br />
          {job.location}<br />
          {job.experience}
        </p>
      </div>

      {/* ✅ BADGES */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          12 Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          Part Time
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          12 LPA
        </Badge>
      </div>

      {/* Apply Button */}
      <button
        onClick={loginAlert}
        className="w-full rounded-full bg-white text-blue-950 py-2 font-semibold hover:bg-gray-200"
      >
        Apply
      </button>
    </div>
  );
};

export default JobFeatures;
