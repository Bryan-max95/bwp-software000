// Data structure for BWP Software
import { 
  Briefcase, 
  Monitor, 
  Smartphone, 
  Cpu, 
  Database as DbIcon, 
  RefreshCw,
  ShoppingBag,
  Hotel,
  Utensils,
  Truck,
  Warehouse,
  TrendingUp,
  Building,
  HardHat,
  HeartPulse,
  GraduationCap,
  Scale,
  Settings,
  Users,
  ShieldCheck,
  Code2,
  FileSpreadsheet,
  FileText,
  UserCheck,
  Layers,
  MapPin,
  ClipboardList,
  Wrench,
  BookOpen,
  Mail,
  Phone,
  BarChart3,
  GitBranch,
  Search,
  Lock,
  Boxes,
  HelpCircle
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface BWPService {
  id: string;
  title: string;
  description: string;
  iconName: string; // Used to map to Lucide icons dynamically
  includes: string[];
  active: boolean;
  order: number;
}

export interface BWPSolution {
  id: string;
  title: string;
  description: string;
  iconName: string;
  isStrongAdditional: boolean;
  active: boolean;
  order: number;
}

export interface BWPProduct {
  id: string;
  title: string;
  description: string;
  features: string[];
  targetCompanies: string[];
  externalUrl: string;
  imageSeed: string;
  active: boolean;
  order: number;
}

export interface BWPIndustry {
  id: string;
  name: string;
  iconName: string;
  problems: string[];
  solutions: string[];
  modules: string[];
  benefits: string[];
  active: boolean;
  order: number;
}

export interface BWPClientCase {
  id: string;
  logoLetter: string;
  logoBgColor: string;
  logoDataUrl?: string;
  coverImage?: string;
  caseType?: "CLIENT" | "PRIVATE_PLATFORM";
  companyName: string;
  industry: string;
  projectTitle: string;
  description: string;
  challenge?: string;
  solution?: string;
  integrations?: string[];
  capabilities?: string[];
  commercialModel?: string;
  technologies: string[];
  result: string;
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
  active: boolean;
  order: number;
}

export interface BWPFAQ {
  id: string;
  question: string;
  answer: string;
  active: boolean;
  order: number;
}

export interface BWPLeadership{bryanImage?:string;carlosImage?:string}
export const INITIAL_LEADERSHIP:BWPLeadership={};

export interface BWPQuotationRequest {
  id: string;
  fullName: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  cityCountry: string;
  companySize: string;
  industry: string;
  solutionType: string;
  platform: string;
  approxUsers: string;
  approxBranches: string;
  currentSystems: string;
  needsSapOne: boolean;
  projectDescription: string;
  expectedDate: string;
  budget?: string;
  createdAt: string;
  status: 'PENDING' | 'CONTACTED' | 'ARCHIVED';
}

export interface BWPContactInfo {
  companyName: string;
  representative: string;
  representativeTitle: string;
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  mission: string;
  vision: string;
  values: string[];
}

export const INITIAL_SERVICES: BWPService[] = [
  {
    id: "serv-1",
    title: "Desarrollo de Sistemas Web",
    description: "Creamos plataformas empresariales accesibles desde computadoras, tablets y dispositivos móviles. Desarrollamos portales, paneles administrativos, sistemas internos, plataformas SaaS y aplicaciones web conectadas con bases de datos e integraciones externas.",
    iconName: "Monitor",
    includes: [
      "Plataformas corporativas.",
      "Sistemas administrativos.",
      "Portales para clientes.",
      "Portales para proveedores.",
      "Sistemas SaaS.",
      "Paneles de administración.",
      "Sistemas con múltiples empresas o sucursales.",
      "Sistemas con roles y permisos.",
      "Reportes y exportaciones."
    ],
    active: true,
    order: 1
  },
  {
    id: "serv-2",
    title: "Desarrollo de Software de Escritorio",
    description: "Desarrollamos aplicaciones instalables para Windows, preparadas para operar con periféricos, redes locales, servidores empresariales y bases de datos centralizadas.",
    iconName: "Cpu",
    includes: [
      "Aplicaciones administrativas.",
      "Sistemas de caja.",
      "Sistemas para operación local.",
      "Aplicaciones con funcionamiento sin conexión.",
      "Conexión con SQL Server.",
      "Integración con impresoras térmicas.",
      "Lectores de códigos de barras.",
      "Gavetas de efectivo.",
      "Equipos especializados."
    ],
    active: true,
    order: 2
  },
  {
    id: "serv-3",
    title: "Desarrollo de Aplicaciones Móviles",
    description: "Creamos aplicaciones móviles para Android y otras plataformas, conectadas con sistemas administrativos, bases de datos, API y servicios empresariales.",
    iconName: "Smartphone",
    includes: [
      "Aplicaciones para inventarios.",
      "Aplicaciones para vendedores.",
      "Operaciones de campo.",
      "Entregas y logística.",
      "Consultas para clientes.",
      "Aprobaciones administrativas.",
      "Captura de evidencias.",
      "Notificaciones."
    ],
    active: true,
    order: 3
  },
  {
    id: "serv-4",
    title: "Desarrollo de API e Integraciones",
    description: "Diseñamos conexiones seguras para que diferentes sistemas puedan intercambiar información y trabajar como una sola operación.",
    iconName: "GitBranch",
    includes: [
      "API REST.",
      "Servicios web.",
      "Webhooks.",
      "Integraciones con plataformas externas.",
      "Sincronización de clientes, productos y facturas.",
      "Integración con medios de pago.",
      "Conexión con bases de datos.",
      "Procesos automáticos programados.",
      "Middleware empresarial."
    ],
    active: true,
    order: 4
  },
  {
    id: "serv-5",
    title: "Bases de Datos e Infraestructura",
    description: "Diseñamos, optimizamos y administramos infraestructuras de bases de datos robustas para asegurar la integridad, velocidad y disponibilidad de su información.",
    iconName: "DbIcon",
    includes: [
      "Microsoft SQL Server.",
      "PostgreSQL y MySQL.",
      "Bases de datos locales y en la nube.",
      "Diseño de estructuras de datos.",
      "Migración de información histórica.",
      "Optimización de consultas y rendimiento.",
      "Respaldos automatizados.",
      "Control de accesos y auditoría de operaciones."
    ],
    active: true,
    order: 5
  },
  {
    id: "serv-6",
    title: "Modernización de Sistemas",
    description: "Ayudamos a reemplazar sistemas antiguos, hojas de cálculo de Excel y procesos manuales por soluciones modernas, seguras y preparadas para el crecimiento empresarial.",
    iconName: "RefreshCw",
    includes: [
      "Migración de hojas de cálculo.",
      "Re-ingeniería de sistemas legacy.",
      "Reducción de silos de información.",
      "Capacitación de personal y adopción.",
      "Consolidación de múltiples sucursales.",
      "Seguridad de datos de diseño."
    ],
    active: true,
    order: 6
  }
];

export const INITIAL_SOLUTIONS: BWPSolution[] = [
  // Primary basic solutions
  { id: "sol-1", title: "Sistemas contables", description: "Control y registro de transacciones financieras en tiempo real.", iconName: "FileText", isStrongAdditional: false, active: true, order: 1 },
  { id: "sol-2", title: "Sistemas administrativos", description: "Gestión global de la operación, compras, ventas y control diario.", iconName: "Settings", isStrongAdditional: false, active: true, order: 2 },
  { id: "sol-3", title: "Sistemas de inventario", description: "Control de existencias multidepósito, lotes y valorización.", iconName: "Boxes", isStrongAdditional: false, active: true, order: 3 },
  { id: "sol-4", title: "Sistemas de facturación", description: "Facturación electrónica y tradicional integrada con inventarios.", iconName: "ClipboardList", isStrongAdditional: false, active: true, order: 4 },
  { id: "sol-5", title: "Puntos de venta (POS)", description: "Agilidad en cajas y facturación rápida de mostrador.", iconName: "ShoppingBag", isStrongAdditional: false, active: true, order: 5 },
  { id: "sol-6", title: "Cuentas por cobrar", description: "Seguimiento de saldos de clientes, plazos y cobros pendientes.", iconName: "TrendingUp", isStrongAdditional: false, active: true, order: 6 },
  { id: "sol-7", title: "Cuentas por pagar", description: "Control de compromisos financieros con proveedores e historial.", iconName: "Users", isStrongAdditional: false, active: true, order: 7 },
  { id: "sol-8", title: "Sistemas de compras", description: "Requerimientos, órdenes de compra y recepción de mercadería.", iconName: "FileSpreadsheet", isStrongAdditional: false, active: true, order: 8 },
  { id: "sol-9", title: "Sistemas de cotizaciones", description: "Generación ágil de presupuestos para clientes con control de versiones.", iconName: "Briefcase", isStrongAdditional: false, active: true, order: 9 },
  { id: "sol-10", title: "Reportes empresariales", description: "Paneles ejecutivos y KPIs claves para la toma de decisiones.", iconName: "BarChart3", isStrongAdditional: false, active: true, order: 10 },

  // 15 Strong additional solutions (Sección 9 de los requerimientos)
  {
    id: "add-1",
    title: "Sistemas ERP personalizados",
    description: "Plataformas para conectar ventas, compras, inventario, contabilidad, operaciones, usuarios y reportes dentro de una misma solución.",
    iconName: "Layers",
    isStrongAdditional: true,
    active: true,
    order: 11
  },
  {
    id: "add-2",
    title: "CRM y gestión comercial",
    description: "Control de prospectos, clientes, oportunidades, seguimientos, cotizaciones, vendedores y procesos de venta.",
    iconName: "UserCheck",
    isStrongAdditional: true,
    active: true,
    order: 12
  },
  {
    id: "add-3",
    title: "Recursos humanos y planillas",
    description: "Gestión de empleados, asistencia, permisos, vacaciones, expedientes, evaluaciones y procesos de planilla.",
    iconName: "Users",
    isStrongAdditional: true,
    active: true,
    order: 13
  },
  {
    id: "add-4",
    title: "Compras y proveedores",
    description: "Solicitudes de compra, cotizaciones, órdenes, aprobaciones, recepción de productos y evaluación de proveedores.",
    iconName: "FileSpreadsheet",
    isStrongAdditional: true,
    active: true,
    order: 14
  },
  {
    id: "add-5",
    title: "Logística y transporte",
    description: "Control de rutas, unidades, conductores, entregas, cargas, estados, documentos y evidencias.",
    iconName: "Truck",
    isStrongAdditional: true,
    active: true,
    order: 15
  },
  {
    id: "add-6",
    title: "Mantenimiento y activos",
    description: "Registro de equipos, mantenimientos preventivos, órdenes de trabajo, repuestos, responsables y costos.",
    iconName: "Wrench",
    isStrongAdditional: true,
    active: true,
    order: 16
  },
  {
    id: "add-7",
    title: "Hotelería y reservaciones",
    description: "Reservas, habitaciones, huéspedes, cargos, servicios, estados de habitación, pagos y reportes.",
    iconName: "Hotel",
    isStrongAdditional: true,
    active: true,
    order: 17
  },
  {
    id: "add-8",
    title: "Administración de propiedades",
    description: "Gestión de inmuebles, alquileres, contratos, propietarios, inquilinos, pagos, mantenimientos y disponibilidad.",
    iconName: "Building",
    isStrongAdditional: true,
    active: true,
    order: 18
  },
  {
    id: "add-9",
    title: "Comercio electrónico B2B y B2C",
    description: "Catálogos, pedidos, clientes empresariales, listas de precios, inventario, pagos y conexión con sistemas administrativos.",
    iconName: "ShoppingBag",
    isStrongAdditional: true,
    active: true,
    order: 19
  },
  {
    id: "add-10",
    title: "Portales de autoservicio",
    description: "Portales donde clientes o proveedores puedan consultar facturas, estados de cuenta, pedidos, documentos y solicitudes.",
    iconName: "Monitor",
    isStrongAdditional: true,
    active: true,
    order: 20
  },
  {
    id: "add-11",
    title: "Gestión documental",
    description: "Organización de contratos, facturas, archivos, evidencias, versiones, aprobaciones y vencimientos.",
    iconName: "FileText",
    isStrongAdditional: true,
    active: true,
    order: 21
  },
  {
    id: "add-12",
    title: "Flujos de aprobación",
    description: "Automatización de solicitudes, revisiones, autorizaciones, rechazos, notificaciones y trazabilidad.",
    iconName: "ClipboardList",
    isStrongAdditional: true,
    active: true,
    order: 22
  },
  {
    id: "add-13",
    title: "Inteligencia de negocios (BI)",
    description: "Paneles ejecutivos, indicadores, gráficos, comparaciones, análisis de ventas y reportes para toma de decisiones.",
    iconName: "BarChart3",
    isStrongAdditional: true,
    active: true,
    order: 23
  },
  {
    id: "add-14",
    title: "Aplicaciones para operaciones de campo",
    description: "Aplicaciones móviles para inventarios, inspecciones, visitas, entregas, fotografías, firmas y geolocalización.",
    iconName: "Smartphone",
    isStrongAdditional: true,
    active: true,
    order: 24
  },
  {
    id: "add-15",
    title: "Migración y sustitución de sistemas",
    description: "Extracción, limpieza y migración de información desde Excel, sistemas heredados o bases de datos antiguas hacia nuevas plataformas.",
    iconName: "RefreshCw",
    isStrongAdditional: true,
    active: true,
    order: 25
  }
];

export const INITIAL_PRODUCTS: BWPProduct[] = [
  {
    id: "prod-1",
    title: "BWP Retail POS",
    description: "BWP Retail POS es una solución empresarial de punto de venta, facturación, inventario y administración desarrollada por BWP Software. El producto demuestra nuestra capacidad para construir sistemas completos que conectan cajas, usuarios, productos, facturación, inventarios, reportes y bases de datos empresariales.",
    features: [
      "Punto de venta de alta velocidad.",
      "Panel administrativo centralizado.",
      "Facturación electrónica e impresa.",
      "Control estricto de inventarios por sucursal.",
      "Roles, permisos y auditoría de usuarios.",
      "Apertura, arqueos y cierre de cajas.",
      "Gestión de cuentas por cobrar de clientes.",
      "Reportes ejecutivos e indicadores en tiempo real.",
      "Control sincronizado de múltiples sucursales.",
      "Integración nativa con impresoras térmicas, balanzas y lectores de barra."
    ],
    targetCompanies: [
      "Comercios y tiendas minoristas",
      "Supermercados y bodegas",
      "Restaurantes y cafeterías",
      "Distribuidoras con puntos de venta",
      "Farmacias y tiendas de conveniencia"
    ],
    externalUrl: "https://bwpretailpos.com",
    imageSeed: "pos_system",
    active: true,
    order: 1
  }
];

export const INITIAL_INDUSTRIES: BWPIndustry[] = [
  {
    id: "ind-1",
    name: "Comercio y Retail",
    iconName: "ShoppingBag",
    problems: [
      "Descuadres constantes de cajas registradoras.",
      "Pérdida de control del inventario físico contra el sistema.",
      "Lentitud en la atención al cliente durante picos de venta."
    ],
    solutions: [
      "Implementación de BWP Retail POS con sincronización de inventario.",
      "Facturación ágil e integraciones con periféricos de caja.",
      "Módulo de caja chica y auditoría de aperturas/cierres."
    ],
    modules: [
      "Módulo POS de Facturación",
      "Módulo de Control de Inventarios",
      "Auditoría y Permisos de Cajeros"
    ],
    benefits: [
      "Cierres de caja automáticos sin descuadres.",
      "Atención al cliente un 40% más rápida.",
      "Información de stock actualizada en tiempo real."
    ],
    active: true,
    order: 1
  },
  {
    id: "ind-2",
    name: "Hoteles y Turismo",
    iconName: "Hotel",
    problems: [
      "Reservas duplicadas (Overbooking) entre canales de venta.",
      "Falta de control del estado de limpieza de habitaciones.",
      "Dificultad en cargos adicionales de consumos a la habitación."
    ],
    solutions: [
      "Sistema de reservas en tiempo real integrado con PMS local.",
      "Panel visual del estado de habitaciones para ama de llaves.",
      "Integración con restaurante y bar para cobros directos al folio."
    ],
    modules: [
      "Gestor de Reservas & Calendario",
      "Control de Limpieza y Habitaciones",
      "Facturación de Folio y Cargos de Servicios"
    ],
    benefits: [
      "Cero reservas duplicadas.",
      "Coordinación perfecta del personal de limpieza.",
      "Consolidación de cuentas para una experiencia de check-out ágil."
    ],
    active: true,
    order: 2
  },
  {
    id: "ind-3",
    name: "Restaurantes",
    iconName: "Utensils",
    problems: [
      "Errores constantes en las comandas enviadas a cocina.",
      "Desperdicio de insumos por falta de receta estándar.",
      "Dificultad para gestionar órdenes de entrega y salón de forma unificada."
    ],
    solutions: [
      "Sistema de comanderas digitales en tablets e impresoras de cocina.",
      "Control de receta estándar con explosión de insumos automática.",
      "Consolidación de ventas presenciales, delivery y plataformas."
    ],
    modules: [
      "Comandera Digital para Meseros",
      "Pantalla de Producción en Cocina (KDS)",
      "Recetario y Explosión de Insumos"
    ],
    benefits: [
      "Reducción del 95% de errores en cocina.",
      "Control milimétrico del costo de alimentos.",
      "Facturación simplificada con división de cuentas."
    ],
    active: true,
    order: 3
  },
  {
    id: "ind-4",
    name: "Logística y Transporte",
    iconName: "Truck",
    problems: [
      "Falta de visibilidad de las entregas en tiempo real.",
      "Pérdida de evidencias de entrega (firmas y fotos).",
      "Rutas ineficientes y alto consumo de combustible."
    ],
    solutions: [
      "Aplicación móvil para conductores con geolocalización.",
      "Registro fotográfico y firmas digitales de recibido.",
      "Módulo de planificación y optimización de rutas."
    ],
    modules: [
      "Asignación de Carga & Rutas",
      "App Móvil para Chofer (Offline First)",
      "Registro de Evidencia Digital"
    ],
    benefits: [
      "Control en tiempo real de los estados de entrega.",
      "Disponibilidad de evidencias en la nube al instante.",
      "Ahorro notable de costos logísticos y tiempos de traslado."
    ],
    active: true,
    order: 4
  },
  {
    id: "ind-5",
    name: "Almacenamiento y Distribución",
    iconName: "Warehouse",
    problems: [
      "Dificultad para localizar productos en almacenes grandes.",
      "Errores en la preparación de pedidos (picking).",
      "Mala rotación de productos perecederos (fechas de vencimiento)."
    ],
    solutions: [
      "Sistemas de administración de almacenes (WMS) mediante códigos de barras.",
      "Flujos de picking y packing guiados por dispositivos móviles.",
      "Control estricto de lotes, ubicaciones y fechas de caducidad (PEPS)."
    ],
    modules: [
      "Control de Ubicaciones en Almacén",
      "Guiado de Picking Móvil",
      "Control de Lotes y Caducidades"
    ],
    benefits: [
      "Optimización de espacio físico en bodegas.",
      "Precisión del 99% en la preparación de despachos.",
      "Reducción sustancial de pérdidas por productos vencidos."
    ],
    active: true,
    order: 5
  },
  {
    id: "ind-6",
    name: "Inmobiliarias y Construcción",
    iconName: "Building",
    problems: [
      "Dificultad para conciliar cobros de alquileres de múltiples propiedades.",
      "Descontrol de materiales, presupuestos y compras de obra.",
      "Falta de seguimiento a solicitudes de mantenimiento e inquilinos."
    ],
    solutions: [
      "Plataforma de administración de contratos, inquilinos y cobros mensuales.",
      "Sistema de gestión de obras con control de avances físicos y financieros.",
      "Portal para registrar reportes de averías y asignación de técnicos."
    ],
    modules: [
      "Control de Contratos de Arrendamiento",
      "Gestor de Presupuestos de Obra (APU)",
      "Tickets de Mantenimiento de Activos"
    ],
    benefits: [
      "Facturación y cobros recurrentes sistematizados.",
      "Alertas tempranas de desviaciones presupuestarias en obras.",
      "Atención rápida de reparaciones elevando la satisfacción del inquilino."
    ],
    active: true,
    order: 6
  },
  {
    id: "ind-7",
    name: "Empresas que utilizan SAP Business One",
    iconName: "Layers",
    problems: [
      "Licencias SAP costosas para empleados que solo requieren registrar tareas simples.",
      "Doble digitación de datos desde sistemas de campo o POS hacia SAP.",
      "Falta de soluciones móviles ágiles conectadas en tiempo real al ERP."
    ],
    solutions: [
      "Desarrollo de portales web satélite y aplicaciones móviles para flujos específicos.",
      "Sincronización automatizada bidireccional mediante Service Layer o DI API.",
      "Módulos para vendedores y despachos que envían información directa a SAP."
    ],
    modules: [
      "Conector Sincronizador BWP",
      "Portal Web para Vendedores Externos",
      "App Móvil de Inventarios enlazado a SAP"
    ],
    benefits: [
      "Optimización masiva del costo de licencias SAP.",
      "Eliminación total de la doble digitación y errores humanos.",
      "Operaciones de campo más ágiles con respaldo de SAP en backend."
    ],
    active: true,
    order: 7
  }
];

export const INITIAL_CLIENT_CASES: BWPClientCase[] = [
  {
    id: "cli-1",
    logoLetter: "RSS", logoBgColor: "bg-white", coverImage: "/assets/cases/roatan-self-storage.webp",
    companyName: "Roatán Self Storage", industry: "Almacenamiento y servicios", caseType: "CLIENT",
    projectTitle: "Plataforma de facturación, cobros digitales e integración operativa",
    description: "Desarrollo de una solución conectada con Storeganise para transformar la información operativa en facturación, comunicación al cliente y cobros digitales desde un flujo controlado.",
    challenge: "Unificar reservas y datos de clientes con el ciclo hondureño de facturación, evitando tareas duplicadas y ofreciendo alternativas de pago remotas.",
    solution: "Capa de integración que consulta la operación, prepara documentos fiscales, envía facturas por correo y administra enlaces y estados de pago.",
    integrations: ["Storeganise", "API de pagos BAC", "Correo transaccional", "Facturación"],
    capabilities: ["Sincronización de clientes", "Emisión y envío de facturas", "Pasarela y opciones de pago", "Trazabilidad de transacciones"],
    technologies: ["Next.js", "TypeScript", "API REST", "SQL"],
    result: "Un solo flujo para convertir la operación de almacenamiento en documentos fiscales, notificaciones y pagos conciliables.",
    active: true,
    order: 1
  },
  {
    id: "cli-2",
    logoLetter: "ZA", logoBgColor: "bg-white", coverImage: "/assets/cases/zarivas.png",
    companyName: "Zarivas", industry: "Retail, impresión y servicios", caseType: "CLIENT",
    projectTitle: "Implementación de BWP Retail POS para facturación y control comercial",
    description: "Instalación y adaptación de BWP Retail POS para centralizar ventas, facturación, inventario, cierres de caja y consulta gerencial.",
    challenge: "Organizar productos, ventas e inventario dentro de una operación de tienda con múltiples líneas comerciales y necesidad de atención rápida.",
    solution: "Punto de venta conectado con catálogo, existencias, clientes, métodos de pago, facturación y reportes operativos.",
    capabilities: ["Terminal POS", "Facturación", "Inventario", "Cierres y reportes"],
    technologies: ["BWP Retail POS", "SQL", "Facturación", "Auditoría"],
    result: "Operación comercial centralizada con control de caja, documentos de venta, existencias y consulta administrativa.",
    active: true,
    order: 2
  },
  {
    id: "cli-3",
    logoLetter: "MP", logoBgColor: "bg-white", coverImage: "/assets/cases/palao.jpg",
    companyName: "Minisúper Palao", industry: "Supermercado y comercio minorista", caseType: "CLIENT",
    projectTitle: "Analítica de ventas, cierres de caja, facturación e inventario",
    description: "Plataforma para observar el comportamiento comercial, controlar jornadas de caja, emitir facturas y mantener visibilidad sobre inventario y movimientos críticos.",
    challenge: "Consolidar la información que se genera en caja y convertirla en control útil para administración, compras y seguimiento de inventario.",
    solution: "Panel operativo con ventas, cierres, documentos fiscales, existencias, alertas y análisis para la toma de decisiones.",
    capabilities: ["Análisis de ventas", "Cierres de caja", "Facturación", "Control de inventario"],
    technologies: ["BWP Retail POS", "Dashboard BI", "SQL", "Reportería"],
    result: "Mayor visibilidad sobre ventas, caja e inventario desde una experiencia administrativa integrada.",
    active: true,
    order: 3
  },
  {
    id: "private-1", logoLetter: "FT", logoBgColor: "bg-slate-900", coverImage: "/assets/cases/bwp-fiscal-track.png",
    companyName: "BWP Fiscal Track", industry: "Cumplimiento fiscal multiempresa", caseType: "PRIVATE_PLATFORM",
    projectTitle: "Centro de control fiscal CAI por RTN y puntos de venta",
    description: "Plataforma privada para supervisar salud fiscal, rangos CAI, correlativos, documentos, alertas e historial entre múltiples sistemas y estaciones POS.",
    challenge: "Detectar riesgos fiscales antes de que interrumpan la facturación y consolidar información dispersa entre empresas, cajas y plataformas.",
    solution: "Matriz central de cumplimiento con alertas priorizadas, validación documental, historial y cobertura por sistema.",
    capabilities: ["Alertas fiscales", "Matriz POS", "Validación de facturas", "Historial CAI"],
    technologies: ["SaaS", "API REST", "Monitoreo", "Multiempresa"], commercialModel: "Plataforma privada por suscripción",
    result: "Supervisión preventiva y trazable del ciclo fiscal desde un único centro operativo.", active: true, order: 4
  },
  {
    id: "private-2", logoLetter: "WA", logoBgColor: "bg-blue-900", coverImage: "/assets/cases/app-movil-ventas.png",
    companyName: "BWP Water Operations", industry: "Distribución y despacho", caseType: "PRIVATE_PLATFORM",
    projectTitle: "Aplicación móvil de ventas, rutas, entregas y cierre de caja",
    description: "Sistema privado para empresas distribuidoras de agua que conecta al vendedor en ruta con ventas, clientes, recaudación, entregas y cierre diario.",
    challenge: "Mantener control de la operación móvil, el producto entregado y el dinero recaudado fuera de oficina.",
    solution: "Aplicación de campo integrada con una consola de despacho y administración para coordinar rutas y consolidar resultados diarios.",
    capabilities: ["Venta móvil", "Despachos", "Recaudación", "Cierre de caja"],
    technologies: ["Aplicación móvil", "API REST", "Geolocalización", "Cloud"], commercialModel: "Licenciamiento privado por suscripción",
    result: "Operación de campo conectada con administración, trazabilidad por vendedor y control diario de entregas.", active: true, order: 5
  },
  {
    id: "private-3", logoLetter: "RP", logoBgColor: "bg-slate-900", coverImage: "/assets/cases/bwp-retail-dashboard.png",
    companyName: "BWP Retail POS", industry: "Retail y puntos de venta", caseType: "PRIVATE_PLATFORM",
    projectTitle: "Suite POS empresarial para ventas, inventario, compras y finanzas",
    description: "Producto modular para empresas que necesitan facturación rápida, control de cajas, inventarios, compras, finanzas, sucursales y auditoría.",
    challenge: "Permitir que caja opere con velocidad sin perder gobierno administrativo, control fiscal ni trazabilidad.",
    solution: "Terminal de venta y consola gerencial conectadas mediante módulos y permisos por rol.",
    capabilities: ["POS y facturación", "Inventario y lotes", "Compras y finanzas", "Auditoría"],
    technologies: ["Next.js", "TypeScript", "SQL", "API REST"], commercialModel: "SaaS y despliegue privado",
    result: "Una base operativa escalable para caja, administración y supervisión de múltiples puntos de venta.", active: true, order: 6
  },
  {
    id: "private-4", logoLetter: "ERP", logoBgColor: "bg-blue-950", coverImage: "/assets/cases/bwp-erp-crm.png",
    companyName: "BWP Business ERP & CRM", industry: "Gestión empresarial", caseType: "PRIVATE_PLATFORM",
    projectTitle: "Suite contable, financiera y CRM disponible por suscripción",
    description: "Plataforma empresarial privada que reúne socios de negocio, facturación, cuentas por cobrar y pagar, bancos, contabilidad, inventario, compras, proyectos y recursos humanos.",
    challenge: "Evitar islas de información y entregar a cada área una vista autorizada de la misma operación.",
    solution: "Arquitectura modular multiempresa con trazabilidad, permisos, reportes y administración centralizada.",
    capabilities: ["Contabilidad", "CRM", "Finanzas", "Operación multiempresa"],
    technologies: ["ERP modular", "CRM", "SQL", "Cloud híbrido"], commercialModel: "Suite empresarial por suscripción",
    result: "Procesos comerciales, contables y operativos conectados sobre una sola plataforma gobernada.", active: true, order: 7
  }
];

export const INITIAL_FAQS: BWPFAQ[] = [
  {
    id: "faq-1",
    question: "¿Desarrollan sistemas completamente personalizados?",
    answer: "Sí, absolutamente. Nos especializamos en desarrollo a la medida. Analizamos su flujo de operación actual, comprendemos sus cuellos de botella y diseñamos una solución tecnológica adaptada al 100% a sus procesos reales, sin que su empresa tenga que adaptarse a un software rígido.",
    active: true,
    order: 1
  },
  {
    id: "faq-2",
    question: "¿Trabajan con pequeñas, medianas y grandes empresas?",
    answer: "Sí, diseñamos soluciones escalables. Podemos desarrollar desde una aplicación pequeña o módulo específico para una microempresa en crecimiento, hasta plataformas empresariales complejas e integradas para corporaciones con múltiples sucursales.",
    active: true,
    order: 2
  },
  {
    id: "faq-3",
    question: "¿Pueden modernizar un sistema que ya existe?",
    answer: "Sí. Analizamos su sistema actual, rescatamos su base de datos histórica y desarrollamos una nueva plataforma moderna en la nube, escritorio o móvil, garantizando la continuidad de su operación y una migración segura de su información.",
    active: true,
    order: 3
  },
  {
    id: "faq-4",
    question: "¿Desarrollan aplicaciones web, móviles y de escritorio?",
    answer: "Sí. Dependiendo del tipo de operación de su empresa, desarrollamos aplicaciones web (accesibles desde cualquier navegador), software de escritorio instalable en Windows (ideal para periféricos de caja y alta velocidad), o aplicaciones móviles nativas/híbridas (para equipos de ventas, inventario físico o entregas).",
    active: true,
    order: 4
  },
  {
    id: "faq-5",
    question: "¿Pueden integrar un sistema con SAP Business One?",
    answer: "Sí, contamos con amplia experiencia técnica integrando aplicaciones web satélites, portales de proveedores o puntos de venta con la base de datos y flujos de SAP Business One de manera segura, utilizando sus mecanismos de integración aprobados.",
    active: true,
    order: 5
  },
  {
    id: "faq-6",
    question: "¿Trabajan con SQL Server?",
    answer: "Sí, es uno de nuestros motores de base de datos preferidos para entornos corporativos Microsoft. Diseñamos estructuras óptimas, configuramos servidores locales o en la nube, optimizamos consultas de alto tráfico y programamos planes de respaldo automáticos.",
    active: true,
    order: 6
  },
  {
    id: "faq-7",
    question: "¿Pueden instalar el sistema en los servidores de la empresa?",
    answer: "Sí. Ofrecemos completa flexibilidad de implementación: podemos desplegar su sistema localmente en los servidores de su oficina (On-Premise), alojarlo en la nube (AWS, Google Cloud, Azure) o estructurar un entorno híbrido.",
    active: true,
    order: 7
  },
  {
    id: "faq-8",
    question: "¿También ofrecen soluciones alojadas en la nube?",
    answer: "Sí, diseñamos plataformas web y bases de datos con disponibilidad del 99.9% en la nube, preparadas con certificados de seguridad HTTPS, cifrado de datos y accesibles de manera segura desde cualquier lugar del mundo.",
    active: true,
    order: 8
  },
  {
    id: "faq-9",
    question: "¿Realizan migración desde Excel o sistemas antiguos?",
    answer: "Sí, brindamos acompañamiento completo en la migración. Extraemos, saneamos, consolidamos y cargamos su información histórica desde hojas de cálculo o sistemas antiguos para que comience a operar en su nueva plataforma con sus datos listos.",
    active: true,
    order: 9
  },
  {
    id: "faq-10",
    question: "¿El desarrollo incluye capacitación?",
    answer: "Por supuesto. No entregamos código sin asegurar su adopción. El proyecto incluye sesiones de capacitación detalladas para los administradores y usuarios del sistema, manuales de usuario y videos de guía.",
    active: true,
    order: 10
  },
  {
    id: "faq-11",
    question: "¿Ofrecen mantenimiento y soporte?",
    answer: "Sí. Ofrecemos planes de soporte mensual preventivo y correctivo post-implementación para asegurar que el sistema evolucione, se mantenga actualizado ante cambios de ley (por ejemplo, tributarios) y responda ante cualquier eventualidad técnica.",
    active: true,
    order: 11
  },
  {
    id: "faq-12",
    question: "¿Pueden integrar impresoras, lectores y equipos de punto de venta?",
    answer: "Sí, nuestras aplicaciones de escritorio y web pueden conectarse de forma nativa con impresoras térmicas (comandos ESC/POS), lectores de código de barras de mano o fijos, básculas de pesaje, cajones de dinero y terminales de pago.",
    active: true,
    order: 12
  },
  {
    id: "faq-13",
    question: "¿Cómo se determina el precio de un proyecto?",
    answer: "El precio se define en función de la complejidad del sistema: la cantidad de módulos requeridos, el tipo de plataformas (web/móvil/escritorio), la cantidad de integraciones necesarias y el alcance de la migración de datos. Entregamos una cotización detallada con precio cerrado y etapas claras.",
    active: true,
    order: 13
  },
  {
    id: "faq-14",
    question: "¿Cuánto tiempo tarda un desarrollo?",
    answer: "Un módulo específico puede tomar de 4 a 6 semanas. Una plataforma empresarial completa a la medida suele demorar entre 3 y 6 meses. Definimos un cronograma detallado de entregas parciales semanales para que pueda ver el avance constante.",
    active: true,
    order: 14
  },
  {
    id: "faq-15",
    question: "¿Cómo se protege la información de la empresa?",
    answer: "La seguridad es nuestra prioridad. Implementamos roles de usuario estrictos con permisos específicos, cifrado de contraseñas, auditoría interna que registra qué usuario creó o modificó cada registro, certificados SSL/TLS y copias de seguridad automáticas diarias.",
    active: true,
    order: 15
  }
];

export const INITIAL_CONTACT_INFO: BWPContactInfo = {
  companyName: "BWP Software",
  representative: "Soporte IT",
  representativeTitle: "Soporte técnico y atención empresarial",
  phone: "(+504) 8828-5822",
  whatsapp: "+50488285822",
  email: "bwpsoporte@gmail.com",
  location: "Roatán, Islas de la Bahía, Honduras",
  mission: "Desarrollar soluciones tecnológicas confiables que ayuden a las empresas a operar con mayor control, eficiencia y capacidad de crecimiento.",
  vision: "Convertirnos en un aliado tecnológico de referencia para empresas que necesitan modernizar, integrar y proteger sus operaciones mediante software empresarial personalizado.",
  values: [
    "Responsabilidad en cada línea de código.",
    "Confidencialidad absoluta con la información del negocio.",
    "Innovación tecnológica práctica y adaptada.",
    "Seguridad informática por diseño.",
    "Calidad rigurosa en pruebas de funcionamiento.",
    "Comunicación transparente y constante.",
    "Compromiso total con los plazos de entrega.",
    "Mejora continua y adaptabilidad técnica."
  ]
};

// Local storage helpers
const STORAGE_PREFIX = "bwp_software_";

export function getStoredData<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = window.localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return defaultValue;
  }
}

export async function getStoredDataAsync<T>(key:string,defaultValue:T):Promise<T>{
  if(typeof window==="undefined") return defaultValue;
  try{
    const response=await fetch(`/api/cms/${encodeURIComponent(key)}`,{cache:"no-store"});
    if(response.ok){const body=await response.json();if(body.data!==null&&body.data!==undefined){window.localStorage.setItem(STORAGE_PREFIX+key,JSON.stringify(body.data));return body.data as T}}
  }catch{}
  return getStoredData(key,defaultValue);
}

export function getStoredClientCases(): BWPClientCase[] {
  const stored = getStoredData<BWPClientCase[]>("client_cases", INITIAL_CLIENT_CASES);
  if (!Array.isArray(stored)) return INITIAL_CLIENT_CASES;

  const defaultIds = new Set(INITIAL_CLIENT_CASES.map(item => item.id));
  const hasLegacyDefaults = stored.some(item => defaultIds.has(item.id) && !item.caseType);

  if (hasLegacyDefaults) {
    const manuallyCreated = stored.filter(item => !defaultIds.has(item.id));
    return [...INITIAL_CLIENT_CASES, ...manuallyCreated].sort((a, b) => a.order - b.order);
  }

  const storedById = new Map(stored.map(item => [item.id, item]));
  const currentDefaults = INITIAL_CLIENT_CASES.map(item => storedById.get(item.id) || item);
  const manuallyCreated = stored.filter(item => !defaultIds.has(item.id));
  return [...currentDefaults, ...manuallyCreated].sort((a, b) => a.order - b.order);
}

export function setStoredData<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    if(["services","solutions","products","industries","client_cases","faqs","contact_info","leadership"].includes(key)){
      void fetch(`/api/cms/${encodeURIComponent(key)}`,{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify(value)});
    }
  } catch (error) {
    console.error("Error writing to localStorage", error);
  }
}

export function addQuotationRequest(request: Omit<BWPQuotationRequest, "id" | "createdAt" | "status">): void {
  const currentRequests = getStoredData<BWPQuotationRequest[]>("quotation_requests", []);
  const newRequest: BWPQuotationRequest = {
    ...request,
    id: "req-" + Math.random().toString(36).substring(2, 11),
    createdAt: new Date().toISOString(),
    status: 'PENDING'
  };
  setStoredData("quotation_requests", [newRequest, ...currentRequests]);
  void fetch("/api/contact",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(newRequest)});
}

// Utility to get a Lucide icon component by name
export function getLucideIcon(name: string) {
  const icons: Record<string, LucideIcon> = {
    Briefcase,
    Monitor,
    Smartphone,
    Cpu,
    DbIcon,
    RefreshCw,
    ShoppingBag,
    Hotel,
    Utensils,
    Truck,
    Warehouse,
    TrendingUp,
    Building,
    HardHat,
    HeartPulse,
    GraduationCap,
    Scale,
    Settings,
    Users,
    ShieldCheck,
    Code2,
    FileSpreadsheet,
    FileText,
    UserCheck,
    Layers,
    MapPin,
    ClipboardList,
    Wrench,
    BookOpen,
    Mail,
    Phone,
    BarChart3,
    GitBranch,
    Search,
    Lock,
    Boxes,
    HelpCircle
  };
  return icons[name] || HelpCircle;
}
