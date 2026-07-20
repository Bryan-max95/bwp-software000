import type { Metadata } from "next";
import EnterpriseCapabilityPage from "@/components/EnterpriseCapabilityPage";
import { ENTERPRISE_CAPABILITIES } from "@/lib/enterpriseCapabilities";
export const metadata: Metadata = { title:"Ingeniería de Alto Rendimiento | BWP Software", description:"Sistemas con Rust, Go y C++ para concurrencia, procesamiento intensivo, baja latencia y grandes cargas." };
export default function Page(){return <EnterpriseCapabilityPage capability={ENTERPRISE_CAPABILITIES.performance}/>}
