// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCWOSyvnx52KqWBxNjQytVgCx7wuyUN8Ds",
  authDomain: "jobseeker-f2bf0.firebaseapp.com",
  projectId: "jobseeker-f2bf0",
  storageBucket: "jobseeker-f2bf0.firebasestorage.app",
  messagingSenderId: "807050165520",
  appId: "1:807050165520:web:d24ec7b352818ef20f3995",
  measurementId: "G-Y0N4M9HNF6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Auth & Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();