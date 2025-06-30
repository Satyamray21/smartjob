import mongoose from "mongoose";
const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, default: 0 },
});
const Counter = mongoose.models.Counter || mongoose.model("Counter", counterSchema);
const jdSchema = new mongoose.Schema({
  job_title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  responsibilities: {
    type: [String],
    default: [],
  },
  required_skills: {
    type: [String], 
    required: true,
  },
  preferred_skills: {
    type: [String],
    default: [],
  },
  experience_required: {
    type: String, 
    default: "Fresher can apply",
  },
  education: {
    type: String, 
    default: "Not specified",
  },
  job_type: {
    type: String,
    enum: ["Full-Time", "Part-Time", "Internship", "Contract", "Freelance"],
    required: true,
  },
  remote_option: {
    type: String,
    enum: ["On-site", "Remote", "Hybrid"],
    default: "On-site",
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String, 
    required: true,
  },
  benefits: {
    type: [String], 
    default: [],
  },
  openings: {
    type: Number,
    default: 1,
  },
  application_deadline: {
    type: Date,
  },
  contact_email: {
    type: String,
    required: true,
  },
 
  company_info: {
    company_name: {
      type: String,
      required: true,
    },
    company_logo: {
      type: String,
      
    },
    company_website: {
      type: String,
      default: "",
    },
    company_description: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      default: "Not specified",
    },
    size: {
      type: String, 
      default: "Not specified",
    },
  },
  posted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recruiter", 
    required: true,
  },
  job_id:{
    type:String,
    required:true,
    unique:true,
  }
}, { timestamps: true });

jdSchema.pre("validate", async function (next) {
  if (this.isNew && !this.job_id) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: "job_id" },
        { $inc: { value: 1 } },
        { new: true, upsert: true }
      );
      const formattedId = counter.value.toString().padStart(4, "0");
      this.job_id = `JOB_${formattedId}`;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

export const JD= mongoose.model("JD", jdSchema);
