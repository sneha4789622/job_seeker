import React, { useEffect, useState } from "react";
import { Label } from "../ui/label"
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from "@/utills/constant";
import { toast } from "sonner";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { setLoading, setUser } from "@/redux/authSlice";
import { useDispatch, useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react'



const Signup = () => {



  const googleLoginHandler = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const res = await fetch(
        "http://localhost:8000/api/v1/auth/google-login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ idToken })
        }
      );

      const data = await res.json();
      console.log("Google login response:", data);

      if (data.success) {
        dispatch(setUser(data.user));
        toast.success("Logged in with Google");
        navigate("/");
      } else {
        toast.error(data.message || "Google login failed");
      }

    } catch (err) {
      console.error(err);
      toast.error("Google login failed");
    }
  };

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
    <div>
      <div className="flex z-10 bg-white text-blue-950 rounded-2xl p-5 justify-evenly text-center">
        <form onSubmit={submitHandler}
          className="w-1/2 backdrop-blur-xl bg-white/80
            border border-white/40
         rounded-3xl shadow-xl
            p-8 my-10
          animate-fade-in"
        >
          <h2 className="text-2xl font-bold text-center mb-1">Sign up</h2>
          <div className=" space-y-6">
            <div className=" flex-col ">
              <p className="text-center text-gray-700 mb-6">Great Decision Sign Up Here ...!!!</p>
            </div>

            <div className='flex items-center gap-6 mb-6 justify-between'>
              <RadioGroup className="flex items-center gap-4 my-5">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="jobseeker"
                    checked={input.role === 'jobseeker'}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r1">Job Seeker</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === 'recruiter'}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r2">Recruiter</Label>
                </div>
              </RadioGroup>
              <div className='flex items-center gap-2'>
                <Label>Profile</Label>
                <input
                  accept="image/*"
                  type="file"
                  onChange={changeFileHandler}
                  className="cursor-pointer"
                />
              </div>
            </div>

            <div className="text-left my-2">
              <Label >Full Name</Label><br />
              <input type="text" value={input.fullname} name="fullname" onChange={changeEventHandler} placeholder="Name"
                className="w-1/2 px-4 py-3 rounded-xl
                border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                transition-all duration-300">
              </input>
              <br /><br />

              <Label >Email</Label><br />
              <input type="email" value={input.email} name="email"
                onChange={changeEventHandler} placeholder="Email"
                className="w-1/2 px-4 py-3 rounded-xl
                border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                transition-all duration-300">
              </input>
              <br /><br />

              <Label>PhoneNumer</Label><br />
              <input type="text" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} placeholder="Phone Number"
                className="w-1/2 px-4 py-3 rounded-xl
                border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                transition-all duration-300">
              </input><br /> <br />

              <Label>Password</Label><br />
              <input type="password" value={input.password}
                name="password" onChange={changeEventHandler}
                placeholder="Password"
                className="w-1/2 px-4 py-3 rounded-xl
                border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                transition-all duration-300">

              </input>
            </div>

            <div className="flex flex-col items-center gap-4 mt-4">
              {/* Sign Up Button */}
              {loading ? <Button className="w-1/2 py-3 rounded-xl
                text-white text-lg bg-blue-600
               hover:scale-[1.02] hover:shadow-lg
                              hover:bg-gray-400 hover:text-black
                transition-all duration-300"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> :
                <Button
                  type="submit"
                  className="w-1/2 py-3 rounded-xl
                 text-white text-lg bg-blue-600
                 hover:scale-[1.02] hover:shadow-lg
                 hover:bg-gray-400 hover:text-black
                transition-all duration-300">
                  Sign Up
                </Button>
              }

              {/* Google Button */}

              {/* <button
                type="button"
                onClick={googleLoginHandler}
                className="w-1/2 bg-blue-600 text-lg
                 text-white px-2 py-2 rounded-2xl
                  hover:bg-gray-400 hover:text-black
                  hover:scale-[1.02]
                  transition-all duration-300">
                Continue with Google
              </button> */}
            </div>


            <p className="text-center text-md text-gray-600 mt-6">

              Already signed up ...?</p>
            <Link to="/login" className='text-blue-600 font-medium hover:underline ml-1'>Login Here</Link>

          </div>
        </form>
      </div>
    </div>

  );
};

export default Signup;
