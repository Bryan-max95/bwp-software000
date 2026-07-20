import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css"; // Global styles
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import RouteAtmosphere from "../components/RouteAtmosphere";
import SiteMotionOrchestrator from "../components/SiteMotionOrchestrator";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BWP Software | Software Empresarial a la Medida e Integraciones",
  description: "Diseñamos, desarrollamos e integramos soluciones de software para pequeñas, medianas y grandes empresas. Plataformas web, aplicaciones de escritorio y móviles conectadas con SAP Business One y bases de datos robustas.",
  keywords: "BWP Software, software empresarial, SAP Business One, ERP a la medida, POS, Roatán, Honduras, desarrollo web, aplicaciones móviles",
  authors: [{ name: "BWP Software" }],
  openGraph: {
    title: "BWP Software | Desarrollo de Software Empresarial e Integraciones",
    description: "Soluciones de software personalizadas en Honduras. Conectores SAP, puntos de venta robustos y bases de datos seguras.",
    url: "https://bwpsoftware.com",
    siteName: "BWP Software",
    locale: "es_HN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BWP Software | Software a la Medida",
    description: "Diseñamos e integramos soluciones digitales corporativas y móviles en Honduras.",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${manrope.variable} ${sora.variable} scroll-smooth`}>
      <body className="bg-slate-50 text-slate-800 font-sans antialiased flex flex-col min-h-screen" suppressHydrationWarning>
        <Header />
        <RouteAtmosphere />
        <SiteMotionOrchestrator />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
