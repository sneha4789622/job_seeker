import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appliedJobs: [],
  applicants: []
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setAppliedJobs: (state, action) => {
      state.appliedJobs = action.payload;
    },
    setAllApplicants: (state, action) => {
      state.applicants = action.payload;
    }
  }
});

export const { setAppliedJobs, setAllApplicants } =
  applicationSlice.actions;

export default applicationSlice.reducer;
