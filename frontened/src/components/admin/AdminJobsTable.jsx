import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Edit2,
  Eye,
  MoreHorizontal,
  Briefcase,
  Users,
  CheckCircle,
  Trash2
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminJobs from "./AdminJobs";
import { JOB_API_END_POINT } from "@/utills/constant";
import { toast } from "sonner";
import axios from "@/utills/axios";

const AdminJobsTable = () => {
  const { allAdminJobs = [], searchJobByText } = useSelector(
    (store) => store.job
  );

  const [filteredJobs, setFilteredJobs] = useState([]);
  const navigate = useNavigate();

   const deleteJobHandler = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this job?"
  );
  if (!confirmDelete) return;

  try {

    const res = await axios.delete(
      `${JOB_API_END_POINT}/delete/${id}`,   
      {
        
        withCredentials: true
      }
    );

    if (res.data.success) {
      toast.success("Job deleted successfully");

      // ✅ correct state update
      setFilteredJobs((prev) =>
        prev.filter((job) => job._id !== id)
      );
    }
  } catch (error) {
    console.error("DELETE ERROR:", error);
    toast.error(
      error?.response?.data?.message || "Delete failed"
    );
  }
};


  /* 🔢 DASHBOARD STATS */
  const stats = useMemo(() => {
    const totalJobs = allAdminJobs.length;

    let totalApplicants = 0;
    let totalAccepted = 0;

    allAdminJobs.forEach((job) => {
      const applications = job?.applications || [];
      totalApplicants += applications.length;
      totalAccepted += applications.filter(
        (app) => app.status === "accepted"
      ).length;
    });
   

    return {
      totalJobs,
      totalApplicants,
      totalAccepted,
    };
  }, [allAdminJobs]);

  /* 🔍 SEARCH FILTER */
  useEffect(() => {
    const filtered = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;

      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase())
      );
    });

    setFilteredJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="max-w-6xl mx-auto my-10">
      {/* 🔢 TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
          <Briefcase className="text-blue-600" size={36} />
          <div>
            <p className="text-sm text-gray-500">Total Jobs Posted</p>
            <h2 className="text-2xl font-bold">{stats.totalJobs}</h2>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
          <Users className="text-purple-600" size={36} />
          <div>
            <p className="text-sm text-gray-500">Total Applicants</p>
            <h2 className="text-2xl font-bold">
              {stats.totalApplicants}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
          <CheckCircle className="text-green-600" size={36} />
          <div>
            <p className="text-sm text-gray-500">Candidates Hired</p>
            <h2 className="text-2xl font-bold">
              {stats.totalAccepted}
            </h2>
          </div>
        </div>
      </div>

      {/* 🔎 FILTER COMPONENT */}
      <AdminJobs />

      {/* 📋 JOBS TABLE */}
      <div className="border rounded-lg bg-white shadow-sm overflow-x-auto">
        <Table>
          <TableCaption>Your recently posted jobs</TableCaption>

          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Posted On</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredJobs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-gray-500 py-6"
                >
                  No jobs found
                </TableCell>
              </TableRow>
            ) : (
              filteredJobs.map((job) => (
                <TableRow key={job._id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    {job?.company?.name || "N/A"}
                  </TableCell>

                  <TableCell>{job?.title}</TableCell>

                  <TableCell>
                    {job?.createdAt
                      ? job.createdAt.split("T")[0]
                      : "—"}
                  </TableCell>

                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="p-2 rounded-md hover:bg-gray-100">
                          <MoreHorizontal size={18} />
                        </button>
                      </PopoverTrigger>

                      <PopoverContent className="w-40 space-y-2 bg-white">
                        <div
                          onClick={() =>
                            navigate(`/admin/jobs/edit/${job._id}`)
                          }
                          className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
                        >
                          <Edit2 size={16} />
                          <span>Edit Job</span>
                        </div>

                        <div
                          onClick={() =>
                            navigate(`/admin/jobs/${job._id}/applicants`)
                          }
                          className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
                        >
                          <Eye size={16} />
                          <span>Applicants</span>
                        </div>
                        <div
                          onClick={() => deleteJobHandler(job._id)}
                          className="flex items-center gap-2 cursor-pointer mt-2 text-red-600"
                        >
                          <Trash2 className="w-4" />
                          <span>Delete</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminJobsTable;
