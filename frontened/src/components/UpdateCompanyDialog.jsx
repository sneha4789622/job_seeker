import React, { useState } from "react";
import {
  Dialog, DialogContent, DialogFooter,
  DialogHeader, DialogTitle, DialogDescription
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/utills/axiosInstance";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateAdminProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    description: user?.description || "",
    email: user?.email || "",
    companyName: user?.profile?.companyName || "",
    website: user?.profile?.website || "",
    location: user?.profile?.location || "",
    profilePhoto: null,
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("fullname", input.fullname);
      formData.append("description", input.description);
      formData.append("email", input.email);
      formData.append("companyName", input.companyName);
      formData.append("website", input.website);
      formData.append("location", input.location);


      if (input.profilePhoto) {
        formData.append("profilePhoto", input.profilePhoto);
      }

      const res = await axiosInstance.post(
        "/user/profile/update",
        formData
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success("Admin profile updated");
        setOpen(false);
      }
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full bg-white text-black">
        <DialogHeader>
          <DialogTitle>Edit Admin Profile</DialogTitle>
          <DialogDescription className="text-grey-600">
            Update your company information
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submitHandler} className="space-y-3">
          <Input name="fullname" value={input.fullname} onChange={changeHandler} placeholder="Full Name"
            className="bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-500" />

          <Input name="email" value={input.email} onChange={changeHandler} placeholder="Email"
            className="bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-500" />

          <Input name="description" value={input.description} onChange={changeHandler} placeholder="decsription"
            className="bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-500" />

          <Input name="companyName" value={input.companyName} onChange={changeHandler} placeholder="Company Name"
            className="bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-500" />

          <Input name="website" value={input.website} onChange={changeHandler} placeholder="Website"
            className="bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-500" />

          <Input name="location" value={input.location} onChange={changeHandler} placeholder="Location"
            className="bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-500" />

          <Input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setInput({ ...input, profilePhoto: e.target.files[0] })
            }
          />

          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full my-4  bg-gradient-to-r from-blue-600 to-indigo-600
                      text-white py-3 rounded-xl
                      hover:scale-[1.02] hover:shadow-lg transition ">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAdminProfileDialog;
