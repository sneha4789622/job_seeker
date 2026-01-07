import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
<<<<<<< HEAD
import {applyJob,getApplicantsByJob,getAppliedJobs,updateStatus,} from "../controllers/application.controller.js";

const router = express.Router();

// APPLY JOB
router.post("/apply/:id", isAuthenticated, applyJob);

// STUDENT – APPLIED JOBS
router.get("/get", isAuthenticated, getAppliedJobs);

// ADMIN – GET APPLICANTS
router.get("/:id/applicants", isAuthenticated, getApplicantsByJob);

// UPDATE STATUS
router.post("/status/:id/update", isAuthenticated, updateStatus);
=======
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
 
const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);
 
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71

export default router;
