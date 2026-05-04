"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { getAdminIdentityFromToken, setStoredAdminToken } from "@/components/dashboard-shell";
import { imhAdminLogin } from "@/lib/imh-api";
import type { CSSProperties } from "react";

export default function DashboardLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div
      className="min-h-full bg-[var(--brand-ink)] text-white"
      style={
        {
          "--page-accent": "var(--brand-slate)",
          "--page-accent-rgb": "113, 124, 125",
          "--page-accent-2-rgb": "255, 255, 255",
          "--btn-fg": "#0b0b0b",
        } as CSSProperties
      }
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(760px circle at 18% 12%, rgba(var(--page-accent-rgb), 0.22), transparent 58%), radial-gradient(980px circle at 82% 28%, rgba(var(--page-accent-2-rgb), 0.1), transparent 62%), radial-gradient(1100px circle at 50% 100%, rgba(113, 124, 125, 0.12), transparent 60%)",
        }}
      />

      <main className="relative mx-auto w-full max-w-[40rem] px-6 pb-24 pt-32 sm:px-8 sm:pt-36">
        <div className="rounded-[2.25rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logos/La%20Maison%20Beauty%20%26%20Health.png"
                alt="IN Beauty & Health"
                width={160}
                height={160}
                sizes="(max-width: 640px) 180px, 220px"
                quality={100}
                className="h-11 w-auto"
                priority
              />
              <div className="text-[10px] tracking-[0.32em] text-white/55">
                BEAUTY & HEALTH
              </div>
            </div>
            <div className="text-[10px] tracking-[0.32em] text-white/50">DASHBOARD</div>
          </div>
          <div className="mt-3 font-serif text-4xl tracking-tight">
            Connexion
          </div>

          {error ? (
            <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-black/20 px-5 py-4 text-sm text-white/70">
              {error}
            </div>
          ) : null}

          <div className="mt-8 space-y-4">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email ou utilisateur"
              className="h-14 w-full rounded-[1.2rem] border border-white/10 bg-black/20 px-5 text-sm text-white outline-none placeholder:text-white/55 focus:border-white/20"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="h-14 w-full rounded-[1.2rem] border border-white/10 bg-black/20 px-5 text-sm text-white outline-none placeholder:text-white/55 focus:border-white/20"
            />
          </div>

          <button
            type="button"
            disabled={submitting}
            onClick={async () => {
              setError(null);
              if (!username.trim() || !password.trim()) {
                setError("Identifiants requis.");
                return;
              }
              setSubmitting(true);
              try {
                const res = await imhAdminLogin({
                  username: username.trim(),
                  password: password.trim(),
                });
                setStoredAdminToken(res.token);
                const identity = getAdminIdentityFromToken(res.token);
                router.replace(identity?.role === "super_admin" ? "/dashboard/salons" : "/dashboard/appointments");
              } catch {
                setError("Identifiants invalides.");
              } finally {
                setSubmitting(false);
              }
            }}
            className="btn-luxe mt-8 inline-flex h-14 w-full items-center justify-center rounded-[1.25rem] px-6 text-[11px] font-medium tracking-[0.24em] transition-colors hover:opacity-95 disabled:opacity-50"
          >
            {submitting ? "CONNEXION..." : "SE CONNECTER"}
          </button>
        </div>
      </main>
    </div>
  );
}
