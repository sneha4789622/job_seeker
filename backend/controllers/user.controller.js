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

    // 1️⃣ Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);

    const { email, name, picture } = decodedToken;

    // 2️⃣ Find or create user
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

    // 3️⃣ Create JWT
    const jwtToken = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    // 4️⃣ Send cookie + response
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


const generateToken=(id)=>{
    
    // console.log("JWT TOKEN:", process.env.JWT_TOKEN);
    return jwt.sign({id}, process.env.JWT_TOKEN, {expiresIn:"60d"})
}





export const register = async (req, res) => {
    try {

        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        };
       const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

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
             profile:{
                profilePhoto:cloudResponse.secure_url,
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
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        
        const file = req.file;
        // cloudinary ayega idhar
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);


        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
      
         if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }


           

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}





