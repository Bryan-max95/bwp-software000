"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappUrl = "https://wa.me/50488285822?text=Hola%20BWP%20Software,%20me%20gustaría%20solicitar%20información%20sobre%20un%20desarrollo%20de%20software.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 group"
      title="Contactar por WhatsApp"
      id="whatsapp-floating-button"
    >
      <MessageCircle className="w-7 h-7 fill-white/10" />
      {/* Tooltip on Hover */}
      <span className="absolute right-16 scale-0 group-hover:scale-100 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap origin-right transition-all duration-200">
        ¿Hablamos por WhatsApp?
      </span>
    </a>
  );
}
