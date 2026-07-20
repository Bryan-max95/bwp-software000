import { NextResponse } from "next/server";import { getCurrentAdmin } from "@/lib/server/auth";
export async function GET(){const user=await getCurrentAdmin();return user?NextResponse.json({user}):NextResponse.json({error:"No autorizado"},{status:401})}
