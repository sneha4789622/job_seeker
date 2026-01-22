import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utills/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isApplied =
    singleJob?.applications?.some(
      (app) =>
        String(app?.applicant?._id || app?.applicant) ===
        String(user?._id)
    ) || false;

  const [loading, setLoading] = useState(false);

  //  Salary formatter
  const formatSalary = (salary) =>
    salary >= 100000 ? `${(salary / 100000).toFixed(1)} LPA` : salary;

  //  APPLY JOB
  const applyJobHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [
              ...singleJob.applications,
              { applicant: user?._id },
            ],
          })
        );
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to apply");
    } finally {
      setLoading(false);
    }
  };

  //  FETCH JOB
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchJob();
  }, [jobId, dispatch]);

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={singleJob?.company?.logo}
            alt="company-logo"
            className="w-16 h-16 rounded-lg border object-contain"
          />
          <div>
            <h1 className="text-2xl font-bold">{singleJob?.title}</h1>
            <p className="text-gray-600">
              {singleJob?.company?.name} • {singleJob?.location}
            </p>
          </div>
        </div>

        <Button
  disabled={isApplied || loading}
  onClick={applyJobHandler}
  className={`px-6 transition ${
    isApplied
      ? "bg-slate-400 cursor-not-allowed text-black"
      : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white"
  }`}
>
  {isApplied ? "Already Applied" : loading ? "Applying..." : "Apply Now"}
</Button>

      </div>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2 mt-6">
        <Badge variant="ghost" className="font-bold text-blue-700">
          {singleJob?.jobType}
        </Badge>
        <Badge variant="ghost" className="font-bold text-green-700">
          {formatSalary(singleJob?.salary)}
        </Badge>
        <Badge variant="ghost" className="font-bold text-purple-700">
          {singleJob?.experienceLevel} yrs experience
        </Badge>
        <Badge variant="ghost" className="font-bold text-orange-700">
          {singleJob?.position} Openings
        </Badge>
      </div>

      {/* DESCRIPTION */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Job Description</h2>
        <p className="text-gray-700 leading-relaxed">
          {singleJob?.description}
        </p>
      </section>

      {/* REQUIREMENTS */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Requirements</h2>
        <div className="flex flex-wrap gap-2">
          {singleJob?.requirements?.map((req, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-sm bg-slate-100 border rounded-full text-gray-700"
            >
              {req.replace(/"/g, "")}
            </span>
          ))}
        </div>
      </section>

      {/* META */}
      <div className="mt-6 text-sm text-gray-500">
        <p>Total Applicants: {singleJob?.applications?.length}</p>
        <p>
          Posted on:{" "}
          {singleJob?.createdAt &&
            new Date(singleJob.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
