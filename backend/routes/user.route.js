import express from 'express';
import { googleLogin, login, logout, register, updateProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout)
router.post("/profile/update", isAuthenticated,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 }
  ]),
  updateProfile
);
router.route("/google-login").post(googleLogin)


export default router;