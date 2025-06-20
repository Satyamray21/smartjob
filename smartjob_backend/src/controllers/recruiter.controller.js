import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {Recruiter} from "../models/recruiter.model.js";
import fs from "fs/promises";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import path from "path";
import sendEmail from '../utils/sendEmail.js';
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
export const changeRecruiterPassword = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: 'Access denied. No token provided or invalid format.' });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Old and new password are required' });
        }

        const recruiter= await Recruiter.findById(decoded.id);
        if (!recruiter) {
            return res.status(404).json({ message: 'Recrruiter not found' });
        }

        const isMatch = await recruiter.isPasswordCorrect(oldPassword);
        if (!isMatch) {
            return res.status(401).json({ message: 'Old password is incorrect' });
        }

        recruiter.password = newPassword;

        
        await recruiter.save({ validateBeforeSave: false });

        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error in changeRecruiterPassword:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// OTP Send by Email
export const sendResetCode = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const recruiter = await Recruiter.findOne({ email });
        if (!recruiter) return res.status(404).json({ message: "Recruiter not found" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        recruiter.resetPasswordOTP = otp;
        recruiter.resetPasswordExpires = expiry;
        await recruiter.save({ validateBeforeSave: false });

        // HTML email content
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                <h2 style="color: #2e7d32; text-align: center;">SmartJob - Password Reset</h2>
                <p>Hello,</p>
                <p>You requested to reset your SmartJob account password. Please use the OTP below to proceed:</p>
                <div style="text-align: center; margin: 20px 0;">
                    <span style="font-size: 30px; font-weight: bold; color: #2e7d32; background: #f1f1f1; padding: 12px 24px; border-radius: 8px; letter-spacing: 4px;">
                        ${otp}
                    </span>
                </div>
                <p>This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</p>
                <p>If you didn’t request this password reset, you can safely ignore this email.</p>
                <br/>
                <p style="color: #555;">Thanks & Regards,<br/>SmartJob Team</p>
            </div>
        `;

        await sendEmail(email, 'SmartJob Password Reset OTP', htmlContent);

        res.status(200).json({ message: 'OTP sent to email successfully' });
    } catch (error) {
        console.error('Error in sendResetCode:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Reset Password by OTP
export const resetPasswordWithOtp = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const recruiter = await Recruiter.findOne({ email });
        if (!recruiter) return res.status(404).json({ message: 'Recruiter not found' });

        if (
           recruiter.resetPasswordOTP !== otp ||
            !recruiter.resetPasswordExpires ||
            recruiter.resetPasswordExpires < new Date()
        ) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        recruiter.password = newPassword;
         recruiter.resetPasswordOTP = undefined;
         recruiter.resetPasswordExpires = undefined;

        await  recruiter.save({ validateBeforeSave: false });

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error in resetPasswordWithOtp:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

