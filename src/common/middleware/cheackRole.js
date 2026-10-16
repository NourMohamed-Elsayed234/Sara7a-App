import { userModel } from "../../model/user.model.js"
import { UnauthorizedException } from "../exciptions/error.exciption.js"




export const cheachRole = (roles)=>{
return async(req,res,next)=>{
let userData = await userModel.findById(req.user.id)
if(!userData.role.includes(roles)){
    return UnauthorizedException({message:"you are not authorized to accsess this api"})
}
next()
}

}
