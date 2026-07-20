import type { Metadata } from "next";
import EnterpriseCapabilityPage from "@/components/EnterpriseCapabilityPage";
import { ENTERPRISE_CAPABILITIES } from "@/lib/enterpriseCapabilities";
export const metadata: Metadata = { title:"Desarrollo de Plataformas SaaS | BWP Software", description:"Sistemas SaaS multiempresa y multicliente con planes, suscripciones, permisos, facturación y administración centralizada." };
export default function Page(){return <EnterpriseCapabilityPage capability={ENTERPRISE_CAPABILITIES.saas}/>}
