import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
    name: 'job',
    initialState:{
        allJobs: [],
        adminJobs: [],  
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
    },
    reducers: {
        // actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
            applicants: [{}]
        },
       setAdminJobs: (state, action) => {   
      state.adminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSeachedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        }
    },
});

export const { setAllJobs, setSingleJob, setAdminJobs, setSearchJobByText,setAllAppliedJobs, setSeachedQuery } = jobSlice.actions;
export default jobSlice.reducer;