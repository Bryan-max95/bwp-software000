import { readFile } from "fs/promises";
import { extname,join } from "path";
import postgres from "postgres";
import { hashPassword } from "../lib/password";
import { INITIAL_CLIENT_CASES,INITIAL_CONTACT_INFO,INITIAL_FAQS,INITIAL_INDUSTRIES,INITIAL_LEADERSHIP,INITIAL_PRODUCTS,INITIAL_SERVICES,INITIAL_SOLUTIONS } from "../lib/data";

const url=process.env.DATABASE_URL;if(!url)throw new Error("Falta DATABASE_URL en .env.local");const sql=postgres(url,{ssl:"require",max:1});
const mime=(file:string)=>({".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp"}[extname(file).toLowerCase()]||"application/octet-stream");
async function embed(path?:string){if(!path?.startsWith("/assets/"))return path;const file=join(process.cwd(),"public",path);const bytes=await readFile(file);return `data:${mime(file)};base64,${bytes.toString("base64")}`}

async function main(){
  const schema=await readFile(join(process.cwd(),"database","001_initial.sql"),"utf8");await sql.unsafe(schema);
  const cases=await Promise.all(INITIAL_CLIENT_CASES.map(async item=>({...item,logoDataUrl:item.logoDataUrl?await embed(item.logoDataUrl):undefined,coverImage:await embed(item.coverImage)})));
  const documents={services:INITIAL_SERVICES,solutions:INITIAL_SOLUTIONS,products:INITIAL_PRODUCTS,industries:INITIAL_INDUSTRIES,client_cases:cases,faqs:INITIAL_FAQS,contact_info:INITIAL_CONTACT_INFO,leadership:INITIAL_LEADERSHIP};
  for(const [key,payload] of Object.entries(documents)){const json=JSON.parse(JSON.stringify(payload));await sql`INSERT INTO cms_documents(key,payload) VALUES (${key},${sql.json(json)}) ON CONFLICT(key) DO UPDATE SET payload=EXCLUDED.payload,version=cms_documents.version+1,updated_at=now()`}
  const username=process.env.ADMIN_USERNAME;const password=process.env.ADMIN_PASSWORD;if(!username||!password)throw new Error("Faltan ADMIN_USERNAME o ADMIN_PASSWORD");
  await sql`INSERT INTO admin_users(username,display_name,password_hash,role,status) VALUES (${username},'BWP Root',${hashPassword(password)},'ROOT','ACTIVE') ON CONFLICT(username) DO NOTHING`;
  console.log(`Base preparada: ${Object.keys(documents).length} documentos CMS, ${cases.length} casos y usuario ROOT verificado.`);
}
main().then(()=>sql.end()).catch(async error=>{console.error(error);await sql.end();process.exitCode=1});
