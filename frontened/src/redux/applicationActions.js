import axiosInstance from "@/utills/axiosInstance";
import { setAppliedJobs } from "./applicationSlice";


export const getAppliedJobs = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get("/application/get");

    if (res.data.success) {
      dispatch(setAppliedJobs(res.data.application));
    }
  } catch (error) {
    console.log("GET APPLIED JOBS ERROR:", error);
  }
};
