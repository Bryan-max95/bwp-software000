"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect,useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Binary, Fingerprint, Network, Radar, ShieldCheck, Target, Workflow } from "lucide-react";
import { getStoredDataAsync,INITIAL_LEADERSHIP } from "@/lib/data";

const leadershipPrinciples = [
  { icon: Target, title:"Dirección conectada con el negocio", text:"Cada decisión tecnológica debe resolver una prioridad operativa, comercial o estratégica claramente entendida." },
  { icon: Workflow, title:"Gobierno de ejecución", text:"Alcance, responsables, riesgos, cambios y entregables se mantienen visibles durante todo el proyecto." },
  { icon: Network, title:"Arquitectura e integración", text:"Las plataformas se diseñan para convivir con datos, procesos y sistemas externos de gran alcance." },
  { icon: ShieldCheck, title:"Seguridad transversal", text:"Protección, vulnerabilidades, trazabilidad y continuidad forman parte del ciclo completo de ingeniería." }
];

function Reveal({children,delay=0,className=""}:{children:React.ReactNode;delay?:number;className?:string}){
  const reduced=useReducedMotion();
  return <motion.div className={className} initial={reduced?false:{opacity:0,y:34}} whileInView={reduced?undefined:{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.75,delay,ease:[.22,1,.36,1]}}>{children}</motion.div>;
}

export default function LeadershipPage(){
  const [leadership,setLeadership]=useState(INITIAL_LEADERSHIP);
  useEffect(()=>{let active=true;void getStoredDataAsync("leadership",INITIAL_LEADERSHIP).then(data=>{if(active)setLeadership(data)});return()=>{active=false}},[]);
  const reduced=useReducedMotion();
  const {scrollYProgress}=useScroll();
  const drift=useTransform(scrollYProgress,[0,1],[0,180]);
  return <main className="bwp-corporate-palette bg-white overflow-hidden" data-global-motion="off">
    <section className="relative min-h-[760px] bg-slate-950 text-white flex items-center">
      <motion.div style={reduced?undefined:{y:drift}} className="absolute right-[-14rem] top-[-10rem] w-[46rem] h-[46rem] rounded-full border border-red-800/20"/>
      <div className="absolute right-[-5rem] top-[5rem] w-[28rem] h-[28rem] rounded-full border border-blue-700/20"/>
      <svg className="absolute left-0 bottom-0 w-full h-64 opacity-45" viewBox="0 0 1440 250" preserveAspectRatio="none"><motion.path d="M0 180 C250 35 470 250 730 125 S1170 10 1440 165" fill="none" stroke="#991b1b" strokeWidth="2" initial={reduced?false:{pathLength:0}} animate={reduced?undefined:{pathLength:1}} transition={{duration:2}}/><path d="M0 215 C350 95 530 270 900 165 S1230 80 1440 210" fill="none" stroke="#1e3a8a"/></svg>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 relative z-10 w-full">
        <motion.p initial={reduced?false:{opacity:0,x:-25}} animate={reduced?undefined:{opacity:1,x:0}} className="text-xs font-mono text-red-400 uppercase tracking-[.32em]">BWP / Executive leadership</motion.p>
        <motion.h1 initial={reduced?false:{opacity:0,y:35}} animate={reduced?undefined:{opacity:1,y:0}} transition={{duration:.9}} className="text-5xl sm:text-6xl lg:text-[6.5rem] leading-[.94] font-bold tracking-[-.065em] max-w-6xl mt-8">Visión técnica.<br/><span className="text-slate-500">Responsabilidad directa.</span><br/>Liderazgo empresarial.</motion.h1>
        <motion.p initial={reduced?false:{opacity:0}} animate={reduced?undefined:{opacity:1}} transition={{delay:.55}} className="text-lg text-slate-300 max-w-2xl mt-10">Los socios de BWP Software participan en las decisiones que definen arquitectura, seguridad, integración y evolución de cada plataforma.</motion.p>
      </div>
    </section>

    <section className="relative py-28 lg:py-36">
      <span className="absolute left-[-1rem] top-10 text-[18rem] leading-none font-black text-slate-50 select-none">01</span>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid lg:grid-cols-12 gap-14 items-center">
        <Reveal className="lg:col-span-5"><motion.div whileHover={reduced?undefined:{rotate:-3,scale:1.02}} className="relative w-72 h-72 lg:w-96 lg:h-96 mx-auto rounded-full overflow-hidden bg-slate-950 text-white flex items-center justify-center shadow-[0_30px_80px_-25px_rgba(15,23,42,.5)]">{leadership.bryanImage?<Image src={leadership.bryanImage} alt="Ing. Bryan Cárcamo" fill unoptimized className="object-cover"/>:<span className="text-7xl lg:text-8xl font-black">BC</span>}<motion.div animate={reduced?undefined:{rotate:360}} transition={{duration:24,repeat:Infinity,ease:"linear"}} className="absolute inset-[-1.5rem] rounded-full border border-dashed border-red-800/50"/><span className="absolute -right-3 top-10 px-4 py-2 bg-red-800 text-white text-[10px] font-mono tracking-widest">FOUNDER / CEO</span></motion.div></Reveal>
        <Reveal delay={.12} className="lg:col-span-7"><p className="text-xs font-bold text-red-800 uppercase tracking-[.25em]">Socio y CEO de BWP Software</p><h2 className="text-5xl lg:text-7xl font-bold text-slate-950 tracking-[-.055em] mt-5">Ing. Bryan<br/>Cárcamo</h2><div className="w-24 h-1 bg-red-800 mt-8"/><p className="text-xl text-slate-600 leading-relaxed mt-8 max-w-2xl">CEO de BWP Software, fundador y CEO de BWP Entesting, y CEO de BWP Retail POS. Su dirección conecta plataformas empresariales, productos tecnológicos, arquitectura y seguridad.</p><div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-slate-800"><span>CEO · BWP Software</span><span>Fundador y CEO · BWP Entesting</span><span>CEO · BWP Retail POS</span></div></Reveal>
      </div>
    </section>

    <section className="relative bg-slate-950 text-white py-28 overflow-hidden">
      <motion.div animate={reduced?undefined:{rotate:360}} transition={{duration:35,repeat:Infinity,ease:"linear"}} className="absolute right-[-10rem] top-[-12rem] w-[42rem] h-[42rem] rounded-full border border-red-800/20"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid lg:grid-cols-12 gap-14 items-center">
        <Reveal className="lg:col-span-7"><p className="text-xs font-mono text-red-400 uppercase tracking-[.25em]">Endpoint protection system</p><h2 className="text-5xl lg:text-7xl font-bold tracking-[-.055em] mt-5">BWP Entesting</h2><p className="text-xl text-slate-300 leading-relaxed mt-7 max-w-2xl">Una iniciativa tecnológica fundada por el Ing. Bryan Cárcamo para la protección, visibilidad y control de endpoints dentro de entornos empresariales.</p><a href="https://www.bwpentesting.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-7 text-sm font-bold text-white border-b border-red-500 pb-1 hover:text-red-300 transition-colors">Visitar bwpentesting.com <ArrowRight className="w-4 h-4"/></a><div className="mt-12 divide-y divide-slate-800">{[{i:Fingerprint,t:"Identidad del dispositivo",d:"Reconocimiento y control del endpoint dentro del entorno autorizado."},{i:Radar,t:"Visibilidad y monitoreo",d:"Señales operativas para comprender estado, actividad y eventos relevantes."},{i:Binary,t:"Protección por capas",d:"Controles técnicos orientados a reducir exposición y apoyar la gestión de amenazas."}].map((item,index)=>{const Icon=item.i;return <motion.div key={item.t} whileHover={reduced?undefined:{x:8}} className="py-6 flex gap-5"><span className="font-mono text-red-500">0{index+1}</span><Icon className="w-6 h-6 text-red-400 shrink-0"/><div><h3 className="font-bold text-lg">{item.t}</h3><p className="text-sm text-slate-400 mt-1">{item.d}</p></div></motion.div>})}</div></Reveal>
        <Reveal delay={.1} className="lg:col-span-5"><div className="relative aspect-square max-w-md mx-auto flex items-center justify-center"><motion.div animate={reduced?undefined:{rotate:360}} transition={{duration:18,repeat:Infinity,ease:"linear"}} className="absolute inset-0 rounded-full border border-dashed border-blue-700/40"/><motion.div animate={reduced?undefined:{rotate:-360}} transition={{duration:28,repeat:Infinity,ease:"linear"}} className="absolute inset-14 rounded-full border border-red-700/40"/><div className="w-44 h-44 rounded-full bg-red-950 border border-red-800 flex items-center justify-center shadow-[0_0_80px_rgba(153,27,27,.3)]"><ShieldCheck className="w-20 h-20 text-red-300"/></div>{[0,90,180,270].map(deg=><span key={deg} style={{transform:`rotate(${deg}deg) translateX(185px) rotate(-${deg}deg)`}} className="absolute w-3 h-3 rounded-full bg-blue-500"/>)}</div></Reveal>
      </div>
    </section>

    <section className="py-28 bg-slate-50"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-14 items-center"><Reveal className="lg:col-span-7 lg:order-2"><p className="text-xs font-bold text-blue-900 uppercase tracking-[.25em]">Socio y CEO de BWP Software</p><h2 className="text-5xl lg:text-7xl font-bold text-slate-950 tracking-[-.055em] mt-5">Ing. Carlos<br/>Álvarez</h2><p className="text-xl text-slate-600 leading-relaxed mt-8 max-w-2xl">CEO de BWP Software y socio en la dirección de la compañía. Su liderazgo empresarial contribuye a convertir necesidades complejas en iniciativas tecnológicas estructuradas, responsables y sostenibles.</p><div className="mt-8 text-sm font-semibold text-blue-950">CEO · BWP Software</div></Reveal><Reveal className="lg:col-span-5 lg:order-1"><div className="relative overflow-hidden w-72 h-72 lg:w-96 lg:h-96 mx-auto rounded-[45%_55%_62%_38%/45%_38%_62%_55%] bg-blue-950 text-white flex items-center justify-center">{leadership.carlosImage?<Image src={leadership.carlosImage} alt="Ing. Carlos Álvarez" fill unoptimized className="object-cover"/>:<span className="text-7xl lg:text-8xl font-black">CA</span>}<span className="absolute -left-4 bottom-12 px-4 py-2 bg-slate-950 text-white text-[10px] font-mono tracking-widest">CEO / BWP SOFTWARE</span></div></Reveal></div></section>

    <section className="py-28 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><Reveal className="max-w-3xl"><p className="text-xs font-bold text-red-800 uppercase tracking-[.25em]">Principios de dirección</p><h2 className="text-4xl lg:text-5xl font-bold mt-5">Cómo se refleja el liderazgo en cada proyecto</h2></Reveal><div className="mt-14 border-t border-slate-300">{leadershipPrinciples.map((item,index)=>{const Icon=item.icon;return <Reveal key={item.title} delay={index*.06}><div className="grid md:grid-cols-[90px_70px_300px_1fr] gap-5 py-7 border-b border-slate-200 items-center"><span className="font-mono text-slate-400">0{index+1}</span><Icon className="w-7 h-7 text-red-800"/><h3 className="text-xl font-bold">{item.title}</h3><p className="text-sm text-slate-600">{item.text}</p></div></Reveal>})}</div></div></section>

    <section className="pb-28 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><Reveal><div className="relative bg-gradient-to-br from-red-950 to-blue-950 text-white rounded-[3rem_0_3rem_0] p-10 lg:p-16 overflow-hidden"><div className="absolute right-[-5rem] top-[-8rem] w-80 h-80 rounded-full border border-white/10"/><p className="text-xs font-mono text-red-300 uppercase tracking-[.25em]">Conversación ejecutiva</p><h2 className="text-4xl lg:text-6xl font-bold max-w-4xl mt-5">Hable directamente con el liderazgo de BWP Software</h2><p className="text-lg text-slate-300 max-w-2xl mt-6">Presente su operación, los sistemas actuales y el alcance de la plataforma que necesita construir.</p><Link href="/contacto?type=meeting" className="inline-flex items-center gap-2 bg-white text-slate-950 px-6 py-3.5 rounded-lg font-bold mt-9">Coordinar reunión ejecutiva <ArrowRight className="w-4 h-4"/></Link></div></Reveal></div></section>
  </main>;
}
