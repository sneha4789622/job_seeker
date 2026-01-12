import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';


const AppliedJobTable = () => {
    const location = useLocation();
  const { appliedJobs = [] } = useSelector(
    (store) => store.application
  );
   const statuses = ["pending", "selected", "rejected"];

  return (
    <div>
    <Table>
        <TableHeader>
     <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
           <TableHead>Company</TableHead>
           <TableHead className="text-right">Status</TableHead>
         </TableRow>
        </TableHeader>

      <TableBody>
  {appliedJobs.filter(job => job?.job && job?.job?.company).length === 0 ? (
    <TableRow>
      <TableCell colSpan={4} className="text-center text-gray-500">
        Not applied any job yet
      </TableCell>
    </TableRow>
  ) : (
    appliedJobs
      .filter(job => job?.job && job?.job?.company) 
      .map((job) => (
        <TableRow key={job._id}>
          <TableCell>
            {new Date(job.createdAt).toLocaleDateString()}
          </TableCell>
          <TableCell>{job.job.title}</TableCell>
          <TableCell>{job.job.company.name}</TableCell>
          <TableCell className="text-right">
            <Badge
              className={
                job.status === "rejected"
                  ? "bg-red-500"
                  : job.status === "pending"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }
            >
              {job.status.toUpperCase()}
            </Badge>
          </TableCell>
        </TableRow>
      ))
  )}
</TableBody>

    </Table>

        <div className="text-center mt-4">
        {location.pathname === "/profile" ? (
          <Link
            to="/applied-jobs"
            className="text-blue-600 hover:underline"
          >
            View all applied jobs
          </Link>
        ) : (
          <Link
            to="/profile"
            className="text-blue-600 hover:underline"
          >
            ← Back to Profile
          </Link>
        )}
      </div>
    </div>

  )
}

export default AppliedJobTable

