import { useState } from "react";
import { motion } from "framer-motion";
import FilterCard from "../components/FilterCard";
import Job from "./job";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useGetAllJobs from "../hooks/useGetAllJobs ";

const Jobs = () => {
   const dispatch = useDispatch();

  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);

  const [filters, setFilters] = useState({
    location: "",
    jobType: "",
    salary: "",
  });

  // 🔥 FILTER ALL JOBS FROM REDUX
  const filteredJobs = allJobs.filter((job) => {
    const matchLocation = filters.location
      ? job.location?.includes(filters.location)
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
    <div className="bg-gradient-to-br from-slate-50 to-purple-50 min-h-screen overflow-y-auto
  pb-10
  scroll-smooth">
      <div className="max-w-7xl mx-auto mt-5 px-2">
        <div className="flex gap-6">

          {/* FILTER PANEL */}
          <div className="w-[22%] hidden md:block">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
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
              No jobs found 
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
                {filteredJobs.map((job, index) => (
                  <motion.div
                    key={job._id || job.data || index}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit ={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
           
export default Jobs;
