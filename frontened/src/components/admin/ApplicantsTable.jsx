import React from "react";
import axios from "axios";
import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import {Table,TableCaption,TableHeader,TableHead,TableRow,TableBody,TableCell,} from "../ui/table";
import {Popover,PopoverContent,PopoverTrigger,} from "../ui/popover";
import { APPLICATION_API_END_POINT } from "../../utills/constant";

const shortlistingStatus = ["Accepted", "Rejected","Pending"];

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
    <div className="overflow-x-auto mt-6">
      <Table className="w-full border-collapse border border-gray-200">
        <TableCaption>List of applicants for this job</TableCaption>

        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="border px-4 py-2 text-left">Full Name</TableHead>
            <TableHead className="border px-4 py-2 text-left">Email</TableHead>
            <TableHead className="border px-4 py-2 text-left">Contact</TableHead>
            <TableHead className="border px-4 py-2 text-left">Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants && applicants.length > 0 ? (
            applicants.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullname || "NA"}</TableCell>
                <TableCell>{item?.applicant?.email || "NA"}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber || "NA"}</TableCell>
                <TableCell>
                  {item?.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status) => (
                        <div
                          key={status}
                          onClick={() => statusHandler(status, item._id)}
                          className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
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
              <TableCell colSpan={5} className="text-center">
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



