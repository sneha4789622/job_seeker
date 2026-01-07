import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
<<<<<<< HEAD
import {singleUpload} from "../middlewares/multer.js";
=======
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71

const router = express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
<<<<<<< HEAD
router.route("/update/:id").put(isAuthenticated,singleUpload, updateCompany);
=======
router.route("/update/:id").put(isAuthenticated, updateCompany);
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71

export default router;