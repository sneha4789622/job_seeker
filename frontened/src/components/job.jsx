import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { daysAgo } from "../utills/daysAgo";

const Job = ({ job }) => {
  const navigate = useNavigate();
<<<<<<< HEAD
=======
  const jobId = "gvhbjnbhvhh";
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71

  const days = job?.createdAt ? daysAgo(job.createdAt) : 0;

  return (
<<<<<<< HEAD
    <div
      className="
                bg-white/70 backdrop-blur
                border border-blue-100
                rounded-2xl
                p-5
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition-all duration-300
              "
    >


=======
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
      <div className="flex items-center justify-between">
        <span>{days === 0 ? "Today" : `${days} days ago`}</span>
        <Button variant="outline" size="icon" className="rounded-full">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
<<<<<<< HEAD
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg ">{job.company?.name}</h1>
          <p className="text-sm  text-gray-500">{job.location}</p>
=======
            <AvatarImage src="https://www.freepnglogos.com/uploads/logo-3d-png/3d-company-logos-design-logo-online-2.png" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job.company}</h1>
          <p className="text-sm text-gray-500">{job.location}</p>
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
        </div>
      </div>

      <div>
<<<<<<< HEAD
        <h1 className="text-lg font-semibold text-slate-800">{job.title}</h1>
        <p className="text-sm text-gray-600 mt-2">{job.description}</p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">{job.position} Positions</Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">{job.jobType}</Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">{job.salary >= 1000 ? job.salary / 1000 : job.salary}  LPA</Badge>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button className="
                            px-4 py-2 rounded-lg
                            border border-slate-200
                            text-slate-600
                            hover:bg-slate-100
                            transition"
          onClick={() => navigate(`/description/${job?._id}`)}
=======
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
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
          variant="outline"
        >
          Details
        </Button>
<<<<<<< HEAD
        <Button className=" px-4 py-2 rounded-lg
  bg-gradient-to-r from-blue-600 to-purple-600
  text-white
  hover:opacity-90
  transition">Save For Later</Button>
=======
        <Button className="bg-[#7209b7]">Save For Later</Button>
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
      </div>
    </div>
  );
};

export default Job;
