import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import admin from "../utils/firebaseAdmin.js";
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloudinary.js";
<<<<<<< HEAD
import dotenv, { config } from 'dotenv'

dotenv.config()

=======
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71

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


<<<<<<< HEAD
const generateToken=(id)=>{
    
    // console.log("JWT TOKEN:", process.env.JWT_TOKEN);
    return jwt.sign({id}, process.env.JWT_TOKEN, {expiresIn:"60d"})
}



=======
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71


export const register = async (req, res) => {
    try {
<<<<<<< HEAD
=======
          // console.log("FILE 👉", req.file); // 🔴 DEBUG LINE
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71

        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        };
<<<<<<< HEAD
       const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
=======
      //  const file = req.file;
      //   const fileUri = getDataUri(file);
      //   const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
// let profilePhoto = "";

// if (req.file) {
//   const fileUri = getDataUri(req.file);
//   const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
//   profilePhoto = cloudResponse.secure_url;
// }
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71

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
<<<<<<< HEAD
             profile:{
                profilePhoto:cloudResponse.secure_url,
=======
            profile:{
                profilePhoto,
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
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

<<<<<<< HEAD
        const token = await jwt.sign(tokenData, 
            process.env.SECRET_KEY, { expiresIn: '7d' });
=======
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71

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
<<<<<<< HEAD
                token,
=======
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
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
        
<<<<<<< HEAD
        const file = req.file;
        // cloudinary ayega idhar
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
=======
        // const file = req.file;
        // // cloudinary ayega idhar
        // const fileUri = getDataUri(file);
        // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71


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
      
<<<<<<< HEAD
         if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
=======
        // resume comes later here...
        if(cloudResponse){
            // user.profile.resume = cloudResponse.secure_url // save the cloudinary url
           if (req.file) {
  const fileUri = getDataUri(req.file);
  const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
  user.profile.profilePhoto = cloudResponse.secure_url;
}

>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }


<<<<<<< HEAD
           

=======
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
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






// export const updateProfile = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, bio, skills } = req.body;

//     const userId = req.id;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found"
//       });
//     }

//     // ensure profile object exists
//     if (!user.profile) {
//       user.profile = {};
//     }

//     // basic fields
//     if (fullname) user.fullname = fullname;
//     if (email) user.email = email;
//     if (phoneNumber) user.phoneNumber = phoneNumber;

//     // profile fields
//     if (bio) user.profile.bio = bio;
//     if (skills) {
//       user.profile.skills = skills.split(",").map(s => s.trim());
//     }

//     // resume
//     if (req.file) {
//       user.profile.resume = req.file.path;
//     }

//     await user.save();

//     // fetch fresh user from DB
//     const updatedUser = await User.findById(userId);

//     return res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       user: updatedUser
//     });
//   } catch (error) {
//     console.error("Update profile error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error"
//     });
//   }
// };

