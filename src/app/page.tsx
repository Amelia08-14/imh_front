import Image from "next/image";

import { HeroSlider } from "@/components/hero-slider";
import { UniverseShowcase } from "@/components/universe-showcase";

const universeCards = [
  {
    label: "La Maison de l'Homme",
    image: "/maison_homme.jpg",
    tagline: "L'ÉLÉGANCE AU MASCULIN",
    href: "/la-maison-de-l-homme",
  },
  {
    label: "La Maison de la Femme",
    image: "/maison_femme.jpg",
    tagline: "PARENTHÈSE DE DÉTENTE",
    href: "/la-maison-de-la-femme",
  },
  {
    label: "For MR & MRS",
    image: "/mme_mr.jpg",
    tagline: "UN MOMENT À DEUX",
    href: "#",
  },
  {
    label: "IN SPA",
    image: "/spa.jpg",
    tagline: "RESSOURCEZ-VOUS",
    href: "#",
  },
];

const locations = [
  {
    k: "01",
    title: "El Biar",
    subtitle: "LA MAISON DE L'HOMME",
    address: "Résidence Zemoun Youcef, El Biar",
    status: "LOCALISATION",
  },
  {
    k: "02",
    title: "El Mouradia",
    subtitle: "LA MAISON DE L'HOMME",
    address: "48 rue Oukil El Hadj, M'hamed, El Mouradia",
    status: "LOCALISATION",
  },
  {
    k: "03",
    title: "La Maison de la Femme",
    subtitle: "COIFFURE & MASSAGE FEMME",
    address: "Ouverture prochaine",
    status: "BIENTÔT DISPONIBLE",
  },
  {
    k: "04",
    title: "For Mr & Mrs",
    subtitle: "MIXTE",
    address: "Disponible dans des hôtels",
    status: "SUR DEMANDE",
  },
];

export default function Home() {
  return (
    <div className="min-h-full bg-[var(--brand-ink)] text-zinc-100">
      <div className="pointer-events-none fixed inset-0 opacity-55 [background:radial-gradient(600px_circle_at_15%_10%,color-mix(in_srgb,var(--brand-amber)_12%,transparent),transparent_60%),radial-gradient(800px_circle_at_80%_30%,color-mix(in_srgb,var(--brand-cyan)_8%,transparent),transparent_60%),radial-gradient(900px_circle_at_40%_90%,color-mix(in_srgb,var(--brand-slate)_10%,transparent),transparent_60%)]" />
      <div className="relative">
        <main className="mx-auto w-full max-w-[88rem] px-6 pb-24 pt-32 sm:px-8 sm:pt-36 xl:px-10">
          <section className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3 text-xs tracking-[0.3em] text-[var(--brand-slate)]">
                <span className="inline-block h-px w-10 bg-[var(--brand-amber)]/60" />
                <span>DEPUIS 2015</span>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute -left-2 top-8 hidden font-serif text-[14rem] leading-none text-white/[0.03] lg:block">
                  N
                </div>
                <h1 className="relative mt-6 font-serif text-5xl leading-[0.98] tracking-tight sm:text-7xl">
                L&apos;excellence{" "}
                <span className="block italic text-[var(--brand-amber)]">
                  du bien-être
                </span>
                </h1>
              </div>
              <p className="mt-6 max-w-xl text-base leading-7 text-[var(--brand-slate)]">
                La première franchise de salons et d&apos;instituts en Algérie.
                Plongez dans un univers dédié à la coiffure, l&apos;esthétique et
                la relaxation pour lui &amp; pour elle.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#decouvrir"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--brand-amber)] px-7 text-sm font-medium text-white transition-colors hover:bg-[color:color-mix(in_srgb,var(--brand-amber)_88%,white)]"
                >
                  DÉCOUVRIR
                  <span className="ml-3 text-base">→</span>
                </a>
                <a
                  href="#univers"
                  className="inline-flex h-12 items-center justify-center gap-3 rounded-full border border-[var(--brand-cyan)]/30 bg-white/5 px-7 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  <span className="grid size-8 place-items-center rounded-full border border-[var(--brand-cyan)]/30 bg-black/30 text-[var(--brand-cyan)]">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M9 7l10 5-10 5V7z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  NOTRE UNIVERS
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <HeroSlider />
            </div>
          </section>

          <UniverseShowcase />

          <section id="decouvrir" className="mt-28">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-4">
                <div className="flex items-center gap-3 text-xs tracking-[0.3em] text-[var(--brand-amber)]/80">
                  <span className="inline-block h-px w-10 bg-[var(--brand-amber)]/60" />
                  <span>DÉCOUVREZ</span>
                </div>
                <h2 className="mt-6 font-serif text-4xl leading-tight tracking-tight sm:text-[3.1rem]">
                  Nos Univers
                </h2>
              </div>
              <p className="text-sm leading-7 text-[var(--brand-slate)] lg:col-span-8 lg:max-w-2xl lg:justify-self-end">
                Une expertise complète rassemblant la coiffure, les soins et
                l&apos;esthétique dans des cadres conçus pour votre bien-être.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {universeCards.map((card) => (
                <a
                  key={card.label}
                  href={card.href}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition-colors hover:border-[var(--brand-cyan)]/25 hover:bg-white/10"
                >
                  <div className="relative h-[22rem] w-full sm:h-[28rem]">
                    <Image
                      src={card.image}
                      alt={card.label}
                      fill
                      className="object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <div className="absolute inset-x-0 top-0 p-5 sm:p-6">
                    <div className="text-[10px] tracking-[0.24em] text-[var(--brand-amber)]/80">
                      {card.tagline}
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] text-white/40">
                      <span className="inline-block h-px w-9 bg-[var(--brand-amber)]/60" />
                      <span>IMH</span>
                    </div>
                    <div className="mt-3 font-serif text-[2rem] leading-[1.04] tracking-tight">
                      {card.label}
                    </div>
                    <div className="mt-4 inline-flex items-center gap-3 text-[11px] tracking-[0.24em] text-white/85">
                      DÉCOUVRIR
                      <span className="grid size-9 place-items-center rounded-full border border-[var(--brand-cyan)]/30 bg-white/5 text-[var(--brand-cyan)] transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section
            id="localisation"
            className="mt-28 grid gap-14 lg:grid-cols-12"
          >
            <div className="lg:col-span-5">
              <h2 className="font-serif text-5xl leading-[0.98] tracking-tight sm:text-6xl">
                Où nous{" "}
                <span className="block italic text-[var(--brand-amber)]">
                  trouver
                </span>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-[var(--brand-slate)]">
                Chaque Maison IN est pensée comme un sanctuaire de bien-être,
                alliant design élégant et confort absolu pour une expérience
                inoubliable.
              </p>

              <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <span className="grid size-10 place-items-center rounded-2xl border border-[var(--brand-cyan)]/20 bg-black/20 text-[var(--brand-cyan)]">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 21s7-4.4 7-11a7 7 0 10-14 0c0 6.6 7 11 7 11z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 13.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </span>
                  <span>Notre Vision</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-[var(--brand-slate)]">
                  Nous étendons très prochainement notre réseau de franchises à
                  travers tout le territoire algérien.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Oran", "Constantine", "Annaba", "Sétif"].map((city) => (
                    <span
                      key={city}
                      className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs tracking-[0.18em] text-[var(--brand-lavender)]"
                    >
                      {city.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="flex items-center justify-between">
                <div className="text-xs tracking-[0.28em] text-[var(--brand-slate)]">
                  LOCALISATION
                </div>
                <button
                  type="button"
                  className="grid size-10 place-items-center rounded-full border border-[var(--brand-amber)]/50 bg-[var(--brand-amber)]/10 text-[var(--brand-amber)]"
                >
                  <span className="sr-only">Voir toutes les localisations</span>
                  +
                </button>
              </div>

              <div className="mt-8 divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/5">
                {locations.map((loc) => (
                  <div
                    key={loc.k}
                    className="grid gap-6 px-7 py-7 sm:grid-cols-[auto_1fr_auto] sm:items-center"
                  >
                    <div className="text-xs tracking-[0.28em] text-[var(--brand-slate)]">
                      {loc.k}
                    </div>
                    <div>
                      <div className="font-serif text-3xl tracking-tight sm:text-4xl">
                        {loc.title}
                      </div>
                      <div className="mt-2 text-xs tracking-[0.28em] text-[var(--brand-amber)]/80">
                        {loc.subtitle}
                      </div>
                      <div className="mt-3 text-sm text-[var(--brand-slate)]">
                        {loc.address}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <div className="text-xs tracking-[0.28em] text-[var(--brand-slate)]">
                        {loc.status}
                      </div>
                      <a
                        href="#"
                        className="grid size-11 place-items-center rounded-full border border-[var(--brand-cyan)]/25 bg-black/20 text-[var(--brand-cyan)] transition-colors hover:bg-white/10"
                        aria-label={`Voir ${loc.title}`}
                      >
                        →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
