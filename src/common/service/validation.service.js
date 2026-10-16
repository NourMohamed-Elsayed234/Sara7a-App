import { BadRequestException } from "../exciptions/error.exciption.js"



export const validation = (schema)=>{
return(req,res,next)=>{
     let {success,error}= schema.safeParse(req.body)
     if(!success){
        return BadRequestException({message:"invalud data",extra:error.issues})
    }
    next()
}

}
