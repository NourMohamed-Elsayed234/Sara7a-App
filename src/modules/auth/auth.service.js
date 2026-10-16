import { env } from "../../config/env.service.js"
import { userModel } from "../../model/user.model.js"
import {genrateHash,genrateCompare,genrateargon2verifiy} from "../../common/service/service.js"
import * as argon2 from "argon2"
import jwt from "jsonwebtoken"
import { BadRequestException, ConflictException, NotFoundException, SuccssException } from "../../common/exciptions/error.exciption.js"
import{gnerateToken} from "../../common/service/token.service.js"
import{gnerateNewAccessToken} from "../../common/service/token.service.js"
import { sendEmail } from "../../common/middleware/sendEmail.js"
import { optional } from "zod"




export const sighup = async(body)=>{
  let{userName,email,password,confirmPassword,age,gender}=body
   if(password !== confirmPassword){
    return BadRequestException({message:"password and confirm password does not match"})
}
  let hashArgon2 =await argon2.hash(password)

  let existEmail = await userModel.findOne({email})
  if(existEmail){
    return ConflictException({message:"email already exist"})
  }else{
   let hashPassword = await genrateHash({plainText:password})
   if(hashPassword){
    let otp = Math.round(Math.random()* 1000000)
    let addUser = await userModel.create({userName,email,password:hashArgon2,age,gender,otp})
    if(addUser){
       await sendEmail({to:email,subject:"sighUp",html:`<h1>your otp is ${otp}</h1>`})
        return SuccssException({message:"user added sussfully",extra:addUser})
    }else{
        return NotFoundException({message :"somthing went wrong"})
    }
   }
  }
  
}
export const signin =async (body)=>{
    let {email,password}=body

let userData = await userModel.findOne({email})
if(!userData){

  return NotFoundException({message:"user not found"})
}
let comparePassword = await genrateargon2verifiy({plainText:password,hashedText:userData.password})
if(comparePassword){
    let {accesstoken,refereshtoken}= gnerateToken(userData)

    return ({message:"login succssfully",accesstoken,refereshtoken})
}else{
    return BadRequestException({message:"password not match"})
}
}
export const getUserById = async(id)=>{
    let userdata = await userModel.findById(id)
    return userdata

}
export const gnreateAccessToken = async(body)=>{
    let {refereshtoken} = body
    let{accesstoken} =gnerateNewAccessToken(refereshtoken)
    if(accesstoken){
        return {accesstoken}
    }else{
        throw BadRequestException({message:"invalid token"})
    }
}
export const verifieAccount =async(body)=>{
let {email,otp} =body
let userData = await userModel.findOne({email})
if(!userData){
    return NotFoundException({message:"user not found"})
}
if(userData.isverified){
    return BadRequestException({message:"user already verified"})
}
if(userData.otp != otp){
    return BadRequestException({message:"otp is not match"})
}
userData.isverified = true
userData.otp = null
await userData.save()
return userData
}
export const getAllUsers =async()=>{
let userData = await userModel.find()
return userData
}
