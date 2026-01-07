import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { APPLICATION_API_END_POINT } from "@/utills/constant";
import { setAppliedJobs } from "@/redux/applicationSlice";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/get`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setAppliedJobs(res.data.application));
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchAppliedJobs();
  }, []);
};

export default useGetAppliedJobs;
