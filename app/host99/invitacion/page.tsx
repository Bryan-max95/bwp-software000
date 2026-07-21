"use client";

import {
  FormEvent,
  Suspense,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  KeyRound,
  LoaderCircle,
  Mail,
  ShieldCheck,
} from "lucide-react";

function InvitationContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [form, setForm] = useState({
    email: "",
    temporaryPassword: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/accept-invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          token,
        }),
      });

      const body = await response.json();

      if (response.ok) {
        setMessage("Cuenta activada. Ya puede ingresar al panel.");
        setDone(true);
      } else {
        setMessage(body.error ?? "No fue posible activar la cuenta.");
        setDone(false);
      }
    } catch {
      setMessage(
        "No fue posible conectar con el servidor. Inténtelo nuevamente.",
      );
      setDone(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f3f6fb] p-5">
      <section className="w-full max-w-lg border border-slate-200 bg-white shadow-xl">
        <header className="flex gap-4 bg-[#0f2747] p-7 text-white">
          <ShieldCheck className="h-9 w-9 text-blue-300" />

          <div>
            <p className="text-xs text-blue-300">
              BWP ADMIN CENTER
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Activar acceso administrativo
            </h1>
          </div>
        </header>

        <form onSubmit={submit} className="space-y-5 p-7">
          <p className="text-sm text-slate-600">
            Confirme su correo, escriba la contraseña temporal entregada por
            el administrador y defina una contraseña personal.
          </p>

          <label className="block text-xs font-bold text-slate-700">
            Correo

            <input
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="mt-2 w-full border border-slate-300 p-3 font-normal"
            />
          </label>

          <label className="block text-xs font-bold text-slate-700">
            Contraseña temporal

            <input
              type="password"
              required
              autoComplete="current-password"
              value={form.temporaryPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  temporaryPassword: e.target.value,
                })
              }
              className="mt-2 w-full border border-slate-300 p-3 font-normal"
            />
          </label>

          <label className="block text-xs font-bold text-slate-700">
            Nueva contraseña

            <input
              type="password"
              required
              minLength={12}
              autoComplete="new-password"
              value={form.newPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  newPassword: e.target.value,
                })
              }
              className="mt-2 w-full border border-slate-300 p-3 font-normal"
            />
          </label>

          {message && (
            <p
              className={`text-sm ${
                done ? "text-emerald-700" : "text-red-700"
              }`}
            >
              {message}
            </p>
          )}

          {done ? (
            <Link
              href="/host99"
              className="flex justify-center gap-2 bg-[#0f2747] p-3 font-bold text-white"
            >
              <Mail className="h-4 w-4" />
              Ir al panel
            </Link>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center gap-2 bg-[#0f2747] p-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Activando cuenta...
                </>
              ) : (
                <>
                  <KeyRound className="h-4 w-4" />
                  Activar cuenta
                </>
              )}
            </button>
          )}
        </form>
      </section>
    </main>
  );
}

function InvitationLoading() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f3f6fb]">
      <div className="flex items-center gap-3 text-[#0f2747]">
        <LoaderCircle className="h-6 w-6 animate-spin" />
        <p className="font-semibold">
          Cargando invitación...
        </p>
      </div>
    </main>
  );
}

export default function InvitationPage() {
  return (
    <Suspense fallback={<InvitationLoading />}>
      <InvitationContent />
    </Suspense>
  );
}
