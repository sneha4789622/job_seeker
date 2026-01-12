import { useEffect } from "react";
import axios from "@/utills/axiosInstance";
import { useDispatch } from "react-redux";
import { setAdminJobs } from "@/redux/jobSlice";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        const res = await axios.get("/job/getadminjobs"); 

        if (res.data.success) {
          dispatch(setAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdminJobs();
  }, [dispatch]);
};

export default useGetAllAdminJobs;
