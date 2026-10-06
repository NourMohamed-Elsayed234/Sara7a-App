import { Router } from "express";
import{sighup,signin,getUserById} from "./auth.service.js"
import { auth } from "../../common/middleware/index.js";
import {gnreateAccessToken} from "./auth.service.js"
const router = Router()




router.post("/sighup",async(req,res)=>{
    let data = await sighup(req.body)
    res.json(data)
})
router.post("/sign-in",async(req,res)=>{
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

export default router
