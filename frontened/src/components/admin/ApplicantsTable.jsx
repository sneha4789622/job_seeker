import React from "react";
import axios from "axios";
import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import {
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { APPLICATION_API_END_POINT } from "../../utills/constant";

const shortlistingStatus = ["Accepted", "Rejected", "Pending"];

const statusColors = {
  Accepted: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
  Pending: "bg-yellow-100 text-yellow-800",
};

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.put(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="overflow-x-auto mt-6 rounded-lg shadow-lg border border-gray-200">
      <Table className="w-full min-w-[600px] border-collapse">
        <TableCaption className="text-left text-gray-500 p-2">
          List of applicants for this job
        </TableCaption>

        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="border px-4 py-3 text-left">Full Name</TableHead>
            <TableHead className="border px-4 py-3 text-left">Email</TableHead>
            <TableHead className="border px-4 py-3 text-left">Contact</TableHead>
            <TableHead className="border px-4 py-3 text-left">Resume</TableHead>
            <TableHead className="border px-4 py-3 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {applicants && applicants.length > 0 ? (
            applicants.map((item) => (
              <TableRow
                key={item._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="px-4 py-2">
                  {item?.applicant?.fullname || "NA"}
                </TableCell>
                <TableCell className="px-4 py-2 break-all">
                  {item?.applicant?.email || "NA"}
                </TableCell>
                <TableCell className="px-4 py-2 text-blue" >{item?.applicant?.phoneNumber || "NA"}</TableCell>
                <TableCell className="px-4 py-2">
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item.applicant.profile.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-gray-400">Not uploaded</span>
                  )}
                </TableCell>

                <TableCell className="px-4 py-2 text-right bg-white">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer p-1 rounded hover:bg-gray-100 transition">
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="w-36 shadow-lg rounded-md border bg-white">
                      {shortlistingStatus.map((status) => (
                        <div
                          key={status}
                          onClick={() => statusHandler(status, item._id)}
                          className={`cursor-pointer px-3 py-2 rounded-md hover:bg-gray-100 text-sm ${statusColors[status]}`}
                        >
                          {status}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                No Applicants Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
