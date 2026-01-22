import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    /* ================= BASIC AUTH INFO ================= */
    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      unique: true,
      sparse: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["recruiter", "jobseeker"],
      required: true,
    },

    /* ================= PROFILE ROOT ================= */
    avatar: {
      type: String,
      default: "",
    },

    /* ================= PROFILE DETAILS ================= */
    profile: {
      bio: { type: String, default: "" },
      location: { type: String, default: "" },
      profession: { type: String, default: "" },
      education: { type: String, default: "" },
      experience: { type: String, default: "Fresher" },
      skills: { type: [String], default: [] },
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      resume: { type: String, default: "" },
      resumeOriginalName: { type: String, default: "" },
      profilePhoto: { type: String, default: "" },

      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        default: null,
      },
    },
  },
  { timestamps: true }
);

/* ================= PASSWORD HASH (FIXED) ================= */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);
export default User;
