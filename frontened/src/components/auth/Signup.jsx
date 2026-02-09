import React, { useEffect, useState } from "react";
import { Label } from "../ui/label"
import { Button } from "../ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from "@/utills/constant";
import { toast } from "sonner";
import axios from "axios";
import { setLoading, setUser } from "@/redux/authSlice";
import { useDispatch, useSelector } from 'react-redux';



const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""

  });
  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("logo", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      });
       if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        dispatch(setUser(res.data.user));

        toast.success(res.data.message);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);

    } finally {
      dispatch(setLoading(false))
    }

  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);


  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 sm:p-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">
        Create Account <span className="text-xl">🚀</span>
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Sign up to get started
      </p>

      <form onSubmit={submitHandler} className="space-y-5">

        {/* Full Name */}
        <div className="flex flex-col">
          <Label htmlFor="fullname">Full Name *</Label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              👤
            </span>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Your full name"
              className="w-full pl-10 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <Label htmlFor="email">Email Address *</Label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              📧
            </span>
            <input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Email address"
              className="w-full pl-10 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={changeEventHandler}
            placeholder="Phone Number"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition mt-1"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <Label htmlFor="password">Password *</Label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              🔒
            </span>
            <input
              type="password"
              id="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Password"
              className="w-full pl-10 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col">
          <Label>Profile Picture (Optional)</Label>
          <input
            type="file"
            accept="image/*"
            onChange={changeFileHandler}
            className="mt-1 border border-gray-300 rounded-xl p-2 cursor-pointer"
          />
          <p className="text-gray-400 text-sm mt-1">JPG or PNG (max 50KB)</p>
        </div>

        {/* Role Selection */}
        <div className="flex items-center gap-4 mt-2">
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="recruiter"
              checked={input.role === "recruiter"}
              onChange={changeEventHandler}
              className="accent-indigo-500"
            />
            Employer
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="jobseeker"
              checked={input.role === "jobseeker"}
              onChange={changeEventHandler}
              className="accent-indigo-500"
            />
            Jobseeker
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-3 mt-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? "Please wait..." : "Create Account"}
        </Button>
      </form>

      {/* Login Link */}
      <p className="text-center text-gray-500 mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-indigo-600 font-medium hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  </div>
);

};

export default Signup;
