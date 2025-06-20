import mongoose from "mongoose";
import bcrypt from "bcrypt";
const recruiterSchema =  new mongoose.Schema({
    name:{
        first_name:{
            type:String,
            required:true
        },
        middle_name:{
            type:String,
        },
        last_name:{
            type:String,
            required:true,
        }
    },
    gender:{
        type:String,
        required:true
    },
    job_function:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    experience:{
       years:{
        type:Number,
        required:true,
        default:0
       },
       months:{
        type:Number,
        required:true,
        default:0,
        max:11
       }
    },
       education:{
        type:String,
        required:true
       },
       skills:{
        type:String,
        required:true
       },
       current_location:{
        pin_code:{
            type:String,
            required:true,
        },
        locality:{
            type:String,
            required:true,
        },
        state:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true,
        },
       },
       password:
       {
        type:String,
        required:true,
        minLength:[6,"Password should be minimum 6 letter long"],
       },
       description:
       {
        type:String,
       },
       profileImage:{
        type:String,
        required:true
       },
       role:{
        type:Number,
        default:2
       },
       isActive:{
        type:Boolean,
        default:true,
       },
       isInactive:{
        type:Boolean,
        default:false,
       },
       isBlocked:{
        type:Boolean,
        default:false
       },

       recruiterId:{
        type:String,
        unique:true
       },
       resetPasswordOTP: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date,
        },

    

},{timestamps:true});

recruiterSchema.pre("save",async function(next) {
    if(this.isModified("password"))
    {
        this.password=await bcrypt.hash(this.password,10)
    }
    if(!this. recruiterId)
    {
        const prefix = "RECT"
        const randomDigit = Math.floor(1000 + Math.random() * 9000);
         this.recruiterId = `${prefix}_${randomDigit}`
    }
    next();
})
recruiterSchema.methods.isPasswordCorrect=async function(password)
{
    return bcrypt.compare(password,this.password)
};
export const Recruiter = mongoose.model("Recruiter",recruiterSchema);

