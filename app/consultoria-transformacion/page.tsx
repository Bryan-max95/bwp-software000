import type { Metadata } from "next";
import EnterpriseCapabilityPage from "@/components/EnterpriseCapabilityPage";
import { ENTERPRISE_CAPABILITIES } from "@/lib/enterpriseCapabilities";
export const metadata: Metadata = { title:"Consultoría y Transformación Digital | BWP Software", description:"Diagnóstico de procesos, mapa tecnológico, estrategia de modernización y hoja de ruta empresarial." };
export default function Page(){return <EnterpriseCapabilityPage capability={ENTERPRISE_CAPABILITIES.consulting}/>}
