"use client";

import { useEffect, useMemo, useState } from "react";
import { useAdminSession } from "@/components/dashboard-shell";
import {
  Service,
  imhAdminCreateService,
  imhAdminDeleteService,
  imhAdminListServices,
} from "@/lib/imh-api";

function formatPrice(cents: number) {
  if (!Number.isFinite(cents)) return "";
  const da = cents / 100;
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "DZD",
    maximumFractionDigits: 0,
  }).format(da);
}

export default function DashboardServicesPage() {
  const { token, identity, salonId } = useAdminSession();
  const [items, setItems] = useState<Service[]>([]);
  const [name, setName] = useState("");
  const [durationMin, setDurationMin] = useState("30");
  const [priceDa, setPriceDa] = useState("0");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canAdd = useMemo(() => {
    const dur = Number(durationMin);
    const price = Number(priceDa);
    return name.trim() && Number.isInteger(dur) && dur >= 5 && Number.isFinite(price) && price >= 0;
  }, [durationMin, name, priceDa]);

  useEffect(() => {
    if (!token) return;
    if (identity?.role !== "manager") return;
    let cancelled = false;
    async function run(t: string) {
      setError(null);
      setLoading(true);
      try {
        const res = await imhAdminListServices(t, salonId ? { salonId } : undefined);
        if (!cancelled) setItems(res.items);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Impossible de charger les prestations.");
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
          <div className="text-[10px] tracking-[0.32em] text-white/55">
            GESTION
          </div>
          <div className="mt-2 font-serif text-3xl tracking-tight">
            Prestations
          </div>
        </div>

        <div className="grid w-full gap-3 sm:w-auto sm:grid-cols-[1fr_7rem_7rem_auto]">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom de la prestation"
            className="h-11 rounded-full border border-white/10 bg-black/20 px-5 text-sm text-white outline-none placeholder:text-white/55 focus:border-white/20 sm:w-80"
          />
          <input
            value={durationMin}
            onChange={(e) => setDurationMin(e.target.value)}
            placeholder="Durée"
            className="h-11 rounded-full border border-white/10 bg-black/20 px-5 text-sm text-white outline-none placeholder:text-white/55 focus:border-white/20"
          />
          <input
            value={priceDa}
            onChange={(e) => setPriceDa(e.target.value)}
            placeholder="Prix DA"
            className="h-11 rounded-full border border-white/10 bg-black/20 px-5 text-sm text-white outline-none placeholder:text-white/55 focus:border-white/20"
          />
          <button
            type="button"
            disabled={!token || !canAdd}
            onClick={async () => {
              if (!token) return;
              setError(null);
              const dur = Number(durationMin);
              const price = Math.round(Number(priceDa) * 100);
              try {
                const res = await imhAdminCreateService(token, {
                  name: name.trim(),
                  durationMin: dur,
                  priceCents: price,
                  salonId: salonId ?? undefined,
                });
                setItems((prev) => [res.item, ...prev]);
                setName("");
                setDurationMin("30");
                setPriceDa("0");
              } catch (e) {
                setError(
                  e instanceof Error ? e.message : "Impossible d'ajouter la prestation.",
                );
              }
            }}
            className="btn-luxe inline-flex h-11 items-center justify-center rounded-full px-6 text-[11px] font-medium tracking-[0.24em] transition-colors hover:opacity-95 disabled:opacity-50"
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
        <div className="grid grid-cols-[1fr_6rem_10rem_auto] gap-4 bg-white/[0.03] px-5 py-3 text-[10px] tracking-[0.24em] text-white/40">
          <div>PRESTATION</div>
          <div>DURÉE</div>
          <div>PRIX</div>
          <div>ACTIONS</div>
        </div>

        {loading ? (
          <div className="px-5 py-6 text-sm text-white/60">Chargement…</div>
        ) : items.length ? (
          <div className="divide-y divide-white/10">
            {items.map((s) => (
              <div
                key={s.id}
                className="grid grid-cols-[1fr_6rem_10rem_auto] items-center gap-4 px-5 py-4"
              >
                <div className="text-sm text-white/85">
                  {s.name}
                  {s.isInSpa ? (
                    <span className="ml-3 inline-flex h-6 items-center rounded-full border border-white/10 bg-white/[0.03] px-3 text-[10px] tracking-[0.22em] text-white/55">
                      IN SPA
                    </span>
                  ) : null}
                </div>
                <div className="text-sm text-white/60">{s.durationMin} min</div>
                <div className="text-sm text-white/60">{formatPrice(s.priceCents)}</div>
                <button
                  type="button"
                  disabled={!token || s.isInSpa}
                  onClick={async () => {
                    if (!token) return;
                    if (s.isInSpa) return;
                    setError(null);
                    try {
                      await imhAdminDeleteService(token, s.id);
                      setItems((prev) => prev.filter((x) => x.id !== s.id));
                    } catch (e) {
                      setError(
                        e instanceof Error ? e.message : "Impossible de supprimer cette prestation.",
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
            Aucune prestation.
          </div>
        )}
      </div>
    </div>
  );
}
