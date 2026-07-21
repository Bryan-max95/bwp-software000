import type { Metadata } from "next";
import AdminPage from "../admin/page";

export const metadata: Metadata = {
  title: "Portal de Gestión | BWP Software",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function HostPortalPage() {
  return <AdminPage />;
}
