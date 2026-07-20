"use client";

import Link from "next/link";
import { ArrowRight, Cloud, Database, GitBranch, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const nodes=[{x:72,y:48,label:"OPERACIÓN"},{x:258,y:32,label:"API"},{x:438,y:80,label:"DATOS"},{x:600,y:35,label:"CLOUD"},{x:500,y:196,label:"CONTROL"},{x:246,y:210,label:"CLIENTES"},{x:82,y:172,label:"PAGOS"}];

function MovingArchitecture(){const reduced=useReducedMotion();return <div className="relative h-[360px] lg:h-[480px] border border-white/10 bg-slate-950/40 overflow-hidden">
  <div className="absolute inset-x-0 top-0 flex justify-between px-5 py-4 border-b border-white/10 text-[10px] font-mono text-slate-500"><span>BWP / SYSTEM BLUEPRINT</span><span className="text-emerald-400">● ARQUITECTURA ACTIVA</span></div>
  <svg viewBox="0 0 680 260" className="absolute inset-x-0 top-20 w-full h-[270px]" aria-hidden="true">
    {[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0],[1,5],[2,4]].map(([a,b],i)=><motion.line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke={i%3===0?"#b91c1c":"#334155"} strokeWidth="1.5" strokeDasharray="5 9" animate={reduced?undefined:{strokeDashoffset:[0,-70]}} transition={{duration:5+i*.4,repeat:Infinity,ease:"linear"}}/>)}
    {nodes.map((n,i)=><g key={n.label}><motion.circle cx={n.x} cy={n.y} r="20" fill="#0f172a" stroke={i%3===0?"#dc2626":"#64748b"} animate={reduced?undefined:{r:[18,22,18]}} transition={{duration:3+i*.25,repeat:Infinity}}/><text x={n.x} y={n.y+38} textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">{n.label}</text></g>)}
  </svg>
  <motion.div animate={reduced?undefined:{x:[-40,420,-40]}} transition={{duration:12,repeat:Infinity,ease:"easeInOut"}} className="absolute bottom-8 left-12 flex items-center gap-3 text-[10px] font-mono text-slate-400"><span className="w-2 h-2 rounded-full bg-red-600"/> TRANSACCIÓN VERIFICADA</motion.div>
</div>}

export default function HomeHero(){return <section className="relative bg-[#07101f] text-white overflow-hidden min-h-[calc(100vh-5rem)] flex items-center" id="home-hero">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#1e3a8a55,transparent_34%),radial-gradient(circle_at_80%_70%,#7f1d1d44,transparent_30%)]"/>
  <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20 relative w-full"><div className="grid lg:grid-cols-12 gap-10 items-center">
    <div className="lg:col-span-7"><div className="flex items-center gap-3 text-[11px] font-mono text-red-400 tracking-[.2em]"><span className="w-10 h-px bg-red-600"/> BWP SOFTWARE / HONDURAS</div>
      <h1 className="text-5xl sm:text-6xl xl:text-[5.6rem] font-bold tracking-[-.06em] leading-[.93] mt-7">Construimos la infraestructura digital de su operación.</h1>
      <p className="text-lg lg:text-xl text-slate-300 leading-relaxed max-w-3xl mt-7">Software empresarial, plataformas SaaS e integraciones que conectan ventas, facturación, pagos, inventario, datos y sistemas externos dentro de una arquitectura gobernada.</p>
      <div className="flex flex-wrap gap-3 mt-9"><Link href="/contacto" className="inline-flex items-center gap-2 bg-red-800 hover:bg-red-700 px-6 py-3.5 font-bold">Diseñar una solución <ArrowRight className="w-4 h-4"/></Link><Link href="/casos-de-exito" className="inline-flex items-center gap-2 border border-slate-600 hover:bg-white/5 px-6 py-3.5 font-bold">Ver ingeniería aplicada</Link></div>
      <div className="grid grid-cols-2 md:grid-cols-4 mt-12 border-y border-white/10">{[{i:GitBranch,t:"Integraciones"},{i:Database,t:"Datos"},{i:Cloud,t:"AWS · Azure · Google"},{i:ShieldCheck,t:"Seguridad"}].map(x=>{const Icon=x.i;return <div key={x.t} className="py-4 px-3 border-r border-white/10 last:border-r-0 flex items-center gap-2 text-xs text-slate-400"><Icon className="w-4 h-4 text-red-400"/>{x.t}</div>})}</div>
    </div><div className="lg:col-span-5"><MovingArchitecture/></div>
  </div></div>
</section>}
