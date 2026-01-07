import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "../../redux/applicationSlice";
import ApplicantsTable from "../admin/ApplicantsTable";
import { APPLICATION_API_END_POINT } from "../../utills/constant";

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const applicants = useSelector(
    (store) => store.application.applicants
  );

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${id}/applicants`,
          { withCredentials: true }
        );

        dispatch(setAllApplicants(res.data.applicants));
      } catch (err) {
        console.error(err);
        dispatch(setAllApplicants([]));
      }
    };

    fetchApplicants();
  }, [id, dispatch]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {applicants.length} Applicants
      </h1>

      <ApplicantsTable applicants={applicants} />
    </div>
  );
};

export default Applicants;
