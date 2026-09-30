import dotenv from "dotenv"
import path from "path"

dotenv.config({path:path.resolve (`./.env.${process.env.NODE_ENV}`)})

let port = process.env.PORT
let databaseUri = process.env.DATABASE_URI
let Salt = process.env.SALT_ROUND
let mode = process.env.MODE

export const env = {
    port , 
    databaseUri,
    Salt,
    mode
}
