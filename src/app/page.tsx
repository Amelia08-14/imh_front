import Image from "next/image";

import { HeroSlider } from "@/components/hero-slider";
import { UniverseShowcase } from "@/components/universe-showcase";

const universeCards = [
  {
    label: "La Maison de l'Homme",
    image: "/maison_homme.jpg",
    tagline: "L'ÉLÉGANCE AU MASCULIN",
  },
  {
    label: "La Maison de la Femme",
    image: "/maison_femme.jpg",
    tagline: "PARENTHÈSE DE DÉTENTE",
  },
  {
    label: "For MR & MRS",
    image: "/mme_mr.jpg",
    tagline: "UN MOMENT À DEUX",
  },
  {
    label: "IN SPA",
    image: "/spa.jpg",
    tagline: "RESSOURCEZ-VOUS",
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
    <div className="min-h-full bg-black text-zinc-100">
      <div className="pointer-events-none fixed inset-0 opacity-70 [background:radial-gradient(600px_circle_at_15%_10%,rgba(201,163,91,0.16),transparent_60%),radial-gradient(800px_circle_at_80%_30%,rgba(255,255,255,0.06),transparent_60%),radial-gradient(900px_circle_at_40%_90%,rgba(255,255,255,0.04),transparent_60%)]" />
      <div className="relative">
        <main className="mx-auto w-full max-w-7xl px-6 pb-24 pt-32 sm:pt-36">
          <section className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3 text-xs tracking-[0.3em] text-zinc-500">
                <span className="inline-block h-px w-10 bg-[#c9a35b]/60" />
                <span>DEPUIS 2015</span>
              </div>
              <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl">
                L&apos;excellence{" "}
                <span className="block italic text-[#c9a35b]">du bien-être</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400">
                La première franchise de salons et d&apos;instituts en Algérie.
                Plongez dans un univers dédié à la coiffure, l&apos;esthétique et
                la relaxation pour lui &amp; pour elle.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#decouvrir"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#c9a35b] px-7 text-sm font-medium text-black transition-colors hover:bg-[#d7b26a]"
                >
                  DÉCOUVRIR
                  <span className="ml-3 text-base">→</span>
                </a>
                <a
                  href="#univers"
                  className="inline-flex h-12 items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-7 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  <span className="grid size-8 place-items-center rounded-full border border-white/10 bg-black/40">
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
                <div className="flex items-center gap-3 text-xs tracking-[0.3em] text-[#c9a35b]/80">
                  <span className="inline-block h-px w-10 bg-[#c9a35b]/60" />
                  <span>DÉCOUVREZ</span>
                </div>
                <h2 className="mt-6 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                  Nos Univers
                </h2>
              </div>
              <p className="lg:col-span-8 lg:max-w-2xl lg:justify-self-end text-sm leading-7 text-zinc-400">
                Une expertise complète rassemblant la coiffure, les soins et
                l&apos;esthétique dans des cadres conçus pour votre bien-être.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {universeCards.map((card) => (
                <a
                  key={card.label}
                  href="#"
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
                >
                  <div className="relative h-[26rem] w-full sm:h-[30rem]">
                    <Image
                      src={card.image}
                      alt={card.label}
                      fill
                      className="object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <div className="absolute inset-x-0 top-0 p-7">
                    <div className="text-xs tracking-[0.28em] text-[#c9a35b]/75">
                      {card.tagline}
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <div className="flex items-center gap-3 text-xs tracking-[0.28em] text-white/45">
                      <span className="inline-block h-px w-10 bg-[#c9a35b]/50" />
                      <span>IN BEAUTY &amp; HEALTH</span>
                    </div>
                    <div className="mt-4 font-serif text-3xl leading-tight tracking-tight">
                      {card.label}
                    </div>
                    <div className="mt-4 inline-flex items-center gap-3 text-sm tracking-[0.18em] text-white/85">
                      DÉCOUVRIR
                      <span className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 transition-transform group-hover:translate-x-0.5">
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
              <h2 className="font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl">
                Où nous{" "}
                <span className="block italic text-[#c9a35b]">trouver</span>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-zinc-400">
                Chaque Maison IN est pensée comme un sanctuaire de bien-être,
                alliant design élégant et confort absolu pour une expérience
                inoubliable.
              </p>

              <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <span className="grid size-10 place-items-center rounded-2xl border border-white/10 bg-black/30">
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
                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  Nous étendons très prochainement notre réseau de franchises à
                  travers tout le territoire algérien.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Oran", "Constantine", "Annaba", "Sétif"].map((city) => (
                    <span
                      key={city}
                      className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs tracking-[0.18em] text-white/80"
                    >
                      {city.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="flex items-center justify-between">
                <div className="text-xs tracking-[0.28em] text-zinc-500">
                  LOCALISATION
                </div>
                <button
                  type="button"
                  className="grid size-10 place-items-center rounded-full border border-[#c9a35b]/50 bg-[#c9a35b]/10 text-[#c9a35b]"
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
                    <div className="text-xs tracking-[0.28em] text-zinc-600">
                      {loc.k}
                    </div>
                    <div>
                      <div className="font-serif text-3xl tracking-tight sm:text-4xl">
                        {loc.title}
                      </div>
                      <div className="mt-2 text-xs tracking-[0.28em] text-[#c9a35b]/80">
                        {loc.subtitle}
                      </div>
                      <div className="mt-3 text-sm text-zinc-400">
                        {loc.address}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <div className="text-xs tracking-[0.28em] text-zinc-500">
                        {loc.status}
                      </div>
                      <a
                        href="#"
                        className="grid size-11 place-items-center rounded-full border border-white/10 bg-black/30 text-white/90 transition-colors hover:bg-white/10"
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
