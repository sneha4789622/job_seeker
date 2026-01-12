import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {getCompany,getCompanyById,registerCompany,updateCompany} from "../controllers/company.controller.js";
import upload from "../middlewares/multer.js";


const router = express.Router();

// create company
router.post("/register", isAuthenticated, registerCompany);

// get logged-in user's companies
router.get("/get", isAuthenticated, getCompany);

// get company by id
router.get("/get/:id", isAuthenticated, getCompanyById);

// update company (name/logo)
router.put("/update/:id",isAuthenticated,upload.single("file"),   updateCompany);
export default router;
