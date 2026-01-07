import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Page load pe search clear
  useEffect(() => {
    dispatch(setSearchJobByText(""));
  }, [dispatch]);

  // ✅ Jab input change ho tabhi filter
  useEffect(() => {
    dispatch(setSearchJobByText(input.trim()));
  }, [input, dispatch]);

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex items-center justify-between my-5">
        <Input
          className="w-fit px-4 py-2
                      rounded-lg
                      border border-slate-300
                      focus:ring-2 focus:ring-blue-400
                      outline-none"
          placeholder="Filter by name, role"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={() => navigate("/admin/jobs/create")}>
          New Jobs
        </Button>
      </div>

      <AdminJobsTable />
    </div>
  );
};

export default AdminJobs;
