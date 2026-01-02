import JobFeatures from "./JobFeatures";
import { FeaturesD } from "../componentsData/FeatureD";

const LatestJobs = () => {
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest Jobs</h2>

      <div className="grid grid-cols-3 gap-6">
        {FeaturesD.slice(0, 6).map((job) => (
          <JobFeatures key={job.data} job={job} />
        ))}
      </div>
    </div>
  );
};
export default LatestJobs;
