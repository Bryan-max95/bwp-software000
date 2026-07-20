"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Inicio", path: "/" },
    { name: "Servicios", path: "/servicios" },
    { name: "Soluciones", path: "/soluciones" },
    { name: "Industrias", path: "/industrias" },
    { name: "Casos de éxito", path: "/casos-de-exito" },
    { name: "Nosotros", path: "/nosotros" },
    { name: "Socios", path: "/socios" },
  ];

  const capabilityItems = [
    { name: "Integraciones empresariales", path: "/integraciones", desc: "API, SAP B1 y plataformas externas" },
    { name: "Productos", path: "/productos", desc: "Soluciones propias de BWP Software" },
    { name: "Tecnologías y Cloud", path: "/tecnologias", desc: "AWS, Azure, Google Cloud y stack técnico" },
    { name: "Arquitectura empresarial", path: "/arquitectura", desc: "Plataformas grandes, modulares y distribuidas" },
    { name: "Metodología", path: "/metodologia", desc: "Fases, entregables y gobierno de proyectos" },
    { name: "Seguridad y continuidad", path: "/seguridad", desc: "Controles, auditoría y recuperación" },
    { name: "Soporte y evolución", path: "/soporte", desc: "Operación y crecimiento post-implementación" },
    { name: "DevOps y operación Cloud", path: "/devops-cloud", desc: "Automatización, observabilidad y continuidad" },
    { name: "Data Engineering y BI", path: "/data-engineering-bi", desc: "ETL, data warehouse, KPIs y tableros" },
    { name: "Modernización Legacy", path: "/modernizacion-legacy", desc: "Migración de sistemas y datos heredados" },
    { name: "Centro de Integraciones", path: "/centro-integraciones", desc: "SAP, bancos, ERP, CRM y plataformas externas" },
    { name: "Plataformas SaaS", path: "/plataformas-saas", desc: "Productos multiempresa y multicliente" },
    { name: "Alto rendimiento", path: "/alto-rendimiento", desc: "Rust, Go, C++ y procesamiento intensivo" },
    { name: "Consultoría digital", path: "/consultoria-transformacion", desc: "Diagnóstico y hoja de ruta empresarial" },
  ];

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3"
            : "bg-white/90 backdrop-blur-sm border-b border-gray-50 py-4"
        }`}
        id="bwp-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo BWP Software */}
            <Link href="/" className="flex items-center group" id="logo-link">
              <Logo variant="light" iconSize={36} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2" id="desktop-nav">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "text-slate-900 bg-slate-100"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="relative group">
                <button
                  type="button"
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 inline-flex items-center gap-1 ${
                    capabilityItems.some((item) => pathname === item.path)
                      ? "text-slate-900 bg-slate-100"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                  aria-haspopup="true"
                >
                  Capacidades <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[760px] opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200">
                  <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 grid grid-cols-3 gap-1 max-h-[72vh] overflow-y-auto">
                    {capabilityItems.map((item) => (
                      <Link key={item.path} href={item.path} className="p-4 rounded-xl hover:bg-slate-50 transition-colors group/item">
                        <span className="flex items-center justify-between text-sm font-bold text-slate-900">{item.name}<ArrowRight className="w-4 h-4 text-red-700 opacity-0 group-hover/item:opacity-100 transition-opacity" /></span>
                        <span className="block text-xs text-slate-500 mt-1">{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Primary commercial action */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center bg-red-900 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-red-900/20 hover:bg-red-800 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                id="cta-cotizar"
              >
                Solicitar cotización
                <ArrowRight className="ml-1.5 w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-gray-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
                aria-expanded={isOpen}
                id="mobile-menu-toggle"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl flex flex-col p-6 z-50 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <Logo variant="light" iconSize={32} />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-gray-500 hover:text-slate-900 hover:bg-slate-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col space-y-1.5 flex-grow">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-150 ${
                        isActive
                          ? "bg-slate-100 text-slate-900 font-bold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                <div className="pt-4 mt-3 border-t border-slate-100">
                  <span className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Capacidades empresariales</span>
                  <div className="mt-2 space-y-1">
                    {capabilityItems.map((item) => (
                      <Link key={item.path} href={item.path} onClick={() => setIsOpen(false)} className={`block px-4 py-2 rounded-lg text-sm ${pathname === item.path ? "bg-slate-100 text-slate-900 font-bold" : "text-slate-600 hover:bg-slate-50"}`}>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>

              <div className="pt-6 border-t border-gray-100 space-y-3">
                <Link
                  href="/contacto"
                  onClick={() => setIsOpen(false)}
                  className="w-full inline-flex items-center justify-center bg-red-900 text-white px-5 py-3 rounded-full text-sm font-bold shadow-lg shadow-red-900/20 hover:bg-red-800 transition-colors"
                >
                  Solicitar cotización
                  <ArrowRight className="ml-1.5 w-4 h-4" />
                </Link>
                <div className="text-center">
                  <span className="text-xs text-gray-400 font-mono">Roatán, Islas de la Bahía, Honduras</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
