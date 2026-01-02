
// // NAVIGATION SECTION--------------------------------------------
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/authSlice";
import { toast } from "sonner";


function Navbar() {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());                 
    localStorage.removeItem("token");  
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-xl font-bold text-blue-950">JobSeeker</a>




        {/* Right Menu */}
        <ul className="flex items-center gap-8">

          <li className="hover:text-indigo-600 transition cursor-pointer"><Link to="/">Home</Link></li>
          <li className="hover:text-indigo-600 transition cursor-pointer"><Link to="/jobs">Jobs</Link></li>
          <li className="hover:text-indigo-600 transition cursor-pointer"><Link to="/browse">Browse</Link></li>

          <li className="flex items-center">
            {
              !user ? (
                <div className="flex items-center gap-2">
                  <Link to="/login"><Button variant="outline">Login</Button></Link>
                  <Link to="/signup"><Button className="text-white bg-blue-950 hover:bg-white hover:text-blue-950 hover:border-black">Signup</Button></Link>
                </div>
              ) : (
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="cursor-pointer">
                      {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto ||
                          user?.avatar ||
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="profile"
                      />

                    </Avatar>
                  </PopoverTrigger>

                  <PopoverContent className="w-72">
                    <div className="flex gap-3 mb-4">
                      <Avatar>
                        <AvatarImage
                          src={
                            user?.profile?.profilePhoto ||
                            user?.avatar ||
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          }
                          alt="profile"
                        />
                      </Avatar>

                      <div>
                        <h4 className="font-medium">Bharti MernStack</h4>
                        <p className="text-sm text-muted-foreground">
                          Full Stack Developer
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col my-2 gap-2">
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <LogOut />

                        <Button variant="link" onClick={logoutHandler}>
                          Logout
                        </Button>

                      </div>

                    </div>
                  </PopoverContent>
                </Popover>

              )
            }

          </li>

        </ul>
      </div>
    </nav>
  );
};


export default Navbar;
