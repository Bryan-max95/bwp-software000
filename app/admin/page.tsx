"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Lock, 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Layers, 
  HelpCircle, 
  PhoneCall, 
  Plus, 
  Edit, 
  Trash2, 
  Filter, 
  ChevronRight, 
  Save, 
  TrendingUp, 
  ShieldAlert,
  AlertCircle,
  ExternalLink,
  Download,
  Upload
} from "lucide-react";
import { 
  getStoredDataAsync,
  getStoredClientCases,
  setStoredData, 
  INITIAL_SERVICES, 
  INITIAL_SOLUTIONS, 
  INITIAL_PRODUCTS, 
  INITIAL_FAQS, 
  INITIAL_CONTACT_INFO,
  INITIAL_LEADERSHIP,
  BWPService,
  BWPSolution,
  BWPProduct,
  BWPClientCase,
  BWPFAQ,
  BWPContactInfo,
  BWPLeadership,
  BWPQuotationRequest
} from "../../lib/data";

type AdminTab = "overview" | "leads" | "services" | "products" | "cases" | "faqs" | "contact_info" | "users";
type AdminUser={id:string;email?:string;username?:string;displayName:string;role:string;status:string;mustChangePassword:boolean;lastLoginAt?:string;createdAt:string};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loginError, setLoginError] = useState("");

  // Tab state
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");

  // CRM/CMS states
  const [leads, setLeads] = useState<BWPQuotationRequest[]>([]);
  const [services, setServices] = useState<BWPService[]>([]);
  const [solutions, setSolutions] = useState<BWPSolution[]>([]);
  const [products, setProducts] = useState<BWPProduct[]>([]);
  const [cases, setCases] = useState<BWPClientCase[]>([]);
  const [faqs, setFaqs] = useState<BWPFAQ[]>([]);
  const [contactInfo, setContactInfo] = useState<BWPContactInfo>(INITIAL_CONTACT_INFO);
  const [leadership,setLeadership]=useState<BWPLeadership>(INITIAL_LEADERSHIP);
  const [adminUsers,setAdminUsers]=useState<AdminUser[]>([]);
  const [profile,setProfile]=useState<{displayName?:string;email?:string;username?:string;role?:string}|null>(null);
  const [invite,setInvite]=useState({email:"",displayName:"",temporaryPassword:"",role:"EDITOR"});
  const [inviteMessage,setInviteMessage]=useState("");

  // Edit states
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<Partial<BWPService>>({});

  const [editingSolutionId, setEditingSolutionId] = useState<string | null>(null);
  const [solutionForm, setSolutionForm] = useState<Partial<BWPSolution>>({});

  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<Partial<BWPProduct>>({});

  const [editingCaseId, setEditingCaseId] = useState<string | null>(null);
  const [caseForm, setCaseForm] = useState<Partial<BWPClientCase>>({});

  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [faqForm, setFaqForm] = useState<Partial<BWPFAQ>>({});

  // Search/Filter states
  const [leadFilterStatus, setLeadFilterStatus] = useState<string>("ALL");
  const [leadSearchQuery, setLeadSearchQuery] = useState("");

  // Load state on mount/auth
  useEffect(() => {
    if (isAuthenticated) {
      let active=true;
      void Promise.all([
        getStoredDataAsync<BWPService[]>("services",INITIAL_SERVICES),getStoredDataAsync<BWPSolution[]>("solutions",INITIAL_SOLUTIONS),getStoredDataAsync<BWPProduct[]>("products",INITIAL_PRODUCTS),getStoredDataAsync<BWPClientCase[]>("client_cases",getStoredClientCases()),getStoredDataAsync<BWPFAQ[]>("faqs",INITIAL_FAQS),getStoredDataAsync<BWPContactInfo>("contact_info",INITIAL_CONTACT_INFO),getStoredDataAsync<BWPLeadership>("leadership",INITIAL_LEADERSHIP)
      ]).then(([nextServices,nextSolutions,nextProducts,nextCases,nextFaqs,nextContact,nextLeadership])=>{if(!active)return;setServices(nextServices);setSolutions(nextSolutions);setProducts(nextProducts);setCases(nextCases);setFaqs(nextFaqs);setContactInfo(nextContact);setLeadership(nextLeadership)});
      void fetch("/api/admin/users").then(r=>r.ok?r.json():null).then(body=>{if(body&&active){setAdminUsers(body.users);setProfile(body.profile)}});
      void fetch("/api/admin/leads").then(r=>r.ok?r.json():null).then(body=>{if(body&&active)setLeads(body.leads)});
      return()=>{active=false};
    }
  }, [isAuthenticated]);

  useEffect(()=>{void fetch("/api/admin/me").then(r=>{if(r.ok)setIsAuthenticated(true)})},[]);

  // Handle simple passcode login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response=await fetch("/api/admin/login",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({username,password})});
    if (response.ok) {
      const body=await response.json();setProfile(body.user);
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Usuario o contraseña incorrectos.");
    }
  };

  const handleInvite=async(e:React.FormEvent)=>{e.preventDefault();setInviteMessage("Enviando invitación...");const response=await fetch("/api/admin/users",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(invite)});const body=await response.json();setInviteMessage(response.ok?"Invitación enviada y usuario registrado.":body.error||"No fue posible invitar al usuario.");if(response.ok){setInvite({email:"",displayName:"",temporaryPassword:"",role:"EDITOR"});const refresh=await fetch("/api/admin/users");if(refresh.ok)setAdminUsers((await refresh.json()).users)}};

  // Lead functions
  const handleUpdateLeadStatus = (leadId: string, newStatus: BWPQuotationRequest["status"]) => {
    const updatedLeads = leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l);
    setLeads(updatedLeads);
    setStoredData("quotation_requests", updatedLeads);
    void fetch("/api/admin/leads",{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify({id:leadId,status:newStatus})});
  };

  const handleDeleteLead = (leadId: string) => {
    if (window.confirm("¿Está seguro de que desea eliminar este prospecto del sistema?")) {
      const updatedLeads = leads.filter(l => l.id !== leadId);
      setLeads(updatedLeads);
      setStoredData("quotation_requests", updatedLeads);
      void fetch("/api/admin/leads",{method:"DELETE",headers:{"content-type":"application/json"},body:JSON.stringify({id:leadId})});
    }
  };

  // Service CRUD
  const handleSaveService = (id: string | "new") => {
    let updatedServices = [...services];
    if (id === "new") {
      const newService: BWPService = {
        id: "srv-" + Math.random().toString(36).substring(2, 9),
        title: serviceForm.title || "Nuevo Servicio",
        description: serviceForm.description || "",
        includes: serviceForm.includes || [],
        iconName: serviceForm.iconName || "Briefcase",
        active: true,
        order: services.length + 1
      };
      updatedServices.push(newService);
    } else {
      updatedServices = services.map(s => s.id === id ? { ...s, ...serviceForm } : s);
    }
    setServices(updatedServices);
    setStoredData("services", updatedServices);
    setEditingServiceId(null);
    setServiceForm({});
  };

  const handleToggleService = (id: string, active: boolean) => {
    const updated = services.map(s => s.id === id ? { ...s, active } : s);
    setServices(updated);
    setStoredData("services", updated);
  };

  // Solution CRUD
  const handleSaveSolution = (id: string | "new") => {
    let updated = [...solutions];
    if (id === "new") {
      const newSol: BWPSolution = {
        id: "sol-" + Math.random().toString(36).substring(2, 9),
        title: solutionForm.title || "Nueva Solución",
        description: solutionForm.description || "",
        isStrongAdditional: solutionForm.isStrongAdditional || false,
        iconName: solutionForm.iconName || "Layers",
        active: true,
        order: solutions.length + 1
      };
      updated.push(newSol);
    } else {
      updated = solutions.map(s => s.id === id ? { ...s, ...solutionForm } : s);
    }
    setSolutions(updated);
    setStoredData("solutions", updated);
    setEditingSolutionId(null);
    setSolutionForm({});
  };

  const handleToggleSolution = (id: string, active: boolean) => {
    const updated = solutions.map(s => s.id === id ? { ...s, active } : s);
    setSolutions(updated);
    setStoredData("solutions", updated);
  };

  // Product CRUD
  const handleSaveProduct = (id: string) => {
    const updated = products.map(p => p.id === id ? { ...p, ...productForm } : p);
    setProducts(updated);
    setStoredData("products", updated);
    setEditingProductId(null);
    setProductForm({});
  };

  const handleToggleProduct = (id: string, active: boolean) => {
    const updated = products.map(p => p.id === id ? { ...p, active } : p);
    setProducts(updated);
    setStoredData("products", updated);
  };

  // Cases CRUD
  const handleClientLogoUpload = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      window.alert("Seleccione un archivo de imagen válido.");
      return;
    }
    if (file.size > 1024 * 1024) {
      window.alert("El logotipo no debe superar 1 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setCaseForm(current => ({ ...current, logoDataUrl: String(reader.result || "") }));
    reader.readAsDataURL(file);
  };

  const handleCaseCoverUpload = (file?: File) => {
    if (!file || !file.type.startsWith("image/")) return window.alert("Seleccione una imagen válida.");
    if (file.size > 2 * 1024 * 1024) return window.alert("La captura no debe superar 2 MB.");
    const reader = new FileReader();
    reader.onload = () => setCaseForm(current => ({ ...current, coverImage: String(reader.result || "") }));
    reader.readAsDataURL(file);
  };

  const handleSaveCase = (id: string | "new") => {
    let updated = [...cases];
    if (id === "new") {
      const newCase: BWPClientCase = {
        id: "cli-" + Math.random().toString(36).substring(2, 9),
        logoLetter: caseForm.logoLetter || "N",
        logoBgColor: caseForm.logoBgColor || "bg-slate-900",
        logoDataUrl: caseForm.logoDataUrl,
        coverImage: caseForm.coverImage,
        caseType: caseForm.caseType || "CLIENT",
        companyName: caseForm.companyName || "Nueva Empresa",
        industry: caseForm.industry || "",
        projectTitle: caseForm.projectTitle || "",
        description: caseForm.description || "",
        challenge: caseForm.challenge || "",
        solution: caseForm.solution || "",
        integrations: caseForm.integrations || [],
        capabilities: caseForm.capabilities || [],
        commercialModel: caseForm.commercialModel || "",
        technologies: caseForm.technologies || [],
        result: caseForm.result || "",
        testimonial: caseForm.testimonial ? {
          text: caseForm.testimonial.text || "",
          author: caseForm.testimonial.author || "",
          role: caseForm.testimonial.role || ""
        } : undefined,
        active: true,
        order: cases.length + 1
      };
      updated.push(newCase);
    } else {
      updated = cases.map(c => c.id === id ? { ...c, ...caseForm } : c);
    }
    setCases(updated);
    setStoredData("client_cases", updated);
    setEditingCaseId(null);
    setCaseForm({});
  };

  const handleToggleCase = (id: string, active: boolean) => {
    const updated = cases.map(c => c.id === id ? { ...c, active } : c);
    setCases(updated);
    setStoredData("client_cases", updated);
  };

  // FAQs CRUD
  const handleSaveFaq = (id: string | "new") => {
    let updated = [...faqs];
    if (id === "new") {
      const newFaq: BWPFAQ = {
        id: "faq-" + Math.random().toString(36).substring(2, 9),
        question: faqForm.question || "¿Nueva Pregunta?",
        answer: faqForm.answer || "",
        active: true,
        order: faqs.length + 1
      };
      updated.push(newFaq);
    } else {
      updated = faqs.map(f => f.id === id ? { ...f, ...faqForm } : f);
    }
    setFaqs(updated);
    setStoredData("faqs", updated);
    setEditingFaqId(null);
    setFaqForm({});
  };

  const handleDeleteFaq = (id: string) => {
    if (window.confirm("¿Está seguro de que desea eliminar esta pregunta frecuente?")) {
      const updated = faqs.filter(f => f.id !== id);
      setFaqs(updated);
      setStoredData("faqs", updated);
    }
  };

  // Contact Info Save
  const handleSaveContactInfo = () => {
    setStoredData("contact_info", contactInfo);
    setStoredData("leadership",leadership);
    alert("Información institucional guardada con éxito en el CMS.");
  };

  const handleLeadershipImage=(person:"bryanImage"|"carlosImage",file?:File)=>{if(!file||!file.type.startsWith("image/"))return;if(file.size>2*1024*1024)return alert("La fotografía no debe superar 2 MB.");const reader=new FileReader();reader.onload=()=>setLeadership(current=>({...current,[person]:String(reader.result||"")}));reader.readAsDataURL(file)};

  const handleExportPortal = () => {
    const backup = { exportedAt: new Date().toISOString(), services, solutions, products, cases, faqs, contactInfo, leads };
    const url = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `bwp-cms-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleImportPortal = async (file?: File) => {
    if (!file) return;
    try {
      const backup = JSON.parse(await file.text());
      if (Array.isArray(backup.services)) { setServices(backup.services); setStoredData("services", backup.services); }
      if (Array.isArray(backup.solutions)) { setSolutions(backup.solutions); setStoredData("solutions", backup.solutions); }
      if (Array.isArray(backup.products)) { setProducts(backup.products); setStoredData("products", backup.products); }
      if (Array.isArray(backup.cases)) { setCases(backup.cases); setStoredData("client_cases", backup.cases); }
      if (Array.isArray(backup.faqs)) { setFaqs(backup.faqs); setStoredData("faqs", backup.faqs); }
      if (backup.contactInfo) { setContactInfo(backup.contactInfo); setStoredData("contact_info", backup.contactInfo); }
      if (Array.isArray(backup.leads)) { setLeads(backup.leads); setStoredData("quotation_requests", backup.leads); }
      window.alert("Respaldo importado correctamente.");
    } catch {
      window.alert("El archivo no contiene un respaldo válido del portal BWP.");
    }
  };

  // Filter Leads
  const filteredLeads = leads.filter(l => {
    const matchesStatus = leadFilterStatus === "ALL" || l.status === leadFilterStatus;
    const searchString = `${l.fullName} ${l.company} ${l.email} ${l.projectDescription}`.toLowerCase();
    const matchesSearch = searchString.includes(leadSearchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="bg-slate-950 min-h-screen flex items-center justify-center p-4 text-left" id="admin-login-screen">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 max-w-sm w-full space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-700/5 rounded-full blur-2xl"></div>
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-red-950/80 border border-red-900 rounded-xl flex items-center justify-center mx-auto text-red-500 shadow-md">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold font-display text-white tracking-tight">Acceso Privado BWP</h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consola interna para administración de leads, cotizaciones y catálogo web de BWP Software.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1"><label className="text-[10px] font-mono font-bold text-slate-400 uppercase block tracking-wider">Usuario administrador</label><input type="text" autoComplete="username" value={username} onChange={(e)=>setUsername(e.target.value)} className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-red-600 text-white font-mono"/></div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase block tracking-wider">Contraseña</label>
              <input
                type="password"
                placeholder="Escriba la credencial administrativa"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-850 rounded-lg outline-none focus:border-red-600 text-white font-mono"
                id="admin-passcode-input"
              />
              <span className="text-[10px] text-gray-500 block">Acceso restringido al equipo autorizado de BWP.</span>
            </div>

            {loginError && (
              <p className="text-[10px] text-red-400 flex items-center gap-1 bg-red-950/20 p-2 rounded border border-red-900/30">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{loginError}</span>
              </p>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold text-white bg-red-700 hover:bg-red-800 rounded-lg shadow-lg cursor-pointer transition-colors"
              id="admin-login-btn"
            >
              Ingresar al Panel
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f3f6fb] min-h-screen pb-10 text-left" id="admin-dashboard-container">
      <div className="max-w-[1500px] mx-auto">
        
        {/* Header Block */}
        <div className="bg-[#0f2747] text-white px-5 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold">CONEXIÓN DE SESIÓN ACTIVA</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight font-display text-white mt-1">
              Consola de Administración BWP
            </h1>
            <p className="text-slate-400 text-xs">
              Manejo dinámico de leads y contenidos del sitio web corporativo de BWP Software.
            </p>
            <p className="text-[10px] text-blue-200 mt-2">{profile?.displayName || profile?.username} · {profile?.role}</p>
          </div>

          <div className="flex gap-2">
            <a href="/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-slate-900 text-xs rounded font-bold"><ExternalLink className="w-3.5 h-3.5"/>Ver sitio</a>
            <button onClick={handleExportPortal} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-900 hover:bg-blue-800 text-white text-xs rounded font-bold"><Download className="w-3.5 h-3.5"/>Respaldar</button>
            <label className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-800 hover:bg-red-700 text-white text-xs rounded font-bold cursor-pointer"><Upload className="w-3.5 h-3.5"/>Restaurar<input type="file" accept="application/json" className="hidden" onChange={(e)=>handleImportPortal(e.target.files?.[0])}/></label>
            <button
              onClick={() => {
                if(window.confirm("¿Desea cerrar su sesión administrativa?")) {
                  void fetch("/api/admin/logout",{method:"POST"});
                  setIsAuthenticated(false);
                  setPassword("");
                }
              }}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded font-bold transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Outer Tabs row */}
        <div className="flex flex-wrap bg-white border-x border-b border-slate-200 mb-8 px-4 shadow-sm" id="admin-tabs">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-colors ${
              activeTab === "overview" ? "bg-slate-900 text-white shadow-sm" : "bg-white text-gray-600 hover:bg-slate-100"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Resumen</span>
          </button>

          <button
            onClick={() => setActiveTab("leads")}
            className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-colors relative ${
              activeTab === "leads" ? "bg-slate-900 text-white shadow-sm" : "bg-white text-gray-600 hover:bg-slate-100"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Prospectos / CRM</span>
            {leads.filter(l => l.status === "PENDING").length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-700 text-white font-mono font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center animate-bounce">
                {leads.filter(l => l.status === "PENDING").length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-colors ${
              activeTab === "services" ? "bg-slate-900 text-white shadow-sm" : "bg-white text-gray-600 hover:bg-slate-100"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Servicios & Soluciones</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-colors ${
              activeTab === "products" ? "bg-slate-900 text-white shadow-sm" : "bg-white text-gray-600 hover:bg-slate-100"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Productos Propios</span>
          </button>

          <button
            onClick={() => setActiveTab("cases")}
            className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-colors ${
              activeTab === "cases" ? "bg-slate-900 text-white shadow-sm" : "bg-white text-gray-600 hover:bg-slate-100"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Casos de Éxito</span>
          </button>

          <button
            onClick={() => setActiveTab("faqs")}
            className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-colors ${
              activeTab === "faqs" ? "bg-slate-900 text-white shadow-sm" : "bg-white text-gray-600 hover:bg-slate-100"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Preguntas FAQ</span>
          </button>

          <button
            onClick={() => setActiveTab("contact_info")}
            className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-colors ${
              activeTab === "contact_info" ? "bg-slate-900 text-white shadow-sm" : "bg-white text-gray-600 hover:bg-slate-100"
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>Datos de Contacto</span>
          </button>
          <button onClick={()=>setActiveTab("users")} className={`px-4 py-4 text-xs font-bold flex items-center gap-2 border-b-2 ${activeTab==="users"?"border-blue-700 text-blue-800 bg-blue-50":"border-transparent text-slate-600 hover:bg-slate-50"}`}><Users className="w-4 h-4"/>Usuarios</button>
        </div>

        <div className="px-4 sm:px-6 lg:px-8">

        {/* Tab contents */}

        {/* TAB 1: OVERVIEW STATS */}
        {activeTab === "overview" && (
          <div className="space-y-8" id="tab-overview">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              {/* Card 1: Leads */}
              <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm text-left">
                <span className="text-[10px] font-mono text-gray-400 block uppercase tracking-wider">Prospectos Recibidos (CRM)</span>
                <span className="text-3xl font-extrabold text-slate-900 font-display block mt-1">{leads.length}</span>
                <span className="text-[10px] text-emerald-600 font-medium block mt-1">
                  ✓ {leads.filter(l => l.status === "PENDING").length} pendientes de contacto
                </span>
              </div>

              {/* Card 2: Services */}
              <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm text-left">
                <span className="text-[10px] font-mono text-gray-400 block uppercase tracking-wider font-bold">Servicios Habilitados</span>
                <span className="text-3xl font-extrabold text-slate-900 font-display block mt-1">
                  {services.filter(s => s.active).length}
                </span>
                <span className="text-[10px] text-gray-500 block mt-1">De un total de {services.length} registrados</span>
              </div>

              {/* Card 3: Products */}
              <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm text-left">
                <span className="text-[10px] font-mono text-gray-400 block uppercase tracking-wider font-bold">Productos Licenciados</span>
                <span className="text-3xl font-extrabold text-slate-900 font-display block mt-1">
                  {products.filter(p => p.active).length}
                </span>
                <span className="text-[10px] text-gray-500 block mt-1">Flagship: BWP Retail POS</span>
              </div>

              {/* Card 4: FAQs */}
              <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm text-left">
                <span className="text-[10px] font-mono text-gray-400 block uppercase tracking-wider font-bold">Preguntas FAQs Activas</span>
                <span className="text-3xl font-extrabold text-slate-900 font-display block mt-1">
                  {faqs.filter(f => f.active).length}
                </span>
                <span className="text-[10px] text-gray-500 block mt-1">Garantiza auto-atención al usuario</span>
              </div>
            </div>

            {/* Simulated Live Feed / Logs */}
            <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm text-left">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Historial de Actividad de la Consola
              </h3>
              <div className="space-y-3 font-mono text-[10px] text-slate-600 bg-slate-50 p-4 rounded-lg border border-gray-100">
                <p>⚡ [INFO] Base de datos persistente inicializada con éxito.</p>
                <p>⚡ [INFO] {services.length} servicios de catálogo de software cargados con éxito.</p>
                <p>⚡ [INFO] {leads.length} solicitudes de cotización recuperadas del almacenamiento local.</p>
                {leads.length > 0 && (
                  <p>⚡ [CRM] Última cotización registrada por: {leads[0].fullName} ({leads[0].company})</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab==="users"&&<div className="grid lg:grid-cols-12 gap-6"><section className="lg:col-span-4 bg-white border border-slate-200 shadow-sm"><header className="p-5 border-b border-slate-200"><p className="text-[10px] font-bold text-blue-700">MICROSOFT-STYLE IDENTITY CENTER</p><h2 className="text-xl font-bold mt-1">Invitar usuario</h2><p className="text-xs text-slate-500 mt-2">El usuario verificará su correo y reemplazará la contraseña temporal.</p></header><form onSubmit={handleInvite} className="p-5 space-y-4"><label className="block text-xs font-bold">Nombre<input required value={invite.displayName} onChange={e=>setInvite({...invite,displayName:e.target.value})} className="mt-1 w-full border border-slate-300 p-2.5 font-normal"/></label><label className="block text-xs font-bold">Correo<input required type="email" value={invite.email} onChange={e=>setInvite({...invite,email:e.target.value})} className="mt-1 w-full border border-slate-300 p-2.5 font-normal"/></label><label className="block text-xs font-bold">Contraseña temporal<input required minLength={10} type="password" value={invite.temporaryPassword} onChange={e=>setInvite({...invite,temporaryPassword:e.target.value})} className="mt-1 w-full border border-slate-300 p-2.5 font-normal"/></label><label className="block text-xs font-bold">Rol<select value={invite.role} onChange={e=>setInvite({...invite,role:e.target.value})} className="mt-1 w-full border border-slate-300 p-2.5 font-normal"><option value="EDITOR">Editor</option><option value="ADMIN">Administrador</option></select></label>{inviteMessage&&<p className="text-xs text-blue-800">{inviteMessage}</p>}<button className="w-full bg-[#0f2747] text-white p-3 text-xs font-bold">Enviar invitación SMTP</button></form></section><section className="lg:col-span-8 bg-white border border-slate-200 shadow-sm"><header className="p-5 border-b border-slate-200 flex justify-between"><div><h2 className="text-xl font-bold">Directorio administrativo</h2><p className="text-xs text-slate-500 mt-1">Usuarios con acceso a /host99</p></div><span className="text-3xl font-bold text-blue-900">{adminUsers.length}</span></header><div className="overflow-x-auto"><table className="w-full text-xs"><thead className="bg-slate-50 text-left text-slate-500"><tr><th className="p-4">Usuario</th><th className="p-4">Rol</th><th className="p-4">Estado</th><th className="p-4">Último acceso</th></tr></thead><tbody>{adminUsers.map(user=><tr key={user.id} className="border-t border-slate-100"><td className="p-4"><strong className="block text-slate-900">{user.displayName}</strong><span className="text-slate-500">{user.email||user.username}</span></td><td className="p-4">{user.role}</td><td className="p-4"><span className={`px-2 py-1 font-bold ${user.status==="ACTIVE"?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}`}>{user.status}</span></td><td className="p-4 text-slate-500">{user.lastLoginAt?new Date(user.lastLoginAt).toLocaleString("es-HN"):"Sin ingreso"}</td></tr>)}</tbody></table></div></section></div>}

        {/* TAB 2: LEADS CRM */}
        {activeTab === "leads" && (
          <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6 text-left" id="tab-leads">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Buzón de Leads & Prospectos (CRM)</h2>
                <p className="text-xs text-gray-400">Administre el estado de las cotizaciones y requerimientos de clientes.</p>
              </div>

              {/* Filtering Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center space-x-1 text-xs">
                  <Filter className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-500">Filtrar:</span>
                </div>
                <select
                  value={leadFilterStatus}
                  onChange={(e) => setLeadFilterStatus(e.target.value)}
                  className="px-2 py-1 text-xs bg-slate-100 border border-gray-200 rounded outline-none"
                >
                  <option value="ALL">Todos los Estados</option>
                  <option value="PENDING">Pendientes</option>
                  <option value="CONTACTED">Contactados</option>
                  <option value="SUCCESS">Cerrados Exitosos</option>
                  <option value="ARCHIVED">Archivados</option>
                </select>

                <input
                  type="text"
                  placeholder="Buscar prospecto..."
                  value={leadSearchQuery}
                  onChange={(e) => setLeadSearchQuery(e.target.value)}
                  className="px-3 py-1 text-xs border border-gray-200 rounded outline-none w-44"
                />
              </div>
            </div>

            {/* List of Leads */}
            <div className="space-y-4">
              {filteredLeads.map((lead) => (
                <div 
                  key={lead.id}
                  className="border border-gray-150 rounded-xl p-5 hover:border-gray-250 transition-colors bg-white space-y-4"
                  id={`lead-crm-card-${lead.id}`}
                >
                  {/* Lead Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 text-sm font-display">{lead.fullName}</span>
                        <span className="text-xs text-gray-400">({lead.role || "Cargo no especificado"})</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-700 block mt-0.5">{lead.company} — {lead.cityCountry}</span>
                      <span className="text-[10px] text-gray-400 font-mono">Registrado: {new Date(lead.createdAt).toLocaleString()}</span>
                    </div>

                    {/* Status badge & selector */}
                    <div className="flex items-center space-x-2 shrink-0">
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as BWPQuotationRequest["status"])}
                        className={`px-2.5 py-1 text-[11px] font-bold rounded-full border outline-none ${
                          lead.status === "PENDING" ? "bg-amber-50 text-amber-800 border-amber-200" :
                          lead.status === "CONTACTED" ? "bg-blue-50 text-blue-800 border-blue-200" :
                          lead.status === "ARCHIVED" ? "bg-emerald-50 text-emerald-800 border-emerald-200" :
                          "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        <option value="PENDING">PENDIENTE</option>
                        <option value="CONTACTED">CONTACTADO</option>
                        <option value="ARCHIVED">ARCHIVADO / COMPLETADO</option>
                      </select>

                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-1 rounded text-gray-400 hover:text-red-700 hover:bg-slate-100"
                        title="Eliminar Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Core details grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs bg-slate-50 border border-gray-100 p-3.5 rounded-lg">
                    <div>
                      <strong className="block text-gray-400 text-[10px] uppercase">Contacto:</strong>
                      <span className="block font-medium">{lead.phone}</span>
                      <a href={`mailto:${lead.email}`} className="text-red-700 hover:underline">{lead.email}</a>
                    </div>
                    <div>
                      <strong className="block text-gray-400 text-[10px] uppercase">Estructura:</strong>
                      <span className="block">Tamaño: {lead.companySize}</span>
                      <span className="block">Sucursales: {lead.approxBranches || 1}</span>
                    </div>
                    <div>
                      <strong className="block text-gray-400 text-[10px] uppercase">Solución & Plataforma:</strong>
                      <span className="block font-semibold text-slate-900">{lead.solutionType || "General"}</span>
                      <span className="block font-mono uppercase text-[10px] text-gray-500">Módulos: {lead.platform}</span>
                    </div>
                    <div>
                      <strong className="block text-gray-400 text-[10px] uppercase">Integración SAP & Presupuesto:</strong>
                      <span className="block font-medium">
                        SAP: {lead.needsSapOne ? "✓ Sí, Requerido" : "No requiere"}
                      </span>
                      <span className="block">Est. Inicio: {lead.expectedDate}</span>
                    </div>
                  </div>

                  {/* Description Box */}
                  <div className="space-y-1">
                    <strong className="block text-gray-400 text-[10px] uppercase">Descripción del Proyecto:</strong>
                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/50 p-3 rounded border border-gray-100/50">
                      {lead.projectDescription}
                    </p>
                  </div>
                </div>
              ))}

              {filteredLeads.length === 0 && (
                <div className="text-center py-12 text-gray-400 text-xs flex flex-col items-center gap-2">
                  <ShieldAlert className="w-8 h-8 text-slate-300" />
                  <span>No hay prospectos entrantes en esta categoría</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES & SOLUTIONS */}
        {activeTab === "services" && (
          <div className="space-y-8 text-left" id="tab-services">
            
            {/* Services administration */}
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <div>
                  <h2 className="text-base font-bold text-slate-900 font-display">Administrar Servicios del Catálogo</h2>
                  <p className="text-xs text-gray-400">Defina qué servicios muestra el sitio web público.</p>
                </div>
                
                <button
                  onClick={() => {
                    setEditingServiceId("new");
                    setServiceForm({ title: "", description: "", iconName: "Briefcase", includes: [] });
                  }}
                  className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded shadow flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Agregar Servicio
                </button>
              </div>

              {/* Service Form container */}
              {editingServiceId && (
                <div className="bg-slate-50 border border-gray-200 p-5 rounded-xl space-y-4">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    {editingServiceId === "new" ? "Crear Nuevo Servicio" : "Editar Servicio existente"}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase block">Título del Servicio</label>
                      <input
                        type="text"
                        value={serviceForm.title || ""}
                        onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase block">Icono (Lucide)</label>
                      <select
                        value={serviceForm.iconName || "Briefcase"}
                        onChange={(e) => setServiceForm({ ...serviceForm, iconName: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded outline-none"
                      >
                        <option value="Briefcase">Maletín (Consultoría)</option>
                        <option value="Monitor">Monitor (Sistemas Web)</option>
                        <option value="Smartphone">Teléfono (Móviles)</option>
                        <option value="Cpu">CPU (Escritorio)</option>
                        <option value="DbIcon">Base de Datos</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block">Descripción Corta</label>
                    <textarea
                      rows={2}
                      value={serviceForm.description || ""}
                      onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded outline-none resize-none"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
                    <button
                      onClick={() => setEditingServiceId(null)}
                      className="px-3 py-1 bg-slate-200 text-slate-700 font-bold text-xs rounded"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleSaveService(editingServiceId)}
                      className="px-3 py-1 bg-red-700 text-white font-bold text-xs rounded shadow"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </div>
              )}

              {/* List of Services in table format */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-600 border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-gray-200">
                      <th className="py-2 px-3">Título</th>
                      <th className="py-2 px-3">Descripción</th>
                      <th className="py-2 px-3">Estado</th>
                      <th className="py-2 px-3 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((srv) => (
                      <tr key={srv.id} className="border-b border-gray-100 hover:bg-slate-50/50">
                        <td className="py-3 px-3 font-bold text-slate-900">{srv.title}</td>
                        <td className="py-3 px-3 max-w-xs truncate">{srv.description}</td>
                        <td className="py-3 px-3">
                          <button
                            onClick={() => handleToggleService(srv.id, !srv.active)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              srv.active ? "bg-emerald-50 text-emerald-800" : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            {srv.active ? "ACTIVO" : "INACTIVO"}
                          </button>
                        </td>
                        <td className="py-3 px-3 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingServiceId(srv.id);
                              setServiceForm(srv);
                            }}
                            className="p-1 text-slate-500 hover:text-slate-900"
                          >
                            <Edit className="w-4 h-4 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Solutions administration */}
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <div>
                  <h2 className="text-base font-bold text-slate-900 font-display">Administrar Módulos de Soluciones</h2>
                  <p className="text-xs text-gray-400">Configure los bloques técnicos operacionales.</p>
                </div>

                <button
                  onClick={() => {
                    setEditingSolutionId("new");
                    setSolutionForm({ title: "", description: "", isStrongAdditional: false });
                  }}
                  className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded shadow flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Agregar Solución
                </button>
              </div>

              {/* Solution Edit Container */}
              {editingSolutionId && (
                <div className="bg-slate-50 border border-gray-200 p-5 rounded-xl space-y-4">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    {editingSolutionId === "new" ? "Crear Nueva Solución" : "Editar Solución"}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase block">Título</label>
                      <input
                        type="text"
                        value={solutionForm.title || ""}
                        onChange={(e) => setSolutionForm({ ...solutionForm, title: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase block">Categoría de Solución</label>
                      <select
                        value={solutionForm.isStrongAdditional ? "advanced" : "core"}
                        onChange={(e) => setSolutionForm({ ...solutionForm, isStrongAdditional: e.target.value === "advanced" })}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded outline-none"
                      >
                        <option value="core">Operativa Básica (Firme)</option>
                        <option value="advanced">Avanzada / Compleja</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block">Descripción Técnica</label>
                    <textarea
                      rows={2}
                      value={solutionForm.description || ""}
                      onChange={(e) => setSolutionForm({ ...solutionForm, description: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded outline-none resize-none"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
                    <button
                      onClick={() => setEditingSolutionId(null)}
                      className="px-3 py-1 bg-slate-200 text-slate-700 font-bold text-xs rounded"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleSaveSolution(editingSolutionId)}
                      className="px-3 py-1 bg-red-700 text-white font-bold text-xs rounded shadow"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </div>
              )}

              {/* Table list */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-600 border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-gray-200">
                      <th className="py-2 px-3">Solución</th>
                      <th className="py-2 px-3">Tipo</th>
                      <th className="py-2 px-3">Estado</th>
                      <th className="py-2 px-3 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {solutions.map((sol) => (
                      <tr key={sol.id} className="border-b border-gray-100 hover:bg-slate-50/50">
                        <td className="py-3 px-3 font-bold text-slate-900">{sol.title}</td>
                        <td className="py-3 px-3 font-mono text-[10px]">
                          {sol.isStrongAdditional ? (
                            <span className="bg-red-50 text-red-800 border border-red-100 px-1.5 py-0.5 rounded">AVANZADO</span>
                          ) : (
                            <span className="bg-slate-100 text-slate-700 border border-slate-200 px-1.5 py-0.5 rounded">OP. CORE</span>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <button
                            onClick={() => handleToggleSolution(sol.id, !sol.active)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              sol.active ? "bg-emerald-50 text-emerald-800" : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            {sol.active ? "ACTIVO" : "INACTIVO"}
                          </button>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => {
                              setEditingSolutionId(sol.id);
                              setSolutionForm(sol);
                            }}
                            className="p-1 text-slate-500 hover:text-slate-900"
                          >
                            <Edit className="w-4 h-4 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: OWN PRODUCTS */}
        {activeTab === "products" && (
          <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6 text-left" id="tab-products">
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display">Administrar Productos Propios</h2>
              <p className="text-xs text-gray-400">Configure la descripción y las funciones de BWP Retail POS y futuras soluciones empaquetadas.</p>
            </div>

            {/* Editing Product form */}
            {editingProductId && (
              <div className="bg-slate-50 border border-gray-200 p-5 rounded-xl space-y-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Editar Datos de: {products.find(p => p.id === editingProductId)?.title}
                </h3>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block">Descripción General</label>
                    <textarea
                      rows={3}
                      value={productForm.description || ""}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded outline-none resize-none"
                    ></textarea>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block">Enlace Externo del Producto</label>
                    <input
                      type="text"
                      value={productForm.externalUrl || ""}
                      onChange={(e) => setProductForm({ ...productForm, externalUrl: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
                  <button
                    onClick={() => setEditingProductId(null)}
                    className="px-3 py-1 bg-slate-200 text-slate-700 font-bold text-xs rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleSaveProduct(editingProductId)}
                    className="px-3 py-1 bg-red-700 text-white font-bold text-xs rounded shadow"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            )}

            {/* List products */}
            <div className="space-y-4">
              {products.map((prod) => (
                <div key={prod.id} className="border border-gray-150 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-display">{prod.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{prod.description}</p>
                    <span className="text-[10px] font-mono text-slate-400 block mt-1">{prod.externalUrl}</span>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <button
                      onClick={() => handleToggleProduct(prod.id, !prod.active)}
                      className={`px-2.5 py-1 text-[10px] font-bold rounded ${
                        prod.active ? "bg-emerald-50 text-emerald-800" : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {prod.active ? "VISIBLE" : "OCULTO"}
                    </button>

                    <button
                      onClick={() => {
                        setEditingProductId(prod.id);
                        setProductForm(prod);
                      }}
                      className="p-1.5 bg-white border border-gray-200 hover:border-slate-400 rounded text-slate-600 transition-colors"
                      title="Editar Producto"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CLIENT CASES */}
        {activeTab === "cases" && (
          <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6 text-left" id="tab-cases">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Administrar Casos de Éxito de Clientes</h2>
                <p className="text-xs text-gray-400">Configure los testimonios autorizados y los stack de tecnologías.</p>
              </div>

              <button
                onClick={() => {
                  setEditingCaseId("new");
                  setCaseForm({ companyName: "", industry: "", caseType: "CLIENT", projectTitle: "", description: "", technologies: [], integrations: [], capabilities: [], result: "" });
                }}
                className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded shadow flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar Caso de Éxito
              </button>
            </div>

            {/* Case Form Container */}
            {editingCaseId && (
              <div className="bg-slate-50 border border-gray-200 p-5 rounded-xl space-y-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {editingCaseId === "new" ? "Nuevo Caso de Éxito" : "Editar Caso"}
                </h3>

                <div className="grid md:grid-cols-[140px_1fr] gap-5 items-center bg-white border border-slate-200 rounded-xl p-4">
                  <div className={`w-28 h-28 rounded-2xl ${caseForm.logoBgColor || "bg-slate-900"} text-white flex items-center justify-center overflow-hidden shadow-sm`}>
                    {caseForm.logoDataUrl ? <Image src={caseForm.logoDataUrl} alt="Vista previa del logotipo" width={112} height={112} unoptimized className="w-full h-full object-contain bg-white p-2" /> : <span className="text-3xl font-black">{caseForm.logoLetter || "B"}</span>}
                  </div>
                  <div className="space-y-3">
                    <div><label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Logotipo del cliente</label><input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={(e) => handleClientLogoUpload(e.target.files?.[0])} className="block w-full text-xs text-slate-600 file:mr-3 file:border-0 file:rounded file:bg-slate-900 file:text-white file:px-3 file:py-2 file:text-xs file:font-bold"/><p className="text-[10px] text-slate-400 mt-1">PNG, JPG, WEBP o SVG. Máximo 1 MB.</p></div>
                    <div className="flex flex-wrap gap-2"><input type="text" maxLength={3} value={caseForm.logoLetter || ""} onChange={(e)=>setCaseForm({...caseForm,logoLetter:e.target.value.toUpperCase()})} placeholder="Iniciales" className="w-24 px-3 py-2 text-xs border border-slate-200 rounded"/><select value={caseForm.logoBgColor || "bg-slate-900"} onChange={(e)=>setCaseForm({...caseForm,logoBgColor:e.target.value})} className="px-3 py-2 text-xs border border-slate-200 rounded"><option value="bg-slate-900">Slate BWP</option><option value="bg-blue-900">Azul BWP</option><option value="bg-red-900">Rojo BWP</option></select>{caseForm.logoDataUrl && <button type="button" onClick={()=>setCaseForm({...caseForm,logoDataUrl:undefined})} className="px-3 py-2 text-xs font-bold text-red-700 border border-red-200 rounded">Quitar imagen</button>}</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-[220px_1fr] gap-5 items-center bg-white border border-slate-200 rounded-xl p-4">
                  <div className="relative w-full aspect-video bg-slate-100 overflow-hidden">{caseForm.coverImage ? <Image src={caseForm.coverImage} alt="Vista previa del sistema" fill unoptimized className="object-cover object-top"/> : <span className="absolute inset-0 grid place-items-center text-[10px] text-slate-400">SIN CAPTURA</span>}</div>
                  <div><label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Captura o imagen principal del sistema</label><input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e)=>handleCaseCoverUpload(e.target.files?.[0])} className="block w-full text-xs text-slate-600 file:mr-3 file:border-0 file:rounded file:bg-blue-950 file:text-white file:px-3 file:py-2 file:text-xs file:font-bold"/><p className="text-[10px] text-slate-400 mt-1">Se publica en el catálogo de plataformas. Máximo 2 MB.</p></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1"><label className="text-[10px] font-bold text-gray-500 uppercase block">Tipo de publicación</label><select value={caseForm.caseType || "CLIENT"} onChange={(e)=>setCaseForm({...caseForm,caseType:e.target.value as BWPClientCase["caseType"]})} className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded"><option value="CLIENT">Implementación de cliente</option><option value="PRIVATE_PLATFORM">Plataforma privada / suscripción</option></select></div>
                  <div className="space-y-1"><label className="text-[10px] font-bold text-gray-500 uppercase block">Modalidad comercial</label><input value={caseForm.commercialModel || ""} onChange={(e)=>setCaseForm({...caseForm,commercialModel:e.target.value})} className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded" placeholder="Proyecto privado, SaaS o suscripción"/></div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block">Nombre de la Empresa</label>
                    <input
                      type="text"
                      value={caseForm.companyName || ""}
                      onChange={(e) => setCaseForm({ ...caseForm, companyName: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block">Rubro / Industria</label>
                    <input
                      type="text"
                      value={caseForm.industry || ""}
                      onChange={(e) => setCaseForm({ ...caseForm, industry: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block">Título del Proyecto</label>
                    <input
                      type="text"
                      value={caseForm.projectTitle || ""}
                      onChange={(e) => setCaseForm({ ...caseForm, projectTitle: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block">Resultado Operativo Clave</label>
                    <input
                      type="text"
                      value={caseForm.result || ""}
                      onChange={(e) => setCaseForm({ ...caseForm, result: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase block">Descripción Narrativa</label>
                  <textarea
                    rows={2}
                    value={caseForm.description || ""}
                    onChange={(e) => setCaseForm({ ...caseForm, description: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded outline-none resize-none"
                  ></textarea>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1"><label className="text-[10px] font-bold text-gray-500 uppercase block">Reto operativo</label><textarea rows={3} value={caseForm.challenge || ""} onChange={(e)=>setCaseForm({...caseForm,challenge:e.target.value})} className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded resize-none"/></div>
                  <div className="space-y-1"><label className="text-[10px] font-bold text-gray-500 uppercase block">Solución implementada</label><textarea rows={3} value={caseForm.solution || ""} onChange={(e)=>setCaseForm({...caseForm,solution:e.target.value})} className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded resize-none"/></div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1"><label className="text-[10px] font-bold text-gray-500 uppercase block">Tecnologías, separadas por comas</label><input type="text" value={(caseForm.technologies || []).join(", ")} onChange={(e)=>setCaseForm({...caseForm,technologies:e.target.value.split(",").map(x=>x.trim()).filter(Boolean)})} className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded outline-none" placeholder="Next.js, AWS, SQL Server"/></div>
                  <div className="space-y-1"><label className="text-[10px] font-bold text-gray-500 uppercase block">Integraciones, separadas por comas</label><input type="text" value={(caseForm.integrations || []).join(", ")} onChange={(e)=>setCaseForm({...caseForm,integrations:e.target.value.split(",").map(x=>x.trim()).filter(Boolean)})} className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded outline-none" placeholder="BAC, Storeganise, correo"/></div>
                  <div className="space-y-1 md:col-span-2"><label className="text-[10px] font-bold text-gray-500 uppercase block">Capacidades, separadas por comas</label><input type="text" value={(caseForm.capabilities || []).join(", ")} onChange={(e)=>setCaseForm({...caseForm,capabilities:e.target.value.split(",").map(x=>x.trim()).filter(Boolean)})} className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded outline-none" placeholder="Facturación, pagos, inventario, reportes"/></div>
                  <div className="space-y-1"><label className="text-[10px] font-bold text-gray-500 uppercase block">Autor del testimonio</label><input type="text" value={caseForm.testimonial?.author || ""} onChange={(e)=>setCaseForm({...caseForm,testimonial:{text:caseForm.testimonial?.text||"",author:e.target.value,role:caseForm.testimonial?.role||""}})} className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded outline-none"/></div>
                  <div className="space-y-1 md:col-span-2"><label className="text-[10px] font-bold text-gray-500 uppercase block">Testimonio autorizado</label><textarea rows={2} value={caseForm.testimonial?.text || ""} onChange={(e)=>setCaseForm({...caseForm,testimonial:{text:e.target.value,author:caseForm.testimonial?.author||"",role:caseForm.testimonial?.role||""}})} className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded outline-none resize-none"/></div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
                  <button
                    onClick={() => setEditingCaseId(null)}
                    className="px-3 py-1 bg-slate-200 text-slate-700 font-bold text-xs rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleSaveCase(editingCaseId)}
                    className="px-3 py-1 bg-red-700 text-white font-bold text-xs rounded shadow"
                  >
                    Guardar Caso
                  </button>
                </div>
              </div>
            )}

            {/* List cases table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-600 border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-gray-200">
                    <th className="py-2 px-3">Cliente</th>
                    <th className="py-2 px-3">Industria</th>
                    <th className="py-2 px-3">Proyecto</th>
                    <th className="py-2 px-3">Estado</th>
                    <th className="py-2 px-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {cases.map((c) => (
                    <tr key={c.id} className="border-b border-gray-100 hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-bold text-slate-900"><div className="flex items-center gap-3"><div className={`w-9 h-9 rounded-lg ${c.logoBgColor} text-white flex items-center justify-center overflow-hidden shrink-0`}>{c.logoDataUrl ? <Image src={c.logoDataUrl} alt="" width={36} height={36} unoptimized className="w-full h-full object-contain bg-white p-1"/> : c.logoLetter}</div><span>{c.companyName}</span></div></td>
                      <td className="py-3 px-3">{c.industry}</td>
                      <td className="py-3 px-3 font-semibold text-slate-700">{c.projectTitle}</td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handleToggleCase(c.id, !c.active)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            c.active ? "bg-emerald-50 text-emerald-800" : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {c.active ? "VISIBLE" : "OCULTO"}
                        </button>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => {
                            setEditingCaseId(c.id);
                            setCaseForm(c);
                          }}
                          className="p-1 text-slate-500 hover:text-slate-900"
                        >
                          <Edit className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: FAQS */}
        {activeTab === "faqs" && (
          <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6 text-left" id="tab-faqs">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Administración de Preguntas FAQ</h2>
                <p className="text-xs text-gray-400">Configure las respuestas rápidas que asisten al cliente.</p>
              </div>

              <button
                onClick={() => {
                  setEditingFaqId("new");
                  setFaqForm({ question: "", answer: "" });
                }}
                className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded shadow flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar FAQ
              </button>
            </div>

            {/* FAQ Edit Container */}
            {editingFaqId && (
              <div className="bg-slate-50 border border-gray-200 p-5 rounded-xl space-y-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {editingFaqId === "new" ? "Nueva Pregunta" : "Editar Pregunta FAQ"}
                </h3>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block">Pregunta</label>
                    <input
                      type="text"
                      value={faqForm.question || ""}
                      onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block">Respuesta Detallada</label>
                    <textarea
                      rows={3}
                      value={faqForm.answer || ""}
                      onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded outline-none resize-none"
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
                  <button
                    onClick={() => setEditingFaqId(null)}
                    className="px-3 py-1 bg-slate-200 text-slate-700 font-bold text-xs rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleSaveFaq(editingFaqId)}
                    className="px-3 py-1 bg-red-700 text-white font-bold text-xs rounded shadow"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            )}

            {/* List FAQs table */}
            <div className="space-y-3">
              {faqs.map((f) => (
                <div key={f.id} className="border border-gray-150 p-4 rounded-xl flex items-center justify-between gap-4 bg-slate-50/35">
                  <div className="max-w-2xl">
                    <span className="text-xs font-bold text-slate-900 block">{f.question}</span>
                    <p className="text-xs text-gray-500 mt-1 truncate max-w-xl">{f.answer}</p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditingFaqId(f.id);
                        setFaqForm(f);
                      }}
                      className="p-1 text-slate-500 hover:text-slate-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteFaq(f.id)}
                      className="p-1 text-slate-400 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: CONTACT DATA */}
        {activeTab === "contact_info" && (
          <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6 text-left" id="tab-contact-info">
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display">Configuración Institucional de Contacto</h2>
              <p className="text-xs text-gray-400">Edite los datos que aparecen globalmente en la cabecera, pie de página y perfil de nosotros.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase block">Nombre de la Empresa</label>
                <input
                  type="text"
                  value={contactInfo.companyName}
                  onChange={(e) => setContactInfo({ ...contactInfo, companyName: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-gray-200 focus:border-red-600 rounded-lg outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase block">Teléfono de Oficina</label>
                <input
                  type="text"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-gray-200 focus:border-red-600 rounded-lg outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase block">Correo Electrónico Oficial</label>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-gray-200 focus:border-red-600 rounded-lg outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase block">Ubicación Física</label>
                <input
                  type="text"
                  value={contactInfo.location}
                  onChange={(e) => setContactInfo({ ...contactInfo, location: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-gray-200 focus:border-red-600 rounded-lg outline-none"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase block">Misión de la Empresa</label>
                <textarea
                  rows={2}
                  value={contactInfo.mission}
                  onChange={(e) => setContactInfo({ ...contactInfo, mission: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-gray-200 focus:border-red-600 rounded-lg outline-none resize-none"
                ></textarea>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase block">Visión de la Empresa</label>
                <textarea
                  rows={2}
                  value={contactInfo.vision}
                  onChange={(e) => setContactInfo({ ...contactInfo, vision: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-gray-200 focus:border-red-600 rounded-lg outline-none resize-none"
                ></textarea>
              </div>
            </div>

            <div className="space-y-4 pt-5 border-t border-gray-100"><div><h3 className="text-xs font-bold text-slate-900">Fotografías de socios</h3><p className="text-[10px] text-slate-400 mt-1">Se guardan en PostgreSQL y se muestran en la página Socios.</p></div><div className="grid md:grid-cols-2 gap-4">{([['bryanImage','Ing. Bryan Cárcamo'],['carlosImage','Ing. Carlos Álvarez']] as const).map(([key,label])=><div key={key} className="border border-slate-200 rounded-xl p-4"><div className="relative aspect-[4/3] bg-slate-100 overflow-hidden mb-3">{leadership[key]?<Image src={leadership[key]!} alt={label} fill unoptimized className="object-cover"/>:<span className="absolute inset-0 grid place-items-center text-xs text-slate-400">Sin fotografía</span>}</div><label className="text-[10px] font-bold text-slate-600 uppercase">{label}</label><input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e)=>handleLeadershipImage(key,e.target.files?.[0])} className="block w-full text-[10px] mt-2"/></div>)}</div></div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={handleSaveContactInfo}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-red-700 hover:bg-red-800 rounded shadow transition-colors"
              >
                <Save className="w-4 h-4" />
                Guardar Datos Institucionales
              </button>
            </div>
          </div>
        )}

        </div>
      </div>
    </div>
  );
}
