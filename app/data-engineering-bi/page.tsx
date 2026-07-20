import type { Metadata } from "next";
import EnterpriseCapabilityPage from "@/components/EnterpriseCapabilityPage";
import { ENTERPRISE_CAPABILITIES } from "@/lib/enterpriseCapabilities";
export const metadata: Metadata = { title:"Data Engineering y Business Intelligence | BWP Software", description:"Data warehouses, ETL, consolidación de información, tableros ejecutivos, KPIs y reportería empresarial." };
export default function Page(){return <EnterpriseCapabilityPage capability={ENTERPRISE_CAPABILITIES.data}/>}
