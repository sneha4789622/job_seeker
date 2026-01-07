<<<<<<< HEAD
import React,{useEffect} from "react";
import Job from "./job";
import { useSelector,useDispatch } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs ";
import { setSeachedQuery } from "@/redux/jobSlice";

const Browse = () => {
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSeachedQuery(""));
        }
    },[])
    return (
        <div>
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job}/>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse
=======
import React from "react";
import Job from "./job";
import { JobsData } from "../componentsData/JobsD";


const Browse = () => {
const RESULTS_LIMIT = 15;
const searchResults = JobsData.slice(0, RESULTS_LIMIT);

  return (
    <div>

      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({searchResults.length})
        </h1>

        <div className="grid grid-cols-3 gap-4">
          {searchResults.map((job) => (
            <Job
              key={job.data}
              job={{
                _id: job.data,              
                title: job.title,
                company: job.company,
                jobType: job.experience,    
                location: job.location,
                createdAt: job.createdAt,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
