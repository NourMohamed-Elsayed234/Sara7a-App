import { Router } from "express";
import{sighup,signin,getUserById} from "./auth.service.js"
import { auth } from "../../common/service/token.service.js";
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




export default router
