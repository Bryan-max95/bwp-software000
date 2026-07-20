import type { Metadata } from "next";
import EnterpriseCapabilityPage from "@/components/EnterpriseCapabilityPage";
import { ENTERPRISE_CAPABILITIES } from "@/lib/enterpriseCapabilities";
export const metadata: Metadata = { title:"Modernización de Sistemas Legacy | BWP Software", description:"Migración y modernización de aplicaciones antiguas, hojas de cálculo, bases heredadas y tecnologías difíciles de mantener." };
export default function Page(){return <EnterpriseCapabilityPage capability={ENTERPRISE_CAPABILITIES.legacy}/>}
