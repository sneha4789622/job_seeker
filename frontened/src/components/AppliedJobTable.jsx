import React from 'react'
<<<<<<< HEAD
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
        {appliedJobs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-gray-500">
              Not applied any job yet
            </TableCell>
          </TableRow>
        ) : (
          appliedJobs.map((job) => (
            <TableRow key={job._id}>
              <TableCell>
                {new Date(job.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{job.job?.title}</TableCell>
              <TableCell>{job.job?.company?.name}</TableCell>
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

=======
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow} from './ui/table'
import { Badge } from './ui/badge'
import { JobsData } from "../componentsData/JobsD";
import { Link, useLocation } from "react-router-dom";


function AppliedJobTable() {
  const location = useLocation();


  const statuses = ["pending", "selected", "rejected"];

  const jobsWithStatus = JobsData.map(job => ({
    ...job,
    status: statuses[Math.floor(Math.random() * statuses.length)]
  }));

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
          {jobsWithStatus.slice(0,5).map((job) => (
            <TableRow key={job.data}>
              <TableCell>{job.createdAt}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.company}</TableCell>

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
          ))}
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
    
    
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
  )
}

export default AppliedJobTable
<<<<<<< HEAD

=======
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
