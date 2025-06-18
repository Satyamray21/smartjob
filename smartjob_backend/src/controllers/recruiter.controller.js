import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {Recruiter} from "../models/recruiter.model.js";

export const createRecruiter = asyncHandler(async(req,res)=>{
    console.log("req",req.body);
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
    console.log("RecruiterId",recruiterId);
    const recruiter = await Recruiter.findOne({recruiterId}).select("-password");
    if(!recruiter) {
        console.log("Recruiter not found for ID:", recruiterId);
        throw new ApiError(404,"Recruiter not found");
    }
    return res
    .status(200)
    .json(new ApiResponse(200,recruiter,"Recruiter details fetched"))
})