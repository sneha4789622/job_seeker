import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 🔍 First check by googleId
        let user = await User.findOne({ googleId: profile.id });

        // 🔁 Fallback: check by email
        if (!user) {
          user = await User.findOne({
            email: profile.emails[0].value,
          });
        }

        // 🆕 Create new Google user
        if (!user) {
          user = await User.create({
            fullname: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,     // ✅ VERY IMPORTANT
            role: "jobseeker",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
