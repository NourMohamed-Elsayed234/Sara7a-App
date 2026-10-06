import express from "express"
import {env} from "./config/env.service.js"
import {dataBaseConnection} from "./database/connection.js"
import authrouter from "./modules/auth/auth.controller.js"
dataBaseConnection()
const app = express()
app.use(express.json())
app.use("/auth",authrouter)


// Global Error Handling Middleware
app.use((err, req, res, next) => {
    let stack = env.mode == "dev" ? err.stack : null;
    res.status(err.cause?.status || 500).json({ message: err.message, stack });
});


app.listen(env.port,()=>{
    console.log(`server is rinning on port ${env.port}`)
})
