import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const JobFeatures = ({ job }) => {
  const navigate = useNavigate();
  if (!job) return null;

  return (
    <div
      className="
        w-full max-w-sm
        bg-gradient-to-br from-blue-950 to-indigo-900
        text-white rounded-xl p-6
        shadow-md hover:shadow-xl
        hover:-translate-y-1
        transition-all duration-300
        cursor-pointer
      "
    >
      {/* Company Info */}
      <div className="mb-4">
        <h1 className="font-semibold text-lg">
          {job?.company?.name}
        </h1>

        <p className="text-xs text-gray-300 mt-1">
          {job.location}  {job.experience}
        </p>
      </div>

      {/* Job Title */}
      <h2 className="font-bold text-xl mb-2 text-indigo-200">
        {job?.title}
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-300 mb-4 line-clamp-3">
        {job?.description}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-5">
        <Badge className="bg-white/10 text-white border border-white/20">
          {job?.position} Positions
        </Badge>

        <Badge className="bg-red-500/10 text-red-400 border border-red-500/30">
          {job?.jobType}
        </Badge>

        <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/30">
          {job.salary >= 1000 ? job.salary / 1000 : job.salary} LPA
        </Badge>
      </div>

      {/* Button */}
      <button
        onClick={() => navigate(`/description/${job._id}`)}
        className="
          w-full py-2 rounded-full
          bg-white text-blue-950
          font-semibold
          hover:bg-indigo-100
          transition
        "
      >
        View Details
      </button>
    </div>
  );
};

export default JobFeatures;
