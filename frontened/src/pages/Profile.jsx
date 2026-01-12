import { useSelector } from "react-redux";
import JobSeekerProfile from "@/components/JobSeekerProfile";
import EmployerProfile from "@/components/EmployerProfile";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-6">
      {user?.role === "recruiter" ? (
        <EmployerProfile />
      ) : (
        <JobSeekerProfile />
      )}
    </div>
  );
};

export default Profile;
