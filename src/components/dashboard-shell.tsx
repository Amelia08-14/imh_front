"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";

const TOKEN_KEY = "imh_admin_token";
const TOKEN_EVENT = "imh_admin_token_changed";
const SALON_KEY = "imh_admin_salon_id";
const SALON_EVENT = "imh_admin_salon_id_changed";

export function getStoredAdminToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setStoredAdminToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (!token) window.localStorage.removeItem(TOKEN_KEY);
  else window.localStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(new Event(TOKEN_EVENT));
}

function base64UrlDecode(input: string) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = normalized.length % 4 ? "=".repeat(4 - (normalized.length % 4)) : "";
  return atob(normalized + pad);
}

type AdminIdentity = {
  role: "super_admin" | "manager";
  salonId: string | null;
  salonCategory: "homme" | "femme" | "mrmrs" | null;
  salonName: string | null;
  salonLogoPath: string | null;
  label: string;
};

function getDashboardTheme(identity: AdminIdentity | null) {
  if (identity?.role === "manager") {
    if (identity.salonCategory === "femme") {
      return {
        accent: "var(--brand-femme)",
        accentRgb: "180, 145, 143",
        accent2Rgb: "255, 255, 255",
      };
    }
    if (identity.salonCategory === "mrmrs") {
      return {
        accent: "var(--brand-mrmrs)",
        accentRgb: "137, 118, 70",
        accent2Rgb: "255, 255, 255",
      };
    }
    if (identity.salonCategory === "homme") {
      return {
        accent: "rgba(255, 255, 255, 0.92)",
        accentRgb: "255, 255, 255",
        accent2Rgb: "113, 124, 125",
      };
    }
  }
  return {
    accent: "var(--brand-slate)",
    accentRgb: "113, 124, 125",
    accent2Rgb: "255, 255, 255",
  };
}

function getBrandLogoPath(identity: AdminIdentity | null) {
  if (!identity) return "/logos/La%20Maison%20Beauty%20%26%20Health.png";
  if (identity.role === "manager") {
    if (typeof identity.salonLogoPath === "string" && identity.salonLogoPath.trim()) {
      return identity.salonLogoPath;
    }
    if (identity.salonCategory === "homme") return "/logos/LA%20MAISON%20DE%20L'HOMME.png";
    if (identity.salonCategory === "femme") return "/logos/La%20Maison%20de%20la%20femme%20.png";
    if (identity.salonCategory === "mrmrs") return "/logos/La%20Maison%20MR%20%26%20MRS.png";
  }
  return "/logos/La%20Maison%20Beauty%20%26%20Health.png";
}

function parseAdminIdentity(token: string | null): AdminIdentity | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const json = base64UrlDecode(parts[1]);
    const payload = JSON.parse(json) as Record<string, unknown>;
    const role = payload.role === "manager" ? "manager" : "super_admin";
    const salonId = typeof payload.salonId === "string" ? payload.salonId : null;
    const salonName = typeof payload.salonName === "string" ? payload.salonName : null;
    const salonCategoryRaw =
      typeof payload.salonCategory === "string" ? payload.salonCategory : null;
    const salonCategory =
      salonCategoryRaw === "homme" || salonCategoryRaw === "femme" || salonCategoryRaw === "mrmrs"
        ? salonCategoryRaw
        : null;
    const salonLogoPath =
      typeof payload.salonLogoPath === "string" ? payload.salonLogoPath : null;
    const label =
      role === "manager"
        ? typeof payload.email === "string"
          ? payload.email
          : "Gérant"
        : typeof payload.username === "string"
          ? payload.username
          : "Super admin";
    return { role, salonId, salonCategory, salonName, salonLogoPath, label };
  } catch {
    return null;
  }
}

export function getAdminIdentityFromToken(token: string | null) {
  return parseAdminIdentity(token);
}

export function useAdminToken() {
  const token = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      const handler = () => onStoreChange();
      window.addEventListener("storage", handler);
      window.addEventListener(TOKEN_EVENT, handler);
      return () => {
        window.removeEventListener("storage", handler);
        window.removeEventListener(TOKEN_EVENT, handler);
      };
    },
    () => getStoredAdminToken(),
    () => null,
  );

  const setToken = useCallback((next: string | null) => {
    setStoredAdminToken(next);
  }, []);

  return { token, setToken };
}

export function getStoredSalonId() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(SALON_KEY);
}

export function setStoredSalonId(id: string | null) {
  if (typeof window === "undefined") return;
  if (!id) window.localStorage.removeItem(SALON_KEY);
  else window.localStorage.setItem(SALON_KEY, id);
  window.dispatchEvent(new Event(SALON_EVENT));
}

export function useSelectedSalonId() {
  const salonId = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      const handler = () => onStoreChange();
      window.addEventListener("storage", handler);
      window.addEventListener(SALON_EVENT, handler);
      return () => {
        window.removeEventListener("storage", handler);
        window.removeEventListener(SALON_EVENT, handler);
      };
    },
    () => getStoredSalonId(),
    () => null,
  );

  const setSalonId = useCallback((next: string | null) => {
    setStoredSalonId(next);
  }, []);

  return { salonId, setSalonId };
}

export function useAdminSession() {
  const { token, setToken } = useAdminToken();
  const identity = useMemo(() => parseAdminIdentity(token), [token]);
  const { salonId: storedSalonId, setSalonId } = useSelectedSalonId();
  const effectiveSalonId =
    identity?.role === "manager" ? identity.salonId : storedSalonId;
  return { token, setToken, identity, salonId: effectiveSalonId, setSalonId };
}

function NavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={[
        "flex h-11 items-center rounded-full border px-5 text-[11px] tracking-[0.24em] transition-colors",
        active
          ? "border-white/20 bg-white/10 text-white"
          : "border-white/10 bg-white/[0.02] text-white/60 hover:bg-white/5 hover:text-white",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { token, setToken, identity, setSalonId } = useAdminSession();
  const theme = useMemo(() => getDashboardTheme(identity), [identity]);

  useEffect(() => {
    if (!token) router.replace("/dashboard/login");
  }, [router, token]);

  useEffect(() => {
    if (!token || !identity?.role) return;
    const role = identity.role;
    const isDashboard = pathname.startsWith("/dashboard");
    if (!isDashboard) return;
    const allowed =
      role === "super_admin"
        ? pathname === "/dashboard" || pathname.startsWith("/dashboard/salons") || pathname.startsWith("/dashboard/managers")
        : pathname === "/dashboard" || pathname.startsWith("/dashboard/barbers") || pathname.startsWith("/dashboard/services") || pathname.startsWith("/dashboard/appointments");
    if (!allowed) {
      router.replace(role === "super_admin" ? "/dashboard/salons" : "/dashboard/appointments");
    }
  }, [token, identity?.role, pathname, router]);

  if (!token) {
    return (
      <div className="min-h-[70vh] grid place-items-center text-sm text-white/60">
        Chargement…
      </div>
    );
  }

  return (
    <div
      className="min-h-full bg-[var(--brand-ink)] text-white"
      style={
        {
          "--page-accent": theme.accent,
          "--page-accent-rgb": theme.accentRgb,
          "--page-accent-2-rgb": theme.accent2Rgb,
          "--btn-fg": "#0b0b0b",
        } as CSSProperties
      }
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(900px circle at 18% 10%, rgba(255, 255, 255, 0.08), transparent 60%), radial-gradient(900px circle at 82% 22%, rgba(var(--page-accent-rgb), 0.22), transparent 62%), radial-gradient(1200px circle at 50% 110%, rgba(var(--page-accent-2-rgb), 0.12), transparent 62%)",
        }}
      />

      <main className="relative mx-auto w-full max-w-[72rem] px-6 pb-24 pt-16 sm:px-8 sm:pt-20">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] px-6 py-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <Image
                src={getBrandLogoPath(identity)}
                alt="IN Beauty & Health"
                width={200}
                height={200}
                sizes="(max-width: 640px) 180px, 220px"
                quality={100}
                className="h-12 w-auto"
                priority
              />
              <div>
                <div className="text-[10px] tracking-[0.32em] text-white/55">
                  {identity?.role === "manager" ? "SALON" : "BEAUTY & HEALTH"}
                </div>
                <div className="mt-2 font-serif text-4xl tracking-tight">
                  Administration
                </div>
                <div className="mt-2 text-[11px] tracking-[0.22em] text-white/45">
                  {identity?.role === "manager"
                    ? identity.salonName || identity.label
                    : identity?.label || "Super admin"}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setToken(null);
                setSalonId(null);
                router.replace("/dashboard/login");
              }}
              className="btn-frame inline-flex h-11 items-center rounded-full px-6 text-[11px] tracking-[0.24em] text-white transition-colors hover:bg-white/5"
            >
              DÉCONNEXION
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
          {identity?.role === "super_admin" ? (
            <>
              <NavLink href="/dashboard/salons" label="SALONS" />
              <NavLink href="/dashboard/managers" label="GÉRANTS" />
            </>
          ) : (
            <>
              <NavLink href="/dashboard/barbers" label="COIFFEURS" />
              <NavLink href="/dashboard/services" label="PRESTATIONS" />
              <NavLink href="/dashboard/appointments" label="RENDEZ-VOUS" />
            </>
          )}
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
