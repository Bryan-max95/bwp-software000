import "server-only";
import postgres from "postgres";

const connectionString=process.env.DATABASE_URL;
if(!connectionString) throw new Error("DATABASE_URL no está configurada");

const globalDb=globalThis as typeof globalThis & {bwpSql?:ReturnType<typeof postgres>};
export const sql=globalDb.bwpSql ?? postgres(connectionString,{ssl:"require",max:5,idle_timeout:20,connect_timeout:15});
if(process.env.NODE_ENV!=="production") globalDb.bwpSql=sql;
