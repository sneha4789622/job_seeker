import { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utills/constant";
import axios from "axios";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await axios.post(
        `${USER_API_END_POINT}/logout`
      );

      dispatch(logout());               // clear Redux
      localStorage.removeItem("token"); // clear localStorage

      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.log(error)
      toast.error(
        error?.response?.data?.message || "Failed to logout"
      );
    }
  };




  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        {/* LOGO */}
        <Link
          to="/"
          className="text-xl font-extrabold tracking-tight text-blue-950"
        >
          Job<span className="text-indigo-600">Seeker</span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {user && user.role === "recruiter" ? (
            <>
              <NavItem to="/admin/companies" label="Companies" />
              <NavItem to="/admin/jobs" label="Jobs" />
            </>
          ) : (
            <>
              <NavItem to="/" label="Home" />
              <NavItem to="/jobs" label="Jobs" />
              <NavItem to="/browse" label="Browse" />
            </>
          )}

          {/* AUTH SECTION */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-full transition">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        user?.avatar ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                    />
                  </Avatar>
                </div>
              </PopoverTrigger>

              <PopoverContent
                align="end"
                className="w-72 rounded-xl shadow-lg border p-4 bg-white"
              >
                {/* PROFILE HEADER */}
                <div className="flex gap-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        user?.avatar ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                    />
                  </Avatar>

                  <div className="leading-tight bg-white">
                    <h4 className="font-semibold">{user?.fullname}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {user?.profile?.bio || "No bio available"}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col gap-1">
                  <Link
                    to={
                      user.role === "jobseeker"
                        ? "/profile"
                        : "/admin/admin-dashboard"
                    }
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition"
                  >
                    <User2 size={16} />
                    View Profile
                  </Link>

                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </ul>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 bg-white border-b shadow-sm">
          <ul className="flex flex-col gap-4">
            {user && user.role === "recruiter" ? (
              <>
                <NavItem to="/admin/companies" label="Companies" />
                <NavItem to="/admin/jobs" label="Jobs" />
              </>
            ) : (
              <>
                <NavItem to="/" label="Home" />
                <NavItem to="/jobs" label="Jobs" />
                <NavItem to="/browse" label="Browse" />
              </>
            )}

            {!user ? (
              <div className="flex flex-col gap-2 mt-2">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-700 w-full"
                  >
                    Sign up
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <Link
                  to={user.role === "jobseeker" ? "/profile" : "/admin/admin-dashboard"}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <User2 size={16} />
                  View Profile
                </Link>

                <button
                  onClick={() => {
                    logoutHandler();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

/* 🔹 Nav Item with active underline */
const NavItem = ({ to, label }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative pb-1 transition ${isActive
          ? "text-indigo-600"
          : "text-gray-700 hover:text-indigo-600"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {label}
          <span
            className={`absolute left-0 -bottom-1 h-0.5 bg-indigo-600 transition-all ${isActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
          />
        </>
      )}
    </NavLink>
  </li>
);

export default Navbar;
