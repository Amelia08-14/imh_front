"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const items = [
  {
    k: "01",
    label: "L'Homme",
    title: "La Maison de l'Homme",
    tagline: "L'ÉLÉGANCE AU MASCULIN",
    description:
      "Grâce à un protocole sur mesure, découvrez des soins pensés comme un sanctuaire de bien-être, alliant design élégant et confort absolu.",
    image: "/maison_home_slide.jpg",
  },
  {
    k: "02",
    label: "La Femme",
    title: "La Maison de la Femme",
    tagline: "PARENTHÈSE DE DÉTENTE",
    description:
      "Un univers raffiné pensé pour la coiffure, la détente et les rituels de beauté dédiés à la femme moderne.",
    image: "/maison_femme.jpg",
  },
  {
    k: "03",
    label: "MR & MRS",
    title: "For MR & MRS",
    tagline: "UN MOMENT À DEUX",
    description:
      "Une expérience mixte et premium avec des soins complémentaires dans une ambiance confidentielle et élégante.",
    image: "/mme_mr.jpg",
  },
  {
    k: "04",
    label: "IN SPA",
    title: "IN SPA",
    tagline: "RESSOURCEZ-VOUS",
    description:
      "Des instants de calme absolu, des espaces dédiés au relâchement et des protocoles pensés pour régénérer le corps.",
    image: "/spa.jpg",
  },
];

export function UniverseShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = useMemo(() => items[activeIndex], [activeIndex]);

  return (
    <section id="univers" className="mt-28 grid gap-14 lg:grid-cols-12">
      <div className="flex flex-col lg:col-span-5 lg:min-h-[44rem]">
        <div className="flex items-center gap-3 text-xs tracking-[0.3em] text-[var(--brand-amber)]/80">
          <span className="inline-block h-px w-10 bg-[var(--brand-amber)]/60" />
          <span>L&apos;UNIVERS IN</span>
        </div>

        <h2 className="mt-6 font-serif text-4xl leading-tight tracking-tight sm:text-[3.2rem]">
          Nos univers
        </h2>

        <div className="mt-12 space-y-5">
          {items.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={item.k}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="flex w-full items-baseline gap-5 text-left"
              >
                <span className="w-8 text-xs tracking-[0.3em] text-[var(--brand-slate)]">
                  {item.k}
                </span>
                <span
                  className={[
                    "font-serif text-4xl tracking-tight transition-all sm:text-[3.35rem]",
                    isActive
                      ? "translate-x-0 text-white"
                      : "translate-x-2 text-white/25 hover:text-[var(--brand-lavender)]",
                  ].join(" ")}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-14 max-w-sm">
          <div className="text-[10px] tracking-[0.28em] text-[var(--brand-amber)]/85">
            {activeItem.tagline}
          </div>
          <p className="mt-4 text-sm leading-8 text-[var(--brand-slate)]">
            {activeItem.description}
          </p>
          <a
            href="#footer-contact"
            className="mt-8 inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.24em] text-white"
          >
            RÉSERVER UN SOIN
            <span className="grid size-9 place-items-center rounded-full border border-[var(--brand-amber)]/45 bg-[var(--brand-amber)]/12 text-[var(--brand-amber)]">
              →
            </span>
          </a>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="relative mx-auto h-[30rem] max-w-[38rem] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.55)] sm:h-[38rem] lg:h-[44rem] lg:max-w-[40rem]">
          {items.map((item, index) => {
            const offset = index - activeIndex;

            return (
              <div
                key={item.label}
                className={[
                  "absolute inset-0 transition-all duration-700 ease-out",
                  offset === 0
                    ? "translate-y-0 opacity-100"
                    : offset > 0
                      ? "translate-y-full opacity-0"
                      : "-translate-y-full opacity-0",
                ].join(" ")}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-6 py-6 sm:px-8 sm:py-8">
                  <div>
                    <div className="text-xs tracking-[0.28em] text-[var(--brand-amber)]/85">
                      {item.tagline}
                    </div>
                    <div className="mt-2 text-sm text-zinc-200 sm:text-base">
                      {item.title}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pb-1">
                    {items.map((dot, dotIndex) => (
                      <button
                        key={dot.label}
                        type="button"
                        onClick={() => setActiveIndex(dotIndex)}
                        aria-label={`Voir ${dot.title}`}
                        className={[
                          "size-2 rounded-full border transition-colors",
                          dotIndex === activeIndex
                            ? "border-[var(--brand-cyan)] bg-[var(--brand-cyan)]/80"
                            : "border-white/10 bg-white/5",
                        ].join(" ")}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
