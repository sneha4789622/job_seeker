import React, { useState, useCallback, useEffect } from "react";
import { Pencil, Save, Camera } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import AppliedJobTable from "./AppliedJobTable";
import Cropper from "react-easy-crop";
import { useDispatch, useSelector } from "react-redux";



/* ================= IMAGE CROP HELPER ================= */
const getCroppedImg = (imageSrc, crop) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      resolve(canvas.toDataURL("image/jpeg"));
    };
  });
};

 

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [open,setOpen] = useState(false);

  /* ================= EDIT STATES ================= */
  const [editProfile, setEditProfile] = useState(false);
  const [editBasic, setEditBasic] = useState(false);
  const [editExp, setEditExp] = useState(false);
  const [editEdu, setEditEdu] = useState(false);
  const [editResume, setEditResume] = useState(false);

  /* ================= PROFILE ================= */
  const [profile, setProfile] = useState({
    fullname: "",
    email: "",
    phone: "",
    avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    linkedin: "",
    github: "",
  });

  /* ================= IMAGE CROP STATES ================= */
  const [image, setImage] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setIsCropOpen(true);
    };
    reader.readAsDataURL(file);
  };
  /* ================= LOAD USER ================= */
  useEffect(() => {
    if (user) {
      setProfile({
        fullname: user.fullname,
        email: user.email,
        phone: user.phoneNumber,
        avatar: user.profile?.avatar || "",
        linkedin: user.profile?.linkedin || "",
        github: user.profile?.github || ""
      });

      setBasicInfo({
        skills: user.profile?.skills || []
      });
    }
  }, [user]);

  /* ================= BASIC INFO ================= */
  const [basicInfo, setBasicInfo] = useState({
    age: "",
    experience: "",
    location: "",
    openToWork: "",
    skills: []

  });

  /* ================= EXPERIENCE ================= */
  const [experience, setExperience] = useState({
    company: "",
    role: "",
    duration: "",
    location: "",
  });

  /* ================= EDUCATION ================= */
  const [education, setEducation] = useState({
    degree: "",
    field: "",
    duration: "",
  });

  /* ================= RESUME ================= */
  const [resume, setResume] = useState({
    name: "",
    file: null,
  });

  /* ================= SAVE ================= */
  const saveProfileHandler = () => {
    toast.success("Profile saved successfully ✅");
    console.log({ profile, basicInfo, experience, education, resume });
  };

  return (
    <>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-3 gap-6">

        {/* ================= LEFT PROFILE CARD ================= */}
        <div className="backdrop-blur            
                       bg-white/70 border border-white/30
                        shadow-xl rounded-2xl p-6
                        flex flex-col items-center text-left space-y-4
                        hover:shadow-2xl transition-all duration-300">





          {/* Avatar */}
          <div className="relative">
            <img
              src={finalImage || profile.avatar}
              className="w-28 h-28 rounded-full object-cover ring-4 ring-indigo-200 shadow-lg"
              alt="profile"
            />

            <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white cursor-pointer hover:scale-110 transition">
              <Camera size={14} />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>
          </div>

          

          {editProfile ? (
            <>
              <Input placeholder="Full Name" value={profile.fullname}
                onChange={e => setProfile({ ...profile, fullname: e.target.value })} />
              <Input placeholder="Email" value={profile.email}
                onChange={e => setProfile({ ...profile, email: e.target.value })} />
              <Input placeholder="PhoneNumber" value={profile.phone}
                onChange={e => setProfile({ ...profile, phone: e.target.value })} />
              <Input placeholder="LinkedIn URL" value={profile.linkedin}
                onChange={e => setProfile({ ...profile, linkedin: e.target.value })} />
              <Input placeholder="GitHub URL" value={profile.github}
                onChange={e => setProfile({ ...profile, github: e.target.value })} />
            </>
          ) : (
            <>
              <h2 className="text-sm text-left"><b>Full Name:</b>{profile.fullname}</h2>
              <p className="text-sm text-left"><b>Email:</b>{profile.email}</p>
              <p className="text-sm text-left"><b>Phone Number:</b>{profile.phone}</p>

              <div className="flex gap-4 mt-2">
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    className="text-blue-600 font-medium"
                  >
                    Linkedin
                  </a>
                <a href={profile.github} target="_blank" className="text-gray-800 hover:underline">
                  GitHub
                  

                </a>
              </div>
            </>
          )}

          <Button onClick={() => setEditProfile(!editProfile)}>
            {editProfile ? <Save size={16} /> : <Pencil size={16} />}
          </Button>
        </div>

        {/* ================= BASIC INFO ================= */}


        <div className="backdrop-blur bg-white/70 border
 border-white/30 rounded-2xl p-6 shadow-lg relative">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>

          {/* VIEW MODE */}
          {!editBasic && (
            <>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <p><b>Age:</b> {basicInfo.age}</p>
                <p><b>Experience:</b> {basicInfo.experience}</p>
                <p><b>Location:</b> {basicInfo.location}</p>
                <p><b>Open To Work:</b> {basicInfo.openToWork}</p>
              </div>

              {/* Skills */}
              <div className="mt-4">
                <p className="font-medium mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {basicInfo.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-black-700
                               px-3 py-1 rounded-full text-sm
                               hover:scale-105 transition"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* EDIT MODE */}
          {editBasic && (
            <div className="grid grid-cols-2 gap-3">
              <Input
                value={basicInfo.age}
                onChange={(e) =>
                  setBasicInfo({ ...basicInfo, age: e.target.value })
                }
                placeholder="Age"
              />
              <Input
                value={basicInfo.experience}
                onChange={(e) =>
                  setBasicInfo({ ...basicInfo, experience: e.target.value })
                }
                placeholder="Experience"
              />
              <Input
                value={basicInfo.location}
                onChange={(e) =>
                  setBasicInfo({ ...basicInfo, location: e.target.value })
                }
                placeholder="Location"
              />
              <Input
                value={basicInfo.openToWork}
                onChange={(e) =>
                  setBasicInfo({ ...basicInfo, openToWork: e.target.value })
                }
                placeholder="Open To Work"
              />

              {/* Skills Input */}
              <div className="col-span-2">
                <label className="text-sm font-medium">Skills</label>
                <input
                  type="text"
                  className="w-full border rounded-md px-3 py-2 mt-2"
                  placeholder="HTML, CSS, JavaScript, React"
                  value={basicInfo.skills.join(", ")}
                  onChange={(e) =>
                    setBasicInfo({
                      ...basicInfo,
                      skills: e.target.value.split(",").map(s => s.trim())
                    })
                  }
                />
              </div>
            </div>
          )}

          {/* Edit Button */}
          <button
            onClick={() => setEditBasic(!editBasic)}
            className="absolute top-4 right-4"
          >
            {editBasic ? <Save size={18} /> : <Pencil size={18} />}
          </button>
        </div>



        {/* ================= RIGHT SECTIONS ================= */}
        <div className="col-span-2 space-y-6">


          <Section title="Experience" edit={editExp} setEdit={setEditExp}>



            {editExp ? (
              <>
                <Input placeholder="Infosys" value={experience.company}
                  onChange={e => setExperience({ ...experience, company: e.target.value })} />
                <Input placeholder="frontened developer" value={experience.role}
                  onChange={e => setExperience({ ...experience, role: e.target.value })} />
                <Input placeholder="2018-19" value={experience.duration}
                  onChange={e => setExperience({ ...experience, duration: e.target.value })} />
                <Input placeholder="Ranchi" value={experience.location}
                  onChange={e => setExperience({ ...experience, location: e.target.value })} />
              </>
            ) : (
              <>
                <p lassName="text-sm"><b>Company:</b> {experience.company}</p>
                <p lassName="text-sm"><b>Role:</b> {experience.role}</p>
                <p className="text-sm"><b>Duration:</b> {experience.duration}</p>
                <p className="text-sm"><b>Location:</b>{experience.location}</p>
              </>
            )}
          </Section>

          <Section title="Qualification" edit={editEdu} setEdit={setEditEdu}>
            {editEdu ? (
              <>
                <Input placeholder="degree" value={education.degree}
                  onChange={e => setEducation({ ...education, degree: e.target.value })} />
                <Input placeholder="field" value={education.field}
                  onChange={e => setEducation({ ...education, field: e.target.value })} />
                <Input placeholder="2019-now" value={education.duration}
                  onChange={e => setEducation({ ...education, duration: e.target.value })} />
              </>
            ) : (
              <>
                <p><b>Degree:</b> {education.degree}</p>
                <p><b>Field:</b> {education.field}</p>
                <p><b>Duration:</b> {education.duration}</p>
              </>
            )}
          </Section>

          <Section title="Resume" edit={editResume} setEdit={setEditResume}>
            {editResume ? (
              <Input type="file"
                onChange={e => setResume({ name: e.target.files[0].name, file: e.target.files[0] })} />
            ) : (
              <p className="text-blue-600">{resume.name}</p>
            )}
          </Section>

          {/* Applied Jobs */}
          <div className="bg-white rounded-2xl p-4 backdrop-blur border-white/40 shadow-lg">
            <h3 className="font-bold text-lg mb-4 text-center">Applied Jobs</h3>
            <AppliedJobTable />
            
          </div>



          <Button onClick={saveProfileHandler}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600
                       text-white py-3 rounded-xl
                       hover:scale-[1.02] hover:shadow-lg transition">
            Save Profile
          </Button>

        </div>
      </div>

      {/* ================= IMAGE CROP MODAL ================= */}
      {isCropOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-4 w-[320px]">
            <div className="relative w-64 h-64 mx-auto bg-gray-200">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(e.target.value)}
              className="w-full mt-4"
            />

            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={() => setIsCropOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  const cropped = await getCroppedImg(image, croppedAreaPixels);
                  setFinalImage(cropped);
                  setIsCropOpen(false);
                  toast.success("Profile image updated");
                }}
              >
                Save Image
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* ================= REUSABLE ================= */
const Section = ({ title, edit, setEdit, children }) => (
  <div className="backdrop-blur bg-white/70 border border-white/30
                  rounded-2xl p-6 shadow-md
                  hover:-translate-y-1 hover:shadow-xl transition">    
                  
      <div className="flex justify-between mb-4">
        <h3 className="font-bold text-lg">{title}</h3>
      <button onClick={() => setEdit(!edit)}>
        {edit ? <Save /> : <Pencil />}
      </button>
    </div>
    {children}
  </div>
);

export default Profile;



