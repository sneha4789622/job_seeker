import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// ================= REGISTER COMPANY =================
export const registerCompany = async (req, res) => {
  try {

    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        success: false,
        message: "Company name is required"
      });
    }

    const companyExists = await Company.findOne({ name: companyName });
    if (companyExists) {
      return res.status(400).json({
        success: false,
        message: "Company already exists"
      });
    }

    const company = await Company.create({
      name: companyName,
      userId: req.id
    });

    return res.status(201).json({
      success: true,
      message: "Company registered successfully",
      company
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


// ================= GET LOGGED-IN USER COMPANIES =================
export const getCompany = async (req, res) => {
  try {
    const userId = req.id

    const companies = await Company.find({ userId });

    return res.status(200).json({
      success: true,
      companies
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false });
  }
};

// ================= GET COMPANY BY ID =================
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found."
      });
    }

    return res.status(200).json({
      success: true,
      company
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false });
  }
};

// ================= UPDATE COMPANY =================
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    let company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found"
      });
    }

    if (company.userId.toString() !== req.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    if (name) company.name = name;
    if (description) company.description = description;
    if (website) company.website = website;
    if (location) company.location = location;


    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      company.logo = cloudResponse.secure_url;
    }

    await company.save();

    return res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false });
  }
};

export const updateCompanyProfile = async (req, res) => {
  try {
    const { name, email, website, location, description } = req.body;

    const company = await Company.findOne({ owner: req.id });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    company.name = name;
    company.email = email;
    company.website = website;
    company.location = location;
    company.description = description;

    if (req.file) {
      company.logo = req.file.filename;
    }

    await company.save();

    res.status(200).json({
      success: true,
      message: "Company profile updated",
      company,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
