"use client";

import { useMemo, useState } from "react";

type PricingRow = { title: string; subtitle: string; price: string };

const tabs = [
  "Coiffures",
  "Couleurs",
  "Brushing",
  "Finishing",
  "Soins de visage",
  "Soins capillaires",
] as const;

const rowsByTab: Record<(typeof tabs)[number], PricingRow[]> = {
  Coiffures: [
    { title: "Coupe Adulte", subtitle: "Coiffure & mise en forme", price: "à partir de 2000 DA" },
    { title: "Coupe Enfant", subtitle: "Finition nette et rapide", price: "500 DA" },
    { title: "Dégradé US", subtitle: "Dégradé progressif & contour", price: "à partir de 2500 DA" },
    { title: "Contour & Barbe", subtitle: "Traçage et entretien", price: "600 DA" },
    { title: "Rasage Premium", subtitle: "Serviette chaude & finition", price: "900 DA" },
  ],
  Couleurs: [
    { title: "Camouflage Blanc", subtitle: "Effet naturel & discret", price: "à partir de 2500 DA" },
    { title: "Patine / Ton sur ton", subtitle: "Uniformisation légère", price: "à partir de 2800 DA" },
    { title: "Décoloration", subtitle: "Technique & suivi professionnel", price: "à partir de 6500 DA" },
    { title: "Barbe (camouflage)", subtitle: "Rééquilibrage des zones", price: "à partir de 1800 DA" },
  ],
  Brushing: [
    { title: "Brushing Court", subtitle: "Mise en forme", price: "à partir de 1200 DA" },
    { title: "Brushing Moyen", subtitle: "Volume & tenue", price: "à partir de 1600 DA" },
    { title: "Brushing Long", subtitle: "Finition premium", price: "à partir de 2200 DA" },
  ],
  Finishing: [
    { title: "Waves / Texture", subtitle: "Effet naturel", price: "800 DA" },
    { title: "Finition Matte", subtitle: "Pâte / cire premium", price: "500 DA" },
    { title: "Fixation Longue tenue", subtitle: "Spray & finition", price: "400 DA" },
  ],
  "Soins de visage": [
    { title: "Nettoyage Express", subtitle: "Purifiant & hydratant", price: "à partir de 1800 DA" },
    { title: "Soin Anti-âge", subtitle: "Peau lissée & éclat", price: "à partir de 3500 DA" },
    { title: "Soin Barbe & Peau", subtitle: "Hydratation + massage", price: "à partir de 2200 DA" },
  ],
  "Soins capillaires": [
    { title: "Rituel Hydratation", subtitle: "Cheveu souple & brillant", price: "à partir de 2000 DA" },
    { title: "Rituel Anti-chute", subtitle: "Tonique & ciblé", price: "à partir de 3200 DA" },
    { title: "Détox cuir chevelu", subtitle: "Gommage & purification", price: "à partir de 2500 DA" },
  ],
};

export function MaisonHommePricing() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Coiffures");

  const rows = useMemo(() => rowsByTab[activeTab] ?? [], [activeTab]);

  return (
    <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-8">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={[
              "rounded-full px-4 py-2 text-[10px] tracking-[0.24em] transition-colors",
              tab === activeTab
                ? "bg-[var(--page-accent)] text-black"
                : "border border-white/10 bg-white/4 text-white/60 hover:text-white",
            ].join(" ")}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-8 divide-y divide-white/8">
        {rows.map((row) => (
          <div
            key={`${activeTab}:${row.title}`}
            className="grid gap-3 py-5 sm:grid-cols-[1fr_auto] sm:items-center"
          >
            <div>
              <div className="font-serif text-2xl tracking-tight">{row.title}</div>
              <div className="mt-1 text-[11px] tracking-[0.2em] text-white/60">
                {row.subtitle}
              </div>
            </div>
            <div className="text-sm text-[var(--page-accent)]">{row.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

