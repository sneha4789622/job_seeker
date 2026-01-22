import { X } from "lucide-react";

const JobDetailsModal = ({ job, onClose }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative animate-in fade-in zoom-in">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
        <p className="text-gray-600">{job.company?.name}</p>

        <div className="mt-4 space-y-2 text-sm">
          <p><b>Location:</b> {job.location}</p>
          <p><b>Job Type:</b> {job.jobType}</p>
          <p><b>Experience:</b> {job.experienceLevel}+ years</p>
          <p><b>Salary:</b> ₹ {job.salary.toLocaleString()}</p>
          <p><b>Positions:</b> {job.position}</p>
        </div>

        <div className="mt-5">
          <h3 className="font-semibold mb-2">Job Description</h3>
          <p className="text-gray-700">{job.description}</p>
        </div>

        <div className="mt-5">
          <h3 className="font-semibold mb-2">Requirements</h3>
          <ul className="list-disc ml-5 text-gray-700">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetailsModal;
