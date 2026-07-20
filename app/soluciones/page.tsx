"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, ChevronRight, Sparkles, Database, GitBranch, ShieldCheck, Users } from "lucide-react";
import { 
  getStoredDataAsync, 
  INITIAL_SOLUTIONS, 
  getLucideIcon 
} from "../../lib/data";

export default function SolucionesPage() {
  const [solutions, setSolutions] = useState(INITIAL_SOLUTIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "CORE" | "ADVANCED">("ALL");

  useEffect(() => {
    let active=true;void getStoredDataAsync("solutions",INITIAL_SOLUTIONS).then(items=>{if(active)setSolutions(items.filter(s=>s.active))});return()=>{active=false};
  }, []);

  // Filter logic
  const filteredSolutions = solutions.filter((sol) => {
    const matchesSearch = 
      sol.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sol.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (filterType === "CORE") return !sol.isStrongAdditional;
    if (filterType === "ADVANCED") return sol.isStrongAdditional;
    return true;
  });

  const coreSolutions = filteredSolutions.filter(s => !s.isStrongAdditional);
  const advancedSolutions = filteredSolutions.filter(s => s.isStrongAdditional);
  const decisionCriteria = [
    { icon: Users, title: "Usuarios y responsables", text: "Quién registra, aprueba, supervisa y consulta información dentro del proceso." },
    { icon: GitBranch, title: "Sistemas conectados", text: "ERP, bancos, pagos, hardware, archivos, proveedores y plataformas que deben intercambiar datos." },
    { icon: Database, title: "Información y trazabilidad", text: "Datos maestros, transacciones, históricos, reportes y auditoría necesaria." },
    { icon: ShieldCheck, title: "Riesgo y continuidad", text: "Permisos, disponibilidad, recuperación y controles según la criticidad de la operación." }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12" id="soluciones-page-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="relative bg-gradient-to-br from-slate-950 to-blue-950 text-white rounded-[2.5rem_0_2.5rem_0] p-8 lg:p-14 mb-12 overflow-hidden">
          <div className="absolute right-[-6rem] top-[-8rem] w-80 h-80 rounded-full border border-red-700/20"></div>
          <div className="text-left max-w-4xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 text-red-300 text-xs font-semibold uppercase tracking-wider">
            <span>Soluciones Corporativas Modulares</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-[-.05em] font-display leading-tight">
            Una arquitectura modular para conectar toda la operación
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
            Nuestras soluciones modulares cubren todo el espectro operacional. Puede comenzar implementando un módulo básico y luego 
            expandir el sistema conforme crezca su negocio, integrándose perfectamente con su ecosistema existente.
          </p>
          </div><div className="relative z-10 mt-8 flex flex-wrap gap-6 text-xs font-mono text-slate-400"><span>{solutions.length} capacidades configurables</span><span>Core + especializadas</span><span>Integración empresarial</span></div></div>

        {/* Search and Filters Bar */}
        <div className="bg-white border border-gray-150 rounded-xl p-4 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          {/* Search Box */}
          <div className="relative flex-grow max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <Search className="w-4.5 h-4.5" />
            </span>
            <input
              type="text"
              placeholder="Buscar soluciones (ej. ERP, Contabilidad, CRM)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-gray-200 focus:border-red-600 rounded-lg outline-none transition-all"
              id="search-solutions-input"
            />
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterType("ALL")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                filterType === "ALL"
                  ? "bg-slate-900 text-white shadow"
                  : "bg-slate-100 text-gray-600 hover:bg-slate-200"
              }`}
            >
              Ver Todas
            </button>
            <button
              onClick={() => setFilterType("CORE")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                filterType === "CORE"
                  ? "bg-slate-900 text-white shadow"
                  : "bg-slate-100 text-gray-600 hover:bg-slate-200"
              }`}
            >
              Módulos Principales
            </button>
            <button
              onClick={() => setFilterType("ADVANCED")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                filterType === "ADVANCED"
                  ? "bg-slate-900 text-white shadow"
                  : "bg-slate-100 text-gray-600 hover:bg-slate-200"
              }`}
            >
              Sistemas Especializados (15+ Fuertes)
            </button>
          </div>
        </div>

        <div className="mb-16 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4"><span className="text-xs font-bold text-red-800 uppercase tracking-[.2em]">Antes de elegir módulos</span><h2 className="text-3xl font-bold mt-4">La solución correcta depende de cómo funciona su empresa</h2><p className="text-sm text-slate-600 mt-4">El catálogo es un punto de partida. Durante el análisis definimos qué módulos usar, cuáles adaptar y cuáles desarrollar desde cero.</p></div>
          <div className="lg:col-span-8 border-t border-slate-300">{decisionCriteria.map((item,index)=>{const Icon=item.icon;return <div key={item.title} className="grid sm:grid-cols-[50px_60px_220px_1fr] gap-4 py-5 border-b border-slate-200 items-center"><span className="font-mono text-slate-400">0{index+1}</span><Icon className="w-5 h-5 text-red-800"/><h3 className="font-bold">{item.title}</h3><p className="text-xs text-slate-600">{item.text}</p></div>})}</div>
        </div>

        {/* Grid 1: Core/Primary Solutions */}
        {(filterType === "ALL" || filterType === "CORE") && coreSolutions.length > 0 && (
          <div className="space-y-6 mb-16" id="core-solutions-group">
            <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
              <span className="w-1.5 h-6 bg-red-700 rounded-full"></span>
              <h2 className="text-xl font-bold text-slate-900 font-display">Módulos Administrativos de Base</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreSolutions.map((sol) => {
                const IconComp = getLucideIcon(sol.iconName);
                return (
                  <div
                    key={sol.id}
                    className="bg-white border border-gray-150 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                    id={`sol-card-${sol.id}`}
                  >
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-slate-50 text-slate-800 flex items-center justify-center mb-4 group-hover:bg-red-50 group-hover:text-red-700 transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 font-display mb-2">{sol.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{sol.description}</p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-gray-50 flex items-center justify-between text-xs">
                      <span className="text-gray-400">Módulo Core</span>
                      <Link
                        href={`/contacto?solution=${encodeURIComponent(sol.title)}`}
                        className="inline-flex items-center text-red-700 hover:text-red-800 font-semibold gap-1"
                      >
                        Cotizar
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Grid 2: 15 Strong Advanced Solutions */}
        {(filterType === "ALL" || filterType === "ADVANCED") && advancedSolutions.length > 0 && (
          <div className="space-y-6" id="advanced-solutions-group">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-6 bg-slate-900 rounded-full"></span>
                <h2 className="text-xl font-bold text-slate-900 font-display">15 Soluciones de Negocio Avanzadas</h2>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded">Especialidad BWP</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedSolutions.map((sol) => {
                const IconComp = getLucideIcon(sol.iconName);
                return (
                  <div
                    key={sol.id}
                    className="bg-white border border-gray-150 p-6 rounded-xl shadow-sm hover:shadow-md hover:border-red-100 transition-all duration-300 flex flex-col justify-between group"
                    id={`sol-card-${sol.id}`}
                  >
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-red-50 text-red-700 flex items-center justify-center mb-4 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 font-display mb-2 flex items-center gap-1.5">
                        {sol.title}
                        <Sparkles className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{sol.description}</p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-gray-50 flex items-center justify-between text-xs">
                      <span className="text-red-700 font-medium bg-red-50 px-2 py-0.5 rounded text-[10px] uppercase">
                        Alta Complejidad
                      </span>
                      <Link
                        href={`/contacto?solution=${encodeURIComponent(sol.title)}`}
                        className="inline-flex items-center text-slate-900 hover:text-red-700 font-semibold gap-1"
                      >
                        Solicitar Análisis
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty Search Results */}
        {filteredSolutions.length === 0 && (
          <div className="text-center py-16 bg-white border border-gray-100 rounded-xl max-w-md mx-auto my-8">
            <span className="text-slate-400 text-sm block mb-2">No se encontraron soluciones para su búsqueda</span>
            <button
              onClick={() => { setSearchQuery(""); setFilterType("ALL"); }}
              className="text-xs text-red-700 font-semibold underline"
            >
              Restablecer filtros de búsqueda
            </button>
          </div>
        )}

        {/* Architecture Reminder block */}
        <div className="mt-16 bg-slate-950 text-white p-8 lg:p-12 rounded-2xl">
          <span className="text-xs font-mono text-red-400 uppercase tracking-widest">Arquitectura modular</span><h2 className="text-3xl font-bold mt-4">Los módulos comparten datos, permisos y trazabilidad</h2><p className="text-slate-300 max-w-3xl mt-4">Una venta puede actualizar inventario, generar cuentas por cobrar, alimentar indicadores y sincronizarse con un ERP externo. Diseñamos esas relaciones para evitar duplicidad y mantener una fuente responsable para cada información.</p><div className="mt-8 flex flex-wrap gap-3">{["Usuarios y roles","Datos maestros","Procesos y aprobaciones","API e integraciones","Reportes y KPIs","Auditoría y seguridad"].map((item,index)=><span key={item} className="px-4 py-2 border border-slate-700 rounded-full text-xs"><b className="text-red-400 mr-2">0{index+1}</b>{item}</span>)}</div>
        </div>

        <div className="mt-16 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-2 max-w-3xl">
            <h3 className="text-lg font-bold text-slate-900 font-display">¿No encuentra el módulo exacto que su operación requiere?</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Desarrollamos flujos totalmente personalizados. Si su empresa opera en un nicho con requerimientos específicos de cálculo o logística, 
              diseñamos el módulo desde cero garantizando adaptabilidad completa.
            </p>
          </div>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center px-5 py-3 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg shadow shrink-0 whitespace-nowrap transition-colors"
          >
            Diseñar una solución a la medida
          </Link>
        </div>

      </div>
    </div>
  );
}
