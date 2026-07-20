import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { sql } from "@/lib/server/db";

export async function POST(request:Request){
  const payload=await request.json();
  if(!payload?.fullName||!payload?.email||!payload?.company)return NextResponse.json({error:"Datos requeridos incompletos"},{status:400});
  await sql`INSERT INTO contact_requests (payload,status) VALUES (${sql.json(payload)},'PENDING')`;
  const transporter=nodemailer.createTransport({host:process.env.GMAIL_SMTP_HOST||"smtp.gmail.com",port:Number(process.env.GMAIL_SMTP_PORT||587),secure:false,auth:{user:process.env.GMAIL_EMAIL,pass:(process.env.GMAIL_PASSWORD||"").replace(/\s/g,"")}});
  await transporter.sendMail({from:`BWP Software <${process.env.GMAIL_EMAIL}>`,to:process.env.YOUR_EMAIL,replyTo:payload.email,subject:`Nueva solicitud web: ${payload.company}`,text:`Nombre: ${payload.fullName}\nEmpresa: ${payload.company}\nCorreo: ${payload.email}\nTeléfono: ${payload.phone||""}\nSolución: ${payload.solutionType||""}\nDescripción: ${payload.description||payload.requirements||""}`});
  return NextResponse.json({ok:true},{status:201});
}
