import mongoose from "mongoose";

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
    type: Number,
    unique: true,
    sparse: true,
    required: function () {
      return !this.googleId;
    },
  },

  password: {
    type: String,
    default:null,
    required: function () {
      return !this.googleId;
    },
  },
   avatar: {
      type: String, // Google profile image
    },

  isGoogleUser: {
      type: Boolean,
      default: false,
  },
  role: {
    type: String,
    enum: ["recruiter", "jobseeker"],
    required: true,
    default: "jobseeker",
  },

  profile: {
    bio: String,
    skills: [String],
    resume: String,
    resumeOriginalName: String,
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    profilePhoto: {
      type: String,
      default: "",
    },
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
