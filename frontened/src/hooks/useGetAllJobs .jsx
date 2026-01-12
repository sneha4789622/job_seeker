import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utills/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
        console.log("Fetching all jobs...");

    const fetchAllJobs = async () => {
      try {

 const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});


        console.log("API RESPONSE", res.data);

        if (res.data?.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("API ERROR", error);
      }
    };

    fetchAllJobs();
  }, [dispatch, searchedQuery]);
};

export default useGetAllJobs;
