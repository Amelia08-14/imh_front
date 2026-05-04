import Image from "next/image";
import type { CSSProperties } from "react";
import { ReservationFormContainer } from "@/components/reservation-form-container";

const pricingTabs = [
  "Coiffures",
  "Couleurs",
  "Brushing",
  "Soins de visage",
  "Soins capillaires",
];

const pricingRows = [
  {
    title: "Coupe Adulte",
    subtitle: "Brushing • coupe • finitions",
    price: "à partir de 2000 DA",
  },
  {
    title: "Coupe Enfant",
    subtitle: "Moins de 12 ans",
    price: "500 DA",
  },
  {
    title: "Brushing Signature",
    subtitle: "Volume, mouvement & style",
    price: "800 DA",
  },
  {
    title: "Soin Capillaire",
    subtitle: "Rituel nourrissant & détente",
    price: "1200 DA",
  },
];

const experts = [
  { name: "Sarah M.", role: "Experte en coloration", image: "/maison_femme.jpg" },
  { name: "Amira R.", role: "Hair & skin therapist", image: "/Hero03.jpg" },
  { name: "Lina K.", role: "Maître de style", image: "/Hero01.png" },
];

export default function MaisonFemmePage() {
  return (
    <div
      className="min-h-full bg-[var(--brand-ink)] text-white"
      style={
        {
          "--page-accent": "var(--brand-femme)",
          "--page-accent-2": "var(--brand-amber)",
          "--page-accent-rgb": "180, 145, 143",
          "--page-accent-2-rgb": "182, 107, 0",
        } as CSSProperties
      }
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(760px circle at 18% 12%, rgba(var(--page-accent-rgb), 0.24), transparent 56%), radial-gradient(980px circle at 82% 28%, rgba(var(--page-accent-2-rgb), 0.12), transparent 62%), radial-gradient(1100px circle at 50% 100%, rgba(113, 124, 125, 0.12), transparent 60%)",
        }}
      />

      <main className="relative mx-auto w-full max-w-[88rem] px-6 pb-24 pt-32 sm:px-8 sm:pt-36 xl:px-10">
        <section className="grid gap-12 border-b border-white/8 pb-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 lg:self-center">
            <div className="flex items-center gap-3 text-[10px] tracking-[0.32em] text-[var(--page-accent)]/90">
              <span className="inline-block h-px w-10 bg-[var(--page-accent)]/60" />
              <span>LA MAISON DE LA FEMME</span>
            </div>

            <div className="mt-7 relative h-14 w-72 sm:h-16 sm:w-[22rem]">
              <Image
                src="/logos/La%20Maison%20de%20la%20femme%20.png"
                alt="La Maison de la Femme"
                fill
                className="object-contain object-left"
                priority
              />
            </div>

            <h1 className="mt-6 max-w-xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
              Révélez votre
              <span className="block italic text-luxe-accent">
                féminité
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-white/70">
              La première franchise de soins et d&apos;instituts au féminin.
              Plongez dans un univers où la coiffure, l&apos;esthétique et le
              bien-être prennent soin de vous.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#tarification"
                className="btn-frame inline-flex h-11 items-center rounded-full px-6 text-[11px] font-medium tracking-[0.24em] shadow-[0_18px_50px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-0.5"
              >
                DÉCOUVRIR
              </a>
              <a
                href="#expertes"
                className="btn-luxe-outline inline-flex h-11 items-center gap-3 rounded-full px-6 text-[11px] tracking-[0.24em] text-white transition-colors hover:bg-white/8"
              >
                NOS EXPERTES
                <span className="grid size-7 place-items-center rounded-full border border-[var(--page-accent)]/30 text-luxe-accent">
                  →
                </span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 lg:self-center">
            <ReservationFormContainer
              accent="#b4918f"
              title="Choix des services"
              subtitle="RÉSERVATION PERSONNALISÉE"
              universe="femme"
              locations={[
                "Maison IN Hydra",
                "Maison IN Oran",
              ]}
            />
          </div>
        </section>

        <section className="grid gap-10 py-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/maison_femme.jpg"
                  alt="La Maison de la Femme"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-10">
            <div className="flex items-center gap-3 text-[10px] tracking-[0.32em] text-[var(--page-accent)]/90">
              <span className="inline-block h-px w-10 bg-[var(--page-accent)]/60" />
              <span>UN UNIVERS D&apos;EXCELLENCE</span>
            </div>

            <h2 className="mt-5 max-w-md font-serif text-4xl leading-[0.98] tracking-tight sm:text-6xl">
              La Maison de la Femme
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-8 text-white/70">
              Pour une parenthèse de détente et de bien-être, La Maison de la
              Femme est un espace dédié à la beauté féminine. Découvrez des
              prestations de beauté et de relaxation dans un cadre luxueux dédié
              à votre sérénité.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/60">
                ←
              </span>
              <span className="grid size-9 place-items-center rounded-full border border-[var(--brand-femme)]/35 bg-[var(--brand-femme)]/10 text-[var(--brand-femme)]">
                →
              </span>
            </div>
          </div>
        </section>

        <section
          id="tarification"
          className="border-t border-white/8 py-20"
        >
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center gap-3 text-[10px] tracking-[0.32em] text-[var(--brand-femme)]/90">
              <span className="inline-block h-px w-10 bg-[var(--brand-femme)]/60" />
              <span>NOS PRESTATIONS</span>
            </div>
            <h2 className="mt-6 font-serif text-4xl tracking-tight sm:text-5xl">
              Notre Tarification
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Découvrez notre équipe d&apos;expertes et notre carte de
              prestations qui mettent vos attentes au cœur de l&apos;expérience.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-8">
            <div className="flex flex-wrap gap-2">
              {pricingTabs.map((tab, index) => (
                <button
                  key={tab}
                  type="button"
                  className={[
                    "rounded-full px-4 py-2 text-[10px] tracking-[0.24em] transition-colors",
                    index === 0
                      ? "bg-[var(--brand-femme)] text-white"
                      : "border border-white/10 bg-white/4 text-white/60 hover:text-white",
                  ].join(" ")}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mt-8 divide-y divide-white/8">
              {pricingRows.map((row) => (
                <div
                  key={row.title}
                  className="grid gap-3 py-5 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div>
                    <div className="font-serif text-2xl tracking-tight">
                      {row.title}
                    </div>
                    <div className="mt-1 text-[11px] tracking-[0.2em] text-white/60">
                      {row.subtitle}
                    </div>
                  </div>
                  <div className="text-sm text-[var(--brand-femme)]">
                    {row.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="expertes" className="border-t border-white/8 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3 text-[10px] tracking-[0.32em] text-[var(--brand-femme)]/90">
              <span className="inline-block h-px w-10 bg-[var(--brand-femme)]/60" />
              <span>L&apos;EXCELLENCE</span>
            </div>
            <h2 className="mt-6 font-serif text-4xl tracking-tight sm:text-5xl">
              Nos Expertes
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Découvrez des profils conçus pour illustrer le raffinement, la
              précision et l&apos;expertise de notre univers féminin.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {experts.map((expert) => (
              <article
                key={expert.name}
                className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={expert.image}
                    alt={expert.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                </div>
                <div className="relative -mt-20 px-5 pb-5">
                  <div className="rounded-[1.25rem] border border-white/10 bg-black/55 p-4 backdrop-blur-sm">
                    <div className="font-serif text-xl">{expert.name}</div>
                    <div className="mt-1 text-[10px] tracking-[0.24em] text-white/60">
                      {expert.role}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
