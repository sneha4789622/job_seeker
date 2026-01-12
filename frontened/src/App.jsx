import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Navbar from "./components/shared/Navbar";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import AppliedJobsTable from "./components/AppliedJobTable";
import JobDescription from "./components/JobDescription";
import { AuthProvider } from './context/AuthContext'
import Companies from "./components/admin/Companies";
import CreateCompanies from "./components/admin/CreateCompanies";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/authSlice";
import EditJob from "./components/admin/EditJob";
import Profile from "@/pages/Profile";

function AppWrapper() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
}

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const user = params.get("user");



    if (token && user) {
      localStorage.setItem("token", token);

      dispatch(setUser(JSON.parse(decodeURIComponent(user))));


      window.history.replaceState({}, document.title, "/");

      navigate("/");
    }
  }, [navigate, dispatch]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen  pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/description/:id" element={<JobDescription />} />
          <Route path="/applied-jobs" element={<AppliedJobsTable />} />

          {/* admin  */}
          <Route path="/admin/companies" element={<ProtectedRoute><Companies /></ProtectedRoute>} />
          <Route path="/admin/companies/create" element={<ProtectedRoute><CreateCompanies /></ProtectedRoute>} />
          <Route path="/admin/companies/:id" element={<ProtectedRoute><CompanySetup /></ProtectedRoute>} />
          <Route path="/admin/jobs" element={<ProtectedRoute><AdminJobs /></ProtectedRoute>} />
          <Route path="/admin/jobs/create" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
          <Route path="/admin/jobs/:id/applicants" element={<ProtectedRoute><Applicants /></ProtectedRoute>} />
          <Route path="/admin/jobs/edit/:id" element={<EditJob />} />




        </Routes>
      </div>
    </>
  );
}

export default AppWrapper;

