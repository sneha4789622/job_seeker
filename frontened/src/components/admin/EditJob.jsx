import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import axios from "@/utills/axiosInstance";
import { JOB_API_END_POINT } from "@/utills/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { ArrowLeft } from "lucide-react";


const EditJob = () => {
    useGetAllCompanies();
  const { id } = useParams();
  const navigate = useNavigate();

const { allCompanies: companies } = useSelector(store => store.company);

  const [input, setInput] = useState({
    title: "",
    description: "",
    qualifications: "",
    responsibilities: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: ""
  });

  // 🔹 FETCH JOB
  useEffect(() => {
    
    const fetchJob = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.put(
  `/job/update/${jobId}`,
  payload
);

        if (res.data.success) {
          const job = res.data.job;

          setInput({
            title: job.title,
            description: job.description,
            qualifications: job.qualifications,
            responsibilities: job.responsibilities,
            salary: job.salary,
            location: job.location,
            jobType: job.jobType,
            experience: job.experience,
            position: job.position,
            companyId: job.company?._id
          });
        }
      } catch (err) {
        toast.error("Failed to load job");
      }
    };
    console.log("SELECTED COMPANY ID ", input.companyId);
console.log("ALL COMPANIES  ", companies);

    fetchJob();
  }, [id]);

  // 🔹 INPUT CHANGE
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // 🔹 COMPANY SELECT
  const companyChangeHandler = (value) => {
    setInput({ ...input, companyId: value });
  };

  // 🔹 UPDATE JOB
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.companyId) {
      toast.error("Please select a company");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const payload = {
        ...input,
        salary: Number(input.salary),
        position: Number(input.position)
      };

      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (res.data.success) {
        toast.success("Job updated successfully");
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  return (
    
        <div className="flex items-center justify-center w-screen my-6">
      <form onSubmit={submitHandler} 
                className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md w-full">
                                  <div className="flex items-center gap-4 mb-6">
                                    <Button
                        type="button"
                        onClick={() => navigate("/admin/jobs")}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft />
                        Back
                    </Button>
                    <h1 className="text-xl font-bold">Edit Job</h1>
                </div>
                <div className="grid grid-cols-2 gap-4">


        <Label>Title</Label>
        <Input name="title" value={input.title} onChange={changeHandler} className="bg-white text-black border border-blue-500" />

        <Label>Description</Label>
        <Input name="description" value={input.description} onChange={changeHandler} className="bg-white text-black border border-blue-500" />

        <Label>Qualifications</Label>
        <Input name="qualifications" value={input.qualifications} onChange={changeHandler} className="bg-white text-black border border-blue-500" />

        <Label>Responsibilities</Label>
        <Input name="responsibilities" value={input.responsibilities} onChange={changeHandler} className="bg-white text-black border border-blue-500" />

        <Label>Salary</Label>
        <Input name="salary" value={input.salary} onChange={changeHandler} className="bg-white text-black border border-blue-500" />

        <Label>Location</Label>
        <Input name="location" value={input.location} onChange={changeHandler} className="bg-white text-black border border-blue-500" />

        <Label>Job Type</Label>
        <Input name="jobType" value={input.jobType} onChange={changeHandler} className="bg-white text-black border border-blue-500" />

        <Label>Experience</Label>
        <Input name="experience" value={input.experience} onChange={changeHandler} className="bg-white text-black border border-blue-500"/>

        <Label>Position</Label>
        <Input name="position" value={input.position} onChange={changeHandler} className="bg-white text-black border border-blue-500" />

        {/* ✅ SELECT COMPANY */}
        {companies?.length > 0 && (
  <div>
    <Label>Company</Label>

    <Select
    key={input.companyId}
      value={input.companyId}
      onValueChange={companyChangeHandler}
    >
      <SelectTrigger className="bg-white text-black border border-blue-500">
        <SelectValue placeholder="Select a Company" />
      </SelectTrigger>

      <SelectContent className="bg-black text-white border border-grey-700">
        {companies.map(company => (
          <SelectItem className="
              text-white 
              focus:bg-gray-800 
              focus:text-white 
              hover:bg-gray-800
            " key={company._id} value={company._id}>
            {company.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
  

)}
</div>


        <Button type="submit" className="w-full my-4  bg-gradient-to-r from-blue-600 to-indigo-600
                      text-white py-3 rounded-xl
                      hover:scale-[1.02] hover:shadow-lg transition">
          Update Job
        </Button>
      </form>
    </div>
    
  );
};



export default EditJob;
