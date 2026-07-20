"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Monitor, 
  Layers, 
  HelpCircle, 
  Sparkles,
  ShoppingBag,
  Building,
  Users
} from "lucide-react";
import { 
  getStoredDataAsync, 
  INITIAL_PRODUCTS 
} from "../../lib/data";

export default function ProductosPage() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  useEffect(() => {
    let active=true;void getStoredDataAsync("products",INITIAL_PRODUCTS).then(items=>{if(active)setProducts(items.filter(p=>p.active))});return()=>{active=false};
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-12" id="productos-page-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-left max-w-3xl mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-red-50 text-red-800 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider">
            <span>Soluciones empaquetadas & listas</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Sistemas empaquetados y listos de BWP Software
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Además de nuestro servicio de consultoría a la medida, nuestro equipo diseña y empaqueta productos de software 
            robustos listos para implementar, acelerando la transformación tecnológica de su negocio.
          </p>
        </div>

        {/* Dynamic Products Catalog List */}
        <div className="space-y-16" id="products-catalog-list">
          {products.map((prod) => (
            <div 
              key={prod.id}
              className="bg-white border border-gray-150 rounded-2xl p-6 lg:p-10 shadow-sm flex flex-col lg:flex-row gap-10 items-stretch"
              id={`prod-card-${prod.id}`}
            >
              {/* Product Visual Mockup / Feature Box */}
              <div className="lg:w-2/5 bg-slate-900 rounded-xl p-6 text-white flex flex-col justify-between border border-slate-800 relative overflow-hidden shrink-0">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-700/10 rounded-full blur-xl"></div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold">
                      Licencia Disponible
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight font-display">{prod.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Un sistema robusto diseñado para unificar la operación de caja, facturación de ley y el stock de múltiples bodegas de forma segura.
                  </p>
                </div>

                {/* Core Stats in Simulated POS */}
                <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800 space-y-3 my-6 text-left">
                  <span className="text-[9px] font-mono text-gray-500 block">PANEL DE CONTROL</span>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-gray-400 block text-[10px]">Cajas Activas:</span>
                      <span className="text-white font-mono font-bold">Sincronizadas</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Facturas del Día:</span>
                      <span className="text-emerald-400 font-mono font-bold">Generadas</span>
                    </div>
                  </div>
                  <div className="border-t border-slate-850 pt-2 flex justify-between items-center text-[10px] text-gray-400">
                    <span>Impresoras Térmicas:</span>
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-900 px-1.5 py-0.5 rounded font-mono">
                      CONECTADO
                    </span>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-400">
                  Desarrollado y mantenido por BWP Software
                </div>
              </div>

              {/* Product Descriptions & Details */}
              <div className="flex-grow flex flex-col justify-between text-left">
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono text-gray-500 tracking-wider block">
                      DESCRIPCIÓN GENERAL
                    </span>
                    <p className="text-slate-600 text-sm leading-relaxed mt-2">
                      {prod.description}
                    </p>
                  </div>

                  {/* Dual Grid: Features and Target Companies */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                    {/* Features list (7 cols) */}
                    <div className="md:col-span-7 space-y-3">
                      <span className="block text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-red-700 shrink-0" />
                        Funciones Principales:
                      </span>
                      <ul className="grid grid-cols-1 gap-2 text-xs text-gray-600">
                        {prod.features.map((feat, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 text-red-700 shrink-0 mr-2 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Target Companies (5 cols) */}
                    <div className="md:col-span-5 space-y-3">
                      <span className="block text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-slate-700 shrink-0" />
                        ¿Para qué empresas es ideal?
                      </span>
                      <ul className="space-y-2 text-xs text-gray-600 bg-slate-50 border border-gray-100 p-4 rounded-xl">
                        {prod.targetCompanies.map((comp, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-slate-800 rounded-full shrink-0 mr-2 mt-1.5"></span>
                            <span>{comp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Bottom Buttons */}
                <div className="pt-6 mt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex gap-3">
                    <Link
                      href={`/contacto?product=${encodeURIComponent(prod.title)}&action=demo`}
                      className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded shadow-md transition-colors"
                      id="btn-demo-request"
                    >
                      Solicitar Demostración
                    </Link>
                    <Link
                      href={`/contacto?product=${encodeURIComponent(prod.title)}&action=cotizar`}
                      className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold text-white bg-red-700 hover:bg-red-800 rounded shadow-md transition-colors"
                      id="btn-quote-request"
                    >
                      Solicitar Cotización
                    </Link>
                  </div>
                  
                  <a
                    href={prod.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-semibold text-slate-700 hover:text-red-700 transition-colors"
                    id="link-pos-url"
                  >
                    Visitar {prod.externalUrl.replace("https://", "")}
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scalability Disclaimer (Future Products) */}
        <div className="mt-16 bg-slate-100 border border-gray-200 rounded-xl p-6 text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">
            PRÓXIMOS LANZAMIENTOS BWP
          </span>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            Nuestro equipo de I+D trabaja constantemente construyendo nuevas soluciones empaquetadas: sistemas de nómina móvil, 
            conectores de almacenes (WMS) y portales CRM. Si es administrador del sitio, puede agregar nuevos productos 
            desde el Panel de Control.
          </p>
        </div>

      </div>
    </div>
  );
}
