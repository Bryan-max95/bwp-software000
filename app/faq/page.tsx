"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, ChevronUp, HelpCircle, ArrowRight, MessageSquare } from "lucide-react";
import { 
  getStoredDataAsync, 
  INITIAL_FAQS 
} from "../../lib/data";

export default function FAQPage() {
  const [faqs, setFaqs] = useState(INITIAL_FAQS);
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1"); // Open first by default

  useEffect(() => {
    let active=true;void getStoredDataAsync("faqs",INITIAL_FAQS).then(items=>{if(active)setFaqs(items.filter(f=>f.active))});return()=>{active=false};
  }, []);

  const toggleFaq = (id: string) => {
    if (openFaqId === id) {
      setOpenFaqId(null);
    } else {
      setOpenFaqId(id);
    }
  };

  // Filter based on search query
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen py-12" id="faq-page-container">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-left max-w-2xl mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-red-50 text-red-800 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider">
            <span>Resolución de Dudas Frecuentes</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Preguntas Frecuentes de Clientes
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Aquí resolvemos las dudas técnicas y comerciales más habituales que enfrentan las empresas antes de iniciar un 
            desarrollo de software con nuestro equipo.
          </p>
        </div>

        {/* Live Search Accordion Box */}
        <div className="relative max-w-lg mb-10 shadow-sm">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search className="w-4.5 h-4.5" />
          </span>
          <input
            type="text"
            placeholder="Buscar en preguntas frecuentes (ej. SAP, precio, soporte)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              // Open first match if searching
              const matches = faqs.filter(f => f.question.toLowerCase().includes(e.target.value.toLowerCase()) || f.answer.toLowerCase().includes(e.target.value.toLowerCase()));
              if (matches.length > 0 && e.target.value) {
                setOpenFaqId(matches[0].id);
              }
            }}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 focus:border-red-600 rounded-lg outline-none transition-all"
            id="search-faq-input"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-4" id="faq-accordions-list">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div 
                key={faq.id} 
                className="bg-white border border-gray-150 rounded-xl overflow-hidden shadow-sm hover:border-gray-200 transition-colors"
                id={`faq-accordion-${faq.id}`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left gap-4 font-semibold text-slate-900 text-xs sm:text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2 font-display">
                    <HelpCircle className="w-4.5 h-4.5 text-red-700 shrink-0" />
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-left text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 bg-slate-50/20">
                    <p className="whitespace-pre-line">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 bg-white border border-gray-100 rounded-xl">
              <span className="text-gray-400 text-xs block">No encontramos respuestas que coincidan con su búsqueda.</span>
              <button 
                onClick={() => setSearchQuery("")}
                className="text-xs text-red-700 font-bold underline mt-2"
              >
                Ver todas las preguntas
              </button>
            </div>
          )}
        </div>

        {/* Closing Quick Help Banner */}
        <div className="mt-16 bg-white border border-gray-150 rounded-2xl p-6 lg:p-10 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 text-left" id="faq-cta-footer">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 font-display">¿Aún tiene dudas sin responder?</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              No se preocupe. Agende una llamada de 15 minutos sin costo ni compromiso con nuestro equipo técnico para conversar sobre su negocio.
            </p>
          </div>
          
          <div className="flex gap-3 shrink-0">
            <Link 
              href="/contacto" 
              className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold text-white bg-red-700 hover:bg-red-800 rounded shadow-md transition-colors"
            >
              Contactar Especialista
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
            <a 
              href="https://wa.me/50488285822?text=Hola%20tengo%20una%20duda%20sobre%20un%20proyecto%20con%20BWP%20Software."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-500 mr-1.5" />
              WhatsApp Directo
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
