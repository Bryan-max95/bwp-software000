import type { Metadata } from "next";

export const metadata: Metadata = { title: "Política de Privacidad | BWP Software", description: "Información sobre el tratamiento de datos personales en el sitio web de BWP Software." };

const sections = [
  ["Información que recopilamos", "Podemos recibir los datos que usted proporciona en formularios de contacto o cotización, como nombre, empresa, cargo, correo, teléfono y detalles generales de su necesidad. Evite incluir contraseñas, datos financieros u otra información sensible en los campos abiertos."],
  ["Finalidad del tratamiento", "Utilizamos la información para responder consultas, evaluar solicitudes, preparar propuestas, coordinar reuniones y mantener comunicaciones relacionadas con una relación comercial solicitada por usted."],
  ["Conservación y protección", "Conservamos la información durante el tiempo razonablemente necesario para atender la solicitud y cumplir obligaciones aplicables. Aplicamos medidas organizativas y técnicas acordes con la naturaleza de la información."],
  ["Terceros y enlaces externos", "No comercializamos sus datos personales. El sitio puede enlazar servicios externos, como WhatsApp o sitios de productos, sujetos a sus propias políticas de privacidad."],
  ["Sus derechos y contacto", "Puede solicitar información, corrección o eliminación de sus datos escribiendo a info@bwpentesting.com. La solicitud podrá requerir validación razonable de identidad."],
  ["Cookies", "El sitio puede utilizar almacenamiento técnico o tecnologías necesarias para recordar preferencias y permitir funciones. Cualquier herramienta analítica o publicitaria adicional deberá identificarse y configurarse antes de su uso."]
];

export default function PrivacidadPage(){return <main className="bg-slate-50 py-28"><article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><span className="text-xs font-bold text-red-700 uppercase tracking-widest">Marco legal del sitio</span><h1 className="text-4xl font-extrabold text-slate-900 mt-3">Política de Privacidad</h1><p className="text-slate-500 mt-3">Última actualización: 20 de julio de 2026</p><div className="bg-white border border-slate-200 rounded-2xl p-7 lg:p-10 mt-10 space-y-9">{sections.map(([title,text])=><section key={title} id={title === "Cookies" ? "cookies" : undefined}><h2 className="text-xl font-bold text-slate-900">{title}</h2><p className="text-slate-600 leading-relaxed mt-3">{text}</p></section>)}</div><p className="text-xs text-slate-500 mt-6">Este texto describe las prácticas generales del sitio y debe revisarse con asesoría legal según las operaciones y jurisdicciones aplicables a la empresa.</p></article></main>}
