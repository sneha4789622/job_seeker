import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utills/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2 } from 'lucide-react'

const companyArray = [];

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="flex justify-center my-5 px-3 sm:px-6">
                <form onSubmit={submitHandler}
                    className="w-full max-w-4xl p-4 sm:p-8 border border-gray-200 shadow-lg rounded-md">
                    {/* Back Button */}
                    <div className="flex items-center mb-6">
                        <Button
                            onClick={() => navigate("/admin/companies")}
                            variant="outline"
                            className="flex items-center gap-2 text-gray-500 font-semibold"
                        >
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                    </div>
                    {/* Form Fields */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="w-full px-4 py-2
                                            rounded-lg
                                            border border-blue-500
                                            focus:ring-2 focus:ring-blue-400
                                            outline-none"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="w-full px-4 py-2
                                            rounded-lg
                                            border border-blue-500
                                            focus:ring-2 focus:ring-blue-400
                                            outline-none"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="w-full px-4 py-2
                                            rounded-lg
                                            border border-blue-500
                                            focus:ring-2 focus:ring-blue-400
                                            outline-none"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="w-full px-4 py-2
                                            rounded-lg
                                            border border-blue-500
                                            focus:ring-2 focus:ring-blue-400
                                            outline-none"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="w-full px-4 py-2
                                            rounded-lg
                                            border border-blue-500
                                            focus:ring-2 focus:ring-blue-400
                                            outline-none"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="w-full px-4 py-2
                                            rounded-lg
                                            border border-blue-500
                                            focus:ring-2 focus:ring-blue-400
                                            outline-none"

                            />

                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="w-full px-4 py-2
                                            rounded-lg
                                            border border-blue-500
                                            focus:ring-2 focus:ring-blue-400
                                            outline-none"
                            />
                        </div>
                        <div>
                            <Label>No of Postion</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="w-full px-4 py-2 rounded-lg border
                                  border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none" />
                        </div>
                        {/* Company Select */}

                        {
                            companies.length > 0 && (
                                <div className="sm:col-span-2">

                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-full border-blue-500">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-black text-black border border-grey-700" >
                                            <SelectGroup>
                                                {
                                                    companies.map((company) => {
                                                        return (
                                                            <SelectItem className="text-white  focus:bg-gray-800  focus:text-white hover:bg-gray-800"
                                                                value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                        )
                                                    })
                                                }

                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )
                        }
                    </div>
                    {
                        loading ? <Button className="w-full my-4 bg-gradient-to-r from-blue-600 to-indigo-600
                      text-white py-3 rounded-xl hover:scale-[1.02] hover:shadow-lg transition "> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4 bg-gradient-to-r from-blue-600 to-indigo-600
                      text-white py-3 rounded-xl hover:scale-[1.02] hover:shadow-lg transition ">Post New Job</Button>
                    }
                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a jobs</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob