<<<<<<< HEAD
=======
// import express from "express";
// import { googleLogin } from "../controllers/googleAuth.controller.js";

// const router = express.Router();

// router.post("/google-login", googleLogin);

// export default router;

>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
import express from "express";
import admin from "../utils/firebaseAdmin.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
<<<<<<< HEAD
// import { upload } from "../middlewares/multer.js";
// // import { uploadImage } from "../controllers/auth.controller.js";
// // import { register } from "../controllers/auth.controller.js";
=======
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71



const router = express.Router();

<<<<<<< HEAD

=======
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
router.post("/google-login", async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: "ID token missing",
      });
    }

    // 🔐 Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(idToken);

    const { email, name } = decoded;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        fullname: name,
        email,
        role: "jobseeker",
<<<<<<< HEAD
        isGoogleUser: true,
        avatar: picture,
=======
        // isGoogleUser: true,
        // avatar: picture,
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
      });
    }

    // 🔑 Create JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // localhost
    });

    res.status(200).json({
      success: true,
      message: "Google login successful",
      user,
    });

  } catch (error) {
    console.error("Google login error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid Google token",
    });
  }
});

<<<<<<< HEAD


=======
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
export default router;
