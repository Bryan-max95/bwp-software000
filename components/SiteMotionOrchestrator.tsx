"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SiteMotionOrchestrator(){
  const pathname=usePathname();
  useEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if(pathname.startsWith("/host99")) return;
    gsap.registerPlugin(ScrollTrigger);
    const main=document.querySelector("main");
    if(!main || main.querySelector("[data-global-motion='off']")) return;
    const context=gsap.context(()=>{
      const sections=gsap.utils.toArray<HTMLElement>("main section");
      sections.forEach((section,index)=>{
        section.classList.add("bwp-motion-section");
        const wrapper=section.firstElementChild as HTMLElement|null;
        if(wrapper){
          gsap.fromTo(wrapper,{opacity:.88,y:24},{opacity:1,y:0,duration:.85,ease:"power3.out",scrollTrigger:{trigger:section,start:"top 86%",once:true}});
        }
        ScrollTrigger.create({trigger:section,start:"top 82%",once:true,onEnter:()=>section.classList.add("bwp-section-active")});
        const editorial=section.querySelectorAll<HTMLElement>("h1, h2, h3");
        if(editorial.length && index>0){
          gsap.fromTo(editorial,{letterSpacing:"-0.055em"},{letterSpacing:"-0.035em",duration:1,stagger:.05,ease:"power2.out",scrollTrigger:{trigger:section,start:"top 82%",once:true}});
        }
      });
    },main);
    return()=>{
      context.revert();
      document.querySelectorAll(".bwp-motion-section").forEach(element=>element.classList.remove("bwp-motion-section","bwp-section-active"));
    };
  },[pathname]);
  return null;
}
