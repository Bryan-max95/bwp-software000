"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import { Logo } from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sectionLinks = [
    { name: "Inicio", path: "/" },
    { name: "Servicios", path: "/servicios" },
    { name: "Soluciones", path: "/soluciones" },
    { name: "Integraciones", path: "/integraciones" },
    { name: "Productos", path: "/productos" },
    { name: "Tecnologías y Cloud", path: "/tecnologias" },
    { name: "Arquitectura empresarial", path: "/arquitectura" },
    { name: "DevOps y Cloud", path: "/devops-cloud" },
    { name: "Data Engineering y BI", path: "/data-engineering-bi" },
    { name: "Centro de Integraciones", path: "/centro-integraciones" },
  ];

  const secondaryLinks = [
    { name: "Industrias", path: "/industrias" },
    { name: "Casos de éxito", path: "/casos-de-exito" },
    { name: "Metodología", path: "/metodologia" },
    { name: "Seguridad y continuidad", path: "/seguridad" },
    { name: "Soporte y evolución", path: "/soporte" },
    { name: "Nosotros", path: "/nosotros" },
    { name: "Socios y liderazgo", path: "/socios" },
    { name: "Contacto", path: "/contacto" },
    { name: "Preguntas Frecuentes", path: "/faq" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800" id="bwp-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center group">
              <Logo variant="dark" iconSize={36} />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed pt-2">
              Convertimos procesos manuales, información separada y operaciones complejas en soluciones digitales seguras, escalables y adaptadas a las necesidades reales de cada empresa.
            </p>
            <div className="pt-2 text-xs text-slate-400 border-l-2 border-red-500 pl-3 italic">
              &ldquo;Desde una necesidad específica hasta una plataforma empresarial completa.&rdquo;
            </div>
          </div>

          {/* Column 2: Navigation 1 */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 font-sans">
              Explorar
            </h3>
            <ul className="space-y-2.5 text-sm">
              {sectionLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="flex items-center hover:text-white hover:translate-x-1 transition-all duration-200 text-slate-400"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 text-red-500" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation 2 */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 font-sans">
              Compañía
            </h3>
            <ul className="space-y-2.5 text-sm">
              {secondaryLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="flex items-center hover:text-white hover:translate-x-1 transition-all duration-200 text-slate-400"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 text-red-500" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact details */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-1 font-sans">
              Contacto Principal
            </h3>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-red-500 shrink-0 mt-0.5" />
                <span>Roatán, Islas de la Bahía, Honduras</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-red-500 shrink-0" />
                <a href="tel:+50488285822" className="hover:text-white transition-colors">
                  (+504) 8828-5822
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-red-500 shrink-0" />
                <a href="mailto:bwpsoporte@gmail.com" className="hover:text-white transition-colors">
                  bwpsoporte@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-2">
              <span className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                Soporte IT
              </span>
              <span className="text-sm font-medium text-white block">
                Atención empresarial BWP Software
              </span>
              <span className="text-xs text-slate-400 block mt-0.5">
                Soporte técnico y coordinación de proyectos
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left">
            &copy; {currentYear} BWP Software. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500">
            <Link href="/privacidad" className="hover:text-slate-400">Política de Privacidad</Link>
            <Link href="/terminos" className="hover:text-slate-400">Términos y Condiciones</Link>
            <Link href="/privacidad#cookies" className="hover:text-slate-400">Aviso de Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
