import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bwpsoftware.com";
  
  const publicPages = [
    "",
    "/servicios",
    "/soluciones",
    "/integraciones",
    "/tecnologias",
    "/arquitectura",
    "/devops-cloud",
    "/data-engineering-bi",
    "/modernizacion-legacy",
    "/centro-integraciones",
    "/plataformas-saas",
    "/alto-rendimiento",
    "/consultoria-transformacion",
    "/productos",
    "/industrias",
    "/casos-de-exito",
    "/metodologia",
    "/seguridad",
    "/soporte",
    "/nosotros",
    "/socios",
    "/contacto",
    "/faq",
    "/privacidad",
    "/terminos",
  ];

  return publicPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));
}
