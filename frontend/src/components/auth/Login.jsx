import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utills/constant";
import { toast } from "sonner";
import { setLoading, setUser } from "@/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";


function Login({ setPage }) {
  const { loading, User } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    console.log(input);
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        {
          email: input.email,
          password: input.password
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(res.data.success);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        dispatch(setUser(res.data.user));
        if (res.data.user.role === "recruiter") {
          navigate("/admin/companies");
        } else {
          navigate("/home");
        }
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (User) {
      navigate("/");
    }
  }, []);

  return (
    <div className="">
      <div className="flex  bg-white text-blue-950 rounded-2xl p-5 justify-evenly text-center">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md
             backdrop-blur-xl bg-white/80
             border border-white/40
             rounded-3xl shadow-xl
             p-8 my-10
             animate-fade-in"
        >
          <h1 className="text-2xl font-bold text-center mb-1">Login</h1>
          <div className=" space-y-6">
            <div className=" flex-col ">
              <h1 className="text-center text-gray-500 mb-6">
                Welcome Back ...!!!
              </h1>
            </div>
            <div className="text-left my-2 flex flex-col gap-3">
              <div>
                <label>Email</label>

                <input
                  type="text"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="email"
                  className="w-full px-4 py-3 rounded-xl
                border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                transition-all duration-300"
                />
              </div>
              <div>
                <label>Password</label>

                <input
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-xl
                border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 mt-6">
              {/* Login Button */}
              {loading ? (
                <Button className="w-full py-3 rounded-xl " disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-3/4 py-3 rounded-xl text-white text-lg
               bg-blue-600
               hover:scale-[1.02] hover:shadow-lg
               hover:bg-gray-400 hover:text-black
               transition-all duration-300"
                >
                  Login
                </Button>
              )}

            </div>

            <p className="text-center text-md text-black-600 mt-6">
              Not signed up yet ...?
            </p>
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline ml-1"
            >
              Signup Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;