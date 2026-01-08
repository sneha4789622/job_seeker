// export const uploadImage = (req, res) => {
//   console.log("FILE RECEIVED 👉", req.file);

//   if (!req.file) {
//     return res.status(400).json({
//       success: false,
//       message: "No file received",
//     });
//   }

//   res.status(200).json({
//     success: true,
//     file: req.file.originalname,
//   });
// };
// import User from "../models/user.model.js";
// import jwt from "jsonwebtoken";

// export const register = async (req, res) => {
//   try {
//     const { name, email, phoneNumber, password, role, avatar } = req.body;

//     if (!name || !email || !password || !role) {
//       return res.status(400).json({
//         message: "All required fields must be filled",
//       });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         message: "User already exists",
//       });
//     }

//     const user = await User.create({
//       fullname: name, // 👈 schema expects fullname
//       email,
//       phoneNumber,
//       password, // 👈 pre-save hook hashes it
//       role,
//       avatar,
//     });

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.SECRET_KEY,
//       { expiresIn: "1d" }
//     );

//     res.status(201).json({
//       token,
//       role: user.role,
//       user,
//     });
//   } catch (error) {
//     console.error("REGISTER ERROR 👉", error); // 🔴 VERY IMPORTANT
//     res.status(500).json({
//       message: "Registration failed",
//     });
//   }
// };
// //register new user
// export const register=async(req,res)=>{
//     console.log("forntend",req.body)
//     try {
//       const {name, email,phoneNumber, password, avatar, role}=req.body;
//       //check all field
//        if (!name || !email || !phoneNumber || !password) {
//       return res.status(400).json({ message: "All fields required" });
//     }
//       const userExists = await User.findOne({email});
//       if(userExists) return res.status(400).json({message:"User already exists"}) 
        
//     const user = await User.create({name, email, phoneNumber, password, role, avatar})
//     res.status(201).json({
//     _id:user._id,
//     name:user.name,
//     email:user.email,
//     phoneNumber:user.phoneNumber,
//     avatar:user.avatar,
//     role:user.role,
//     token:generateToken(user._id),
//     companyName:user.companyName || "",
//     companyDesription:user.companyDescription || "",
//     companyLogo:user.companyLogo || "",
//     resume:user.resume || ""
//     }) 

//     } catch (error) {
//     console.error("REGISTER ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// }

// //login
// export const login=async(req, res)=>{
//  try {
//     const{email, password}=req.body;
//     const user=await User.findOne({email}).select("+password")
    
//     if(!user || !(await user.matchPassword(password))){
//         // console.log(user)
//         return res.status(401).json({message:"Invalid email or password"})
//     }
//     res.status(201).json({
//     _id:user._id,
//     name:user.name,
//     email:user.email,
//     avatar:user.avatar,
//     role:user.role,
//     token:generateToken(user._id),
//     companyName:user.companyName || "",
//     componentDesription:user.companyDescription || "",
//     companyLogo:user.companyLogo || "",
//     resume:user.resume || ""
//     }) 

    
//  } catch (error) {
//         res.status(500).json({message: error.message})
//  }
// }

// export const getme=async(req, res)=>{

// }
 