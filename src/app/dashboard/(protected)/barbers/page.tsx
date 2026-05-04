"use client";

import { useEffect, useState } from "react";
import { useAdminSession } from "@/components/dashboard-shell";
import { Barber, imhAdminCreateBarber, imhAdminDeleteBarber, imhAdminListBarbers } from "@/lib/imh-api";

export default function DashboardBarbersPage() {
  const { token, identity, salonId } = useAdminSession();
  const [items, setItems] = useState<Barber[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    if (identity?.role !== "manager") return;
    let cancelled = false;
    async function run(t: string) {
      setError(null);
      setLoading(true);
      try {
        const res = await imhAdminListBarbers(t, salonId ? { salonId } : undefined);
        if (!cancelled) setItems(res.items);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Impossible de charger les coiffeurs.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run(token);
    return () => {
      cancelled = true;
    };
  }, [token, identity?.role, salonId]);

  if (identity?.role !== "manager") {
    return <div className="text-sm text-white/70">Accès réservé aux gérants.</div>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[10px] tracking-[0.32em] text-[var(--brand-cyan)]/90">
            GESTION
          </div>
          <div className="mt-2 font-serif text-3xl tracking-tight">Coiffeurs</div>
        </div>

        <div className="flex w-full gap-3 sm:w-auto">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom du coiffeur"
            className="h-11 w-full rounded-full border border-white/10 bg-black/20 px-5 text-sm text-white outline-none placeholder:text-white/55 focus:border-white/20 sm:w-72"
          />
          <button
            type="button"
            disabled={!token || !name.trim()}
            onClick={async () => {
              if (!token) return;
              const trimmed = name.trim();
              if (!trimmed) return;
              setError(null);
              try {
                const res = await imhAdminCreateBarber(token, {
                  name: trimmed,
                  salonId: salonId ?? undefined,
                });
                setItems((prev) => [res.item, ...prev]);
                setName("");
              } catch (e) {
                setError(e instanceof Error ? e.message : "Impossible d'ajouter le coiffeur.");
              }
            }}
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-white px-6 text-[11px] font-medium tracking-[0.24em] text-black transition-colors hover:bg-white/90 disabled:opacity-50"
          >
            AJOUTER
          </button>
        </div>
      </div>

      {error ? (
        <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-black/20 px-5 py-4 text-sm text-white/70">
          {error}
        </div>
      ) : null}

      <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/10">
        <div className="grid grid-cols-[1fr_auto] gap-4 bg-white/[0.03] px-5 py-3 text-[10px] tracking-[0.24em] text-white/40">
          <div>NOM</div>
          <div>ACTIONS</div>
        </div>

        {loading ? (
          <div className="px-5 py-6 text-sm text-white/60">Chargement…</div>
        ) : items.length ? (
          <div className="divide-y divide-white/10">
            {items.map((b) => (
              <div
                key={b.id}
                className="grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-4"
              >
                <div className="text-sm text-white/85">{b.name}</div>
                <button
                  type="button"
                  disabled={!token}
                  onClick={async () => {
                    if (!token) return;
                    setError(null);
                    try {
                      await imhAdminDeleteBarber(token, b.id);
                      setItems((prev) => prev.filter((x) => x.id !== b.id));
                    } catch (e) {
                      setError(
                        e instanceof Error ? e.message : "Impossible de supprimer ce coiffeur.",
                      );
                    }
                  }}
                  className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 text-[11px] tracking-[0.24em] text-white transition-colors hover:bg-white/5 disabled:opacity-50"
                >
                  SUPPRIMER
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-5 py-6 text-sm text-white/60">
            Aucun coiffeur.
          </div>
        )}
      </div>
    </div>
  );
}
