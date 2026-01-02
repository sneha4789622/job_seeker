import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { daysAgo } from "../utills/daysAgo";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const jobId = "gvhbjnbhvhh";

  const days = job?.createdAt ? daysAgo(job.createdAt) : 0;

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <span>{days === 0 ? "Today" : `${days} days ago`}</span>
        <Button variant="outline" size="icon" className="rounded-full">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://www.freepnglogos.com/uploads/logo-3d-png/3d-company-logos-design-logo-online-2.png" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job.company}</h1>
          <p className="text-sm text-gray-500">{job.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job.title}</h1>
        <p className="text-sm text-gray-600">{job.description}</p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">12 Positions</Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">{job.jobType}</Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">{job.salary} LPA</Badge>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${jobId}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
