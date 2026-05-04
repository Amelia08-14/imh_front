"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAdminSession } from "@/components/dashboard-shell";
import {
  Appointment,
  Barber,
  imhAdminListBarbers,
  imhAdminListAppointments,
  imhAdminUpdateAppointment,
} from "@/lib/imh-api";

function toIsoStartOfDay(date: string) {
  if (!date) return "";
  return new Date(`${date}T00:00:00.000Z`).toISOString();
}

function toIsoEndOfDay(date: string) {
  if (!date) return "";
  return new Date(`${date}T23:59:59.999Z`).toISOString();
}

export default function DashboardAppointmentsPage() {
  const { token, identity, salonId } = useAdminSession();
  const [items, setItems] = useState<Appointment[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [status, setStatus] = useState<string>("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const params = useMemo(() => {
    const p: { from?: string; to?: string; status?: string; salonId?: string } = {};
    if (from) p.from = toIsoStartOfDay(from);
    if (to) p.to = toIsoEndOfDay(to);
    if (status) p.status = status;
    if (salonId) p.salonId = salonId;
    return p;
  }, [from, status, to, salonId]);

  const refresh = useCallback(async () => {
    const t = token;
    if (!t) return;
    setLoading(true);
    setError(null);
    try {
      const res = await imhAdminListAppointments(t, params);
      setItems(res.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Impossible de charger les rendez-vous.");
    } finally {
      setLoading(false);
    }
  }, [params, token]);

  useEffect(() => {
    if (!token) return;
    if (identity?.role !== "manager") return;
    refresh();
  }, [refresh, token, identity?.role, salonId]);

  useEffect(() => {
    if (!token) return;
    if (identity?.role !== "manager") return;
    const t = token;
    let cancelled = false;
    async function run() {
      try {
        const res = await imhAdminListBarbers(t, salonId ? { salonId } : undefined);
        if (!cancelled) setBarbers(res.items.filter((b) => b.active));
      } catch {
        if (!cancelled) setBarbers([]);
      }
    }
    run();
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
          <div className="mt-2 font-serif text-3xl tracking-tight">
            Rendez-vous
          </div>
        </div>

        <div className="grid w-full gap-3 sm:w-auto sm:grid-cols-[9rem_9rem_10rem_auto]">
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="h-11 rounded-full border border-white/10 bg-black/20 px-5 text-sm text-white outline-none focus:border-white/20"
          />
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="h-11 rounded-full border border-white/10 bg-black/20 px-5 text-sm text-white outline-none focus:border-white/20"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-11 rounded-full border border-white/10 bg-black/20 px-5 text-sm text-white outline-none focus:border-white/20"
          >
            <option value="">Tous</option>
            <option value="pending">En attente</option>
            <option value="confirmed">Confirmé</option>
            <option value="cancelled">Annulé</option>
          </select>
          <button
            type="button"
            disabled={!token || loading}
            onClick={refresh}
            className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-[11px] font-medium tracking-[0.24em] text-black transition-colors hover:bg-white/90 disabled:opacity-50"
          >
            {loading ? "..." : "ACTUALISER"}
          </button>
        </div>
      </div>

      {error ? (
        <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-black/20 px-5 py-4 text-sm text-white/70">
          {error}
        </div>
      ) : null}

      <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/10">
        <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_auto] gap-4 bg-white/[0.03] px-5 py-3 text-[10px] tracking-[0.24em] text-white/40">
          <div>CLIENT</div>
          <div>PRESTATION</div>
          <div>COIFFEUR</div>
          <div>DATE</div>
          <div>ACTIONS</div>
        </div>

        {loading ? (
          <div className="px-5 py-6 text-sm text-white/60">Chargement…</div>
        ) : items.length ? (
          <div className="divide-y divide-white/10">
            {items.map((a) => (
              <div
                key={a.id}
                className="grid grid-cols-[1.2fr_1fr_1fr_1fr_auto] items-center gap-4 px-5 py-4"
              >
                <div>
                  <div className="text-sm text-white/85">
                    {a.customer.firstName} {a.customer.lastName}
                  </div>
                  <div className="mt-1 text-[11px] tracking-[0.18em] text-white/40">
                    {a.customer.phone}
                  </div>
                </div>
                <div className="text-sm text-white/70">{a.serviceName}</div>
                <div className="text-sm text-white/70">
                  <select
                    value={a.barberId ?? ""}
                    onChange={async (e) => {
                      const t = token;
                      if (!t) return;
                      const next = e.target.value || null;
                      setError(null);
                      try {
                        const res = await imhAdminUpdateAppointment(t, a.id, {
                          barberId: next,
                        });
                        setItems((prev) =>
                          prev.map((x) => (x.id === a.id ? res.item : x)),
                        );
                      } catch (e) {
                        setError(
                          e instanceof Error ? e.message : "Impossible de changer le coiffeur.",
                        );
                      }
                    }}
                    className="h-10 w-full rounded-full border border-white/10 bg-black/20 px-4 text-sm text-white outline-none focus:border-white/20"
                  >
                    <option value="">Peu importe</option>
                    {barbers.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-sm text-white/70">
                  {new Date(a.startAt).toLocaleString("fr-FR")}
                  <div className="mt-1 text-[11px] tracking-[0.18em] text-white/35">
                    {a.location}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-end">
                  <span
                    className="inline-flex h-10 items-center rounded-full border border-white/10 bg-white/[0.03] px-4 text-[11px] tracking-[0.18em]"
                    style={{
                      color:
                        a.status === "confirmed"
                          ? "var(--brand-cyan)"
                          : a.status === "cancelled"
                            ? "var(--brand-slate)"
                            : "var(--brand-slate)",
                    }}
                  >
                    {a.status === "confirmed"
                      ? "CONFIRMÉ"
                      : a.status === "cancelled"
                        ? "ANNULÉ"
                        : "EN ATTENTE"}
                  </span>

                  <button
                    type="button"
                    disabled={!token || a.status === "confirmed"}
                    onClick={async () => {
                      const t = token;
                      if (!t) return;
                      setError(null);
                      try {
                        const res = await imhAdminUpdateAppointment(t, a.id, {
                          status: "confirmed",
                        });
                        setItems((prev) =>
                          prev.map((x) => (x.id === a.id ? res.item : x)),
                        );
                      } catch (e) {
                        setError(
                          e instanceof Error
                            ? e.message
                            : "Impossible de confirmer ce rendez-vous.",
                        );
                      }
                    }}
                    className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 text-[11px] tracking-[0.24em] text-white transition-colors hover:bg-white/5 disabled:opacity-50"
                  >
                    CONFIRMER
                  </button>

                  <button
                    type="button"
                    disabled={!token || a.status === "cancelled"}
                    onClick={async () => {
                      const t = token;
                      if (!t) return;
                      setError(null);
                      try {
                        const res = await imhAdminUpdateAppointment(t, a.id, {
                          status: "cancelled",
                        });
                        setItems((prev) =>
                          prev.map((x) => (x.id === a.id ? res.item : x)),
                        );
                      } catch (e) {
                        setError(
                          e instanceof Error ? e.message : "Impossible d'annuler ce rendez-vous.",
                        );
                      }
                    }}
                    className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 text-[11px] tracking-[0.24em] text-white transition-colors hover:bg-white/5 disabled:opacity-50"
                  >
                    ANNULER
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-5 py-6 text-sm text-white/60">
            Aucun rendez-vous.
          </div>
        )}
      </div>
    </div>
  );
}
