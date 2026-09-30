import mongoose, { Schema } from "mongoose";
import { genderEnum, providerEnum, roleEmum } from "../common/index.js";


export const userSchema = Schema({
    userName:{
    type:String,
    require:true,
    max:30,
    min:3
    },
    email:{
      type:String,
    require:true,
    unique:true   
    },
    password:{
    type:String,
    require:true, 
    },
    age:{
        type:Number
    },
    gender:{
        type:String,
        enum:genderEnum,
        default:genderEnum.Male
        
    },
    role:{
       type:String,
        enum:roleEmum,
        default:roleEmum.User
        
    },
    provider:{
       type:String,
        enum:providerEnum,
        default:providerEnum.System
        
    },
    profileImage:{
        type:String
    },
    coverImage:{
        type:[String]
    },
    isverified:{
        type:Boolean,
        default:false
    }
    
},
{timestamp:true}
)


export const userModel = mongoose.model("user",userSchema)
