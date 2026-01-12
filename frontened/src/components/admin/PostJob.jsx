import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "@/utills/axiosInstance";
import { JOB_API_END_POINT } from "@/utills/constant";
import { toast } from "sonner";

const PostJob = () => {
    const navigate = useNavigate();

    const { allCompanies: companies } = useSelector(
        (store) => store.company
    );

    const [loading, setLoading] = useState(false);

    const [input, setInput] = useState({
        title: "",
        description: "",
        qualifications: "",
        responsibilities: "",
        salary: "",
        location: "",
        jobType: "",
        experienceLevel: "",
        position: "",
        companyId: "",
    });

    // text input handler
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // company select handler 
    const selectChangeHandler = (value) => {
        setInput({ ...input, companyId: value });
    };

    // submit job
    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.companyId) {
            toast.error("Please select a company");
            return;
        }

        if (!input.experienceLevel) {
            toast.error("Experience is required");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                title: input.title,
                description: input.description,
                qualifications: input.qualifications,
                responsibilities: input.responsibilities,
                salary: Number(input.salary),
                location: input.location,
                jobType: input.jobType,
                experience: Number(input.experienceLevel),
                position: Number(input.position),
                companyId: input.companyId, 
            };

            console.log("POST JOB PAYLOAD 👉", payload);

            const res = await axios.post("/job/post", payload);

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Job creation failed");
        } finally {
            setLoading(false);
        }
    };






    return (
        <div className="flex items-center justify-center w-screen my-6">
            <form
                onSubmit={submitHandler}
                className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md w-full"
            >
                {/* Header */}
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
                    <h1 className="text-xl font-bold">Post New Job</h1>
                </div>

                {/* Form */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label>Title</Label>
                        <Input name="title" value={input.title} onChange={changeEventHandler} className="bg-white text-black border border-blue-500" />
                    </div>

                    <div>
                        <Label>Description</Label>
                        <Input name="description" value={input.description} onChange={changeEventHandler} className="w-full bg-white text-black border border-blue-500" />
                    </div>

                    <div>
                        <Label>Qualifications</Label>
                        <Input name="qualifications" value={input.qualifications} onChange={changeEventHandler} className="bg-white text-black border border-blue-500" />
                    </div>

                    <div>
                        <Label>Responsibilities</Label>
                        <Input name="responsibilities" value={input.responsibilities} onChange={changeEventHandler}
                            className="bg-white text-black border border-blue-500" />
                    </div>

                    <div>
                        <Label>Salary</Label>
                        <Input name="salary" value={input.salary} onChange={changeEventHandler}
                            className="bg-white text-black border border-blue-500"
                        />
                    </div>

                    <div>
                        <Label>Location</Label>
                        <Input name="location" value={input.location} onChange={changeEventHandler}
                            className="bg-white text-black border border-blue-500" />
                    </div>

                    <div>
                        <Label>Job Type</Label>
                        <Input name="jobType" value={input.jobType} onChange={changeEventHandler} className="bg-white text-black border border-blue-500" />
                    </div>

                    <div>
                        <Label>Experience Level</Label>
                        <Input
                            type="number"
                            name="experienceLevel"
                            value={input.experienceLevel}
                            onChange={changeEventHandler}
                            className="bg-white text-black border border-blue-500"
                        />


                    </div>

                    <div>
                        <Label>No of Positions</Label>
                        <Input
                            type="number"
                            name="position"
                            value={input.position}
                            onChange={changeEventHandler}
                            className="bg-white text-black border border-blue-500"
                        />
                    </div>

                    {/* Company Select */}
                    {companies?.length > 0 && (
                        <div>
                            <Label className="text-black">Company</Label>
                            <Select onValueChange={selectChangeHandler}>
                                <SelectTrigger className="bg-white text-black border border-blue-500">
                                    <SelectValue placeholder="Select a Company" />
                                </SelectTrigger>
                                <SelectContent className="bg-black text-black border border-grey-700">
                                    <SelectGroup>
                                        {companies.map((company) => (
                                            <SelectItem className="text-white  focus:bg-gray-800  focus:text-white hover:bg-gray-800"
                                                key={company._id} value={company._id}>
                                                {company.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>

                {/* Submit */}
                {loading ? (
                    <Button disabled className="w-full my-4">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button>
                ) : (
                    <Button type="submit" className="w-full my-4  bg-gradient-to-r from-blue-600 to-indigo-600
                      text-white py-3 rounded-xl
                      hover:scale-[1.02] hover:shadow-lg transition ">
                        Post New Job
                    </Button>
                )}

                {/* Warning */}
                {companies?.length === 0 && (
                    <p className="text-xs text-red-600 font-bold text-center mt-2">
                        *Please register a company first before posting a job
                    </p>
                )}
            </form>
        </div>
    );
};

export default PostJob;
