import nodemailer from "nodemailer";
import { env } from "../../config/env.service.js";

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:env.email,
   pass:env.appPassword
  }
});
export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: "sara7a@gmail.com",
      to,
      subject,
      html,
    })
    console.log("email sent")
  } catch (error) {
    console.log("email failed", error.message)
  }
}
