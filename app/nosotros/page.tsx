"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, Globe2, Layers3, LockKeyhole, Target, Users, Workflow } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { getStoredDataAsync, INITIAL_CONTACT_INFO } from "@/lib/data";

const values=[
  ["Responsabilidad","Trabajamos con alcance, decisiones, responsables y entregables visibles."],
  ["Confidencialidad","Protegemos información operativa, financiera, comercial y propiedad intelectual."],
  ["Ingeniería práctica","Seleccionamos tecnología por su utilidad, sostenibilidad e integración con el negocio."],
  ["Seguridad desde el diseño","Incorporamos roles, trazabilidad, protección de datos y gestión de vulnerabilidades."],
  ["Calidad verificable","Definimos criterios de aceptación, pruebas y validaciones antes de producción."],
  ["Comunicación continua","Mantenemos alineados a dirección, usuarios clave y responsables técnicos."],
  ["Adopción acompañada","Preparamos capacitación, documentación y estabilización para la operación real."],
  ["Evolución sostenible","Construimos plataformas modulares que pueden crecer sin perder control."]
];

const identity=[
  {icon:Workflow,title:"Comprendemos la operación",text:"El software comienza con procesos, personas, excepciones, controles y objetivos de negocio."},
  {icon:Layers3,title:"Diseñamos el ecosistema",text:"Conectamos aplicaciones, datos, infraestructura, seguridad e integraciones dentro de una arquitectura coherente."},
  {icon:LockKeyhole,title:"Protegemos lo construido",text:"La seguridad, recuperación, trazabilidad y mantenibilidad forman parte de la solución."},
  {icon:Globe2,title:"Acompañamos el crecimiento",text:"La plataforma se prepara para nuevos usuarios, módulos, sedes, productos y mercados."}
];

export default function NosotrosPage(){
  const [contact,setContact]=useState(INITIAL_CONTACT_INFO);
  const reduced=useReducedMotion();
  useEffect(()=>{let active=true;void getStoredDataAsync("contact_info",INITIAL_CONTACT_INFO).then(item=>{if(active)setContact(item)});return()=>{active=false}},[]);
  return <div className="bg-white min-h-screen" id="nosotros-page-container">
    <section className="relative pt-28 pb-24 bg-white overflow-hidden"><motion.div animate={reduced?undefined:{rotate:360}} transition={{duration:45,repeat:Infinity,ease:"linear"}} className="absolute right-[-14rem] top-[-18rem] w-[48rem] h-[48rem] rounded-full border border-red-800/10"/><div className="absolute right-[-2rem] top-0 w-[30rem] h-[30rem] rounded-full border border-blue-900/10"/><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"><span className="text-xs font-mono text-red-800 uppercase tracking-[.3em]">BWP Software / Company profile</span><h1 className="text-5xl lg:text-7xl font-bold tracking-[-.06em] leading-[1] max-w-5xl mt-7">Ingeniería empresarial construida alrededor de operaciones reales</h1><p className="text-xl text-slate-600 max-w-3xl leading-relaxed mt-8">Somos una empresa hondureña especializada en diseñar, desarrollar, integrar y evolucionar plataformas de software para organizaciones que necesitan mayor control, conexión y capacidad de crecimiento.</p></div></section>

    <section className="bg-slate-950 text-white py-24"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16"><div><Target className="w-9 h-9 text-red-400"/><span className="block text-xs font-mono text-red-400 uppercase tracking-widest mt-6">Misión</span><h2 className="text-3xl font-bold mt-4">Crear soluciones que mejoren cómo opera una empresa</h2><p className="text-slate-300 leading-relaxed mt-5">{contact.mission}</p></div><div className="lg:border-l border-slate-800 lg:pl-16"><Eye className="w-9 h-9 text-blue-400"/><span className="block text-xs font-mono text-blue-300 uppercase tracking-widest mt-6">Visión</span><h2 className="text-3xl font-bold mt-4">Construir relaciones y plataformas sostenibles</h2><p className="text-slate-300 leading-relaxed mt-5">{contact.vision}</p></div></div></section>

    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"><div className="grid lg:grid-cols-12 gap-14"><div className="lg:col-span-4"><span className="text-xs font-bold text-red-800 uppercase tracking-[.2em]">Quiénes somos en la práctica</span><h2 className="text-4xl font-bold mt-4">Una compañía de ingeniería, integración y acompañamiento</h2><p className="text-slate-600 mt-5">No entregamos únicamente pantallas. Diseñamos la relación entre procesos, personas, información y tecnología.</p></div><div className="lg:col-span-8 border-t border-slate-300">{identity.map((item,index)=>{const Icon=item.icon;return <motion.div key={item.title} initial={reduced?false:{opacity:0,x:30}} whileInView={reduced?undefined:{opacity:1,x:0}} viewport={{once:true}} className="grid sm:grid-cols-[60px_70px_1fr] gap-5 py-7 border-b border-slate-200"><span className="font-mono text-slate-400">0{index+1}</span><Icon className="w-7 h-7 text-red-800"/><div><h3 className="text-xl font-bold">{item.title}</h3><p className="text-sm text-slate-600 mt-2">{item.text}</p></div></motion.div>})}</div></div></section>

    <section className="bg-slate-50 border-y border-slate-200 py-24"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-3xl"><span className="text-xs font-bold text-blue-900 uppercase tracking-[.2em]">Cultura de trabajo</span><h2 className="text-4xl lg:text-5xl font-bold mt-4">Principios que guían cada relación y cada entrega</h2></div><div className="mt-14 grid md:grid-cols-2 border-t border-slate-300">{values.map(([title,text],index)=><div key={title} className={`py-7 md:px-7 border-b border-slate-200 ${index%2===0?"md:border-r":""}`}><span className="text-[10px] font-mono text-red-700">VALUE / 0{index+1}</span><h3 className="font-bold text-xl mt-3">{title}</h3><p className="text-sm text-slate-600 mt-2">{text}</p></div>)}</div></div></section>

    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"><div className="grid lg:grid-cols-12 gap-12 items-center"><div className="lg:col-span-5"><Users className="w-10 h-10 text-red-800"/><h2 className="text-4xl font-bold mt-6">Trabajamos junto a quienes conocen la operación</h2><p className="text-slate-600 leading-relaxed mt-5">Involucramos a dirección, responsables de proceso, usuarios clave y equipos técnicos para que las decisiones no dependan de una sola perspectiva.</p></div><div className="lg:col-span-7 bg-gradient-to-br from-red-950 to-blue-950 text-white rounded-[2.5rem_0_2.5rem_0] p-9 lg:p-12"><h3 className="text-3xl font-bold">Una relación empresarial con continuidad</h3><p className="text-slate-300 mt-5 leading-relaxed">Desde el diagnóstico hasta el soporte, mantenemos documentación, seguimiento y una hoja de ruta para que la solución continúe evolucionando después de salir a producción.</p><div className="flex flex-wrap gap-4 mt-8"><Link href="/metodologia" className="inline-flex items-center gap-2 bg-white text-slate-950 px-5 py-3 rounded-lg font-bold">Conocer metodología <ArrowRight className="w-4 h-4"/></Link><Link href="/socios" className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 rounded-lg font-bold">Ver liderazgo</Link></div></div></div></section>
  </div>;
}
