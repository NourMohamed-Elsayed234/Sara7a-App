

import jwt from "jsonwebtoken"
import {env} from "../../config/env.service.js"



export const gnerateNewAccessToken =(refereshtoken)=>{
let data = jwt.decode(refereshtoken)
let signature
let refreshSignature
let aud
switch (data.aud) {
    case "admin":
        signature = env.adminSignature
        refreshSignature = env.adminRefreshSignature
        aud= "admin" 
        break;
    case "user":
        signature= env.UserSignature
        refreshSignature = env.userRefreshSignature
          aud = "user" 
        break;
    default:
        break;
}
let decodeRefreashToken = jwt.verify(refereshtoken,refreshSignature)
let accesstoken = jwt.sign({id:decodeRefreashToken.id},signature,{expiresIn:"30min",audience:aud})
 
 return {accesstoken}
 
}



















export const gnerateToken =(user)=>{
console.log(user)
let signature
let refreshSignature
let aud
switch (String(user.role)) {
    case "1":
        signature = env.adminSignature
        refreshSignature = env.adminRefreshSignature
        aud= "admin" 
        break;
    case "0":
        signature= env.UserSignature
        refreshSignature = env.userRefreshSignature
          aud = "user" 
        break;
    default:
        break;
}
 let accesstoken = jwt.sign({id:user._id},signature,{expiresIn:"30min",audience:aud})
 let refereshtoken = jwt.sign({id:user._id},refreshSignature,{expiresIn:"1y",audience:aud})
 return {accesstoken,refereshtoken}
 
}


