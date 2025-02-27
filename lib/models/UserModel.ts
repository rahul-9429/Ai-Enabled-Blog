import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken: String,
    forgotPasswordExpires: Date,
    verifyToken: String,
    verifyTokenExpiry:Date,
})

export default mongoose.models.User || mongoose.model('User',Schema);