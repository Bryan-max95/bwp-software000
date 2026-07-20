"use client";

import React from "react";
import Link from "next/link";
import { 
  GitBranch, 
  ArrowRight, 
  Database as DbIcon, 
  Layers, 
  CheckCircle, 
  RefreshCw, 
  Cpu, 
  Monitor, 
  Smartphone, 
  Terminal,
  ShieldAlert
} from "lucide-react";

export default function IntegracionesPage() {
  const sapProcesses = [
    { title: "Sincronización de clientes", desc: "Altas, modificaciones e historiales consolidados bidireccionalmente." },
    { title: "Sincronización de productos", desc: "Listas de precios, códigos de barra y descripciones actualizadas." },
    { title: "Existencias y almacenes", desc: "Control estricto de stocks por bodega o sucursal en tiempo real." },
    { title: "Órdenes de venta", desc: "Registro inmediato de compromisos comerciales originados en web o móvil." },
    { title: "Facturas y Pagos", desc: "Generación de documentos de cobro y conciliación directa en finanzas." },
    { title: "Proveedores y Compras", desc: "Trazabilidad de solicitudes y recepciones directas al inventario SAP." },
    { title: "Reportes consolidados", desc: "Extracción y consolidación de KPIs financieros e inventarios." },
    { title: "Estados de documentos", desc: "Trazabilidad completa de órdenes, desde pre-factura hasta despacho." },
  ];

  const otherIntegrations = [
    "Sistemas de Punto de Venta (POS)",
    "Plataformas Contables Externas",
    "Sistemas Administrativos Legacy",
    "Pasarelas de Pago (Stripe, BAC, etc.)",
    "Bancos y Servicios de Cobros Locales",
    "Sistemas de Facturación Gubernamental",
    "Plataformas de Almacenamiento (S3, Drive)",
    "Servicios de Correo Masivo (SendGrid, Mailgun)",
    "Notificaciones por WhatsApp Automatizadas",
    "Servicios e APIs de Nube de Terceros",
    "Bases de Datos (SQL Server, PostgreSQL, MySQL)",
    "Equipos y Periféricos (Balanzas, Impresoras)"
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12" id="integraciones-page-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-left max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-red-50 text-red-800 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider">
            <span>Interoperabilidad & Sincronización</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Conectamos su operación con las plataformas que su empresa ya utiliza
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            No siempre es necesario reemplazar todo el software existente. BWP Software puede desarrollar integraciones 
            para conectar sistemas aislados, automatizar el intercambio de información y eliminar por completo la duplicación de trabajo manual.
          </p>
        </div>

        {/* VISUAL FLOW OF INTEGRATION (Sección 10 de los requerimientos) */}
        <div className="bg-white border border-gray-150 rounded-2xl p-6 lg:p-10 shadow-sm mb-16 text-center">
          <div className="max-w-xl mx-auto mb-8">
            <span className="text-[10px] font-mono tracking-widest text-red-700 uppercase font-bold">
              ARQUITECTURA DE INTEGRACIÓN BWP
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1 font-display">
              Trazabilidad en Tiempo Real de Datos Corporativos
            </h2>
          </div>

          {/* Interactive/Animated Pipeline Graph */}
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 max-w-4xl mx-auto py-8 bg-slate-50/50 rounded-xl border border-gray-100 px-6">
            
            {/* Left Node: Sistema Empresarial */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 w-full md:w-52 shadow-sm relative z-10 flex flex-col items-center">
              <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center mb-2">
                <Monitor className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-900 font-display">Sistema Empresarial</span>
              <span className="text-[9px] font-mono text-gray-400 mt-1 uppercase">Web, Escritorio o Móvil</span>
            </div>

            {/* Connecting Arrow/Line 1 */}
            <div className="hidden md:flex items-center flex-grow justify-center relative">
              <div className="w-full h-0.5 bg-dashed border-t-2 border-slate-300"></div>
              <div className="absolute w-2 h-2 bg-red-700 rounded-full animate-ping"></div>
              <ArrowRight className="w-4 h-4 text-slate-400 absolute right-1" />
            </div>

            {/* Center Node: Integrador BWP (The Engine) */}
            <div className="bg-gradient-to-br from-red-700 to-red-800 text-white rounded-xl p-4 w-full md:w-56 shadow-lg relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2 border border-white/20 animate-spin-slow">
                <RefreshCw className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold font-display">Integrador BWP</span>
              <span className="text-[9px] font-mono text-red-200 mt-1 uppercase tracking-wider">Engine & Middleware</span>
            </div>

            {/* Connecting Arrow/Line 2 */}
            <div className="hidden md:flex items-center flex-grow justify-center relative">
              <div className="w-full h-0.5 bg-dashed border-t-2 border-slate-300"></div>
              <div className="absolute w-2 h-2 bg-blue-700 rounded-full animate-ping"></div>
              <ArrowRight className="w-4 h-4 text-slate-400 absolute right-1" />
            </div>

            {/* Right Node: Destinos final (SAP, POS, Bancos) */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 w-full md:w-52 shadow-sm relative z-10 flex flex-col items-center">
              <div className="w-9 h-9 rounded-lg bg-blue-900 text-white flex items-center justify-center mb-2">
                <DbIcon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-blue-900 font-display">Plataformas Externas</span>
              <span className="text-[9px] font-mono text-gray-400 mt-1 uppercase">SAP B1, POS, Bancos</span>
            </div>
            
          </div>
          <p className="text-[11px] text-gray-500 font-mono mt-4">
            Flujo visual: El sistema de campo envía datos → El Integrador BWP procesa y valida → Sincronización final en bases externas sin pérdidas.
          </p>
        </div>

        {/* SAP Business One Integration Segment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-16" id="sap-integration-segment">
          {/* SAP Card Description */}
          <div className="lg:col-span-5 bg-gradient-to-b from-blue-950 to-slate-900 text-white rounded-2xl p-6 lg:p-10 flex flex-col justify-between shadow-md">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-blue-900/50 border border-blue-800 text-blue-300 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider">
                <span>Capacidad Técnica Avanzada</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold font-display leading-tight">
                Integración con SAP Business One
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Desarrollamos soluciones satélite que pueden intercambiar información con SAP Business One de acuerdo con la infraestructura, 
                versión, permisos y mecanismos de integración disponibles en cada empresa (Service Layer, DI API, Integration Framework o vistas SQL).
              </p>
            </div>

            {/* Important Disclaimer Rule */}
            <div className="mt-8 bg-blue-900/30 border border-blue-800/50 rounded-xl p-4 flex items-start space-x-3 text-xs text-blue-200">
              <ShieldAlert className="w-5 h-5 shrink-0 text-blue-400 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Nota Técnica:</strong> BWP Software presenta esta solución como una demostración de su alta capacidad técnica y de ingeniería de datos para conectar sistemas propios a SAP, no indicando ninguna asociación oficial, membresía certificada o sociedad directa con SAP SE.
              </p>
            </div>
          </div>

          {/* SAP Processes List */}
          <div className="lg:col-span-7 bg-white border border-gray-150 rounded-2xl p-6 lg:p-10 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-6 font-display uppercase tracking-wider">
              Procesos SAP que automatizamos frecuentemente:
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sapProcesses.map((p, idx) => (
                <div key={idx} className="flex gap-3 items-start" id={`sap-p-${idx}`}>
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 font-display">{p.title}</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Other Integrations Segment */}
        <div className="bg-white border border-gray-150 rounded-2xl p-6 lg:p-10 shadow-sm text-left">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-900 font-display uppercase tracking-wider">
              Otras Integraciones Disponibles
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Diseñamos arquitecturas de software modulares capaces de interactuar con hardware, APIs en la nube y servicios financieros.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-700">
            {otherIntegrations.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 border border-gray-100 p-3.5 rounded-lg font-semibold hover:border-red-600 hover:bg-white transition-all duration-200 flex items-center space-x-2"
                id={`other-int-${idx}`}
              >
                <span className="w-1.5 h-1.5 bg-red-700 rounded-full"></span>
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Consultation CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-red-800 to-red-950 text-white rounded-2xl p-8 text-center shadow-md">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-xl font-bold font-display">¿Desea conectar un sistema heredado o su base de datos actual?</h3>
            <p className="text-xs text-red-100">
              Evaluamos la API, los esquemas de bases de datos de su proveedor actual y diseñamos un conector para que sigan operando de manera integrada sin pérdidas de información.
            </p>
            <div className="pt-2">
              <Link 
                href="/contacto" 
                className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-red-900 font-bold text-xs rounded-lg hover:bg-red-50 transition-colors"
              >
                Consultar Integración Especializada
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
