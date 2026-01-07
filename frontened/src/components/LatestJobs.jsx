<<<<<<< HEAD
// import JobFeatures from "./JobFeatures";
// import { FeaturesD } from "../componentsData/FeatureD";
// import { useSelector } from "react-redux";

// const LatestJobs = () => {
//   const {allJobs} = useSelector(store=>store.job);
//   return (
//     <div className="max-w-7xl mx-auto my-20">
//       <h2 className="text-3xl font-bold mb-6 text-center">Latest Jobs</h2>

//       <div className="grid grid-cols-3 gap-6">
//         {
//           allJobs.length <= 0 ? <span>No jobs available</span> : allJobs.slice(0,6).map((job)=>(
//             <FeaturesD key={job.data} job={job}/>
//           )) 
        
//         }
//       </div>
//     </div>
//   );
// };
// export default LatestJobs;

import JobFeatures from "./JobFeatures";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const allJobs = useSelector((store) => store.job.allJobs);
  

=======
import JobFeatures from "./JobFeatures";
import { FeaturesD } from "../componentsData/FeatureD";

const LatestJobs = () => {
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest Jobs</h2>

<<<<<<< HEAD
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allJobs.length === 0 ? (
          <span>No jobs available</span>
        ) : (
          allJobs.slice(0, 6).map((job, index) => (
            <JobFeatures key={job._id || index} job={job} />
          ))
        )}
=======
      <div className="grid grid-cols-3 gap-6">
        {FeaturesD.slice(0, 6).map((job) => (
          <JobFeatures key={job.data} job={job} />
        ))}
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
      </div>
    </div>
  );
};
<<<<<<< HEAD

export default LatestJobs;

=======
export default LatestJobs;
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
