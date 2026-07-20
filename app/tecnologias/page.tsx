import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Braces, Cloud, Code2, Database, GitBranch, Layers3, ServerCog, Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Tecnologías y Plataformas Cloud | BWP Software",
  description: "Arquitecturas empresariales sobre AWS, Microsoft Azure y Google Cloud; desarrollo con Python, Rust, Go, C++, C#, React, React Native, Flutter, TypeScript y Next.js."
};

const cloudPlatforms = [
  { name: "Amazon Web Services", short: "AWS", text: "Arquitecturas en nube, servicios administrados, almacenamiento, cómputo, redes, bases de datos, monitoreo y despliegues escalables." },
  { name: "Microsoft Azure", short: "AZURE", text: "Soluciones empresariales integradas con el ecosistema Microsoft, servicios cloud, identidades, datos, aplicaciones y ambientes híbridos." },
  { name: "Google Cloud", short: "GCP", text: "Infraestructura, servicios de datos, aplicaciones modernas, automatización y componentes administrados del ecosistema de Google." }
];

const stacks = [
  { icon: Code2, title: "Backend y alto rendimiento", items: ["Python", "Rust", "Go", "C++", "C#"], text: "Servicios empresariales, procesamiento, automatización, integraciones, aplicaciones de escritorio y componentes de alto rendimiento." },
  { icon: Braces, title: "Web y plataformas", items: ["TypeScript", "JavaScript", "React", "Next.js"], text: "Portales corporativos, paneles administrativos, plataformas SaaS, comercio electrónico y experiencias web escalables." },
  { icon: Smartphone, title: "Aplicaciones móviles", items: ["React Native", "Flutter", "Dart", "Android Studio"], text: "Aplicaciones para fuerza de ventas, logística, inventarios, operación de campo, clientes y procesos con conectividad limitada." },
  { icon: GitBranch, title: "Integración empresarial", items: ["API REST", "Webhooks", "Middleware", "Procesos programados"], text: "Conectores bidireccionales, sincronización de datos y plataformas satélite integradas con sistemas externos." },
  { icon: Database, title: "Datos y analítica", items: ["SQL Server", "PostgreSQL", "MySQL", "Modelos analíticos"], text: "Diseño de datos, migración, optimización, reportería, trazabilidad y soporte para inteligencia de negocios." },
  { icon: ServerCog, title: "Entrega e infraestructura", items: ["Cloud", "On-Premise", "Híbrido", "Contenedores"], text: "Ambientes controlados, automatización de despliegues, observabilidad, respaldos y continuidad según cada operación." }
];

const selectionRules = [
  "Volumen de usuarios, transacciones y crecimiento esperado.",
  "Sistemas externos, hardware y bases de datos que deben integrarse.",
  "Requisitos de operación sin conexión, movilidad y disponibilidad.",
  "Capacidades técnicas internas y estrategia tecnológica del cliente.",
  "Seguridad, trazabilidad, recuperación y ubicación de la información.",
  "Costo total de operación, mantenimiento y evolución a largo plazo."
];

export default function TecnologiasPage() {
  return <main className="bg-white pb-24">
    <section className="bg-slate-950 text-white pt-28 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8"><span className="text-xs font-mono text-red-400 uppercase tracking-[0.25em]">Technology ecosystem</span><h1 className="text-4xl lg:text-6xl font-extrabold mt-4 leading-tight">Tecnología empresarial elegida alrededor de la operación</h1><p className="text-lg text-slate-300 mt-6 max-w-3xl leading-relaxed">Construimos plataformas grandes, distribuidas e integradas utilizando tecnologías modernas de nube, web, escritorio, movilidad, datos y alto rendimiento.</p></div>
        <div className="lg:col-span-4 grid grid-cols-2 gap-3">{["Cloud", "Web", "Mobile", "Desktop", "Data", "API"].map(x=><div key={x} className="border border-slate-800 bg-slate-900/80 rounded-xl p-4 text-center text-sm font-mono text-slate-300">{x}</div>)}</div>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"><div className="max-w-3xl mb-10"><span className="text-xs font-bold text-red-700 uppercase tracking-widest">Arquitectura cloud y empresarial</span><h2 className="text-3xl font-bold text-slate-900 mt-3">Trabajamos con los principales ecosistemas de nube</h2><p className="text-slate-600 mt-3 leading-relaxed">La plataforma se selecciona según la infraestructura existente, necesidades de integración, regulación, costos y estrategia tecnológica de cada organización.</p></div><div className="grid lg:grid-cols-3 gap-5">{cloudPlatforms.map((cloud,idx)=><article key={cloud.short} className="border border-slate-200 rounded-2xl p-7 relative overflow-hidden"><span className="absolute top-5 right-5 text-4xl font-black text-slate-100">0{idx+1}</span><Cloud className="w-8 h-8 text-red-800"/><p className="text-xs font-mono text-slate-400 mt-8">{cloud.short}</p><h3 className="text-xl font-bold text-slate-900 mt-1">{cloud.name}</h3><p className="text-sm text-slate-500 mt-3 leading-relaxed">{cloud.text}</p></article>)}</div></section>

    <section className="bg-slate-50 border-y border-slate-200 py-20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-3xl mb-10"><span className="text-xs font-bold text-red-700 uppercase tracking-widest">Capacidad tecnológica</span><h2 className="text-3xl font-bold text-slate-900 mt-3">Un stack amplio para resolver sistemas de distintos niveles</h2></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{stacks.map(stack=>{const Icon=stack.icon;return <article key={stack.title} className="bg-white border border-slate-200 rounded-2xl p-7"><Icon className="w-7 h-7 text-red-800"/><h3 className="text-xl font-bold text-slate-900 mt-5">{stack.title}</h3><p className="text-sm text-slate-500 leading-relaxed mt-3">{stack.text}</p><div className="flex flex-wrap gap-2 mt-5">{stack.items.map(x=><span key={x} className="text-xs font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200 rounded-md px-2.5 py-1.5">{x}</span>)}</div></article>})}</div></div></section>

    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-12 gap-12"><div className="lg:col-span-5"><Layers3 className="w-8 h-8 text-red-800"/><h2 className="text-3xl font-bold text-slate-900 mt-5">No imponemos una tecnología por costumbre</h2><p className="text-slate-600 mt-4 leading-relaxed">La arquitectura correcta es la que responde al negocio, puede mantenerse y se integra con el entorno real de la empresa.</p></div><div className="lg:col-span-7 grid sm:grid-cols-2 gap-3">{selectionRules.map((rule,i)=><div key={rule} className="flex gap-3 border border-slate-200 rounded-xl p-4"><span className="text-xs font-mono text-red-700">0{i+1}</span><p className="text-sm text-slate-700">{rule}</p></div>)}</div></section>

    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="bg-slate-900 text-white rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row justify-between lg:items-center gap-6"><div><h2 className="text-3xl font-bold">Diseñemos el stack adecuado para su plataforma</h2><p className="text-slate-300 mt-2">Analizamos integraciones, usuarios, datos, infraestructura y crecimiento esperado.</p></div><Link href="/contacto?service=Arquitectura%20tecnológica" className="inline-flex items-center gap-2 bg-red-800 px-6 py-3 rounded-lg font-bold shrink-0">Solicitar análisis técnico <ArrowRight className="w-4 h-4"/></Link></div></section>
  </main>;
}
