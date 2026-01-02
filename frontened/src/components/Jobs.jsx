// import { useState } from "react";
// import { JobsData } from "../componentsData/JobsD";
// import Job from "./Job";
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";

// function Jobs() {
//   const [location, setLocation] = useState("");
//   const [title, setTitle] = useState("");
//   const [salary, setSalary] = useState("");

//   // Unique locations
//   const locations = [...new Set(JobsData.map(job => job.location))];

//   // Filter logic
//   const filteredJobs = JobsData.filter(job =>
//     (location === "" || job.location === location) &&
//     (title === "" || job.title.toLowerCase().includes(title.toLowerCase())) &&
//     (salary === "" || job.salary >= Number(salary))
//   );

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10">

//       {/* FILTER BAR */}
//       <div className="bg-white p-5 rounded-2xl shadow-sm mb-8 flex flex-wrap gap-4 items-center">
//         <select
//           className="border px-4 py-2 rounded-xl focus:ring-2 focus:ring-indigo-500 transition"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//         >
//           <option value="">All Locations</option>
//           {locations.map((loc, index) => (
//             <option key={index} value={loc}>{loc}</option>
//           ))}
//         </select>

//         <input
//           type="text"
//           placeholder="Search job title"
//           className="border px-4 py-2 rounded-xl focus:ring-2 focus:ring-indigo-500 transition"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <input
//           type="number"
//           placeholder="Min Salary (k)"
//           className="border px-4 py-2 rounded-xl focus:ring-2 focus:ring-indigo-500 transition"
//           value={salary}
//           onChange={(e) => setSalary(e.target.value)}
//         />

//         <Button
//           variant="outline"
//           className="rounded-xl"
//           onClick={() => {
//             setLocation("");
//             setTitle("");
//             setSalary("");
//           }}
//         >
//           Clear
//         </Button>
//       </div>

//       {/* ACTIVE FILTER BADGES */}
//       <div className="flex flex-wrap gap-3 mb-6">
//         {location && <Badge className="px-3 py-1">{location}</Badge>}
//         {title && <Badge className="px-3 py-1">{title}</Badge>}
//         {salary && <Badge className="px-3 py-1">{salary}k+</Badge>}
//       </div>

//       {/* JOB GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredJobs.length ? (
//           filteredJobs.map(job => (
//             <div
//               key={job.data}
//               className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
//             >
//               <Job job={job} />
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 col-span-full text-center">
//             No jobs found
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Jobs;





// import React from 'react'
// import { useState } from "react";
// import FilterCard from "../components/FilterCard";
// import Job from "./job";
// import { JobsData } from "../componentsData/JobsD";

// const Jobs = () => {
//   const [filters, setFilters] = useState({
//     location: "",
//     jobType: "",
//     salary: "",
//   });

//   const filteredJobs = JobsData.filter((job) => {
//     const matchLocation = filters.location
//       ? job.location.includes(filters.location)
//       : true;

//     const matchJobType = filters.jobType
//       ? job.jobType === filters.jobType
//       : true;

//     const matchSalary = filters.salary
//       ? job.salary <= Number(filters.salary)
//       : true;

//     return matchLocation && matchJobType && matchSalary;
//   });

//   return (
//     <div className="max-w-7xl mx-auto mt-5">
//       <div className="flex gap-5">

//         {/* Filter */}
//         <div className="w-[20%]">
//           <FilterCard filters={filters} setFilters={setFilters} />
//         </div>

//         {/* Jobs */}
//         {filteredJobs.length === 0 ? (
//           <span>Job not found</span>
//         ) : (
//           <div className="flex-1 h-[88vh] overflow-y-auto pb-5 scroll-smooth">
//             {/* <div className="grid grid-cols-3 gap-4"> */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredJobs.map((job) => (
//                 <Job key={job.data} job={job} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Jobs;

import { useState } from "react";
import { motion } from "framer-motion";
import FilterCard from "../components/FilterCard";
import Job from "./job";
import { JobsData } from "../componentsData/JobsD";

const Jobs = () => {
  const [filters, setFilters] = useState({
    location: "",
    jobType: "",
    salary: "",
  });

  const filteredJobs = JobsData.filter((job) => {
    const matchLocation = filters.location
      ? job.location.includes(filters.location)
      : true;

    const matchJobType = filters.jobType
      ? job.jobType === filters.jobType
      : true;

    const matchSalary = filters.salary
      ? job.salary <= Number(filters.salary)
      : true;

    return matchLocation && matchJobType && matchSalary;
  });

  return (
    <div className="bg-gradient-to-br from-slate-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto mt-5 px-2">
        <div className="flex gap-6">

          {/* FILTER PANEL */}
          <div className="w-[22%] hidden md:block">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="sticky top-5"
            >
              <FilterCard filters={filters} setFilters={setFilters} />
            </motion.div>
          </div>

          {/* JOBS SECTION */}
          {filteredJobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex items-center justify-center text-gray-500 text-lg"
            >
              No jobs found ✨
            </motion.div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-6 scroll-smooth">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.12 },
                  },
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredJobs.map((job) => (
                  <Job key={job.data} job={job} />
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
