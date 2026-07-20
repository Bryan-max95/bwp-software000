"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

export default function GlobalFlowLines(){
  const reduced=useReducedMotion();
  const pointerX=useMotionValue(0);
  const pointerY=useMotionValue(0);
  const x=useSpring(pointerX,{stiffness:35,damping:28});
  const y=useSpring(pointerY,{stiffness:35,damping:28});
  useEffect(()=>{
    if(reduced) return;
    const move=(event:PointerEvent)=>{
      pointerX.set((event.clientX/window.innerWidth-.5)*18);
      pointerY.set((event.clientY/window.innerHeight-.5)*14);
    };
    window.addEventListener("pointermove",move,{passive:true});
    return()=>window.removeEventListener("pointermove",move);
  },[pointerX,pointerY,reduced]);
  if(reduced) return null;
  return <motion.div id="global-flow-field" style={{x,y}} aria-hidden="true" className="fixed -inset-6 z-[2] pointer-events-none overflow-hidden opacity-[0.2]">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
      <motion.path d="M-120 170 C180 20 320 330 620 170 S1020 -20 1560 210" fill="none" stroke="#991b1b" strokeWidth="2.4" strokeDasharray="12 18" animate={{strokeDashoffset:[0,-120]}} transition={{duration:12,repeat:Infinity,ease:"linear"}}/>
      <motion.path d="M-180 610 C140 390 390 760 700 540 S1110 360 1580 650" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeDasharray="7 16" animate={{strokeDashoffset:[0,140]}} transition={{duration:16,repeat:Infinity,ease:"linear"}}/>
      <motion.path d="M240 -100 C60 230 480 330 260 610 S340 920 650 1040" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="4 22" animate={{strokeDashoffset:[0,-150]}} transition={{duration:20,repeat:Infinity,ease:"linear"}}/>
      <motion.path d="M1460 40 C1130 210 1320 430 1010 520 S720 760 420 910" fill="none" stroke="#b91c1c" strokeWidth="1.2" strokeDasharray="2 14" animate={{strokeDashoffset:[0,100]}} transition={{duration:18,repeat:Infinity,ease:"linear"}}/>
      {[180,520,910,1240].map((cx,index)=><motion.circle key={cx} cx={cx} cy={[160,560,260,690][index]} r="4" fill={index%2?"#1e3a8a":"#b91c1c"} animate={{r:[3,7,3],opacity:[.3,1,.3]}} transition={{duration:3+index,repeat:Infinity,delay:index*.4}}/>)}
    </svg>
  </motion.div>;
}
