import { Job } from "../models/job.model.js";
import Application from "../models/application.model.js";


// admin post krega job
export const postJob = async (req, res) => {
    try {
console.log("JOB CREATE BODY 👉", req.body);

        const { title, description, qualifications, responsibilities, salary, location, jobType, experience, position, companyId } = req.body;
    const userId = req.id;

        if (!title || !description || !qualifications || !responsibilities || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            qualifications,
            responsibilities,
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            createdBy: userId   
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
export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      updatedJob
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id; 

   
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID missing"
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    if (job.createdBy?.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this job"
      });
    }

    //  Delete applications first
    await Application.deleteMany({ job: jobId });

    //  Delete job
    await Job.findByIdAndDelete(jobId);

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};




// job seeker
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
// job seeker
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
       const job = await Job.findById(req.params.id)
      .populate("company")
      .populate("applications");
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
    const userId = req.id
 // recruiter id

    const jobs = await Job.find({ createdBy: userId })
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      jobs
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};

