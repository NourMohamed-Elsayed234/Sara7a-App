import { env } from "../../config/env.service.js"
import { userModel } from "../../model/user.model.js"
import {genrateHash,genrateCompare,genrateargon2verifiy} from "../../common/service/service.js"
import * as argon2 from "argon2"
import jwt from "jsonwebtoken"
import { BadRequestException, ConflictException, NotFoundException, SuccssException } from "../../common/exciptions/error.exciption.js"





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
    let addUser = await userModel.create({userName,email,password:hashArgon2,age,gender})
    if(addUser){
        return SuccssException({message:"user added sussfully"})
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
    let token = jwt.sign({id:userData._id},"route")
    return ({message:"login succssfully",token})
}else{
    return BadRequestException({message:"password not match"})
}
}
export const getUserById = async(id)=>{
    let userdata = await userModel.findById(id)
    return userdata

}
