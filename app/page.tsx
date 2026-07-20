"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle2, 
  Code2, 
  Workflow, 
  Zap, 
  Check, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Monitor,
  Cpu,
  Smartphone,
  GitBranch,
  Database as DbIcon
} from "lucide-react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import HeroDiagram from "../components/HeroDiagram";
import HomeHero from "../components/HomeHero";
import { 
  getStoredDataAsync, 
  INITIAL_SOLUTIONS, 
  INITIAL_PRODUCTS,
  getLucideIcon
} from "../lib/data";

// Dynamically load client-side Three.js & Scroll features without SSR
const ThreeBackground = dynamic(() => import("../components/ThreeBackground"), { ssr: false });
const GSAPInitializer = dynamic(() => import("../components/GSAPInitializer"), { ssr: false });
const ProjectsCarousel = dynamic(() => import("../components/ProjectsCarousel"), { ssr: false });

export default function HomePage() {
  const [solutions, setSolutions] = useState(INITIAL_SOLUTIONS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  useEffect(() => {
    // Load fresh data if modified in the admin panel
    let active=true;void Promise.all([getStoredDataAsync("solutions",INITIAL_SOLUTIONS),getStoredDataAsync("products",INITIAL_PRODUCTS)]).then(([nextSolutions,nextProducts])=>{if(active){setSolutions(nextSolutions.filter(s=>s.active));setProducts(nextProducts.filter(p=>p.active))}});return()=>{active=false};
  }, []);

  // Filter 5 key capabilities
  const keyCapabilities = [
    { title: "Desarrollo web empresarial", icon: Monitor, desc: "Portales de gestión corporativa, ERPs, intranets y plataformas en la nube accesibles desde cualquier lugar." },
    { title: "Software de escritorio", icon: Cpu, desc: "Sistemas locales robustos para Windows integrados con periféricos (impresoras térmicas, balanzas y lectores)." },
    { title: "Aplicaciones móviles", icon: Smartphone, desc: "Apps Android e híbridas para logística de despachos, ventas de campo, inventariado y firmas." },
    { title: "Integraciones y API", icon: GitBranch, desc: "Sincronizadores en tiempo real con SAP Business One, pasarelas de pago y software existente." },
    { title: "Bases de datos y analítica", icon: DbIcon, desc: "Arquitectura estructurada en SQL Server, PostgreSQL o MySQL con paneles de reportería ejecutiva." }
  ];

  // 10 stage-solutions
  const primaryStageSolutions = solutions.filter(s => !s.isStrongAdditional).slice(0, 10);

  // 10 why choose us points
  const valueProps = [
    { title: "Soluciones desarrolladas a la medida", desc: "El software se diseña en base a su flujo de operación real, no al revés." },
    { title: "Capacidad de integración con sistemas existentes", desc: "Conectamos con SAP Business One, bancos y plataformas heredadas sin fricción." },
    { title: "Desarrollo multiplataforma", desc: "Especialistas en desarrollo nativo para web, escritorio Windows y sistemas móviles." },
    { title: "Instalaciones locales, en la nube o híbridas", desc: "Alojamiento flexible On-Premise en sus propios servidores o nube segura." },
    { title: "Bases de datos de nivel empresarial", desc: "Motores robustos como SQL Server configurados con auditorías y backups automáticos." },
    { title: "Arquitectura preparada para crecer", desc: "Estructuras de software modulares que se expanden a medida que crece su negocio." },
    { title: "Seguridad desde el diseño", desc: "Cifrados, roles estrictos con permisos y logs de auditoría interna de transacciones." },
    { title: "Soporte permanente post-implementación", desc: "Acompañamiento técnico dedicado durante y después del despliegue oficial." },
    { title: "Capacitación exhaustiva para usuarios", desc: "Manuales interactivos, videos de guía y sesiones prácticas para su personal." },
    { title: "Acompañamiento técnico empresarial", desc: "Nos convertimos en su aliado de tecnología para asesorarle en su transformación digital." }
  ];

  // 6 work steps
  const workSteps = [
    { step: "01", name: "Análisis", desc: "Conocemos a fondo su operación, flujos actuales, cuellos de botella y metas comerciales." },
    { step: "02", name: "Diseño", desc: "Definimos los módulos necesarios, roles de usuario, diagramas de procesos e integraciones." },
    { step: "03", name: "Desarrollo", desc: "Construimos la solución de manera iterativa aplicando código seguro, limpio y de alto rendimiento." },
    { step: "04", name: "Pruebas", desc: "Validamos la seguridad, velocidad de respuesta, integración de hardware y flujos de negocio." },
    { step: "05", name: "Implementación", desc: "Instalamos en sus servidores o nube, migramos su información histórica y encendemos el sistema." },
    { step: "06", name: "Soporte", desc: "Monitoreamos la operación en vivo, brindamos soporte correctivo y acompañamos la evolución técnica." }
  ];

  const businessOutcomes = [
    { icon: TrendingUp, title: "Control ejecutivo", desc: "Indicadores, reportes y trazabilidad para que gerencia tome decisiones con información consolidada y oportuna." },
    { icon: Workflow, title: "Operación conectada", desc: "Ventas, inventario, compras, finanzas, sucursales y equipos de campo trabajando sobre un mismo flujo de datos." },
    { icon: ShieldCheck, title: "Gobierno y seguridad", desc: "Roles, permisos, bitácoras, respaldos y controles diseñados de acuerdo con la criticidad de cada proceso." },
    { icon: Zap, title: "Capacidad de crecimiento", desc: "Arquitecturas modulares preparadas para incorporar usuarios, módulos, sedes e integraciones sin rehacer la solución." }
  ];

  const enterpriseLayers = [
    { number: "01", title: "Experiencia y canales", items: ["Portales web", "Aplicaciones móviles", "Software de escritorio", "Autoservicio B2B/B2C"] },
    { number: "02", title: "Procesos de negocio", items: ["Ventas y CRM", "Compras e inventario", "Operaciones y logística", "Administración y finanzas"] },
    { number: "03", title: "Integración y datos", items: ["API y webhooks", "SAP Business One", "Migración de datos", "BI y reportería ejecutiva"] },
    { number: "04", title: "Plataforma y control", items: ["Identidad y permisos", "Auditoría", "Respaldos", "Nube, local o híbrido"] }
  ];

  const engagementModels = [
    { title: "Proyecto llave en mano", desc: "Alcance, fases, entregables y criterios de aceptación definidos para resolver una necesidad empresarial completa.", tag: "Implementación integral" },
    { title: "Evolución por módulos", desc: "Una hoja de ruta priorizada para iniciar con procesos críticos y ampliar la plataforma conforme al retorno y adopción.", tag: "Crecimiento progresivo" },
    { title: "Integración especializada", desc: "Diseño de conectores, servicios y sincronizaciones para unir plataformas existentes sin duplicar la operación.", tag: "Interoperabilidad" },
    { title: "Acompañamiento continuo", desc: "Soporte, mantenimiento y evolución funcional para sostener la solución después de su salida a producción.", tag: "Continuidad operativa" }
  ];

  // Featured Product BWP Retail POS
  const featuredProduct = products[0] || INITIAL_PRODUCTS[0];

  return (
    <div className="space-y-24 pb-16 relative" id="home-page-container" data-global-motion="off">
      {/* Scroll Orchestrator & Smooth Scrolling */}
      <GSAPInitializer />

      {/* 1. HERO SECTION */}
      <HomeHero />
      <section className="hidden" aria-hidden="true">
        {/* Dynamic Abstract WebGL Network Background */}
        <ThreeBackground />

        {/* Decorative Grid Background layered on top of Threejs */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Copywriting */}
            <div className="lg:col-span-7 space-y-6 text-left" id="home-hero-text">
              <div className="inline-flex items-center space-x-2 bg-slate-100/80 backdrop-blur-sm text-slate-600 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-200">
                <span className="w-2 h-2 bg-red-800 rounded-full animate-pulse"></span>
                <span>Sistemas a la Medida • Honduras</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] font-display">
                Software empresarial desarrollado <span className="text-blue-900">alrededor de su operación</span>
              </h1>
              
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                Diseñamos, desarrollamos e integramos soluciones de software para pequeñas, medianas y grandes empresas. 
                Creamos plataformas web, aplicaciones de escritorio, aplicaciones móviles, sistemas administrativos, 
                soluciones contables, inventarios, facturación e integraciones empresariales.
              </p>
              
              <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                Convertimos procesos manuales, información separada y operaciones complejas en soluciones digitales seguras, escalables y adaptadas a las necesidades reales de cada empresa.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/contacto"
                    className="inline-flex items-center justify-center bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-base shadow-xl transition-all duration-200 hover:bg-slate-800"
                    id="hero-btn-cotizar"
                  >
                    Solicitar una cotización
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/contacto?type=meeting"
                    className="inline-flex items-center justify-center border-2 border-slate-200 text-slate-900 px-8 py-4 rounded-xl font-bold text-base hover:bg-slate-50 transition-all duration-200"
                    id="hero-btn-hablar"
                  >
                    Hablar con un especialista
                  </Link>
                </motion.div>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-gray-100 max-w-xl">
                <div>
                  <span className="block text-2xl font-bold text-slate-900">100%</span>
                  <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">A la medida</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold text-slate-900">SAP B1</span>
                  <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">Integración</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold text-slate-900">Honduras</span>
                  <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">Roatán sede</span>
                </div>
              </div>

              {/* Sticky Industrial Trust Bar */}
              <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-x-4 gap-y-2 items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Retail</span>
                <span>•</span>
                <span>Hotelería</span>
                <span>•</span>
                <span>Logística</span>
                <span>•</span>
                <span>Salud</span>
                <span>•</span>
                <span>Distribución</span>
              </div>
            </div>

            {/* Right Column: Interactive Infrastructure Map */}
            <div className="lg:col-span-5" id="home-hero-visual">
              <HeroDiagram />
            </div>

          </div>
        </div>
      </section>

      {/* IMPACTO EMPRESARIAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="business-impact-section">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <span className="text-xs font-bold text-red-700 uppercase tracking-widest">Impacto de negocio</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-3 font-display leading-tight">
              Tecnología que convierte la operación en una ventaja empresarial
            </h2>
            <p className="text-sm text-slate-600 mt-4 leading-relaxed">
              Un sistema empresarial no debe limitarse a digitalizar formularios. Debe ordenar procesos, proteger información, eliminar duplicidad y dar a cada nivel de la organización el control que necesita.
            </p>
            <Link href="/metodologia" className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-red-800 hover:text-red-700">
              Conocer nuestro modelo de ejecución <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
            {businessOutcomes.map((item, idx) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="group bg-white border border-slate-200 rounded-2xl p-7 hover:border-slate-400 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center"><Icon className="w-5 h-5" /></div>
                    <span className="text-xs font-mono text-slate-400">0{idx + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mt-2">{item.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ARQUITECTURA EMPRESARIAL */}
      <section className="bg-slate-950 text-white py-20 relative overflow-hidden" id="enterprise-architecture-section">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b33_1px,transparent_1px),linear-gradient(to_bottom,#1e293b33_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono text-red-400 uppercase tracking-[0.2em]">Arquitectura de solución</span>
            <h2 className="text-3xl lg:text-4xl font-bold mt-3">Una plataforma pensada como ecosistema, no como una aplicación aislada</h2>
            <p className="text-slate-400 mt-4 leading-relaxed">Diseñamos cada capa para conectar personas, procesos, sistemas y datos, manteniendo control técnico y capacidad de evolución.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/70 backdrop-blur">
            {enterpriseLayers.map((layer) => (
              <article key={layer.number} className="p-7 border-b md:border-r lg:border-b-0 border-slate-800 last:border-r-0">
                <span className="text-red-400 text-xs font-mono">CAPA {layer.number}</span>
                <h3 className="font-bold text-lg mt-3 mb-5">{layer.title}</h3>
                <ul className="space-y-3">
                  {layer.items.map((item) => <li key={item} className="flex items-center gap-2 text-sm text-slate-400"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/integraciones" className="inline-flex items-center gap-2 bg-white text-slate-950 px-5 py-3 rounded-lg text-sm font-bold">Explorar integraciones <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/seguridad" className="inline-flex items-center gap-2 border border-slate-700 px-5 py-3 rounded-lg text-sm font-bold hover:bg-slate-900">Seguridad y continuidad <ShieldCheck className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* 2. SECCIÓN DE CAPACIDADES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="capabilities-section">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-red-700 uppercase tracking-widest bg-red-50 px-3 py-1 rounded border border-red-100">
            Nuestras Capacidades
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-3 font-display">
            Desarrollo tecnológico integral de grado corporativo
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            BWP Software tiene la capacidad técnica para diseñar desde una aplicación específica de su nicho hasta una plataforma empresarial unificada.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 overflow-hidden divide-y md:divide-y-0 lg:divide-x divide-slate-200">
          {keyCapabilities.map((cap, idx) => {
            const IconComponent = cap.icon;
            return (
              <div 
                key={idx} 
                className="p-8 flex flex-col justify-between group hover:bg-white transition-all duration-300"
                id={`capability-${idx}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-slate-400 text-xs font-bold font-mono">0{idx + 1}</span>
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-red-50 group-hover:text-red-950 transition-colors duration-200">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">{cap.title}</h3>
                  <p className="text-xs text-slate-500 leading-normal">{cap.desc}</p>
                </div>
                <div className="pt-4 flex items-center text-xs font-bold text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span>Saber más</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ECOSISTEMA TECNOLÓGICO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="technology-ecosystem-section">
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-5 p-8 lg:p-10 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200">
              <span className="text-xs font-bold text-red-700 uppercase tracking-widest">Ecosistemas y tecnologías</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-3">Capacidad técnica para plataformas empresariales completas</h2>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">Diseñamos arquitecturas sobre AWS, Microsoft Azure y Google Cloud, además de ambientes locales e híbridos. Elegimos el stack según integración, rendimiento, seguridad y sostenibilidad.</p>
              <Link href="/tecnologias" className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-red-800">Explorar tecnologías y Cloud <ArrowRight className="w-4 h-4"/></Link>
            </div>
            <div className="lg:col-span-7 p-8 lg:p-10">
              <div className="grid sm:grid-cols-3 gap-3 mb-7">{["AWS", "Microsoft Azure", "Google Cloud"].map(cloud=><div key={cloud} className="bg-slate-900 text-white rounded-xl px-4 py-5 text-center font-bold text-sm">{cloud}</div>)}</div>
              <div className="space-y-5">
                <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Backend y rendimiento</p><div className="flex flex-wrap gap-2">{["Python", "Rust", "Go", "C++", "C#"].map(x=><span key={x} className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-md text-xs font-mono font-semibold">{x}</span>)}</div></div>
                <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Web, móvil e integración</p><div className="flex flex-wrap gap-2">{["React", "React Native", "TypeScript", "Next.js", "JavaScript", "Flutter", "Dart", "Android Studio", "API REST"].map(x=><span key={x} className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-md text-xs font-mono font-semibold">{x}</span>)}</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODELOS DE COLABORACIÓN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="engagement-models-section">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-red-700 uppercase tracking-widest">Modelos de colaboración</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-3">Una relación técnica adaptada al nivel de su iniciativa</h2>
            <p className="text-sm text-slate-600 mt-3">Desde una integración puntual hasta una transformación por etapas, estructuramos el trabajo con responsables, alcance, documentación y seguimiento.</p>
          </div>
          <Link href="/soporte" className="inline-flex items-center gap-2 text-sm font-bold text-slate-900">Ver soporte y continuidad <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {engagementModels.map((model) => (
            <article key={model.title} className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row gap-5 sm:items-start">
              <Code2 className="w-6 h-6 text-red-800 shrink-0" />
              <div><span className="text-[10px] font-bold text-red-700 uppercase tracking-widest">{model.tag}</span><h3 className="font-bold text-slate-900 mt-1">{model.title}</h3><p className="text-sm text-slate-500 mt-2 leading-relaxed">{model.desc}</p></div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. SECCIÓN SOLUCIONES PARA CADA ETAPA */}
      <section className="bg-slate-900 py-16 text-white relative overflow-hidden" id="stage-solutions-section">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <span className="text-xs font-mono text-red-400 tracking-widest bg-red-950/50 border border-red-900/50 px-3 py-1 rounded">
              Modular & Escalable
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 font-display">
              Soluciones para cada etapa de su empresa
            </h2>
            <p className="text-slate-400 mt-3 text-base max-w-3xl mx-auto">
              Desarrollamos soluciones que pueden comenzar con una necesidad específica y crecer junto con la operación de la empresa. 
              Cada proyecto se diseña tomando en cuenta los usuarios, procesos, sucursales, integraciones, seguridad y crecimiento esperado.
            </p>
          </div>

          {/* Solution Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6">
            {primaryStageSolutions.map((sol) => {
              const IconComp = getLucideIcon(sol.iconName);
              return (
                <div 
                  key={sol.id} 
                  className="bg-slate-950/50 border border-slate-800/80 p-5 rounded-xl hover:border-red-800 hover:bg-slate-950 transition-all duration-300"
                  id={`home-sol-${sol.id}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-red-500 mb-3 border border-slate-800">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{sol.title}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{sol.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link 
              href="/soluciones" 
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-400 hover:text-red-300 transition-colors"
              id="link-all-solutions"
            >
              Conocer nuestras 15 soluciones avanzadas adicionales
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. PRODUCTO DESTACADO - BWP RETAIL POS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="featured-product-section">
        <div className="bg-white border border-gray-150 rounded-2xl p-6 lg:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-red-700 text-white text-[10px] font-mono font-bold tracking-widest px-4 py-1.5 rounded-bl-xl uppercase">
            PRODUCTO PROPIO
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Product Info */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <span className="text-xs font-mono text-gray-500 tracking-wider block">
                SOFTWARE COMERCIAL INTEGRADO
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                {featuredProduct.title}, desarrollado por nuestro equipo
              </h2>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {featuredProduct.description}
              </p>

              {/* Feature grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2">
                {featuredProduct.features.slice(0, 10).map((feature, idx) => (
                  <div key={idx} className="flex items-start text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Link
                  href="/productos"
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-red-700 hover:bg-red-800 rounded-md transition-all duration-200"
                  id="btn-learn-pos"
                >
                  Conocer BWP Retail POS
                </Link>
                <a
                  href={featuredProduct.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-slate-800 bg-slate-50 border border-gray-200 hover:bg-slate-100 rounded-md transition-all duration-200"
                  id="btn-visit-pos"
                >
                  Visitar bwpretailpos.com
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </a>
              </div>
            </div>

            {/* Right: Simulated Visual POS Screen */}
            <div className="lg:col-span-5 bg-slate-900 rounded-xl p-4 border border-slate-800 shadow-xl relative text-left">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                  <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></span>
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">BWP Retail POS v4.2.0</span>
              </div>
              
              {/* POS Interface Simulation */}
              <div className="space-y-3">
                {/* Simulated Ticket & Active Items */}
                <div className="bg-slate-950 p-3 rounded border border-slate-850 space-y-2">
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>Cajero: Bryan Cárcamo</span>
                    <span>Caja #01</span>
                  </div>
                  <div className="border-b border-dashed border-slate-800 my-1"></div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-white">
                      <span>1x Software Licencia Enterprise</span>
                      <span className="font-mono text-emerald-400">$1,250.00</span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>1x Integración Base de Datos SAP B1</span>
                      <span className="font-mono">$750.00</span>
                    </div>
                  </div>
                  <div className="border-b border-dashed border-slate-800 my-1"></div>
                  <div className="flex justify-between text-sm font-bold text-white font-mono">
                    <span>Total a Facturar:</span>
                    <span className="text-emerald-400">$2,000.00</span>
                  </div>
                </div>

                {/* Simulated Cash Flow Controls */}
                <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
                  <div className="bg-slate-800/80 p-2 rounded border border-slate-700 text-center">
                    <span className="text-slate-400 block">Apertura</span>
                    <span className="text-white font-semibold">$500.00</span>
                  </div>
                  <div className="bg-slate-800/80 p-2 rounded border border-slate-700 text-center">
                    <span className="text-slate-400 block">Ventas POS</span>
                    <span className="text-emerald-400 font-semibold">$2,000.00</span>
                  </div>
                  <div className="bg-red-950/40 p-2 rounded border border-red-900/40 text-center">
                    <span className="text-red-400 block">Estado</span>
                    <span className="text-white font-bold">Caja Abierta</span>
                  </div>
                </div>

                <div className="bg-slate-950/50 p-2 rounded border border-slate-850 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Facturación de Ley Autorizada
                  </span>
                  <span className="text-slate-500">Roatán, Honduras</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. SECCIÓN PROYECTOS Y CASOS DE ÉXITO */}
      <section className="bg-slate-50 py-16 border-y border-gray-150" id="projects-showcase-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-red-700 uppercase tracking-widest bg-red-50 px-3 py-1 rounded border border-red-100">
              Casos de Éxito
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-3 font-display">
              Proyectos reales de transformación digital
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              Conozca cómo hemos ayudado a empresas locales a optimizar sus cajas, automatizar sus inventarios, erradicar pérdidas y conectar sus operaciones logísticas de manera segura.
            </p>
          </div>

          <ProjectsCarousel />
        </div>
      </section>

      {/* 5. SECCIÓN POR QUÉ ELEGIR BWP */}
      <section className="bg-white py-16 border-y border-gray-100" id="why-bwp-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-red-700 uppercase tracking-widest bg-red-50 px-3 py-1 rounded border border-red-100">
              Valor Agregado
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-3 font-display">
              ¿Por qué elegir BWP Software?
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              Diseñamos soluciones tecnológicas con enfoque gerencial, asegurando la continuidad de su negocio y el control preciso de sus activos e información.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {valueProps.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start" id={`value-prop-${idx}`}>
                <div className="w-6 h-6 rounded-full bg-red-50 text-red-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROCESO DE TRABAJO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="work-process-section">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-red-700 uppercase tracking-widest bg-red-50 px-3 py-1 rounded border border-red-100">
            Nuestra Metodología
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-3 font-display">
            Un proceso riguroso para garantizar el éxito
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Desde la primera reunión hasta el soporte post-implementación, estructuramos el desarrollo en fases claras, medibles y enfocadas en resultados de negocio.
          </p>
        </div>

        {/* Timeline Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-8 left-10 right-10 h-0.5 bg-gray-150 z-0"></div>

          {workSteps.map((step, idx) => (
            <div key={idx} className="relative z-10 space-y-4 text-center md:text-left lg:text-center group" id={`work-step-${idx}`}>
              {/* Step Circle */}
              <div className="w-16 h-16 rounded-full bg-white border-2 border-slate-900 text-slate-900 group-hover:border-red-700 group-hover:text-red-700 flex items-center justify-center font-bold text-xl mx-auto md:mx-0 lg:mx-auto shadow-sm transition-all duration-300">
                {step.step}
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">{step.name}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed px-2 md:px-0">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. BOTTOM BANNER CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="home-cta-banner">
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl p-8 lg:p-12 text-center relative overflow-hidden shadow-xl">
          {/* Geometric pattern accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-700/10 rounded-full blur-2xl"></div>
          
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold font-display leading-tight">
              ¿Listo para transformar los procesos de su empresa?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Permítanos analizar su operación actual y proponerle una solución de software adaptada a su tamaño, usuarios e integraciones existentes. 
              Garantizamos seguridad, soporte y acompañamiento técnico permanente.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg shadow-lg transition-all duration-200"
                id="banner-btn-cotizar"
              >
                Solicitar análisis del proyecto
              </Link>
              <a
                href="https://wa.me/50488285822?text=Hola%20BWP%20Software,%20me%20gustaría%20solicitar%20un%20análisis%20técnico%20de%20mi%20empresa."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-100 rounded-lg transition-all duration-200"
                id="banner-btn-whatsapp"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
