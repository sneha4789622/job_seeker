// // // FEATURES SECTION--------------------------------------------
<<<<<<< HEAD
import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const JobFeatures = ({ job }) => {
  const navigate = useNavigate();
  if (!job) return null;

  
  return (
    <div  className="text-white shadow-lg rounded-md w-80 p-5 bg-blue-950  cursor-pointer">
      
      {/* Job Info */}
      <div className="mb-4">
        <h1 className="font-bold text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">{job.location}</p>
         <p className="text-sm text-gray-500">{job.experience}</p>
        </div>
        <div>
      <h2 className="font-bold text-xl my-2">{job?.title}</h2>
      <p className="text-gray-500 mb-4 text-sm">{job?.description}</p>  
=======


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
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
      </div>

      {/* ✅ BADGES */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
<<<<<<< HEAD
          {job?.position } Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job.salary >= 1000 ? job.salary / 1000 : job.salary} LPA
=======
          12 Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          Part Time
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          12 LPA
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
        </Badge>
      </div>

      {/* Apply Button */}
      <button
<<<<<<< HEAD
        onClick={() => navigate(`/description/${job._id}`)}
        className="w-full rounded-full bg-white text-blue-950 py-2 font-semibold hover:bg-gray-200"
      >
        View Details
=======
        onClick={loginAlert}
        className="w-full rounded-full bg-white text-blue-950 py-2 font-semibold hover:bg-gray-200"
      >
        Apply
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
      </button>
    </div>
  );
};

export default JobFeatures;
