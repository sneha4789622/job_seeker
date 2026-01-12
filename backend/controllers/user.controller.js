import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import admin from "../utils/firebaseAdmin.js";
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloudinary.js";
import dotenv, { config } from 'dotenv'

dotenv.config()


export const googleLogin = async (req, res) => {
  try {

    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token missing",
      });
    }


    const decodedToken = await admin.auth().verifyIdToken(token);

    const { email, name, picture } = decodedToken;


    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        fullname: name,
        email,
        role: "jobseeker",
        profile: {
          profilePhoto: picture,
        },

      });
    }


    const jwtToken = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );


    res
      .cookie("token", jwtToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .status(200)
      .json({
        success: true,
        user,
      });

  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({
      success: false,
      message: "Google login failed",
    });
  }
};


const generateToken = (id) => {

  return jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: "60d" })
}





export const register = async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false
      });
    };

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: 'User already exists with this email',
        success: false,
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {

      }

    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true
    });
  } catch (error) {
    console.log(error);
  }
}

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // console.log(email,password,role);
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false
      });
    };
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false
      });
    };
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({

        message: "Invalid credentials",
        success: false
      });
    };
    // check role is correct or not
    if (user.role !== role) {
      return res.status(400).json({
        message: "Invalid role for this user",
        success: false
      });
    }
    const tokenData = {
      userId: user._id,
    }

    const token = await jwt.sign(tokenData,
      process.env.SECRET_KEY, { expiresIn: '7d' });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    }

    return res.status(200).cookie("token", token,
      {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict'
      }).json({
        message: `Welcome back ${user.fullname}`,
        token,
        user,
        success: true
      });
  } catch (error) {
    console.log("Login error:", error);
  }
}


export const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true
    });
  } catch (error) {
    console.log("Logout error:", error);
  }
}





export const updateProfile = async (req, res) => {
  try {
    console.log("REQ.ID:", req.id);
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    console.log(user);

    const {
      fullname,
      phoneNumber,
      email,
      bio,
      skills,
      companyName,
      website,
      location,
      description
    } = req.body;

    const resumeFile = req.files?.resume?.[0];
    const photoFile = req.files?.profilePhoto?.[0];

    const user = await User.findById(req.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (fullname) user.fullname = fullname;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (email) user.email = email;

    if (user.role === "jobseeker") {
      if (bio) user.profile.bio = bio;
      if (skills) user.profile.skills = skills.split(",");

      if (resumeFile) {
        const resumeUri = getDataUri(resumeFile);
        const resumeUpload = await cloudinary.uploader.upload(
          resumeUri.content,
          { resource_type: "auto", folder: "resumes", access_mode: "public", content_type: "application/pdf" }
        );
        user.profile.resume = resumeUpload.secure_url;
        user.profile.resumeOriginalName = resumeFile.originalname;
      }
    }

    if (user.role === "admin" || user.role === "recruiter") {
      if (companyName) user.profile.companyName = companyName;
      if (website) user.profile.website = website;
      if (location) user.profile.location = location;
      if (description) user.profile.description = description;
    }

    if (photoFile) {
      const photoUri = getDataUri(photoFile);
      const photoUpload = await cloudinary.uploader.upload(
        photoUri.content,
        { folder: "profile_photos" }
      );
      user.profile.profilePhoto = photoUpload.secure_url;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user
    });

  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};


// export const updateProfile = async (req, res) => {
//   try {
//     console.log("REQ.ID:", req.id);
//     console.log("BODY:", req.body);
//     console.log("FILES:", req.files);

//     const fullname = req.body?.fullname;
//     const phoneNumber = req.body?.phoneNumber;
//     const bio = req.body?.bio;
//     const skills = req.body?.skills
//     const resumeFile = req.files?.resume?.[0];
//     const photoFile = req.files?.profilePhoto?.[0];

//     const user = await User.findById(req.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (fullname) user.fullname = fullname;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (bio) user.profile.bio = bio;
//     if (skills) user.profile.skills = skills.split(",");

//     if (resumeFile) {
//       const resumeUri = getDataUri(resumeFile);
//       const resumeUpload = await cloudinary.uploader.upload(
//         resumeUri.content,
//         { resource_type: "raw", folder: "resumes", }
//       );
//       user.profile.resume = resumeUpload.secure_url;
//       user.profile.resumeOriginalName = resumeFile.originalname;
//     }

//     if (photoFile) {
//       const photoUri = getDataUri(photoFile);
//       const photoUpload = await cloudinary.uploader.upload(
//         photoUri.content,
//         { folder: "profile_photos" }
//       );
//       user.profile.profilePhoto = photoUpload.secure_url;
//     }

//     await user.save();

//     return res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       user,
//     });

//   } catch (error) {
//     console.error("UPDATE PROFILE ERROR:", error);
//     return res.status(500).json({ message: error.message });
//   }
// }; 




