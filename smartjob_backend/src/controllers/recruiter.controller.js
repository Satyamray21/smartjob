import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {Recruiter} from "../models/recruiter.model.js";
import fs from "fs/promises";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import path from "path";
export const createRecruiter = asyncHandler(async(req,res)=>{
    
    const {first_name,middle_name,last_name,gender,job_function,email,mobile,years,months,education,skills,pin_code,locality,state,city,
        password,description
    }=req.body

    const existingRecruiter = await Recruiter.findOne({email});
    if(existingRecruiter)
    {
        throw new ApiError(409,"Recruiter is already registered with mail")
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
export const loginRecruiter = asyncHandler(async(req,res)=>{
  try{
 const {email,password}=req.body;
 if(!email || !password)
 {
  throw new ApiError(403,"Please enter your email or password")
 }
 const recruiter = await Recruiter.findOne({email}).select("+password");
 if(!recruiter)
 {
  throw new ApiError(404,"Recruiter not found with this emailId");
 }
  if(recruiter.isInactive)
  {
    throw new ApiError(403,"Your account has been inactived , Please contact admin ");
  }
  if(recruiter.isBlocked)
  {
    throw new ApiError(403,"Your account has been blocked,Please contact admin");
  }

  const isPasswordCorrect = await bcrypt.hash(password,recruiter.password);
  if(!isPasswordCorrect)
  {
    throw new ApiError(401,"Password is invalid");
  }
  const token = jwt.sign(
    {recruiterId:recruiter.recruiterId, id:recruiter._id },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:"12h"},
  );
   res.cookie("accessToken", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 3600000 }); 
   const recruiterData = recruiter.toObject();
    delete recruiterData.password;

    return res.status(200).json(
      new ApiResponse(200, {
        token,
        recruiter: recruiterData,
      }, "Login Successfully")
    );
}
catch (err) {
  return res
    .status(400)
    .json(new ApiResponse(400, null, `Login Failed: ${err.message}`));
}


})
const tokenBlacklist = new Set();
export const logoutRecruiter  = asyncHandler(async(req,res)=>{
   try {
    
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "").trim();
    if (!token) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "User not logged in"));
  }
    if (token) {
      tokenBlacklist.add(token);
    }

    
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/"
    });

    res.status(200).json(new ApiResponse(200,{}, "User logged out successfully"));
  } catch (error) {
    console.error("Logout error:", error.message);
    throw new ApiError(500, "Logout failed", error.message);
  }
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
export const updateStatus = asyncHandler(async(req,res)=>{
    const {recruiterId,status} = req.params;
    
    let updateFields = {}
    switch(status.toLowerCase())
    {
        case "active":
        updateFields = {isActive:true,isInactive:false,isBlocked:false}
        break;
        case "inactive":
        updateFields ={isActive:false,isInactive:true,isBlocked:false}
        break;
        case "block":
        updateFields={isActive:false,isInactive:false,isBlocked:true}
        break;
        default:
            throw new ApiError(400, "Invalid status. Use 'active', 'inactive', or 'block'");

    }
    const recruiter = await Recruiter.findOneAndUpdate(
        {recruiterId},
        updateFields,
        {new:true,runValidators:true}
    );
    if(!recruiter)
    {
        throw new ApiError(404,"Recruiter not found");
    }
    return res
    .status(200)
    .json(new ApiResponse(
        200,recruiter,"Status updated Successfully"
    ))



})

export const activeRecruiter = asyncHandler(async (req, res) => {
  const recruiters = await Recruiter.find({
    isActive: true,
    
  });

  if (!recruiters.length) {
    throw new ApiError(404, "No active recruiters found");
  }

  res.status(200).json(
    new ApiResponse(200, recruiters, "Active Recruiter list fetched successfully")
  );
});

export const inactiveRecruiter = asyncHandler(async(req,res)=>{
    const recruiter = await Recruiter.find({isActive:false,isInactive:true,isBlocked:false})
    res.status(200).json(
    new ApiResponse(200, recruiter, recruiter.length ? "Inactive Recruiter list fetched successfully" : "No Inactive recruiters found")
);

})
export const blockRecruiter = asyncHandler(async(req,res)=>{
    const recruiter = await Recruiter.find({isActive:false,isInactive:false,isBlocked:true})
    res
    .status(201)
    .json(
        new ApiResponse(200,recruiter,recruiter.length ? "Blocked Recruiter list fetched successfully" : "No Blocked recruiters found")
    )
})

