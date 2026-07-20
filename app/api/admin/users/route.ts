import { createHash,randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/server/auth";
import { sql } from "@/lib/server/db";
import { hashPassword } from "@/lib/password";
import { mailer } from "@/lib/server/mail";

export async function GET(){
  const admin=await getCurrentAdmin();if(!admin)return NextResponse.json({error:"No autorizado"},{status:401});
  const users=await sql`SELECT id,email,username,display_name AS "displayName",role,status,must_change_password AS "mustChangePassword",last_login_at AS "lastLoginAt",created_at AS "createdAt" FROM admin_users ORDER BY created_at`;
  return NextResponse.json({users,profile:admin});
}

export async function POST(request:Request){
  const admin=await getCurrentAdmin();
  if(!admin?.sub||!["ROOT","ADMIN"].includes(String(admin.role)))return NextResponse.json({error:"Sin permisos"},{status:403});
  const {email,displayName,temporaryPassword,role="EDITOR"}=await request.json();
  if(!email||!displayName||String(temporaryPassword||"").length<10)return NextResponse.json({error:"Correo, nombre y contraseña temporal de al menos 10 caracteres son obligatorios"},{status:400});
  const users=await sql`INSERT INTO admin_users(email,display_name,password_hash,role,status,must_change_password,invited_by) VALUES (lower(${email}),${displayName},${hashPassword(temporaryPassword)},${role},'INVITED',true,${String(admin.sub)}) ON CONFLICT (email) DO UPDATE SET display_name=EXCLUDED.display_name,password_hash=EXCLUDED.password_hash,role=EXCLUDED.role,status='INVITED',must_change_password=true,updated_at=now() RETURNING id,email`;
  const token=randomBytes(32).toString("hex");const tokenHash=createHash("sha256").update(token).digest("hex");
  await sql`DELETE FROM admin_invitations WHERE user_id=${users[0].id} AND accepted_at IS NULL`;
  await sql`INSERT INTO admin_invitations(user_id,token_hash,expires_at) VALUES (${users[0].id},${tokenHash},now()+interval '48 hours')`;
  const url=`${(process.env.NEXT_PUBLIC_APP_URL||"").replace(/\/$/,"")}/host99/invitacion?token=${token}`;
  await mailer.sendMail({from:`BWP Software <${process.env.GMAIL_EMAIL}>`,to:email,subject:"Invitación al panel BWP Software",html:`<div style="font-family:Arial;padding:32px;color:#0f172a"><h2>Acceso al panel BWP Software</h2><p>Ha sido invitado al portal administrativo. Utilice la contraseña temporal entregada por el administrador y establezca una nueva.</p><a href="${url}" style="display:inline-block;background:#991b1b;color:white;padding:14px 22px;text-decoration:none;border-radius:6px;font-weight:bold">Verificar correo y activar acceso</a><p style="color:#64748b;font-size:12px">El enlace vence en 48 horas.</p></div>`});
  return NextResponse.json({ok:true});
}
