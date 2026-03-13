import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/authSlice";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Navbar from "./components/shared/Navbar";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import AppliedJobsTable from "./components/AppliedJobTable";
import JobDescription from "./components/JobDescription";

import Companies from "./components/admin/Companies";
import CreateCompanies from "./components/admin/CreateCompanies";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import UserProtectedRoute from "./components/auth/UserProtectedRoute";

import { AuthProvider } from "./context/AuthContext";
import EmployerDashboard from "./components/admin/EmployerDashboard";
import AdminJobsTable from "./components/admin/AdminJobsTable";
import JobDetailsModal from "./components/admin/JobDetailsModal";
import EditJob from "./components/admin/EditJob";

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

  // ✅ Handle Google login redirect
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

      <div className="min-h-screen pt-4">
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace />} />

          {/* USER PROTECTED ROUTES */}
          <Route
            path="/"
            element={
              <UserProtectedRoute>
                <Home />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/jobs"
            element={
              <UserProtectedRoute>
                <Jobs />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/browse"
            element={
              <UserProtectedRoute>
                <Browse />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <UserProtectedRoute>
                <Profile />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/description/:id"
            element={
              <UserProtectedRoute>
                <JobDescription />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/applied-jobs"
            element={
              <UserProtectedRoute>
                <AppliedJobsTable />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/job/:id"
            element={
              <UserProtectedRoute>
                <JobDetailsModal />
              </UserProtectedRoute>
            }
          />
          {/* ADMIN PROTECTED ROUTES */}
            <Route
            path="/admin/admin-dashboard"
            element={
              <ProtectedRoute>
                 <EmployerDashboard/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/companies"
            element={
              <ProtectedRoute>
                <Companies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/companies/create"
            element={
              <ProtectedRoute>
                <CreateCompanies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/companies/:id"
            element={
              <ProtectedRoute>
                <CompanySetup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <ProtectedRoute>
                <AdminJobsTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jobs/create"
            element={
              <ProtectedRoute>
                <PostJob />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/jobs/edit/:id"
            element={
              <ProtectedRoute>
                <EditJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jobs/:id/applicants"
            element={
              <ProtectedRoute>
                <Applicants />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default AppWrapper;
