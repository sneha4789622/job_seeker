// import React, { useEffect, useState } from 'react'
// import { Badge } from './ui/badge'
// import { Button } from './ui/button'
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utills/constant';
// import { setSingleJob } from '@/redux/jobSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'sonner';

// const JobDescription = () => {
//     const { singleJob } = useSelector(store => store.job);
//     const { user } = useSelector(store => store.auth);
//     const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
//     const [isApplied, setIsApplied] = useState(isIntiallyApplied);

//     const params = useParams();
//     const jobId = params.id;
//     const dispatch = useDispatch();

//     const applyJobHandler = async () => {
//         try {
//             const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {}, { withCredentials: true });

//             if (res.data.success) {
//                 setIsApplied(true); // Update the local state
//                 const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
//                 dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
//                 toast.success(res.data.message);

//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         }
//     }

//     useEffect(() => {
//         const fetchSingleJob = async () => {
//             try {
//                 const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
//                 if (res.data.success) {
//                     dispatch(setSingleJob(res.data.job));
//                     setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) // Ensure the state is in sync with fetched data
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchSingleJob();
//     }, [jobId, dispatch, user?._id]);

//     return (
//         <div className='max-w-7xl mx-auto my-10'>
//             <div className='flex items-center justify-between'>
//                 <div>
//                     <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
//                     <div className='flex items-center gap-2 mt-4'>
//                         <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.position} Positions</Badge>
//                         <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
//                         <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary >= 1000 ? singleJob?.salary / 1000 : singleJob?.salary} LPA</Badge>
//                     </div>
//                 </div>
//                 <Button
//                     onClick={isApplied ? null : applyJobHandler}
//                     disabled={isApplied}
//                     className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
//                     {isApplied ? 'Already Applied' : 'Apply Now'}
//                 </Button>
//             </div>
//             <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
//             <div className='my-4'>
//                 <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
//                 <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
//                 <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
//                 <h1 className='font-bold my-1'>Experience:<span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel ? `${singleJob.experienceLevel} yrs`: "Not specified"}</span></h1>
//                 <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary >= 1000 ? singleJob?.salary / 1000 : singleJob?.salary} LPA</span></h1>
//                 <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
//                 <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
//             </div>
//         </div>
//     )
// }

// export default JobDescription

import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import axiosInstance from "@/utills/axiosInstance";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utills/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { getAppliedJobs } from "@/redux/applicationActions";


const JobDescription = () => {
    const dispatch = useDispatch()
    const { id: jobId } = useParams()

const { singleJob } = useSelector(store => store.job);
const { appliedJobs } = useSelector(store => store.application);
const { user } = useSelector(store => store.auth);




const isApplied = appliedJobs?.some(
  application => application.job?._id === jobId
);

// 🔥 NEW: appliedJobs loaded ya nahi
const appliedJobsLoaded = Array.isArray(appliedJobs);



    /* ================= FETCH JOB ================= */
//     useEffect(() => {
//   const fetchSingleJob = async () => {
//     try {
//       const res = await axios.get(
//         `${JOB_API_END_POINT}/get/${jobId}`,
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         dispatch(setSingleJob(res.data.job));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   fetchSingleJob();
// }, [jobId, dispatch]);
useEffect(() => {
  dispatch(getAppliedJobs());
}, [dispatch]);
    /* ================= APPLY JOB ================= */
 const applyJobHandler = async () => {
  try {
    const res = await axiosInstance.post(
      `${APPLICATION_API_END_POINT}/apply/${jobId}`,
      {}
    );

    toast.success(res.data.message);
    dispatch(getAppliedJobs()); // refresh applied jobs
  } catch (error) {
    toast.error(error.response?.data?.message || "Apply failed");
  }
};



    return (
        <div className="max-w-7xl mx-auto my-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-xl">{singleJob?.title}</h1>

                    <div className="flex items-center gap-2 mt-4">
                        <Badge variant="ghost" className="text-blue-700 font-bold">
                            {singleJob?.position} Positions
                        </Badge>
                        <Badge variant="ghost" className="text-[#F83002] font-bold">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge variant="ghost" className="text-[#7209b7] font-bold">
                            {singleJob?.salary >= 1000
                                ? singleJob?.salary / 1000
                                : singleJob?.salary} LPA
                        </Badge>
                    </div>
                </div>
<Button
  onClick={
    !isApplied && appliedJobsLoaded
      ? applyJobHandler
      : undefined
  }
  disabled={isApplied || !appliedJobsLoaded}
  className={`rounded-lg ${
    isApplied
      ? "bg-gray-600 cursor-not-allowed"
      : "bg-[#7209b7] hover:bg-[#5f32ad]"
  }`}
>
  {isApplied ? "Already Applied" : "Apply Now"}
</Button>



            </div>

            <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
                Job Description
            </h1>

            <div className="my-4 space-y-2">
                <p><b>Role:</b> {singleJob?.title}</p>
                <p><b>Location:</b> {singleJob?.location}</p>
                <p><b>Description:</b> {singleJob?.description}</p>
                <p><b>Experience:</b> {singleJob?.experienceLevel} yrs</p>
                <p><b>Salary:</b> {singleJob?.salary} LPA</p>
                <p><b>Total Applicants:</b> {singleJob?.applications?.length}</p>
                <p><b>Posted Date:</b> {singleJob?.createdAt?.split('T')[0]}</p>
            </div>
        </div>
    )
}

export default JobDescription
