import dotenv from "dotenv"
import path from "path"

dotenv.config({path:path.resolve (`./.env.${process.env.NODE_ENV}`)})

let port = process.env.PORT
let databaseUri = process.env.DATABASE_URI
let Salt = process.env.SALT_ROUND
let mode = process.env.MODE
let UserSignature = process.env.USER_SIGNATURE
let userRefreshSignature =process.env.USER_REFRESH_SIGNATURE
let adminSignature = process.env.ADMIN_SIGNATURE
let adminRefreshSignature = process.env.ADMIN_REFRESH_SIGNATURE


export const env = {
    port , 
    databaseUri,
    Salt,
    mode,
    UserSignature,
   userRefreshSignature,
   adminSignature,
   adminRefreshSignature
}
