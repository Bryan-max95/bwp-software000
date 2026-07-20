"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Check, 
  UploadCloud, 
  X, 
  ArrowRight, 
  Calendar, 
  MessageSquare, 
  UserCheck, 
  FileText, 
  Layers, 
  ShieldCheck, 
  Briefcase 
} from "lucide-react";
import { 
  addQuotationRequest, 
  getStoredDataAsync, 
  INITIAL_CONTACT_INFO 
} from "../../lib/data";

function ContactoContent() {
  const searchParams = useSearchParams();
  const [contactInfo, setContactInfo] = useState(INITIAL_CONTACT_INFO);

  // Form State
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cityCountry, setCityCountry] = useState("");
  const [companySize, setCompanySize] = useState("1-10 empleados");
  const [industry, setIndustry] = useState("");
  const [solutionType, setSolutionType] = useState("");
  const [platform, setPlatform] = useState("web");
  const [approxUsers, setApproxUsers] = useState("1-5");
  const [approxBranches, setApproxBranches] = useState("1");
  const [currentSystems, setCurrentSystems] = useState("");
  const [needsSapOne, setNeedsSapOne] = useState(false);
  const [projectDescription, setProjectDescription] = useState("");
  const [expectedDate, setExpectedDate] = useState("");
  const [budget, setBudget] = useState("");
  const [authorized, setAuthorized] = useState(false);

  // Drag-and-drop simulated file upload state
  const [dragActive, setDragActive] = useState(false);
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>(null);

  // Success dialog state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const handle = setTimeout(async () => {
      const info = await getStoredDataAsync("contact_info", INITIAL_CONTACT_INFO);
      setContactInfo(info);

      // Read query parameters to prefill form
      const serviceParam = searchParams.get("service");
      const solutionParam = searchParams.get("solution");
      const productParam = searchParams.get("product");
      const industryParam = searchParams.get("industry");

      if (serviceParam) {
        setSolutionType(`Cotización de Servicio: ${serviceParam}`);
        setProjectDescription(`Me interesa contratar el servicio de: ${serviceParam}.`);
      } else if (solutionParam) {
        setSolutionType(`Solución: ${solutionParam}`);
        setProjectDescription(`Me interesa implementar la solución de: ${solutionParam}.`);
      } else if (productParam) {
        setSolutionType(`Producto: ${productParam}`);
        setProjectDescription(`Deseo recibir una cotización / demostración para el producto: ${productParam}.`);
      } else if (industryParam) {
        setIndustry(industryParam);
        setProjectDescription(`Requerimos una solución adaptada al sector: ${industryParam}.`);
      }
    }, 0);
    return () => clearTimeout(handle);
  }, [searchParams]);

  // Handle drag over
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      setAttachedFile({
        name: file.name,
        size: `${sizeInMB} MB`
      });
    }
  };

  // Handle manual input click upload
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      setAttachedFile({
        name: file.name,
        size: `${sizeInMB} MB`
      });
    }
  };

  const removeAttachedFile = () => {
    setAttachedFile(null);
  };

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!fullName.trim()) tempErrors.fullName = "El nombre completo es obligatorio.";
    if (!company.trim()) tempErrors.company = "La empresa es obligatoria.";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) tempErrors.email = "Ingrese un correo electrónico válido.";
    if (!phone.trim()) tempErrors.phone = "El número telefónico es obligatorio.";
    if (!cityCountry.trim()) tempErrors.cityCountry = "La ciudad y país son obligatorios.";
    if (!projectDescription.trim()) tempErrors.projectDescription = "Describa brevemente los requerimientos de su proyecto.";
    if (!expectedDate) tempErrors.expectedDate = "La fecha estimada de implementación es obligatoria.";
    if (!authorized) tempErrors.authorized = "Debe autorizar el contacto comercial.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Save lead persistently
    addQuotationRequest({
      fullName,
      company,
      role,
      email,
      phone,
      cityCountry,
      companySize,
      industry,
      solutionType,
      platform,
      approxUsers,
      approxBranches,
      currentSystems,
      needsSapOne,
      projectDescription,
      expectedDate,
      budget: budget || undefined,
    });

    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setFullName("");
    setCompany("");
    setRole("");
    setEmail("");
    setPhone("");
    setCityCountry("");
    setCompanySize("1-10 empleados");
    setIndustry("");
    setSolutionType("");
    setPlatform("web");
    setApproxUsers("1-5");
    setApproxBranches("1");
    setCurrentSystems("");
    setNeedsSapOne(false);
    setProjectDescription("");
    setExpectedDate("");
    setBudget("");
    setAuthorized(false);
    setAttachedFile(null);
    setIsSubmitted(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12" id="contacto-page-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-left max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-red-50 text-red-800 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider">
            <span>Análisis Técnico de Proyectos</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Solicite un análisis de software para su empresa
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Cuéntenos qué proceso necesita mejorar. Nuestro equipo de ingenieros analizará su necesidad y le propondrá una solución 
            digital adaptada a su empresa, presupuestos y sucursales.
          </p>
        </div>

        {/* Success dialog block */}
        {isSubmitted ? (
          <div className="bg-white border border-gray-150 rounded-2xl p-8 lg:p-12 text-center max-w-2xl mx-auto shadow-sm space-y-6" id="success-lead-dialog">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow border border-emerald-100">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 font-display">¡Solicitud recibida con éxito!</h2>
              <p className="text-xs text-gray-500 leading-relaxed">
                Agradecemos su interés en <strong>BWP Software</strong>. El equipo de <strong>Soporte IT</strong> 
                y nuestro equipo de analistas de sistemas evaluarán los requerimientos del proyecto de su empresa <strong>({company})</strong>.
              </p>
              <p className="text-xs text-slate-600 font-medium">
                Nos comunicaremos con usted por teléfono ({phone}) o correo ({email}) en un lapso no mayor a 24 horas laborables.
              </p>
            </div>

            <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-center gap-3">
              <a 
                href={`https://wa.me/50488285822?text=Hola%20Ing.%20Bryan,%20acabo%20de%20enviar%20el%20formulario%20de%20cotizaci%C3%B3n%20para%20la%20empresa%20${encodeURIComponent(company)}.%20Me%20gustar%C3%ADa%20acelerar%20el%20contacto.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded shadow-md transition-colors"
              >
                Acelerar por WhatsApp
              </a>
              <button 
                onClick={handleResetForm}
                className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
              >
                Enviar otra solicitud
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Form (8 cols) */}
            <form onSubmit={handleSubmit} className="lg:col-span-8 bg-white border border-gray-150 rounded-2xl p-6 lg:p-10 shadow-sm space-y-6 text-left" id="quotation-form">
              <h2 className="text-lg font-bold text-slate-900 font-display border-b border-gray-100 pb-3">
                Formulario de Requerimientos Iniciales
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Nombre Completo */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-200 focus:border-red-600 rounded-lg outline-none"
                    id="form-full-name"
                  />
                  {errors.fullName && <p className="text-[10px] text-red-600">{errors.fullName}</p>}
                </div>

                {/* Empresa */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Empresa *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Distribuidora del Norte"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-200 focus:border-red-600 rounded-lg outline-none"
                    id="form-company"
                  />
                  {errors.company && <p className="text-[10px] text-red-600">{errors.company}</p>}
                </div>

                {/* Cargo */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Cargo</label>
                  <input
                    type="text"
                    placeholder="Ej. Gerente de Operaciones / Propietario"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-200 focus:border-red-600 rounded-lg outline-none"
                    id="form-role"
                  />
                </div>

                {/* Correo */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    placeholder="ejemplo@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-200 focus:border-red-600 rounded-lg outline-none"
                    id="form-email"
                  />
                  {errors.email && <p className="text-[10px] text-red-600">{errors.email}</p>}
                </div>

                {/* Teléfono */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Teléfono / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. (+504) 9999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-200 focus:border-red-600 rounded-lg outline-none"
                    id="form-phone"
                  />
                  {errors.phone && <p className="text-[10px] text-red-600">{errors.phone}</p>}
                </div>

                {/* Ciudad y País */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Ciudad y País *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Roatán, Honduras"
                    value={cityCountry}
                    onChange={(e) => setCityCountry(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-200 focus:border-red-600 rounded-lg outline-none"
                    id="form-location"
                  />
                  {errors.cityCountry && <p className="text-[10px] text-red-600">{errors.cityCountry}</p>}
                </div>

                {/* Tamaño de la empresa */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Tamaño de la Empresa</label>
                  <select
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-200 focus:border-red-600 rounded-lg outline-none bg-white"
                    id="form-company-size"
                  >
                    <option>1-10 empleados</option>
                    <option>11-50 empleados</option>
                    <option>51-200 empleados</option>
                    <option>Más de 200 empleados</option>
                  </select>
                </div>

                {/* Industria */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Sector / Industria</label>
                  <input
                    type="text"
                    placeholder="Ej. Supermercado, Hotel, Logística"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-200 focus:border-red-600 rounded-lg outline-none"
                    id="form-industry"
                  />
                </div>

                {/* Tipo de Solución */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Solución Requerida</label>
                  <input
                    type="text"
                    placeholder="Ej. Punto de Venta, Contabilidad, ERP modular"
                    value={solutionType}
                    onChange={(e) => setSolutionType(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-200 focus:border-red-600 rounded-lg outline-none"
                    id="form-solution-type"
                  />
                </div>

                {/* Plataforma */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Plataforma Objetivo</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-200 focus:border-red-600 rounded-lg outline-none bg-white"
                    id="form-platform"
                  >
                    <option value="web">Web (Acceso Navegador)</option>
                    <option value="escritorio">Escritorio Windows (Local/Red)</option>
                    <option value="movil">Móvil (Android / Campo)</option>
                    <option value="integracion">Integración / Sincronizador API</option>
                    <option value="hibrido">Híbrido (Multi-entorno)</option>
                  </select>
                </div>

                {/* Usuarios aproximados */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Usuarios del Sistema</label>
                  <select
                    value={approxUsers}
                    onChange={(e) => setApproxUsers(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-200 focus:border-red-600 rounded-lg outline-none bg-white"
                    id="form-users"
                  >
                    <option>1-5 usuarios</option>
                    <option>6-20 usuarios</option>
                    <option>21-100 usuarios</option>
                    <option>Más de 100 usuarios</option>
                  </select>
                </div>

                {/* Sucursales aproximadas */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Sucursales Físicas</label>
                  <input
                    type="number"
                    min="1"
                    value={approxBranches}
                    onChange={(e) => setApproxBranches(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-200 focus:border-red-600 rounded-lg outline-none"
                    id="form-branches"
                  />
                </div>
              </div>

              {/* Sistemas actuales */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Sistemas en uso actualmente</label>
                <input
                  type="text"
                  placeholder="Ej. Excel, QuickBooks, Sistema heredado propio, Ninguno"
                  value={currentSystems}
                  onChange={(e) => setCurrentSystems(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-200 focus:border-red-600 rounded-lg outline-none"
                  id="form-current-systems"
                />
              </div>

              {/* SAP Checkbox */}
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start space-x-3 text-left">
                <input
                  type="checkbox"
                  checked={needsSapOne}
                  onChange={(e) => setNeedsSapOne(e.target.checked)}
                  className="mt-1 w-4.5 h-4.5 text-blue-900 border-gray-300 rounded focus:ring-blue-800"
                  id="form-sap-one"
                />
                <div>
                  <label htmlFor="form-sap-one" className="text-xs font-bold text-blue-950 cursor-pointer block">
                    ¿Requiere integración con SAP Business One?
                  </label>
                  <span className="text-[10px] text-blue-800 block leading-tight mt-0.5">
                    Marque esta casilla si su empresa ya opera con SAP B1 y requiere sincronizar este nuevo módulo.
                  </span>
                </div>
              </div>

              {/* Descripción del proyecto */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Descripción de Requerimientos *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Cuéntenos qué cuellos de botella enfrenta, qué operaciones desea sistematizar o qué tipo de reportes espera obtener."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-200 focus:border-red-600 rounded-lg outline-none resize-none"
                  id="form-description"
                ></textarea>
                {errors.projectDescription && <p className="text-[10px] text-red-600">{errors.projectDescription}</p>}
              </div>

              {/* Implementation Date & Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Fecha Estimada de Inicio *</label>
                  <input
                    type="date"
                    required
                    value={expectedDate}
                    onChange={(e) => setExpectedDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-200 focus:border-red-600 rounded-lg outline-none"
                    id="form-expected-date"
                  />
                  {errors.expectedDate && <p className="text-[10px] text-red-600">{errors.expectedDate}</p>}
                </div>

              </div>

              {/* USABILITY PATTERN: File Upload supporting both Drag-and-Drop and click select */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Documentación del Proyecto o Logo (Opcional)
                </label>
                
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                    dragActive
                      ? "border-red-700 bg-red-50/20"
                      : "border-gray-200 hover:border-red-500 hover:bg-slate-50/50"
                  }`}
                  onClick={() => document.getElementById("file-picker")?.click()}
                  id="drag-and-drop-container"
                >
                  <input
                    type="file"
                    id="file-picker"
                    className="hidden"
                    onChange={handleFileInput}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg"
                  />

                  {attachedFile ? (
                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg max-w-md mx-auto" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center space-x-2 text-xs text-left text-slate-700">
                        <FileText className="w-5 h-5 text-red-700 shrink-0" />
                        <div className="truncate">
                          <p className="font-semibold truncate max-w-[200px]">{attachedFile.name}</p>
                          <p className="text-[10px] text-gray-400 font-mono">{attachedFile.size}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeAttachedFile}
                        className="p-1 rounded-full text-gray-400 hover:text-red-700 hover:bg-gray-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2 text-xs text-slate-500">
                      <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
                      <p>
                        <span className="text-red-700 font-bold hover:underline">Haga clic para seleccionar</span> o arrastre y suelte su archivo aquí
                      </p>
                      <p className="text-[10px] text-gray-400">PDF, Word, Excel, JPG o PNG (Max 10MB)</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Authorized checkbox */}
              <div className="flex items-start space-x-3 text-left pt-2">
                <input
                  type="checkbox"
                  required
                  checked={authorized}
                  onChange={(e) => setAuthorized(e.target.checked)}
                  className="mt-1 w-4.5 h-4.5 text-red-700 border-gray-300 rounded focus:ring-red-600"
                  id="form-auth"
                />
                <label htmlFor="form-auth" className="text-xs text-gray-600 cursor-pointer leading-relaxed">
                  Autorizo a <strong>BWP Software</strong> a contactarme comercialmente por teléfono o correo para coordinar la cotización técnica del proyecto. *
                </label>
              </div>
              {errors.authorized && <p className="text-[10px] text-red-600">{errors.authorized}</p>}

              {/* Submit Action */}
              <div className="pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3.5 text-base font-bold text-white bg-red-700 hover:bg-red-800 rounded-lg shadow-md hover:shadow-red-700/10 transition-all cursor-pointer"
                  id="btn-submit-project"
                >
                  Solicitar análisis del proyecto
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Right Column: Contact info sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6 text-left" id="contact-info-sidebar">
              
              {/* Card: Official Contact info */}
              <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 font-display uppercase tracking-wider border-b border-gray-100 pb-2">
                  Información Oficial de Contacto
                </h3>
                
                <div className="space-y-4 text-xs text-slate-600">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-red-700 shrink-0 mr-3 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900">Ubicación Sede:</strong>
                      <span>{contactInfo.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-red-700 shrink-0 mr-3 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900">WhatsApp / Teléfono:</strong>
                      <a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-red-700 transition-colors">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-red-700 shrink-0 mr-3 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900">Correo Principal:</strong>
                      <a href={`mailto:${contactInfo.email}`} className="hover:text-red-700 transition-colors">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 text-xs">
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    SOPORTE IT
                  </span>
                  <span className="font-bold text-slate-900 block">Soporte IT</span>
                  <span className="text-gray-500 block text-[10px] leading-tight">Soporte técnico y atención empresarial</span>
                </div>
              </div>

              {/* Direct Instant Action items */}
              <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold font-display uppercase tracking-wider text-red-400">
                  Contacto Instantáneo
                </h3>
                
                <div className="space-y-3">
                  {/* WhatsApp chat */}
                  <a
                    href="https://wa.me/50488285822?text=Hola%20BWP%20Software,%20me%20gustaría%20solicitar%20un%20análisis%20del%20sistema%20para%20mi%20negocio."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-lg shadow transition-colors"
                  >
                    <MessageSquare className="w-4.5 h-4.5 fill-white/10" />
                    Escribir por WhatsApp
                  </a>

                  {/* Scheduled meeting */}
                  <a
                    href={`mailto:${contactInfo.email}?subject=Solicitud%20de%20Reuni%C3%B3n%20T%C3%A9cnica%20-%20BWP%20Software&body=Hola%20Ing.%20Bryan,%20me%20gustar%C3%ADa%20agendar%20una%20reuni%C3%B3n%20para%20conversar%20sobre%20un%20proyecto%20de%20software.`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg shadow transition-colors border border-slate-750"
                  >
                    <Calendar className="w-4.5 h-4.5 text-red-500" />
                    Programar una reunión
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default function ContactoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="text-sm text-gray-500 font-mono">Cargando formulario...</span>
      </div>
    }>
      <ContactoContent />
    </Suspense>
  );
}
