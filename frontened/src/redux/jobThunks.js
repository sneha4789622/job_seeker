import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* 🌐 BASE API */
const API = "http://localhost:8000/api/v1";

/* =====================================================
   🔹 FETCH ALL ADMIN JOBS (RECRUITER DASHBOARD)
   Backend: GET /job/admin/jobs
===================================================== */
export const fetchAdminJobs = createAsyncThunk(
  "job/fetchAdminJobs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/job/admin/jobs`, {
        withCredentials: true, // ✅ REQUIRED for auth cookie
      });

      return res.data.jobs; // backend sends { jobs }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch admin jobs"
      );
    }
  }
);

/* =====================================================
   🔹 FETCH ALL JOBS (PUBLIC)
===================================================== */
export const fetchAllJobs = createAsyncThunk(
  "job/fetchAllJobs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/job`, {
        withCredentials: true,
      });

      return res.data.jobs;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch jobs"
      );
    }
  }
);

/* =====================================================
   🔹 FETCH SINGLE JOB
===================================================== */
export const fetchSingleJob = createAsyncThunk(
  "job/fetchSingleJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/job/${jobId}`, {
        withCredentials: true,
      });

      return res.data.job;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch job"
      );
    }
  }
);

/* =====================================================
   🔹 UPDATE APPLICATION STATUS (ACCEPT / REJECT)
   Backend: PATCH /application/:id/status
===================================================== */
export const updateApplicationStatus = createAsyncThunk(
  "job/updateApplicationStatus",
  async ({ applicationId, status }, { dispatch, rejectWithValue }) => {
    try {
      await axios.patch(
        `${API}/application/${applicationId}/status`,
        { status },
        { withCredentials: true }
      );

      // 🔁 Refresh dashboard jobs after status update
      dispatch(fetchAdminJobs());

      return { applicationId, status };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update application status"
      );
    }
  }
);
