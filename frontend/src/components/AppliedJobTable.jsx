import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
  const location = useLocation();
  const { appliedJobs = [] } = useSelector((store) => store.application);
 console.log(appliedJobs)
  return (
    <div className="bg-white py-4">
      <div className="overflow-x-auto">
        <Table className="min-w-[600px]">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-left">Date</TableHead>
              <TableHead className="text-left">Job Role</TableHead>
              <TableHead className="text-left">Company</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {appliedJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500 py-4">
                  Not applied any job yet
                </TableCell>
              </TableRow>
            ) : (
              appliedJobs.map((job, idx) => (
                <TableRow
                  key={job._id}
                  className={idx % 2 === 0 ? "bg-gray-50" : ""}
                >
                  <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{job.job?.title}</TableCell>
                  <TableCell>{job.job?.company?.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={`
                        ${job.status === "rejected" ? "bg-red-500 text-white" : ""}
                        ${job.status === "pending" ? "bg-yellow-400 text-black" : ""}
                        ${job.status === "accepted" ? "bg-green-500 text-white" : ""}
                        px-3 py-1 rounded-full text-sm
                      `}
                    >
                      {job.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Navigation Link */}
      <div className="text-center mt-4">
        {location.pathname === "/profile" ? (
          <Link to="/applied-jobs" className="text-blue-600 hover:underline font-medium">
            View all applied jobs
          </Link>
        ) : (
          <Link to="/profile" className="text-blue-600 hover:underline font-medium">
            ← Back to Profile
          </Link>
        )}
      </div>
    </div>
  )
}

export default AppliedJobTable
