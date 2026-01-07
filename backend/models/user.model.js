<<<<<<< HEAD


import mongoose from "mongoose";
import bcrypt from "bcryptjs";
=======
import mongoose from "mongoose";
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
<<<<<<< HEAD
=======

>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
  email: {
    type: String,
    required: true,
    unique: true,
  },
<<<<<<< HEAD
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true,
    required: function(){ return !this.googleId; },
  },
  password: {
    type: String,
    required: function(){ return !this.googleId; },
  },
  isGoogleUser: {
    type: Boolean,
    default: false,
  },
  
=======

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
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
  role: {
    type: String,
    enum: ["recruiter", "jobseeker"],
    required: true,
<<<<<<< HEAD
  
  },
  avatar: {
    type: String,
  },


profile: {
=======
    default: "jobseeker",
  },

  profile: {
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
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
<<<<<<< HEAD
// 🔐 HASH PASSWORD
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});


export default mongoose.model("User", userSchema);
=======
export default User;
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
