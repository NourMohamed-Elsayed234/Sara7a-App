import { Router } from "express";
import{sighup,signin,getUserById,verifieAccount,getAllUsers} from "./auth.service.js"
import { auth } from "../../common/middleware/index.js";
import {gnreateAccessToken} from "./auth.service.js"
import { validation } from "../../common/service/validation.service.js";
import { userLoginSchema } from "./auth.validation.js";
import {cheachRole} from "../../common/middleware/cheackRole.js"
const router = Router()




router.post("/sighup",async(req,res)=>{
    let data = await sighup(req.body)
    res.json(data)
})
router.post("/sign-in",validation(userLoginSchema),async(req,res)=>{
  
    let data = await signin(req.body)
    res.json(data)
})

router.get("/get-user-by-id",auth,async(req,res)=>{
    let data = await getUserById(req.user.id)
    res.json(data)
})
router.post("/gnreate-new-access-token",async(req,res)=>{
    let accesstoken = await gnreateAccessToken(req.body)
    res.json(accesstoken)
})
router.put("/verifie-account",async(req,res)=>{
    let data = await verifieAccount(req.body)
    res.json(data)
})
router.get("/get-all-users",auth,cheachRole(["1"]),async(req,res)=>{
    let data = await getAllUsers()
    res.json(data)
})
export default router
