import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {applyJob,getApplicantsByJob,getAppliedJobs,updateStatus,} from "../controllers/application.controller.js";

const router = express.Router();

// APPLY JOB
router.route("/apply/:id").post(isAuthenticated, applyJob);
// STUDENT – APPLIED JOBS
router.route("/get").get(isAuthenticated, getAppliedJobs);
// ADMIN – GET APPLICANTS
router.route("/:id/applicants").get(isAuthenticated, getApplicantsByJob);
// UPDATE STATUS
router.route("/status/:id/update").put(isAuthenticated, updateStatus);
export default router;
