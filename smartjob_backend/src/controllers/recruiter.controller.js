import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {Recruiter} from "../models/recruiter.model.js";
import fs from "fs/promises";
import path from "path";
export const createRecruiter = asyncHandler(async(req,res)=>{
    
    const {first_name,middle_name,last_name,gender,job_function,email,mobile,years,months,education,skills,pin_code,locality,state,city,
        password,description
    }=req.body

    const existingRecruiter = await Recruiter.findOne({email});
    if(existingRecruiter)
    {
        throw new ApiError(409,"User is already registered with mail")
    }

    const profileImageLocalPath = req.files?.profileImage?.[0]?.path;

    if(!profileImageLocalPath)
    {
        throw new ApiError(400,"Profile Photo is required")
    }
    const uploadedImage = await uploadOnCloudinary(profileImageLocalPath);
    const profileImage = uploadedImage?.secure_url;
    const recruiter = await Recruiter.create(
        {

        
       name:{
        first_name,
        middle_name,
        last_name,
       } ,
        gender,
        job_function,
        email,
        mobile,
        experience:{
             years,
        months,
        },
       
        education,
        skills,
        current_location:{
        pin_code,
        locality,
        state,
        city,
        },
        
        password,
        description,
        profileImage,
    } 
    )
    
    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
        recruiter,
        "Recruiter Created Successfully"
        )
        
    )
})

export const viewRecruiterById = asyncHandler(async(req,res)=>{
    const {recruiterId} = req.params;
    
    const recruiter = await Recruiter.findOne({recruiterId}).select("-password");
    if(!recruiter) {
       
        throw new ApiError(404,"Recruiter not found");
    }
    return res
    .status(200)
    .json(new ApiResponse(200,recruiter,"Recruiter details fetched"))
})
export const viewAllRecruiter = asyncHandler(async(req,res)=>{
    const allRecruiter = await Recruiter.find().select("-password");
    if(!allRecruiter)
    {
        throw new ApiError(404,"Recruiter not found")
    }
    return res.
    status(200)
    .json(
        new ApiResponse(200,allRecruiter,"All Recruiter fetched Successfully")
    )
})
export const deleteRecruiter = asyncHandler(async(req,res)=>{
    const{recruiterId}= req.params;
    const recruiter = await Recruiter.findOneAndDelete({recruiterId});
    if(!recruiter)
    {
        throw new ApiError(404,"Recruiter not found");
    }
    res.
    status(200)
    .json(
        new ApiResponse(200,{},"Recruiter deleted Successfully")
    )
})
const deleteLocalFileIfExists = async (filePath) => {
  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("Error deleting local file:", error);
    }
  }
};

export const updateRecruiterById = asyncHandler(async (req, res) => {
  const { recruiterId } = req.params;

  const recruiter = await Recruiter.findOne({ recruiterId });
  if (!recruiter) {
    throw new ApiError(404, "Recruiter not found");
  }

  const updatedData = { ...req.body };

  // Check if new profile image is provided
  if (
    req.files &&
    req.files.profileImage &&
    req.files.profileImage.length > 0
  ) {
    const filePath = req.files.profileImage[0].path;

    // Upload to Cloudinary
    const uploadedImage = await uploadOnCloudinary(filePath);

    if (!uploadedImage || !uploadedImage.secure_url) {
      throw new ApiError(500, "Failed to upload image to Cloudinary");
    }

    // Store the Cloudinary URL
    updatedData.profileImage = uploadedImage.secure_url;

    // Clean up local file
    await deleteLocalFileIfExists(filePath);
  }

  const updatedRecruiter = await Recruiter.findOneAndUpdate(
    { recruiterId },
    updatedData,
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(200).json(
    new ApiResponse(200, updatedRecruiter, "Recruiter updated successfully")
  );
});

