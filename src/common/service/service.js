import { env } from "../../config/env.service.js"
import bcrypt, { compare } from "bcrypt"
import * as argon2 from "argon2"

export const genrateHash =async ({plainText,Salt= env.Salt})=>{
 let hashData = await bcrypt.hash(plainText,Number(Salt))
 return hashData
}
export const genrateCompare = async ({plainText,hashedText})=>{
 return await bcrypt.compare(plainText,hashedText)


}
export const genrateargon2verifiy = async ({plainText,hashedText})=>{
 return await argon2.verify(hashedText,plainText)
}
