import axios from "@/utills/axiosInstance";
import { useEffect } from "react";
import { COMPANY_API_END_POINT } from "@/utills/constant";
import { useDispatch } from "react-redux";
import { setAllCompanies } from "@/redux/companySlice";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get`,
          {
            headers: {
              Authorization: `Bearer ${token}` 
            }
          }
        );

        if (res.data.success) {
          dispatch(setAllCompanies(res.data.companies));
        }
      } catch (error) {
        console.log("get companies error:", error);
      }
    };

    fetchCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;
