import { Company } from "../models/company.model.js";
<<<<<<< HEAD
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
=======
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
<<<<<<< HEAD
=======

>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }
<<<<<<< HEAD
=======

>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
<<<<<<< HEAD
            })
        };
=======
            });
        }

>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
<<<<<<< HEAD
        })
    } catch (error) {
        console.log(error);
    }
}
export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
=======
        });

    } catch (error) {
        console.log(error);
        
    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });

        if (companies.length === 0) {
            return res.status(404).json({
                message: "No companies found.",
                success: false
            });
        }

        return res.status(200).json({
            companies,
            success: true
        });

    } catch (error) {
        console.log(error);
       
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);

>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
<<<<<<< HEAD
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateCompany = async (req, res) => {
  try {
    const { name } = req.body;
    const file = req.file;

    let company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false
      });
    }

    // name update
    if (name) {
      company.name = name;
    }

    // logo update (ONLY IF FILE EXISTS)
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      company.logo = cloudResponse.secure_url;
    }

    await company.save();

    res.status(200).json({
      message: "Company updated successfully",
      success: true,
      company
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
=======
            });
        }

        return res.status(200).json({
            company,
            success: true
        });

    } catch (error) {
        console.log(error);
        
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;

        const updateData = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (website) updateData.website = website;
        if (location) updateData.location = location;

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated.",
            company,
            success: true
        });

    } catch (error) {
        console.log(error);
        
    }
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
};
