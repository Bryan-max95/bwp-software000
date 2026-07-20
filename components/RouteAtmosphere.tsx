"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

const routeStyles = [
  "from-red-600/15 via-transparent to-blue-700/10",
  "from-blue-500/15 via-transparent to-red-900/10",
  "from-red-700/15 via-transparent to-blue-900/10",
  "from-slate-500/15 via-transparent to-red-800/10",
  "from-blue-700/15 via-transparent to-slate-900/10",
  "from-blue-500/15 via-transparent to-indigo-800/10",
];

export default function RouteAtmosphere(){
  const pathname=usePathname();
  const reduced=useReducedMotion();
  const signature=[...pathname].reduce((sum,char)=>sum+char.charCodeAt(0),0);
  const direction=signature%2===0?1:-1;
  const style=routeStyles[signature%routeStyles.length];
  return <div aria-hidden="true" className="fixed inset-0 z-[45] pointer-events-none overflow-hidden">
    <motion.div key={`${pathname}-wash`} initial={reduced?false:{opacity:0,x:`${direction*35}%`,rotate:direction*8}} animate={reduced?undefined:{opacity:[0,.8,0],x:[`${direction*35}%`,"0%",`${direction*-20}%`]}} transition={{duration:1.15,ease:[.22,1,.36,1]}} className={`absolute -inset-[30%] bg-gradient-to-br ${style} blur-3xl`}/>
    <motion.div key={`${pathname}-line`} initial={reduced?false:{scaleX:0,originX:direction>0?0:1}} animate={reduced?undefined:{scaleX:[0,1,0],originX:direction>0?0:1}} transition={{duration:1.05,ease:"easeInOut"}} className="absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent"/>
  </div>;
}
