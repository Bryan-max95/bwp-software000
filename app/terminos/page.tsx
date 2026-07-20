import type { Metadata } from "next";

export const metadata: Metadata = { title: "Términos y Condiciones | BWP Software", description: "Condiciones generales de uso del sitio web informativo de BWP Software." };

const sections = [
  ["Objeto del sitio", "Este sitio presenta de forma general las capacidades, servicios, productos y formas de contacto de BWP Software. Su contenido es informativo y no constituye por sí mismo una oferta contractual."],
  ["Propuestas y contratación", "El alcance, precio, plazo, entregables, licencias, soporte y demás condiciones de un proyecto se establecen únicamente en una propuesta o contrato aceptado por las partes."],
  ["Uso permitido", "El usuario se compromete a utilizar el sitio de manera lícita y a no intentar afectar su disponibilidad, acceder sin autorización a sistemas o introducir contenido malicioso."],
  ["Propiedad intelectual", "Las marcas, textos, diseños, código, demostraciones y materiales identificados en el sitio pertenecen a sus respectivos titulares. Su publicación no concede derechos de reproducción o explotación."],
  ["Información y disponibilidad", "Procuramos mantener información clara y actualizada, pero las capacidades y características pueden evolucionar. La disponibilidad ininterrumpida del sitio no está garantizada."],
  ["Contacto", "Para preguntas relacionadas con estos términos puede escribir a info@bwpentesting.com o comunicarse al (+504) 8828-5822."]
];

export default function TerminosPage(){return <main className="bg-slate-50 py-28"><article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><span className="text-xs font-bold text-red-700 uppercase tracking-widest">Marco legal del sitio</span><h1 className="text-4xl font-extrabold text-slate-900 mt-3">Términos y Condiciones</h1><p className="text-slate-500 mt-3">Última actualización: 20 de julio de 2026</p><div className="bg-white border border-slate-200 rounded-2xl p-7 lg:p-10 mt-10 space-y-9">{sections.map(([title,text])=><section key={title}><h2 className="text-xl font-bold text-slate-900">{title}</h2><p className="text-slate-600 leading-relaxed mt-3">{text}</p></section>)}</div><p className="text-xs text-slate-500 mt-6">Este contenido es una base informativa y debe validarse con asesoría legal antes de una publicación comercial definitiva.</p></article></main>}
