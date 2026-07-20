import { NextResponse } from "next/server";
import { sql } from "@/lib/server/db";
import { isAdmin } from "@/lib/server/auth";

const allowed=new Set(["services","solutions","products","industries","client_cases","faqs","contact_info","leadership"]);
export async function GET(_:Request,{params}:{params:Promise<{key:string}>}){const {key}=await params;if(!allowed.has(key))return NextResponse.json({error:"Clave no permitida"},{status:400});const rows=await sql`SELECT payload FROM cms_documents WHERE key=${key} LIMIT 1`;return NextResponse.json({data:rows[0]?.payload??null});}
export async function PUT(request:Request,{params}:{params:Promise<{key:string}>}){if(!await isAdmin())return NextResponse.json({error:"No autorizado"},{status:401});const {key}=await params;if(!allowed.has(key))return NextResponse.json({error:"Clave no permitida"},{status:400});const payload=await request.json();await sql`INSERT INTO cms_documents (key,payload) VALUES (${key},${sql.json(payload)}) ON CONFLICT (key) DO UPDATE SET payload=EXCLUDED.payload,version=cms_documents.version+1,updated_at=now()`;return NextResponse.json({ok:true});}
