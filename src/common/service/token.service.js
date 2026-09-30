

import jwt from "jsonwebtoken"





export const auth =(req,res,next)=>{
    console.log(req.headers.token)
    let decodedData = jwt.verify(req.headers.token,"route")
    req.user = decodedData
    next()

}
