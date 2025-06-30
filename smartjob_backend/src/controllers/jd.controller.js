import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {JD} from "../models/jd.model.js"

export const createJD = asyncHandler(async (req, res) => {
  try {
    
    const {
      job_title, description, responsibilities, required_skills,
      preferred_skills, experience_required, education, job_type,
      remote_option, location, salary, benefits, openings,
      application_deadline, contact_email, company_name,
      company_logo, company_website, company_description,
      industry, size
    } = req.body;

    const job = await JD.create({
      job_title,
      description,
      responsibilities,
      required_skills,
      preferred_skills,
      experience_required,
      education,
      job_type,
      remote_option,
      location,
      salary,
      benefits,
      openings,
      application_deadline,
      contact_email,
      company_info: {
        company_name,
        company_logo,
        company_website,
        company_description,
        industry,
        size,
      },
      posted_by: req.user.id, 
    });
     const populatedJob = await JD.findById(job._id).populate("posted_by", "recruiterId");
        const formattedJob = {
      ...populatedJob.toObject(),
      posted_by: populatedJob.posted_by?.recruiterId || null,
      application_deadline: populatedJob.application_deadline
        ? new Date(populatedJob.application_deadline).toLocaleDateString("en-GB").replace(/\//g, "-")
        : null,
    };

    const response = new ApiResponse(201, formattedJob, "Job created successfully");
    return res.status(201).json(response);

  } catch (error) {
    console.log("Error",error.message);
     throw new ApiError(500, "Failed to create job", [error.message]);
  }
});

// for admin 
export const getAllJd = asyncHandler(async(req,res)=>{
  try{
    const viewAllJd = await JD.find();
    res.status(200)
    .json(new ApiResponse(201,viewAllJd,"All JD fetched Successfully"));
  }
  catch(error)
  {
     throw new ApiError(500, "Failed to create job", [error.message]);
  }
})

export const getOwnPostedJD = asyncHandler(async(req,res)=>{
  const recruiterId = req.user.id;
  const viewJd = await JD.find({posted_by:recruiterId})
                  .populate("posted_by", "recruiterId")
                  .sort({createdAt:-1})

    if(!viewJd || viewJd.length==0)
    {
      throw new ApiError(404, "No job postings found for this recruiter.");
    }
  
    const formattedJobs = viewJd.map(job => ({
    ...job.toObject(),
    posted_by: job.posted_by?.recruiterId || null,
    application_deadline: job.application_deadline
      ? new Date(job.application_deadline).toLocaleDateString("en-GB").replace(/\//g, "-")
      : null,
  }));
     return res.status(200).json(new ApiResponse(200, formattedJobs, "Recruiter's job postings fetched successfully"));
})

export const deleteJd = asyncHandler(async(req,res)=>{
  const {job_id} = req.params;
  try{
    const jd = await JD.findOneAndDelete({job_id})
    if(!jd)
    {
      throw new ApiError(404,"JD Not found");
    }
    res.status(200)
    .json(new ApiResponse(200,{},"JD deleted successfully"));
  }
  catch(error)
  {
    console.log("Error",error.message);
    throw new ApiError(500,"Failed to delete Jd",[error.message]);
  }
})
