import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Navbar from "./components/shared/Navbar";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import AppliedJobsTable from "./components/AppliedJobTable";
import JobDescription from "./components/JobDescription";


function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      
      window.history.replaceState({}, document.title, "/");

      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />

      <div className="pt-24 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/browse" element={<Browse/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/description/:id" element={<JobDescription />} />
          <Route path="/applied-jobs" element={<AppliedJobsTable />} />

        </Routes>
      </div>
    </>
  );
}

export default AppWrapper;

