"use client";

import React, { useState } from "react";
import { Monitor, Cpu, Smartphone, Database as DbIcon, GitBranch, BarChart3, Shield } from "lucide-react";
import { motion } from "motion/react";

export default function HeroDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>("db");

  const nodes = [
    {
      id: "web",
      name: "Aplicación Web",
      icon: Monitor,
      color: "from-blue-500 to-indigo-600",
      glowColor: "rgba(59, 130, 246, 0.4)",
      desc: "Plataformas accesibles desde cualquier navegador, seguras y escalables.",
      x: "15%",
      y: "20%",
    },
    {
      id: "desktop",
      name: "Software Escritorio",
      icon: Cpu,
      color: "from-slate-700 to-slate-900",
      glowColor: "rgba(100, 116, 139, 0.4)",
      desc: "Sistemas Windows de alto rendimiento con soporte de periféricos locales.",
      x: "85%",
      y: "20%",
    },
    {
      id: "mobile",
      name: "Aplicación Móvil",
      icon: Smartphone,
      color: "from-emerald-500 to-teal-600",
      glowColor: "rgba(16, 185, 129, 0.4)",
      desc: "Apps de campo, inventarios y logística con soporte sin conexión (offline).",
      x: "15%",
      y: "75%",
    },
    {
      id: "integrations",
      name: "Integraciones & APIs",
      icon: GitBranch,
      color: "from-red-600 to-rose-700",
      glowColor: "rgba(220, 38, 38, 0.4)",
      desc: "Conectores bidireccionales con SAP Business One, bancos y POS externos.",
      x: "85%",
      y: "75%",
    },
    {
      id: "reports",
      name: "Reportes & KPIs",
      icon: BarChart3,
      color: "from-amber-500 to-orange-600",
      glowColor: "rgba(245, 158, 11, 0.4)",
      desc: "Paneles ejecutivos de control en tiempo real para toma de decisiones.",
      x: "50%",
      y: "12%",
    },
  ];

  const nodeDetails: { [key: string]: { title: string; subtitle: string; bullets: string[] } } = {
    db: {
      title: "Base de Datos Central",
      subtitle: "SQL Server / PostgreSQL / MySQL",
      bullets: [
        "Cifrado de datos en reposo y tránsito",
        "Respaldos automatizados en caliente",
        "Arquitectura de alta disponibilidad",
        "Auditoría transaccional de operaciones"
      ]
    },
    web: {
      title: "Plataforma Web Corporativa",
      subtitle: "Acceso Universal Multi-usuario",
      bullets: [
        "Soporte para múltiples sucursales",
        "Control de accesos basado en roles (RBAC)",
        "Paneles administrativos reactivos",
        "Integración con APIs e-commerce"
      ]
    },
    desktop: {
      title: "Software de Escritorio Windows",
      subtitle: "Operación de Alto Rendimiento",
      bullets: [
        "Conexión con lectoras, balanzas e impresoras",
        "Modo de trabajo sin conexión (offline)",
        "Velocidad de procesamiento local",
        "Sistemas de cajas rápidas y facturación"
      ]
    },
    mobile: {
      title: "Aplicación Móvil Empresarial",
      subtitle: "Operaciones en Movimiento",
      bullets: [
        "Gestión de inventarios en bodega",
        "Módulo de preventa y visitas de campo",
        "Captura de firmas, fotos y GPS",
        "Notificaciones push en tiempo real"
      ]
    },
    integrations: {
      title: "Integraciones de Sistemas",
      subtitle: "Operación Centralizada Sin Duplicados",
      bullets: [
        "Conector bidireccional SAP Business One",
        "Pasarelas de pago y cobros bancarios",
        "Sistemas de facturación electrónica",
        "Webhooks y colas de mensajes en segundo plano"
      ]
    },
    reports: {
      title: "Business Intelligence & KPIs",
      subtitle: "Análisis de Datos en Tiempo Real",
      bullets: [
        "Gráficos dinámicos e interactivos",
        "Exportación automatizada a PDF y Excel",
        "Alertas por correo y WhatsApp",
        "Comparativa de ventas por sucursales"
      ]
    }
  };

  const activeInfo = nodeDetails[activeNode || "db"];

  return (
    <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-2xl h-[520px] flex flex-col justify-between overflow-hidden group" id="hero-interactive-diagram">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>
      
      {/* Absolute Header of Diagram */}
      <div className="flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping"></div>
          <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
            BWP INFRASTRUCTURE MAP
          </span>
        </div>
        <div className="text-[10px] font-mono bg-slate-800/80 text-red-400 border border-slate-700 rounded px-2.5 py-1 flex items-center gap-1">
          <Shield className="w-3 h-3" />
          <span>Sistemas Seguros</span>
        </div>
      </div>

      {/* Main Diagram Area */}
      <div className="relative flex-grow flex items-center justify-center h-64 my-4">
        {/* SVG Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="line-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          
          {/* Paths from center (50%, 50%) to nodes */}
          <line x1="50%" y1="50%" x2="15%" y2="25%" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_10s_linear_infinite]" />
          <line x1="50%" y1="50%" x2="85%" y2="25%" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="50%" y1="50%" x2="15%" y2="70%" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="50%" y1="50%" x2="85%" y2="70%" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />

          {/* Active node glow paths */}
          {activeNode === "web" && (
            <line x1="50%" y1="50%" x2="15%" y2="25%" stroke="url(#line-glow)" strokeWidth="3" className="animate-pulse" />
          )}
          {activeNode === "desktop" && (
            <line x1="50%" y1="50%" x2="85%" y2="25%" stroke="url(#line-glow)" strokeWidth="3" className="animate-pulse" />
          )}
          {activeNode === "mobile" && (
            <line x1="50%" y1="50%" x2="15%" y2="70%" stroke="url(#line-glow)" strokeWidth="3" className="animate-pulse" />
          )}
          {activeNode === "integrations" && (
            <line x1="50%" y1="50%" x2="85%" y2="70%" stroke="url(#line-glow)" strokeWidth="3" className="animate-pulse" />
          )}
          {activeNode === "reports" && (
            <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="url(#line-glow)" strokeWidth="3" className="animate-pulse" />
          )}
        </svg>

        {/* Central Database Core Node */}
        <button
          onClick={() => setActiveNode("db")}
          onMouseEnter={() => setActiveNode("db")}
          className={`absolute z-20 w-16 h-16 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 flex items-center justify-center shadow-xl transition-all duration-300 ${
            activeNode === "db" ? "border-red-500 scale-110 shadow-red-500/20" : "border-slate-700 hover:border-slate-500"
          }`}
          style={{ top: "calc(50% - 32px)", left: "calc(50% - 32px)" }}
        >
          <DbIcon className={`w-8 h-8 ${activeNode === "db" ? "text-red-500 animate-pulse" : "text-slate-400"}`} />
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-400 whitespace-nowrap uppercase tracking-widest">
            BD CENTRAL
          </span>
        </button>

        {/* Outer Peripheral Nodes */}
        {nodes.map((node) => {
          const NodeIcon = node.icon;
          const isSelected = activeNode === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setActiveNode(node.id)}
              onMouseEnter={() => setActiveNode(node.id)}
              className={`absolute z-20 w-12 h-12 rounded-xl bg-gradient-to-br ${node.color} flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
                isSelected ? "scale-125 ring-4 ring-white/10" : "opacity-80 hover:opacity-100"
              }`}
              style={{
                top: `calc(${node.y} - 24px)`,
                left: `calc(${node.x} - 24px)`,
                boxShadow: isSelected ? `0 0 20px ${node.glowColor}` : "none",
              }}
            >
              <NodeIcon className="w-6 h-6" />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-400 whitespace-nowrap uppercase tracking-wider">
                {node.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Info Panel: Displays active node details */}
      <div className="bg-slate-950/80 border border-slate-850 rounded-xl p-4 relative z-10">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2">
          <div>
            <h4 className="text-sm font-semibold text-white tracking-tight">{activeInfo.title}</h4>
            <p className="text-[10px] font-mono text-slate-400">{activeInfo.subtitle}</p>
          </div>
          <span className="text-[9px] font-mono text-red-400 uppercase tracking-widest bg-red-950/40 border border-red-900/40 px-1.5 py-0.5 rounded">
            Interactivo
          </span>
        </div>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-slate-300">
          {activeInfo.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-center space-x-1.5">
              <span className="w-1 h-1 bg-red-500 rounded-full shrink-0"></span>
              <span className="truncate">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
