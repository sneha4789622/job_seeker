import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { JOB_API_END_POINT } from "@/utills/constant";
import { toast } from "sonner";
import axiosInstance from "@/utills/axiosInstance";

const AdminJobsTable = () => {
  const { adminJobs, searchJobByText } = useSelector(store => store.job);
const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = adminJobs.filter(job => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filtered);
  }, [adminJobs, searchJobByText]);

  //  DELETE JOB
 const deleteJobHandler = async (id) => {
  const confirm = window.confirm("Are you sure you want to delete this job?");
  if (!confirm) return;

  try {
    const token = localStorage.getItem("token");

    const res = await axiosInstance.delete(
      `${JOB_API_END_POINT}/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    if (res.data.success) {
      toast.success("Job deleted successfully");

      setFilterJobs(prev => prev.filter(job => job._id !== id));
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Delete failed");
  }
};


  return (
    <div className="shadow-sm border border-slate-200 overflow-x-auto mt-6">
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
  {filterJobs.length === 0 ? (
    <TableRow>
      <TableCell colSpan={4} className="text-center text-gray-500">
        No jobs posted yet
      </TableCell>
    </TableRow>
  ) : (
    filterJobs.map(job => (
      <TableRow key={job._id}>
        <TableCell>{job?.company?.name}</TableCell>
        <TableCell>{job?.title}</TableCell>
        <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>

        <TableCell className="text-right">
          <Popover>
            <PopoverTrigger>
              <MoreHorizontal className="cursor-pointer" />
            </PopoverTrigger>

            <PopoverContent className="w-40">
              <div
                onClick={() => navigate(`/admin/jobs/edit/${job._id}`)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Edit2 className="w-4" />
                <span>Edit</span>
              </div>

              <div
                onClick={() =>
                  navigate(`/admin/jobs/${job._id}/applicants`)
                }
                className="flex items-center gap-2 cursor-pointer mt-2"
              >
                <Eye className="w-4" />
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
  );
};

export default AdminJobsTable;
