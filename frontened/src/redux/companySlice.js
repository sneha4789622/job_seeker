import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        allCompanies:[],
        searchCompanyByText:"",
    },
    reducers:{
        // actions
        setSingleCompany:(state,action) => {
            state.singleCompany = action.payload;
        },
        setAllCompanies:(state,action) => {
            state.allCompanies = action.payload;
        },
        setSearchCompanyByText:(state,action) => {
            state.searchCompanyByText = action.payload;
        },
        setCompany: (state, action) => {
      state.company = action.payload;
    },
    }
});
export const {setSingleCompany,setAllCompanies,setSearchCompanyByText,setCompany} = companySlice.actions;
export default companySlice.reducer;