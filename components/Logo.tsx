"use client";

import Image from "next/image";

interface LogoProps{variant?:"light"|"dark"|"colored";showText?:boolean;className?:string;iconSize?:number}

export function Logo({variant="light",showText=true,className="",iconSize=40}:LogoProps){
  if(!showText)return <div className={`relative overflow-hidden ${className}`} style={{width:iconSize,height:iconSize}}><Image src="/assets/brand/bwp-software.png" alt="BWP Software" width={160} height={160} priority className="absolute max-w-none" style={{width:iconSize*3.05,height:iconSize*3.05,left:-iconSize*.18,top:-iconSize*.94}}/></div>;
  return <div className={`relative overflow-hidden ${variant==="dark"?"bg-white rounded-md":""} ${className}`} style={{width:iconSize*4.2,height:iconSize*1.35}} id="bwp-logo-container"><Image src="/assets/brand/bwp-software.png" alt="BWP Software" width={320} height={320} priority className="absolute max-w-none" style={{width:iconSize*4.2,height:iconSize*4.2,left:0,top:-iconSize*1.44}}/></div>;
}
