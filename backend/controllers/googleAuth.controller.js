import admin from "../utils/firebase.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: "ID token missing",
      });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const { email, picture } = decodedToken;
    const name = decodedToken.name || "Google User";

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        fullname: name,
        email,
        avatar: picture,
        role: "jobseeker",
        isGoogleUser: true,
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        isGoogleUser: user.isGoogleUser,
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      })
      .status(200)
      .json({
        success: true,
        user,
        token,
      });

  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};
