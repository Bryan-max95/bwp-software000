import { NextResponse } from "next/server";
import { createAdminSession } from "@/lib/server/auth";
import { sql } from "@/lib/server/db";
import { hashPassword,verifyPassword } from "@/lib/password";

export async function POST(request:Request){
  const {username,password}=await request.json(); const identity=String(username||"").trim();
  let rows=await sql`SELECT id,email,username,display_name,password_hash,role,status,must_change_password FROM admin_users WHERE lower(coalesce(email,''))=lower(${identity}) OR lower(coalesce(username,''))=lower(${identity}) LIMIT 1`;
  if(!rows.length&&identity===process.env.ADMIN_USERNAME&&password===process.env.ADMIN_PASSWORD){rows=await sql`INSERT INTO admin_users(username,display_name,password_hash,role,status) VALUES (${identity},'BWP Root',${hashPassword(password)},'ROOT','ACTIVE') ON CONFLICT (username) DO UPDATE SET updated_at=now() RETURNING id,email,username,display_name,password_hash,role,status,must_change_password`}
  const user=rows[0]; if(!user||user.status!=="ACTIVE"||!verifyPassword(String(password||""),user.password_hash))return NextResponse.json({error:"Credenciales incorrectas"},{status:401});
  await sql`UPDATE admin_users SET last_login_at=now() WHERE id=${user.id}`;
  await createAdminSession({id:user.id,role:user.role,email:user.email,username:user.username,displayName:user.display_name});
  return NextResponse.json({ok:true,user:{id:user.id,email:user.email,username:user.username,displayName:user.display_name,role:user.role,mustChangePassword:user.must_change_password}});
}
