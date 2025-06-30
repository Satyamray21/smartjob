import jwt from "jsonwebtoken";
import { Recruiter } from "../models/recruiter.model.js";
import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";

export const verifyRecruiter = asyncHandler(async (req, res, next) => {
  // Check token from cookies or Authorization header
  const token =
    req.cookies?.accessToken ||
    req.headers.authorization?.replace("Bearer ", "").trim();

  if (!token) {
    throw new ApiError(401, "Access denied. No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    const recruiter = await Recruiter.findById(decoded.id).select("-password");
    
    if (!recruiter) {
      throw new ApiError(404, "Recruiter not found");
    }

    if (recruiter.isBlocked || recruiter.isInactive) {
      throw new ApiError(403, "Your account is not active");
    }

     req.user = {
      id: recruiter._id,
      recruiterId: recruiter.recruiterId,
      email: recruiter.email,
    }; 
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token", [error.message]);
  }
});
