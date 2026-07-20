import type { Metadata } from "next";
import EnterpriseCapabilityPage from "@/components/EnterpriseCapabilityPage";
import { ENTERPRISE_CAPABILITIES } from "@/lib/enterpriseCapabilities";
export const metadata: Metadata = { title:"Centro de Integraciones Empresariales | BWP Software", description:"Integraciones con SAP Business One, bancos, pagos, ERP, CRM, e-commerce, hotelería y servicios externos." };
export default function Page(){return <EnterpriseCapabilityPage capability={ENTERPRISE_CAPABILITIES.integrations}/>}
