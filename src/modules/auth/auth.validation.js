
import z from "zod"

export let userLoginSchema = z.strictObject({
    email:z.string().email(),
    password:z.string()
  })
