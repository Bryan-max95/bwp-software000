import type { Metadata } from "next";
import EnterpriseCapabilityPage from "@/components/EnterpriseCapabilityPage";
import { ENTERPRISE_CAPABILITIES } from "@/lib/enterpriseCapabilities";
export const metadata: Metadata = { title:"DevOps y Operación Cloud | BWP Software", description:"Despliegues automatizados, contenedores, monitoreo, logs, ambientes, recuperación y continuidad para plataformas empresariales." };
export default function Page(){return <EnterpriseCapabilityPage capability={ENTERPRISE_CAPABILITIES.devops}/>}
