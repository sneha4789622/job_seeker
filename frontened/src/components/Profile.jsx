import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Camera,
  Pencil,
  MapPin,
  Phone,
  Briefcase,
  GraduationCap,
  UserCheck,
  Mail,
  Linkedin,
  Github,
  CheckCircle,
  File,
  X
} from "lucide-react";

import { Button } from "./ui/button";
import { toast } from "sonner";
import AppliedJobTable from "./AppliedJobTable";
import { useDispatch, useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGeAppliedJobs";
import { USER_API_END_POINT } from "@/utills/constant";
import { setUser } from "@/redux/authSlice";



/* ================= EDIT MODAL ================= */
const EditModal = ({ title, fields, data, onChange, onSave, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[90%] max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute right-4 top-4">
          <X size={18} />
        </button>

        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <div className="space-y-3">
          {fields.map((field) => (
            <input
              key={field.key}
              type="text"
              placeholder={field.label}
              value={data[field.key] || ""}
              onChange={(e) => onChange(field.key, e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  useGetAppliedJobs();
  const { user } = useSelector((store) => store.auth);
   const dispatch = useDispatch()
  // console.log(user)
  /* ================= STATES ================= */
  const [profile, setProfile] = useState({
    fullname: "",
    email: "",
    phone: "",
    avatar: "",
    linkedin: "",
    github: "",
    resume: "",
    resumeName: "",
    loading:false
  });

  const [basicInfo, setBasicInfo] = useState({
    location: "",
    phone: "",
    profession: "",
    education: "",
    experience: "",
    skills: [],
  });

  const [finalImage, setFinalImage] = useState(null);

  /* ===== Modal control ===== */
  const [activeModal, setActiveModal] = useState(null);
  const [tempData, setTempData] = useState({});

  /* ================= LOAD USER ================= */
  useEffect(() => {
    if (user) {
      setProfile({
        fullname: user.fullname || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        avatar: user.profile?.profilePhoto || "",
        linkedin: user.profile?.linkedin || "",
        github: user.profile?.github || "",
        resume: user.profile?.resume || "",
        resumeName: user.profile?.resumeOriginalName || "",
      });

      setBasicInfo({
        location: user.profile?.location || "",
        phone: user.phoneNumber || "",
        profession: user.profile?.profession || "",
        education: user.profile?.education || "",
        experience: user.profile?.experience || "Fresher",
        skills: user.profile?.skills || [],
      });
    }
  }, [user]);

  /* ================= IMAGE ================= */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setFinalImage(reader.result);
    reader.readAsDataURL(file);
  };

  /* ================= OPEN MODAL ================= */
  const openModal = (type) => {
    setActiveModal(type);
    setTempData(type === "profile" ? profile : basicInfo);
  };

  /* ================= SAVE MODAL ================= */
  const saveModalData = async () => {
    try {
      let payload = {};

      if (activeModal === "profile") {
        payload = {
          fullname: tempData.fullname,
          email: tempData.email,
          linkedin: tempData.linkedin,
          github: tempData.github,
          profession: tempData.profession,
          location: tempData.location,
        };
      }

      if (activeModal === "basic") {
        payload = {
          phoneNumber: tempData.phone,
          education: tempData.education,
          experience: tempData.experience,
          resume: tempData.resume,
          skills: Array.isArray(tempData.skills)
            ? tempData.skills.join(",")
            : tempData.skills,
        };
      }
      
      const res = await axios.put(`${USER_API_END_POINT}/profile/update`, payload, { withCredentials: true });
      
      console.log(res)
      // ✅ Update UI from backend response
      setProfile({
        fullname: res.data.user.fullname,
        email: res.data.user.email,
        phone: res.data.user.phoneNumber,
        avatar: res.data.user.profile?.profilePhoto || "",
        linkedin: res.data.user.profile?.linkedin || "",
        github: res.data.user.profile?.github || "",
        resume: res.data.user.profile?.resume || "",
        resumeName: res.data.user.profile?.resumeOriginalName || "",
      });

      setBasicInfo({
        location: res.data.user.profile?.location || "",
        phone: res.data.user.phoneNumber || "",
        profession: res.data.user.profile?.profession || "",
        education: res.data.user.profile?.education || "",
        experience: res.data.user.profile?.experience || "",
        skills: res.data.user.profile?.skills || [],
      });
      dispatch(setUser(res.data.user));
      toast.success("Profile updated successfully ✅");
      setActiveModal(null);
    } catch (err) {
      console.error(err);
      toast.error("Update failed ❌");
    }
  };

  // ================= RESUME UPLOAD =================
const handleResumeUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
   setProfile((prev) => ({
      ...prev,
      loading:true
    }));

  try {
    //  Force PDF only (extra safety)
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed ");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    const res = await axios.put(
      `${USER_API_END_POINT}/profile/update`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const updatedUser = res.data.user;
      console.log("upated",updatedUser)
    // ✅ Update local UI state
    setProfile((prev) => ({
      ...prev,
      resume: updatedUser.profile.resume,
      resumeName:updatedUser.profile.resumeOriginalName,
      loading:false
    }));

    // ✅ Update Redux state
    dispatch(setUser(updatedUser));
   
    toast.success("Resume uploaded successfully ✅");
  } catch (error) {
    console.error(error);
    toast.error("Resume upload failed ❌");
  }
};

  /* ================= DELETE RESUME ================= */
  const handleDeleteResume = async () => {
    try {
      console.log("Deleting resume...");

      await axios.put(
        `${USER_API_END_POINT}/profile/update`,
        { resume: "" },
        { withCredentials: true }
      );
       //update redux
     const updatedUser = {
  ...user,
  profile: {
    ...user.profile,
    resume: "",
  },
};

dispatch(setUser(updatedUser));

      // Update local state
      setProfile({ ...profile, resume: "" });

      toast.success("Resume deleted successfully ✅");
    } catch (error) {
      console.error(error);
      toast.error("Deletion failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-[60vw] max-w-7xl space-y-6">

        {/* ================= PROFILE CARD ================= */}
        <div className="bg-white rounded-2xl shadow-xl p-6 flex gap-6">
          {/* AVATAR */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-[6px] border-green-500 flex items-center justify-center">
              <img
                src={finalImage || profile.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                className="w-24 h-24 rounded-full object-cover"
                alt="profile"
              />
            </div>

            <label className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full text-white cursor-pointer">
              <Camera size={14} />
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </label>
          </div>

          {/* PROFILE INFO */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">
                {profile.fullname || "Add your full name"}
              </h2>
              <button onClick={() => openModal("profile")}>
                <Pencil size={16} className="text-gray-500" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Briefcase size={16} className="text-purple-600" />
              {basicInfo.profession || (
                <span className="text-gray-400">Add your profession (e.g. Full Stack Developer)</span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-blue-600" />
                {basicInfo.location || <span className="text-gray-400">Add your location</span>}
              </div>

              <div className="flex items-center gap-2">
                <Mail size={16} className="text-red-500" />
                {profile.email || <span className="text-gray-400">Add your email</span>}
                {profile.email && <CheckCircle size={14} className="text-green-600" />}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pt-2">
              <div className="flex items-center gap-2">
                <Linkedin size={16} className="text-blue-600" />
                {profile.linkedin ? (
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    LinkedIn Profile
                  </a>
                ) : (
                  <span className="text-gray-400">Add your LinkedIn profile</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Github size={16} className="text-gray-800" />
                {profile.github ? (
                  <a href={profile.github} target="_blank" rel="noreferrer" className="text-gray-800 hover:underline">
                    GitHub Profile
                  </a>
                ) : (
                  <span className="text-gray-400">Add your GitHub profile</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= BASIC INFO ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-6 relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <button onClick={() => openModal("basic")}>
              <Pencil size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <Info icon={<MapPin size={18} />} label="Location" value={basicInfo.location} />
            <Info icon={<Phone size={18} />} label="Phone" value={basicInfo.phone} />
            <Info icon={<Briefcase size={18} />} label="Profession" value={basicInfo.profession} />
            <Info icon={<GraduationCap size={18} />} label="Education" value={basicInfo.education} />
            <Info icon={<UserCheck size={18} />} label="Experience" value={basicInfo.experience} full />
          </div>
        </div>

        {/* ================= SKILLS ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-6 relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Skills</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {basicInfo.skills.map((s, i) => (
              <span key={i} className="bg-gray-200 px-3 py-1 rounded-md text-sm">{s}</span>
            ))}
          </div>
        </div>

        {/* ================= RESUME ================= */}
      
<div className="bg-white rounded-2xl shadow-lg p-6">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-semibold">Resume</h3>
  </div>

  <div className="flex items-center gap-4">
    <File size={24} className="text-blue-600 shrink-0" />

    {profile.resume ? (
      /* ===== RESUME EXISTS ===== */
      <div className="flex flex-1 items-center justify-between">
        <span className="text-sm text-gray-700">
          {profile.resumeName}
        </span>

        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
          >
            <Button size="sm">Download</Button>
          </a>

          <Button
            size="sm"
            variant="destructive"
            onClick={handleDeleteResume}
          >
            Delete
          </Button>
        </div>
      </div>
    ) : (
      /* ===== NO RESUME ===== */
      <div className="flex flex-1 items-center justify-between">
  <span className="text-sm text-gray-400">
    No resume uploaded
  </span>

    <Button
        size="sm"
        variant="outline"
        onClick={() => document.getElementById("resume-upload").click()}
        disabled={profile.loading} // ✅ disable while loading
      >
        {profile.loading ? "Uploading..." : "Upload Resume"} {/* ✅ show loader text */}
      </Button>

  <input
    id="resume-upload"
    type="file"
     accept="application/pdf"
    hidden
    onChange={handleResumeUpload}
  />
</div>

    )}
  </div>
</div>


        {/* ================= APPLIED JOBS ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-lg mb-4">Applied Jobs</h3>
          <AppliedJobTable />
        </div>
      </div>

      {/* ================= MODALS ================= */}
      {activeModal === "profile" && (
        <EditModal
          title="Edit Profile"
          data={tempData}
          onChange={(k, v) => setTempData({ ...tempData, [k]: v })}
          onSave={saveModalData}
          onClose={() => setActiveModal(null)}
          fields={[
            { key: "fullname", label: "Full Name" },
            { key: "email", label: "Email" },
            { key: "linkedin", label: "LinkedIn" },
            { key: "github", label: "GitHub" },
            { key: "location", label: "Location" },
            { key: "profession", label: "Profession" },
          ]}
        />
      )}

      {activeModal === "basic" && (
        <EditModal
          title="Edit Basic Information"
          data={tempData}
          onChange={(k, v) => setTempData({ ...tempData, [k]: v })}
          onSave={saveModalData}
          onClose={() => setActiveModal(null)}
          fields={[
            { key: "location", label: "Location" },
            { key: "phone", label: "Phone" },
            { key: "profession", label: "Profession" },
            { key: "education", label: "Education" },
            { key: "experience", label: "Experience" },
            { key: "skills", label: "Skills (comma separated)" },
          ]}
        />
      )}
    </div>
  );
};

/* ================= INFO ITEM ================= */
const Info = ({ icon, label, value, full }) => (
  <div className={`flex items-center gap-3 ${full ? "col-span-2" : ""}`}>
    <span className="text-blue-600">{icon}</span>
    <span className="font-medium">{label}:</span>
    <span>{value || "-"}</span>
  </div>
);

export default Profile;
