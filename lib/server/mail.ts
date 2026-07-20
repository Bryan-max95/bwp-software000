import "server-only";import nodemailer from "nodemailer";
export const mailer=nodemailer.createTransport({host:process.env.GMAIL_SMTP_HOST||"smtp.gmail.com",port:Number(process.env.GMAIL_SMTP_PORT||587),secure:false,auth:{user:process.env.GMAIL_EMAIL,pass:(process.env.GMAIL_PASSWORD||"").replace(/\s/g,"")}});
