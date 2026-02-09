import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utills/constant";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: "",
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // 🔹 Input handler
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // 🔹 Fetch job data
  const fetchJob = async () => {
    try {
      setFetching(true);
      const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        const job = res.data.job;

        setInput({
          title: job.title || "",
          description: job.description || "",
          requirements: job.requirements?.join(", ") || "",
          salary: job.salary || "",
          location: job.location || "",
          jobType: job.jobType || "",
          experienceLevel: job.experienceLevel || "",
          position: job.position || "",
          companyId: job.company?._id || "",
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch job");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  // 🔹 Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      title: input.title,
      description: input.description,
      requirements: input.requirements
        .split(",")
        .map((r) => r.trim()),
      salary: Number(input.salary),
      location: input.location,
      jobType: input.jobType,
      experienceLevel: Number(input.experienceLevel),
      position: Number(input.position),
      company: input.companyId,
    };

    try {
      setLoading(true);
      const res = await axios.put(`${JOB_API_END_POINT}/update/${id}`, payload, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  return (
     <div className="flex justify-center my-10 px-4 sm:px-6 lg:px-8">
    <form
      onSubmit={submitHandler}
      className="p-6 sm:p-8 w-full max-w-4xl border shadow-md rounded-md bg-white"
    >
      {/* Back Button */}
      <Button
        type="button"
        onClick={() => navigate("/admin/jobs")}
        variant="outline"
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft size={16} /> Back
      </Button>

      {/* Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Title</Label>
            <Input name="title" value={input.title} onChange={changeEventHandler} />
          </div>

          <div>
            <Label>Description</Label>
            <Input name="description" value={input.description} onChange={changeEventHandler} />
          </div>

          <div>
            <Label>Requirements (comma separated)</Label>
            <Input name="requirements" value={input.requirements} onChange={changeEventHandler} />
          </div>

          <div>
            <Label>Salary</Label>
            <Input type="number" name="salary" value={input.salary} onChange={changeEventHandler} />
          </div>

          <div>
            <Label>Location</Label>
            <Input name="location" value={input.location} onChange={changeEventHandler} />
          </div>

          <div>
            <Label>Job Type</Label>
            <Input name="jobType" value={input.jobType} onChange={changeEventHandler} />
          </div>

          <div>
            <Label>Experience Level (years)</Label>
            <Input type="number" name="experienceLevel" value={input.experienceLevel} onChange={changeEventHandler} />
          </div>

          <div>
            <Label>Open Positions</Label>
            <Input type="number" name="position" value={input.position} onChange={changeEventHandler} />
          </div>

          {companies.length > 0 && (
                      <div className="sm:col-span-2">

            <Select 
            onValueChange={(value) => setInput({ ...input, companyId: value })} 
            value={input.companyId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Company" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white border border-grey-700">
                <SelectGroup>
                  {companies.map((company) => (
                    <SelectItem className=" text-white  focus:bg-gray-800  focus:text-white  hover:bg-gray-800" key={company._id} value={company._id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            </div>
          )}
        </div>

        <Button type="submit" className="w-full mt-6  bg-gradient-to-r from-blue-600 to-indigo-600
                      text-white py-3 rounded-xl
                      hover:scale-[1.02] hover:shadow-lg transition" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4  bg-gradient-to-r from-blue-600 to-indigo-600
                      text-white py-3 rounded-xl
                      hover:scale-[1.02] hover:shadow-lg transition animate-spin" /> Updating...
            </>
          ) : (
            "Update Job"
          )}
        </Button>
      </form>
    </div>
  );
};

export default EditJob;
