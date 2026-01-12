import express from "express";
import Employer from "../models/employer.model.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const employer = new Employer(req.body);
    await employer.save();
    res.json(employer);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
