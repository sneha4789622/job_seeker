import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
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

export default router;
