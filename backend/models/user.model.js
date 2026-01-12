import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true,
    required: function () { return !this.googleId; },
  },
  password: {
    type: String,
    required: function () { return !this.googleId; },
  },
  isGoogleUser: {
    type: Boolean,
    default: false,
  },

  role: {
    type: String,
    enum: ["recruiter", "jobseeker"],
    required: true,

  },
  avatar: {
    type: String,
  },


  profile: {
    bio: String,
    skills: [String],
    resume: String,
    resumeOriginalName: String,
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    companyName: String,
    website: String,
    location: String,
    description: String,

    profilePhoto: {
      type: String,
      default: "",
    },

  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
// 🔐 HASH PASSWORD
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});


export default mongoose.model("User", userSchema);
