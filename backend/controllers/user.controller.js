import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    //  Check if file exists
    const file = req.files?.logo?.[0];
    if (!file) {
      return res
        .status(400)
        .json({ message: "Logo file is required", success: false });
    }

    const fileUri = getDataUri(file);

    //  Cloudinary upload
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      resource_type: "auto",
    });

    //  Check existing user
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    //  Create user
    const user = await User.create({
      fullname,
      email: normalizedEmail,
      phoneNumber,
      password,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    //  Clean response (NO password)
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }
    console.log("user.pass", userExist.password)
    const isPasswordMatch = await bcrypt.compare(password, userExist.password);
    console.log("check", isPasswordMatch)
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const token = jwt.sign({ userId: userExist._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    const user = {
      _id: userExist._id,
      fullname: userExist.fullname,
      email: userExist.email,
      phoneNumber: userExist.phoneNumber,
      role: userExist.role,
      profile: userExist.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })

      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const logout = (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        sameSite: "Strict",
        secure: false,
        path: "/",
        maxAge: 0,
      })
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false });
  }
};

export const updateProfile = async (req, res) => {
  try {
    console.log("all data", req.files)
    const userId = req.id; // from auth middleware


    const body = req.body || {};

    const {
      fullname,
      email,
      phone,
      phoneNumber,
      bio,
      skills,
      linkedin,
      github,
      location,
      profession,
      education,
      experience,
      resume,
    } = body;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    /* ================= ENSURE PROFILE OBJECT ================= */
    if (!user.profile) {
      user.profile = {};
    }

    /* ================= ROOT FIELDS ================= */
    if (fullname !== undefined) user.fullname = fullname;
    if (email !== undefined) user.email = email;

    if (phone !== undefined) user.phoneNumber = phone;
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;

    /* ================= PROFILE FIELDS ================= */
    if (bio !== undefined) user.profile.bio = bio;

    if (skills !== undefined) {
      user.profile.skills = Array.isArray(skills)
        ? skills
        : skills.split(",").map((s) => s.trim());
    }

    if (linkedin !== undefined) user.profile.linkedin = linkedin;
    if (github !== undefined) user.profile.github = github;
    if (location !== undefined) user.profile.location = location;
    if (profession !== undefined) user.profile.profession = profession;
    if (education !== undefined) user.profile.education = education;
    if (experience !== undefined) user.profile.experience = experience;

    /* ================= RESUME UPLOAD ================= */
    const file = req.files?.resume?.[0];
    if (file) {
      // console.log("resume", req.file);

      user.profile.resumeOriginalName = file.originalname || "";
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "raw",
        folder: "resumes",
        use_filename: true,
      });

      console.log("cloud", cloudResponse, fileUri);

      user.profile.resume = cloudResponse.secure_url;
    }

    await user.save();

    /* ================= RESPONSE ================= */
    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
      updatedAt: user.updatedAt,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

// ✅ GET ME - fetch logged-in user's info
export const getMe = async (req, res) => {
  try {
    const userId = req.id; // from auth middleware
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error("GetMe Error:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false });
  }
};
