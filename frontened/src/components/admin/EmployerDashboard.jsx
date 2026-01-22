import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { USER_API_END_POINT } from "@/utills/constant";

const EmployerDashboard = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    phoneNumber: "",
    bio: "",
  });
  const [latestUser, setLatestUser] = useState(user);

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (!user || user.role !== "recruiter") {
      navigate("/login");
    }
  }, [user, navigate]);

  /* ================= PREFILL FORM ================= */
  useEffect(() => {
    if (latestUser) {
      setFormData({
        fullname: latestUser.fullname || "",
        phoneNumber: latestUser.phoneNumber || "",
        bio: latestUser.profile?.bio || "",
      });
    }
  }, [latestUser]);

  if (!user) return null;

  /* ================= INPUT HANDLER ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= FETCH LATEST USER ================= */
  const fetchLatestUser = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/me`, {
        withCredentials: true,
      });
      setLatestUser(res.data.user);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch latest user data");
    }
  };

  /* ================= FETCH USER ON MOUNT ================= */
  useEffect(() => {
    fetchLatestUser(); // ✅ call on mount
  }, []); // ✅ empty array as dependency

  /* ================= SAVE HANDLER ================= */
  const handleSave = async () => {
    try {
      const res = await axios.put(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        { withCredentials: true }
      );

      toast.success("Profile updated successfully");
      setShowEditModal(false);

      // Fetch latest data after update
      await fetchLatestUser();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Profile update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
        {/* ================= HEADER ================= */}
        <div className="w-20 h-20 rounded-full overflow-hidden border shadow">
      <img
        src={
          latestUser?.profile?.profilePhoto ||
          "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
        }
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
        <div>
          <h1 className="text-3xl font-bold text-blue-950">
            Welcome, {latestUser?.fullname || "User"}
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your company, jobs, and applicants
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ================= PROFILE ================= */}
          <DashboardCard title="Profile">
            <Info label="Email" value={latestUser?.email || "N/A"} />
            <Info label="Phone" value={latestUser?.phoneNumber || "N/A"} />
            <Info label="Bio" value={latestUser?.profile?.bio || "N/A"} />

            <Button
              className="mt-4 w-full"
              onClick={() => setShowEditModal(true)}
            >
              Edit Profile
            </Button>
          </DashboardCard>

          {/* ================= COMPANY ================= */}
          <DashboardCard title="Company">
            {latestUser?.profile?.company?.name ? (
              <Info
                label="Company Name"
                value={latestUser.profile.company.name}
              />
            ) : (
              <p className="text-gray-500 text-sm">No company assigned yet</p>
            )}

            <Button
              className="mt-4 w-full"
              onClick={() => navigate("/admin/companies")}
            >
              Manage Company
            </Button>
          </DashboardCard>

          {/* ================= JOBS ================= */}
          <DashboardCard title="Jobs">
            <p className="text-gray-600 text-sm">
              Create and manage job postings
            </p>

            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                onClick={() => navigate("/admin/jobs")}
              >
                Manage Jobs
              </Button>
              <Button onClick={() => navigate("/admin/jobs/create")}>
                Post Job
              </Button>
            </div>
          </DashboardCard>

          {/* ================= APPLICANTS ================= */}
          <DashboardCard title="Applicants">
            <p className="text-gray-600 text-sm">
              Review candidates who applied for your jobs
            </p>

            <Button
              className="mt-4 w-full"
              onClick={() => navigate("/admin/jobs")}
            >
              View Applicants
            </Button>
          </DashboardCard>
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>

            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border rounded-lg px-3 py-2"
            />

            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border rounded-lg px-3 py-2"
            />

            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Bio"
              className="w-full border rounded-lg px-3 py-2"
            />

            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </Button>

              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= REUSABLE ================= */
const DashboardCard = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
    {children}
  </div>
);

const Info = ({ label, value }) => (
  <p className="text-gray-700 text-sm">
    <span className="font-medium">{label}:</span> {value}
  </p>
);

export default EmployerDashboard;
