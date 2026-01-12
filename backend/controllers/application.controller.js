import Application from "../models/application.model.js";
import { Job } from "../models/job.model.js";



export const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id



    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: userId
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied"
      });
    }

    const application = await Application.create({
      job: jobId,
      applicant: userId
    });

    await Job.findByIdAndUpdate(jobId, {
      $push: { applications: application._id }
    });

    return res.status(201).json({
      success: true,
      message: "Job applied successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id; // ✅ correct
    const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
      path: 'job',
      options: { sort: { createdAt: -1 } },
      populate: {
        path: 'company',
        options: { sort: { createdAt: -1 } },
      }
    });
    if (!application) {
      return res.status(404).json({
        message: "No Applications",
        success: false
      })
    };
    return res.status(200).json({
      application,
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}
// admin dekhega kitna user ne apply kiya hai

export const getApplicantsByJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "fullname email phoneNumber")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      applicants: applications,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: 'status is required',
        success: false
      })
    };

    // find the application by applicantion id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false
      })
    };

    // update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true
    });

  } catch (error) {
    console.log(error);
  }
}