import mongoose from "mongoose";

const employerSchema = new mongoose.Schema({
  companyName: String,
  companyEmail: String,
  contactNumber: String,
  website: String
});

export default mongoose.model("Employer", employerSchema);
