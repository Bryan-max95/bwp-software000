import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, Code2, Database, Rocket, Search, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Metodología de Desarrollo Empresarial | BWP Software",
  description: "Conozca cómo BWP Software analiza, diseña, desarrolla, valida e implementa soluciones empresariales con entregables y control por fases."
};

const phases = [
  { icon: Search, number: "01", title: "Descubrimiento y diagnóstico", text: "Entrevistamos a responsables y usuarios clave, documentamos procesos, sistemas actuales, datos, restricciones, riesgos y objetivos de negocio.", outputs: ["Mapa de procesos", "Inventario de integraciones", "Problemas priorizados", "Objetivos y alcance inicial"] },
  { icon: ClipboardCheck, number: "02", title: "Definición funcional", text: "Convertimos la operación en requerimientos claros, módulos, perfiles, reglas de negocio, flujos de aprobación e indicadores de éxito.", outputs: ["Requerimientos funcionales", "Historias y escenarios", "Matriz de roles", "Criterios de aceptación"] },
  { icon: Database, number: "03", title: "Arquitectura y experiencia", text: "Definimos componentes, modelo de datos, interfaces, integraciones, seguridad y estrategia de despliegue local, nube o híbrida.", outputs: ["Arquitectura propuesta", "Modelo de información", "Prototipos de interfaz", "Plan de integración"] },
  { icon: Code2, number: "04", title: "Construcción iterativa", text: "Desarrollamos por entregas controladas para validar temprano los flujos críticos y mantener visibilidad sobre el avance real.", outputs: ["Entregas demostrables", "Revisión periódica", "Control de cambios", "Documentación técnica"] },
  { icon: ShieldCheck, number: "05", title: "Validación y preparación", text: "Probamos reglas, permisos, rendimiento, integraciones y migración. Los usuarios clave validan el sistema antes de producción.", outputs: ["Pruebas funcionales", "Validación de usuarios", "Plan de migración", "Plan de salida"] },
  { icon: Rocket, number: "06", title: "Implementación y evolución", text: "Desplegamos, capacitamos y acompañamos la adopción. Después de estabilizar, priorizamos mejoras con base en la operación real.", outputs: ["Puesta en producción", "Capacitación", "Soporte de estabilización", "Hoja de ruta evolutiva"] }
];

export default function MetodologiaPage() {
  return (
    <main className="bwp-corporate-palette bg-white pb-24">
      <section className="bg-slate-950 text-white pt-28 pb-20 border-b-4 border-red-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8"><span className="text-xs font-mono text-red-400 uppercase tracking-[0.25em]">BWP Delivery Framework</span><h1 className="text-4xl lg:text-6xl font-extrabold mt-4 leading-tight">Del problema operativo a una solución lista para crecer</h1><p className="text-lg text-slate-300 mt-6 max-w-3xl leading-relaxed">Nuestro proceso reduce incertidumbre, mantiene alineada a la gerencia y entrega evidencia concreta en cada fase del proyecto.</p></div>
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-6"><p className="text-xs text-slate-500 uppercase tracking-widest">Principio de ejecución</p><p className="font-semibold mt-3">Cada fase debe producir decisiones, documentos o software verificable antes de avanzar.</p></div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-5">{phases.map((phase) => { const Icon = phase.icon; return <article key={phase.number} className="grid lg:grid-cols-12 gap-6 border border-slate-200 rounded-2xl p-6 lg:p-8 hover:shadow-lg transition-shadow"><div className="lg:col-span-1"><span className="text-2xl font-mono font-bold text-red-800">{phase.number}</span></div><div className="lg:col-span-6"><Icon className="w-6 h-6 text-slate-800 mb-4"/><h2 className="text-2xl font-bold text-slate-900">{phase.title}</h2><p className="text-slate-600 mt-3 leading-relaxed">{phase.text}</p></div><div className="lg:col-span-5 bg-slate-50 rounded-xl p-5"><p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Entregables principales</p><div className="grid sm:grid-cols-2 gap-3">{phase.outputs.map(output => <div key={output} className="flex gap-2 text-sm text-slate-700"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"/>{output}</div>)}</div></div></article>})}</div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="bg-red-900 text-white rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row justify-between lg:items-center gap-6"><div><h2 className="text-3xl font-bold">Convierta su necesidad en una hoja de ruta ejecutable</h2><p className="text-red-100 mt-2">Comencemos con un análisis de su operación, sistemas actuales y prioridades.</p></div><Link href="/contacto?type=meeting" className="inline-flex items-center justify-center gap-2 bg-white text-red-900 px-6 py-3 rounded-lg font-bold shrink-0">Solicitar reunión técnica <ArrowRight className="w-4 h-4"/></Link></div></section>
    </main>
  );
}
