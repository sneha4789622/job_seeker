import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/utills/axiosInstance";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);


  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills || "",
    resume: null,
    profilePhoto: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    setInput({ ...input, resume: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("fullname", input.fullname);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("bio", input.bio);
      formData.append("skills", input.skills);

      if (input.resume) {
        formData.append("resume", input.resume);
      }

      if (input.profilePhoto) {
        formData.append("profilePhoto", input.profilePhoto);
      }

      const res = await axiosInstance.post(
        "/user/profile/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );


      dispatch(setUser(res.data.user));
      toast.success("Profile updated successfully");
      setOpen(false);

    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Profile update failed"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px] bg-white text-black"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Update User Profile</DialogTitle>
          <DialogDescription className="text-grey-600">
            Update your personal information and resume
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Name</Label>
              <Input
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                className="col-span-3 bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Email</Label>
              <Input
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                className="col-span-3 bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Number</Label>
              <Input
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="col-span-3 bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Bio</Label>
              <Input
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                className="col-span-3 bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Skills</Label>
              <Input
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                className="col-span-3 bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Resume</Label>
              <Input
                type="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="col-span-3 bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Profile Photo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setInput({ ...input, profilePhoto: e.target.files[0] })

                }
                className="col-span-3 bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />

            </div>

          </div>

          <DialogFooter>
            <Button type="submit" className="w-full my-4  bg-gradient-to-r from-blue-600 to-indigo-600
                      text-white py-3 rounded-xl
                      hover:scale-[1.02] hover:shadow-lg transition " disabled={loading}>
              {loading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
