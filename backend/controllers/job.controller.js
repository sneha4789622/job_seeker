import { Job } from "../models/job.model.js";
import Application from "../models/application.model.js";
import {Company} from "../models/company.model.js";


// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate([
  { path: "applications" },
  { path: "company", select: "name logo" },
]);
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}


export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    const jobs = await Job.find({ created_by: adminId })
      .populate("company")
      .populate({
        path: "applications",
        select: "status"
      })
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false
      });
    }

    // 🔢 COUNTS
    const totalJobs = jobs.length;

    let totalApplicants = 0;
    let totalHired = 0;

    jobs.forEach(job => {
      const applicationsCount = job.applications.length;
      totalApplicants += applicationsCount;

      const hiredCount = job.applications.filter(
        app => app.status === "accepted"
      ).length;

      totalHired += hiredCount;
    });

    console.log("job counts",totalApplicants, totalHired, totalJobs)

    return res.status(200).json({
      success: true,
      totalJobs,
      totalApplicants,
      totalHired,
      jobs
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


//update job
export const updateJob = async (req, res) => {
  try {
    

    const jobId = req.params.id;
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      company,
    } = req.body;

    // Find the job by ID
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Optional: validate company ID
    if (company) {
      const companyExists = await Company.findById(company);
      if (!companyExists) {
        return res.status(400).json({ success: false, message: "Invalid company ID" });
      }
      job.company = company;
    }

    // Update fields if they exist
    if (title) job.title = title;
    if (description) job.description = description;
    if (requirements) {
      // If string, convert to array
      job.requirements = Array.isArray(requirements)
        ? requirements
        : requirements.split(",").map((r) => r.trim());
    }
    if (salary !== undefined) job.salary = Number(salary);
    if (location) job.location = location;
    if (jobType) job.jobType = jobType;
    if (experienceLevel !== undefined) job.experienceLevel = Number(experienceLevel);
    if (position !== undefined) job.position = Number(position);

    // Save updated job
    await job.save();

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    console.error("Update job error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    //  SAFETY CHECK (THIS FIXES YOUR ERROR)
    if (!job.created_by) {
      return res.status(403).json({
        success: false,
        message: "Job ownership data missing",
      });
    }

    if (job.created_by.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this job",
      });
    }

    await Application.deleteMany({ job: jobId });
    await job.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });

  } catch (error) {
    console.error("DELETE JOB ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
