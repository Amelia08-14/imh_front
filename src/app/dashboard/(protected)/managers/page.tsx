"use client";

import { useEffect, useMemo, useState } from "react";
import { useAdminSession } from "@/components/dashboard-shell";
import {
  Manager,
  Salon,
  imhAdminCreateManager,
  imhAdminListManagers,
  imhAdminListSalons,
} from "@/lib/imh-api";

export default function DashboardManagersPage() {
  const { token, identity } = useAdminSession();
  const [salons, setSalons] = useState<Salon[]>([]);
  const [items, setItems] = useState<Manager[]>([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [salonId, setSalonId] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canAdd = useMemo(() => {
    const e = email.trim();
    const p = password.trim();
    return e.includes("@") && p.length >= 6 && salonId;
  }, [email, password, salonId]);

  useEffect(() => {
    if (!token) return;
    if (identity?.role !== "super_admin") return;
    let cancelled = false;
    async function run(t: string) {
      setLoading(true);
      setError(null);
      try {
        const [salonsRes, managersRes] = await Promise.all([
          imhAdminListSalons(t),
          imhAdminListManagers(t),
        ]);
        if (cancelled) return;
        setSalons(salonsRes.items);
        setItems(managersRes.items);
        setSalonId((current) => current || salonsRes.items[0]?.id || "");
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Impossible de charger les gérants.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run(token);
    return () => {
      cancelled = true;
    };
  }, [token, identity?.role]);

  if (identity?.role !== "super_admin") {
    return (
      <div className="text-sm text-white/70">
        Accès réservé au super admin.
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[10px] tracking-[0.32em] text-white/55">
            SUPER ADMIN
          </div>
          <div className="mt-2 font-serif text-3xl tracking-tight">Gérants</div>
        </div>

        <div className="grid w-full gap-3 sm:w-auto sm:grid-cols-[1fr_1fr_12rem_12rem_auto]">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="h-11 rounded-full border border-white/10 bg-black/20 px-5 text-sm text-white outline-none placeholder:text-white/55 focus:border-white/20 sm:w-64"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="h-11 rounded-full border border-white/10 bg-black/20 px-5 text-sm text-white outline-none placeholder:text-white/55 focus:border-white/20"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom (optionnel)"
            className="h-11 rounded-full border border-white/10 bg-black/20 px-5 text-sm text-white outline-none placeholder:text-white/55 focus:border-white/20"
          />
          <select
            value={salonId}
            onChange={(e) => setSalonId(e.target.value)}
            className="h-11 rounded-full border border-white/10 bg-black/20 px-5 text-sm text-white outline-none focus:border-white/20"
          >
            {salons.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            disabled={!token || !canAdd}
            onClick={async () => {
              if (!token) return;
              setError(null);
              try {
                const res = await imhAdminCreateManager(token, {
                  email: email.trim(),
                  password: password.trim(),
                  salonId,
                  name: name.trim() || undefined,
                });
                setItems((prev) => [res.item, ...prev]);
                setEmail("");
                setPassword("");
                setName("");
              } catch (e) {
                setError(e instanceof Error ? e.message : "Impossible de créer ce gérant.");
              }
            }}
            className="btn-luxe inline-flex h-11 items-center justify-center rounded-full px-6 text-[11px] font-medium tracking-[0.24em] transition-colors hover:opacity-95 disabled:opacity-50"
          >
            CRÉER
          </button>
        </div>
      </div>

      {error ? (
        <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-black/20 px-5 py-4 text-sm text-white/70">
          {error}
        </div>
      ) : null}

      <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/10">
        <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 bg-white/[0.03] px-5 py-3 text-[10px] tracking-[0.24em] text-white/40">
          <div>EMAIL</div>
          <div>NOM</div>
          <div>SALON</div>
          <div>STATUT</div>
        </div>

        {loading ? (
          <div className="px-5 py-6 text-sm text-white/60">Chargement…</div>
        ) : items.length ? (
          <div className="divide-y divide-white/10">
            {items.map((m) => (
              <div
                key={m.id}
                className="grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-4 px-5 py-4"
              >
                <div className="text-sm text-white/85">{m.email}</div>
                <div className="text-sm text-white/60">{m.name ?? "—"}</div>
                <div className="text-sm text-white/60">
                  {salons.find((s) => s.id === m.salonId)?.name ?? m.salonId}
                </div>
                <div className="text-[11px] tracking-[0.24em] text-white/45">
                  {m.active ? "ACTIF" : "INACTIF"}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-5 py-6 text-sm text-white/60">Aucun gérant.</div>
        )}
      </div>
    </div>
  );
}
