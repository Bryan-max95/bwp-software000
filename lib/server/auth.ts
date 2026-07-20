import "server-only";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

const COOKIE="bwp_admin_session";
const secret=()=>new TextEncoder().encode(process.env.ENCRYPTION_KEY || "");

export async function createAdminSession(user:{id:string;role:string;email?:string|null;username?:string|null;displayName:string}){
  const token=await new SignJWT({role:user.role,email:user.email,username:user.username,displayName:user.displayName}).setSubject(user.id).setProtectedHeader({alg:"HS256"}).setIssuedAt().setExpirationTime("8h").sign(secret());
  (await cookies()).set(COOKIE,token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:60*60*8});
}
export async function getCurrentAdmin(){try{const token=(await cookies()).get(COOKIE)?.value;if(!token)return null;const {payload}=await jwtVerify(token,secret());return payload.sub?payload:null}catch{return null}}
export async function isAdmin(){return Boolean(await getCurrentAdmin())}
export async function clearAdminSession(){(await cookies()).set(COOKIE,"",{httpOnly:true,path:"/",maxAge:0})}
