"use client";

import { useEffect, useMemo, useState } from "react";
import { useAdminSession } from "@/components/dashboard-shell";
import Image from "next/image";
import {
  Salon,
  imhAdminCreateSalon,
  imhAdminDeleteSalon,
  imhAdminListSalons,
} from "@/lib/imh-api";

const categoryOptions: Array<{ id: Salon["category"]; label: string }> = [
  { id: "homme", label: "La Maison de l'Homme" },
  { id: "femme", label: "La Maison de la Femme" },
  { id: "mrmrs", label: "For MR & MRS" },
];

function getCategoryLogo(category: Salon["category"]) {
  if (category === "homme") return "/logos/LA%20MAISON%20DE%20L'HOMME.png";
  if (category === "femme") return "/logos/La%20Maison%20de%20la%20femme%20.png";
  return "/logos/La%20Maison%20MR%20%26%20MRS.png";
}

export default function DashboardSalonsPage() {
  const { token, identity, setSalonId } = useAdminSession();
  const [items, setItems] = useState<Salon[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Salon["category"]>("homme");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canAdd = useMemo(() => name.trim().length > 1, [name]);

  useEffect(() => {
    if (!token) return;
    if (identity?.role !== "super_admin") return;
    let cancelled = false;
    async function run(t: string) {
      setLoading(true);
      setError(null);
      try {
        const res = await imhAdminListSalons(t);
        if (!cancelled) setItems(res.items);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Impossible de charger les salons.");
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
          <div className="mt-2 font-serif text-3xl tracking-tight">Salons</div>
        </div>

        <div className="grid w-full gap-3 sm:w-auto sm:grid-cols-[1fr_14rem_16rem_auto]">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom du salon"
            className="h-11 rounded-full border border-white/10 bg-black/20 px-5 text-sm text-white outline-none placeholder:text-white/55 focus:border-white/20 sm:w-72"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Salon["category"])}
            className="h-11 rounded-full border border-white/10 bg-black/20 px-5 text-sm text-white outline-none focus:border-white/20"
          >
            {categoryOptions.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Adresse (optionnel)"
            className="h-11 rounded-full border border-white/10 bg-black/20 px-5 text-sm text-white outline-none placeholder:text-white/55 focus:border-white/20"
          />
          <button
            type="button"
            disabled={!token || !canAdd}
            onClick={async () => {
              if (!token) return;
              setError(null);
              try {
                const res = await imhAdminCreateSalon(token, {
                  name: name.trim(),
                  category,
                  address: address.trim() || undefined,
                });
                setItems((prev) => [res.item, ...prev]);
                setName("");
                setAddress("");
              } catch (e) {
                setError(e instanceof Error ? e.message : "Impossible d'ajouter le salon.");
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
        <div className="grid grid-cols-[1.4fr_1fr_1.1fr_auto] gap-4 bg-white/[0.03] px-5 py-3 text-[10px] tracking-[0.24em] text-white/40">
          <div>SALON</div>
          <div>CATÉGORIE</div>
          <div>ADRESSE</div>
          <div>ACTIONS</div>
        </div>

        {loading ? (
          <div className="px-5 py-6 text-sm text-white/60">Chargement…</div>
        ) : items.length ? (
          <div className="divide-y divide-white/10">
            {items.map((s) => (
              <div
                key={s.id}
                className="grid grid-cols-[1.4fr_1fr_1.1fr_auto] items-center gap-4 px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={getCategoryLogo(s.category)}
                    alt=""
                    width={160}
                    height={160}
                    sizes="(max-width: 640px) 160px, 180px"
                    quality={100}
                    className="h-9 w-auto"
                  />
                  <div className="text-sm text-white/85">{s.name}</div>
                </div>
                <div className="text-sm text-white/60">
                  {categoryOptions.find((c) => c.id === s.category)?.label ?? s.category}
                </div>
                <div className="text-sm text-white/60">{s.address ?? "—"}</div>
                <button
                  type="button"
                  disabled={!token}
                  onClick={async () => {
                    if (!token) return;
                    setError(null);
                    try {
                      await imhAdminDeleteSalon(token, s.id);
                      setItems((prev) => prev.filter((x) => x.id !== s.id));
                      setSalonId(null);
                    } catch (e) {
                      setError(
                        e instanceof Error ? e.message : "Impossible de supprimer ce salon.",
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
          <div className="px-5 py-6 text-sm text-white/60">Aucun salon.</div>
        )}
      </div>
    </div>
  );
}
