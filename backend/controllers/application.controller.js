<<<<<<< HEAD
import Application  from "../models/application.model.js";
=======
import  Application  from "../models/application.model.js";
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
<<<<<<< HEAD
        console.log("USER ID 👉", userId);
    console.log("JOB ID 👉", jobId);
=======
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        };
        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        // check if the jobs exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        // create a new application
        const newApplication = await Application.create({
<<<<<<< HEAD
            job:jobId,
            applicant:userId,
=======
            job: jobId,
            applicant: userId,
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
<<<<<<< HEAD
            message:"Job applied successfully.",
            success:true
=======
            message: "Job applied successfully.",
            success: true
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
        })
    } catch (error) {
        console.log(error);
    }
};
<<<<<<< HEAD
export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
=======
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
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
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
            })
        };
        return res.status(200).json({
            application,
<<<<<<< HEAD
            success:true
=======
            success: true
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
        })
    } catch (error) {
        console.log(error);
    }
}
// admin dekhega kitna user ne apply kiya hai
<<<<<<< HEAD

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


export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
=======
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });
        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            })
        };
        return res.status(200).json({
            job,
            succees: true
        });
    } catch (error) {
        console.log(error);
    }
}
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: 'status is required',
                success: false
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
            })
        };

        // find the application by applicantion id
<<<<<<< HEAD
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
=======
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
<<<<<<< HEAD
            message:"Status updated successfully.",
            success:true
=======
            message: "Status updated successfully.",
            success: true
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
        });

    } catch (error) {
        console.log(error);
    }
}