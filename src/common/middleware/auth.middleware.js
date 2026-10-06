

import jwt from "jsonwebtoken"
import { env } from "../../config/env.service.js";
import { BadRequestException, NotFoundException } from "../exciptions/error.exciption.js";





export const auth = (req, res, next) => {
    try {
        const [flag, token] = req.headers.authorization.split(" ")

        switch (flag) { 
             case "Basic":

            const basicData = Buffer.from(token, "base64").toString()
            console.log(basicData)
            let [email, password] = basicData.split(":")
            break
            case "Bearer": {
                const decoded = jwt.decode(token)
                let signature

                switch (decoded?.aud) {
                    case "user":
                        signature = env.UserSignature
                        break
                    case "admin":
                        signature = env.adminSignature
                        break
                    default:
                        return BadRequestException({ message: "invalid audience" })
                }

                req.user = jwt.verify(token, signature)
                break;
            }
            default:
                return BadRequestException({ message: "invalid token type" })
        }
        next()
    } catch (err) {
        return NotFoundException({ message: err.message })
    }
}
