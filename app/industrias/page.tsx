"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { 
  Building, 
  ShoppingBag, 
  Hotel, 
  Utensils, 
  Truck, 
  Warehouse, 
  Layers, 
  HardHat, 
  HeartPulse, 
  GraduationCap, 
  Scale, 
  Briefcase, 
  Globe, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Search,
  AlertCircle
} from "lucide-react";

interface IndustryContent {
  id: string;
  name: string;
  icon: LucideIcon;
  problems: string[];
  solutions: string[];
  modules: string[];
  integrations: string[];
  benefits: string[];
}

export default function IndustriasPage() {
  const [selectedIndId, setSelectedIndId] = useState("retail");
  const [searchQuery, setSearchQuery] = useState("");

  const industries: IndustryContent[] = [
    {
      id: "retail",
      name: "Comercio y Retail",
      icon: ShoppingBag,
      problems: [
        "Descuadres constantes de cajas registradoras y arqueos.",
        "Pérdida de control del inventario físico contra el sistema.",
        "Lentitud en la atención al cliente durante picos de venta."
      ],
      solutions: [
        "Sistemas POS integrados con arqueos de caja ciegos.",
        "Control de stock multidepósito en tiempo real.",
        "Soporte de periféricos locales para facturación ágil."
      ],
      modules: [
        "Punto de Venta (POS)",
        "Control de Inventarios y Bodegas",
        "Arqueos y Cierres de Cajas"
      ],
      integrations: [
        "Impresoras térmicas de tickets",
        "Lectores de códigos de barra",
        "Terminales bancarias de cobro"
      ],
      benefits: [
        "Cero descuadres de caja al final de la jornada.",
        "Ventas procesadas un 40% más rápido.",
        "Stock siempre sincronizado en tiempo real."
      ]
    },
    {
      id: "hoteles",
      name: "Hoteles y Turismo",
      icon: Hotel,
      problems: [
        "Sobreventa de habitaciones (Overbooking) entre canales de reservas.",
        "Falta de comunicación sobre el estado de limpieza de habitaciones.",
        "Pérdida de cargos de consumos extras durante el check-out."
      ],
      solutions: [
        "Gestor de reservas en tiempo real integrado con PMS local.",
        "Panel visual dinámico para camaristas y limpieza.",
        "Software de bar/restaurante imputando cobros directo al folio."
      ],
      modules: [
        "Calendario y Control de Reservas",
        "Ama de Llaves & Estado de Habitaciones",
        "Facturación y Folio de Huéspedes"
      ],
      integrations: [
        "Sistemas de cerraduras de tarjetas",
        "Pasarelas de reservas internacionales",
        "POS de restaurante local"
      ],
      benefits: [
        "Eliminación total del overbooking accidental.",
        "Habitaciones disponibles para check-in inmediato sin retrasos.",
        "Consolidación total de consumos evitando pérdidas de cobro."
      ]
    },
    {
      id: "restaurantes",
      name: "Restaurantes",
      icon: Utensils,
      problems: [
        "Errores constantes en comandas enviadas a la cocina.",
        "Desperdicio y merma de insumos por falta de receta estándar.",
        "Falta de control de ventas entre salón y pedidos a domicilio."
      ],
      solutions: [
        "Sistemas de comandas móviles en tablets e impresoras de cocina.",
        "Control detallado de recetas con deducción automática de stock.",
        "Consolidación unificada de canales de venta."
      ],
      modules: [
        "Comandera Digital para Meseros",
        "Pantalla de Cocina (KDS)",
        "Control de Recetario y Costeo"
      ],
      integrations: [
        "Impresoras térmicas de cocina",
        "Plataformas de delivery online",
        "Lectores de comandas de código QR"
      ],
      benefits: [
        "Reducción del 95% de errores de comandas en cocina.",
        "Reducción sustancial del desperdicio de insumos.",
        "Cierres de turno rápidos y sencillos para cajeros."
      ]
    },
    {
      id: "logistica",
      name: "Logística y Transporte",
      icon: Truck,
      problems: [
        "Falta de trazabilidad física y geográfica de entregas en ruta.",
        "Pérdida de evidencias de recibo (firmas o fotografías).",
        "Planificación ineficiente de las rutas de despacho."
      ],
      solutions: [
        "Aplicación móvil para choferes con geolocalización.",
        "Captura digital de firmas de recibido y fotos de entregas.",
        "Planificador de despacho y ruteo inteligente."
      ],
      modules: [
        "Gestión de Flota e Historial de Unidades",
        "App de Conductor de Campo",
        "Programador de Rutas y Cargas"
      ],
      integrations: [
        "Dispositivos GPS de flotas",
        "Sistemas de mapas y rutas",
        "Lectores de código de barras de bultos"
      ],
      benefits: [
        "Trazabilidad completa de estados de despacho en tiempo real.",
        "Evidencias digitales disponibles de forma inmediata.",
        "Optimización de combustible y tiempos de traslado."
      ]
    },
    {
      id: "almacenamiento",
      name: "Almacenamiento",
      icon: Warehouse,
      problems: [
        "Dificultad para localizar existencias en bodegas grandes.",
        "Errores constantes en la preparación de pedidos (picking).",
        "Mala rotación de productos vencidos o perecederos."
      ],
      solutions: [
        "Sistemas de gestión de almacén (WMS) guiados por barra.",
        "Flujos interactivos de picking en terminales móviles.",
        "Alertas automatizadas de proximidad de vencimientos (PEPS)."
      ],
      modules: [
        "Mapa de Ubicaciones Físicas (Racks/Estantes)",
        "Control de Lotes y Fechas de Vencimiento",
        "Guiado de Picking y Packing"
      ],
      integrations: [
        "Lectores de códigos de barra portátiles",
        "Impresoras de etiquetas de estantería",
        "Integración ERP (SAP)"
      ],
      benefits: [
        "Optimización de hasta un 30% del espacio físico.",
        "Precisión en despachos elevada al 99.5%.",
        "Disminución drástica de pérdidas por caducidad."
      ]
    },
    {
      id: "distribucion",
      name: "Distribución",
      icon: Layers,
      problems: [
        "Falta de control de inventarios en camiones de reparto.",
        "Tardanza en el ingreso de pedidos tomados en el campo.",
        "Diferencias constantes entre facturas y cobros del repartidor."
      ],
      solutions: [
        "Sistemas de preventa y autoventa móvil integrados al ERP.",
        "Sincronización instantánea de stock de camiones.",
        "Módulo de liquidación diaria para conductores-repartidores."
      ],
      modules: [
        "Gestión de Rutas de Ventas",
        "App de Preventa y Catálogo Móvil",
        "Liquidación y Arqueo de Conductores"
      ],
      integrations: [
        "Impresoras portátiles bluetooth",
        "Servicios de mapas",
        "SAP Business One en backend"
      ],
      benefits: [
        "Pedidos ingresados a almacén el mismo instante de la venta.",
        "Control estricto de mercadería en tránsito.",
        "Liquidaciones de cobros unificadas sin faltantes."
      ]
    },
    {
      id: "inmobiliarias",
      name: "Inmobiliarias",
      icon: Building,
      problems: [
        "Retrasos y confusión en cobros recurrentes de alquileres.",
        "Dificultad para rastrear vencimientos de contratos de renta.",
        "Desorden en asignación de técnicos de reparaciones de propiedades."
      ],
      solutions: [
        "Software de cobros automáticos e historial de inquilinos.",
        "Alertas y firmas de prórrogas de contratos digitales.",
        "Bandeja de mantenimiento y tickets de atención."
      ],
      modules: [
        "Control de Propiedades y Unidades",
        "Gestor de Alquileres y Contratos",
        "Tickets de Mantenimiento y Proveedores"
      ],
      integrations: [
        "Pasarelas de pagos con tarjeta de crédito",
        "Servicios de firma digital de contratos",
        "Sistemas de notificaciones vía correo"
      ],
      benefits: [
        "Reducción del 80% de retrasos en cobranza de alquiler.",
        "Historial unificado de incidencias por propiedad.",
        "Contratos vigentes controlados sin descuidos legales."
      ]
    },
    {
      id: "construccion",
      name: "Construcción",
      icon: HardHat,
      problems: [
        "Falta de control de materiales solicitados contra presupuestos.",
        "Dificultad en medir el avance físico real contra el financiero.",
        "Descontrol de subcontratistas, mano de obra y rendimientos."
      ],
      solutions: [
        "Gestor de presupuestos de obra detallado con control de APU.",
        "Registro de avances físicos y valuaciones de obra.",
        "Módulo de nóminas de campo integradas a proyectos."
      ],
      modules: [
        "Presupuesto de Obra e Historial de APUs",
        "Requerimientos y Órdenes de Materiales de Obra",
        "Control de Avance Físico y Valuaciones"
      ],
      integrations: [
        "Software CAD o BIM",
        "Carga masiva de planillas Excel",
        "Sistemas de compras corporativas"
      ],
      benefits: [
        "Cero desviaciones presupuestarias no autorizadas.",
        "Cálculo preciso del costo real unitario de cada obra.",
        "Historial detallado de materiales despachados por fase."
      ]
    },
    {
      id: "salud",
      name: "Clínicas y Salud",
      icon: HeartPulse,
      problems: [
        "Historiales clínicos de pacientes traspapelados o ilegibles.",
        "Inasistencia recurrente de pacientes por falta de confirmación.",
        "Descontrol en cobros de honorarios médicos y aseguradoras."
      ],
      solutions: [
        "Expedientes clínicos digitales en la nube con altos accesos.",
        "Notificaciones masivas automáticas de confirmación de citas.",
        "Módulo de liquidaciones y copagos de seguros médicos."
      ],
      modules: [
        "Agenda de Citas Médicas e Historial",
        "Expediente Clínico Digital Integrado",
        "Facturación Médica, Copagos y Seguros"
      ],
      integrations: [
        "WhatsApp API de recordatorios",
        "Visores de imágenes médicas DICOM",
        "Pasarelas de pago online"
      ],
      benefits: [
        "Atención médica más rápida con expediente listo.",
        "Reducción del 50% en inasistencias de pacientes.",
        "Conciliación clara con aseguradoras y médicos."
      ]
    },
    {
      id: "educacion",
      name: "Educación",
      icon: GraduationCap,
      problems: [
        "Lentitud extrema en cobros de matrículas y mensualidades.",
        "Falta de comunicación directa de calificaciones e inasistencias.",
        "Dificultad en coordinar asignaturas, horarios y profesores."
      ],
      solutions: [
        "Portal de autoservicio escolar para cobros y calificaciones.",
        "Gestor de matrículas e historial académico unificado.",
        "Programador inteligente de horarios y cupos por aula."
      ],
      modules: [
        "Control Académico y Calificaciones",
        "Matrícula Online y Cobros Recurrentes",
        "Portal para Alumnos y Padres"
      ],
      integrations: [
        "Bancos locales para pagos escolares",
        "Plataformas de videollamadas",
        "Pasarelas de correos corporativos"
      ],
      benefits: [
        "Disminución drástica de la morosidad mensual.",
        "Transparencia total de calificaciones a padres de familia.",
        "Coordinación perfecta de profesores, aulas y horarios."
      ]
    },
    {
      id: "servicios",
      name: "Servicios Profesionales",
      icon: Briefcase,
      problems: [
        "Dificultad para rastrear horas de consultores por proyecto.",
        "Lentitud en la facturación de servicios y contratos recurrentes.",
        "Falta de visibilidad de los márgenes de ganancia reales por cuenta."
      ],
      solutions: [
        "Control de tiempos (Timesheets) móvil y web por proyecto.",
        "Sistemas de facturación automatizada por hitos o abonos.",
        "Dashboards de costeo de horas y rentabilidad por cliente."
      ],
      modules: [
        "Registro de Tareas & Timesheets",
        "Gestión de Contratos y Cobros de Abonos",
        "Análisis de Rentabilidad por Proyecto"
      ],
      integrations: [
        "Calendarios corporativos",
        "Plataformas de firma electrónica",
        "Sistemas ERP financieros"
      ],
      benefits: [
        "Rastreo exacto de horas facturables sin pérdidas.",
        "Facturas emitidas de forma automática al cumplir hitos.",
        "Conocimiento preciso de qué clientes generan mayor utilidad."
      ]
    },
    {
      id: "manufactura",
      name: "Manufactura",
      icon: HardHat,
      problems: [
        "Descontrol en el costo de la materia prima en órdenes de producción.",
        "Falta de trazabilidad de los operarios por fase de ensamble.",
        "Tiempos muertos por desabasto imprevisto de insumos básicos."
      ],
      solutions: [
        "Explosión de lista de materiales (BOM) estricta.",
        "Módulo de control de tiempos de operarios por estación.",
        "Cálculo de punto de reorden automático para insumos."
      ],
      modules: [
        "Lista de Materiales e Insumos (BOM)",
        "Órdenes de Producción y Fases de Trabajo",
        "Costeo de Producto Terminado"
      ],
      integrations: [
        "Sensores de maquinaria industrial",
        "Impresoras de códigos de barra",
        "Sistemas SAP Business One"
      ],
      benefits: [
        "Costo unitario de producto fabricado exacto al centavo.",
        "Reducción de tiempos muertos en líneas de producción.",
        "Sincronización total entre compras y necesidades de obra."
      ]
    },
    {
      id: "sucursales",
      name: "Empresas con varias sucursales",
      icon: Globe,
      problems: [
        "Silos de información; imposibilidad de ver stock consolidado.",
        "Diferencias de precios y promociones no homologadas por tienda.",
        "Falta de control centralizado de los ingresos diarios."
      ],
      solutions: [
        "Plataforma centralizada en la nube con acceso multi-sucursal.",
        "Sincronizador central de catálogos de precios y ofertas.",
        "Consolidador financiero y transferencias de stock automáticas."
      ],
      modules: [
        "Catálogo de Precios y Ofertas Central",
        "Transferencias de Mercadería Inter-sucursal",
        "Consolidador de Cajas y Reportes Ejecutivo"
      ],
      integrations: [
        "APIs de nubes descentralizadas",
        "Impresoras térmicas remotas",
        "Servidores de bases de datos distribuidas"
      ],
      benefits: [
        "Visualización consolidada de stock de toda la cadena.",
        "Precios unificados y promociones aplicadas al instante.",
        "Control exacto de las finanzas y cierres de la cadena."
      ]
    },
    {
      id: "publico",
      name: "Sector Público",
      icon: Scale,
      problems: [
        "Lentitud en la gestión de solicitudes y trámites ciudadanos.",
        "Falta de transparencia en el seguimiento de expedientes públicos.",
        "Dificultad de los ciudadanos para realizar pagos de tasas online."
      ],
      solutions: [
        "Portal de trámites ciudadanos online con firma digital.",
        "Gestor documental público con trazabilidad de expedientes.",
        "Módulo de recaudación de impuestos municipales seguro."
      ],
      modules: [
        "Portal del Ciudadano & Ventanilla Única",
        "Gestión de Expedientes y Flujos de Aprobación",
        "Recaudación e Integración de Cajas de Cobro"
      ],
      integrations: [
        "Pasarelas de cobro bancario del estado",
        "Servicios de autenticación ciudadana",
        "Sistemas de archivo gubernamental"
      ],
      benefits: [
        "Disminución drástica de filas en oficinas gubernamentales.",
        "Trazabilidad pública y transparencia de cada expediente.",
        "Incremento notable en la recaudación de tasas y contribuciones."
      ]
    },
    {
      id: "sap",
      name: "Empresas con SAP Business One",
      icon: Layers,
      problems: [
        "Altos costos de licencias SAP para registrar tareas operativas simples.",
        "Falta de soluciones móviles ágiles conectadas en tiempo real al ERP.",
        "Doble digitación manual de ventas de campo o inventario a SAP."
      ],
      solutions: [
        "Desarrollo de portales web y apps móviles satélite conectadas.",
        "Sincronización bidireccional mediante Service Layer.",
        "Módulos simplificados de facturación de campo, cobros y bodegas."
      ],
      modules: [
        "Sincronizador BWP API",
        "Portal Web para Vendedores Externos",
        "App de Bodega para Inventarios Físicos"
      ],
      integrations: [
        "SAP Service Layer / DI API",
        "SQL Server o SAP HANA de la empresa",
        "Terminales de cobro móvil"
      ],
      benefits: [
        "Ahorros masivos de costo en licencias SAP Business One.",
        "Eliminación absoluta de la doble digitación de datos.",
        "Operaciones de campo sincronizadas directo en finanzas ERP."
      ]
    }
  ];

  // Filter based on search query
  const filteredIndustries = industries.filter((ind) =>
    ind.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ind.problems.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
    ind.solutions.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedIndustry = industries.find(ind => ind.id === selectedIndId) || industries[0];
  const implementationPath = [
    ["01", "Diagnóstico sectorial", "Procesos, restricciones, responsables y problemas específicos del rubro."],
    ["02", "Diseño de operación", "Módulos, datos, permisos, sucursales, movilidad y reglas de negocio."],
    ["03", "Integración del ecosistema", "Hardware, plataformas, proveedores, ERP, pagos y servicios externos."],
    ["04", "Adopción y evolución", "Migración, capacitación, estabilización y crecimiento progresivo."]
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12" id="industrias-page-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="relative bg-white border-y border-slate-300 py-12 mb-12 grid lg:grid-cols-12 gap-10 items-end">
          <div className="text-left lg:col-span-8 space-y-3">
          <div className="inline-flex items-center space-x-2 text-red-800 text-xs font-semibold uppercase tracking-wider">
            <span>Sectores de Especialidad</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-[-.05em] font-display leading-tight">
            La tecnología debe comprender el lenguaje de su industria
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            No creemos en soluciones genéricas. Cada sector empresarial tiene fricciones operativas únicas. 
            Desarrollamos módulos que resuelven los problemas reales de su rubro e integraciones listas para su hardware.
          </p>
          </div><div className="lg:col-span-4 lg:border-l border-slate-200 lg:pl-8"><span className="text-5xl font-black text-slate-100">{industries.length}</span><p className="font-bold text-slate-900">sectores modelados</p><p className="text-xs text-slate-500 mt-2">El selector permite explorar problemas, módulos, integraciones y beneficios esperados por sector.</p></div></div>

        {/* Live Search Industry Box */}
        <div className="relative max-w-md mb-8">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search className="w-4.5 h-4.5" />
          </span>
          <input
            type="text"
            placeholder="Escriba para filtrar industrias (ej. Hotel, Logística, SAP)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              // Automatically select first matching industry if available
              const matches = industries.filter(ind => ind.name.toLowerCase().includes(e.target.value.toLowerCase()));
              if (matches.length > 0) {
                setSelectedIndId(matches[0].id);
              }
            }}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 focus:border-red-600 rounded-lg outline-none transition-all shadow-sm"
            id="search-industries-input"
          />
        </div>

        <div className="mb-12 grid md:grid-cols-4 border-y border-slate-300">
          {implementationPath.map(([number,title,text])=><div key={number} className="py-6 md:px-5 border-b md:border-b-0 md:border-r border-slate-200 last:border-0"><span className="font-mono text-red-700 text-xs">{number}</span><h2 className="font-bold mt-3">{title}</h2><p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{text}</p></div>)}
        </div>

        {/* Dual Column Layout: Left Selector, Right Detailed Core */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Sidebar Selector list */}
          <div className="lg:col-span-4 space-y-2 bg-white border border-gray-150 rounded-xl p-4 shadow-sm max-h-[580px] overflow-y-auto" id="industries-sidebar">
            <span className="text-[10px] font-bold text-gray-400 block tracking-wider uppercase mb-2">
              Seleccione su Sector:
            </span>
            {filteredIndustries.map((ind) => {
              const IndIcon = ind.icon;
              const isSelected = selectedIndId === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => setSelectedIndId(ind.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left text-xs font-semibold transition-all duration-150 ${
                    isSelected
                      ? "bg-red-700 text-white shadow-md"
                      : "text-gray-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  id={`ind-btn-${ind.id}`}
                >
                  <IndIcon className={`w-4 h-4 shrink-0 ${isSelected ? "text-white" : "text-gray-400"}`} />
                  <span className="truncate">{ind.name}</span>
                </button>
              );
            })}

            {filteredIndustries.length === 0 && (
              <div className="text-center py-6 text-gray-400 text-xs flex flex-col items-center gap-2">
                <AlertCircle className="w-5 h-5 text-gray-300" />
                <span>No se encontraron industrias</span>
              </div>
            )}
          </div>

          {/* Right Column: Detailed Core Info of selected industry */}
          <div className="lg:col-span-8 bg-white border border-gray-150 rounded-2xl p-6 lg:p-10 shadow-sm text-left space-y-8" id="industry-detail-dashboard">
            
            {/* Header of Detail */}
            <div className="flex items-center space-x-4 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md shrink-0">
                {React.createElement(selectedIndustry.icon, { className: "w-6 h-6" })}
              </div>
              <div>
                <span className="text-[10px] font-mono text-red-700 uppercase font-bold tracking-widest block">
                  Soluciones de Rubro BWP
                </span>
                <h2 className="text-2xl font-bold text-slate-900 font-display mt-0.5">
                  {selectedIndustry.name}
                </h2>
              </div>
            </div>

            {/* Content Segment 1: Problems & Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Friction Points */}
              <div className="space-y-3 bg-red-50/40 border border-red-100/50 p-5 rounded-xl">
                <h3 className="text-xs font-bold text-red-950 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
                  Problemas Frecuentes:
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  {selectedIndustry.problems.map((prob, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-red-700 rounded-full shrink-0 mr-2 mt-1.5"></span>
                      <span>{prob}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* BWP Developments */}
              <div className="space-y-3 bg-blue-50/40 border border-blue-100 p-5 rounded-xl">
                <h3 className="text-xs font-bold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-800 shrink-0" />
                  Nuestra Propuesta de Software:
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  {selectedIndustry.solutions.map((sol, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-blue-800 rounded-full shrink-0 mr-2 mt-1.5"></span>
                      <span>{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Content Segment 2: Modules & Integrations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Modules Recommended */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Módulos BWP Recomendados:
                </h3>
                <ul className="space-y-2 text-xs text-gray-600">
                  {selectedIndustry.modules.map((mod, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 mr-2" />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hardware / API Integrations */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Integraciones Requeridas en Rubro:
                </h3>
                <ul className="space-y-2 text-xs text-gray-600">
                  {selectedIndustry.integrations.map((integ, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-red-700 rounded-full shrink-0 mr-2"></span>
                      <span>{integ}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Content Segment 3: Benefits block */}
            <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-red-500" />
                Beneficios para la Operación Diaria:
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-200">
                {selectedIndustry.benefits.map((bene, idx) => (
                  <li key={idx} className="flex flex-col justify-between border-l border-slate-800 pl-3">
                    <span className="text-[10px] font-mono text-red-400 block mb-1">Impacto #{idx+1}</span>
                    <span className="leading-relaxed">{bene}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom CTA for active selected industry */}
            <div className="pt-6 border-t border-gray-150 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-xs text-gray-400">¿Su empresa pertenece a este sector? Agendemos una demo</span>
              <Link
                href={`/contacto?industry=${encodeURIComponent(selectedIndustry.name)}`}
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-white bg-red-700 hover:bg-red-800 rounded shadow transition-colors"
                id="btn-quote-industry"
              >
                Solicitar Cotización de Rubro
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
