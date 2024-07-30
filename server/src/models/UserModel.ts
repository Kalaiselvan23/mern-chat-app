import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";

const UserSchema= new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true, "Password is required"],
    },
    firstName:{
        type:String,
        required:false,
    },
    lastName:{
        type:String,
        required:false,
    },
    image:{
        type:String,
        required:false,
    },
    color:{
        type:Number,
        required:false,
    },
    profileSetup:{
        type:Boolean,
        default:false,
    }
})

// UserSchema.pre("save",async(next)=>{
//     const salt=await genSalt();
//     this.password=await hash(this.password, salt);
//     next();
// })

const User=mongoose.model("Users",UserSchema);
export default User