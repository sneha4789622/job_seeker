
import JobFeatures from "./JobFeatures";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const allJobs = useSelector((store) => store.job.allJobs);
  

  return (
    <div className="min-h-[90vh] mx-auto my-20">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest Jobs</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allJobs.length === 0 ? (
          <span>No jobs available</span>
        ) : (
          allJobs.slice(0, 6).map((job, index) => (
            <JobFeatures key={job._id || index} job={job} />
          ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;

