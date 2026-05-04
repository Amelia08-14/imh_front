import Image from "next/image";
import type { CSSProperties } from "react";
import { ReservationFormContainer } from "@/components/reservation-form-container";

const bookingLocations = [
  "IN SPA El Biar",
  "IN SPA Oran",
];

const careRows = [
  {
    title: "Rituel Hammam Traditionnel",
    subtitle: "Gommage au savon noir • enveloppement au ghassoul",
    price: "4500 DA",
  },
  {
    title: "Massage Relaxant Signature",
    subtitle: "1 heure de détente absolue aux huiles naturelles",
    price: "6000 DA",
  },
  {
    title: "Soin Visage Éclat Oriental",
    subtitle: "Purification et hydratation profonde",
    price: "3500 DA",
  },
  {
    title: "Forfait Évasion Royale",
    subtitle: "Hammam • massage • soin visage • espace détente",
    price: "12000 DA",
  },
];

export default function InSpaPage() {
  return (
    <div
      className="min-h-full bg-[var(--brand-ink)] text-white"
      style={
        {
          "--page-accent": "var(--brand-spa)",
          "--page-accent-2": "white",
          "--page-accent-rgb": "1, 175, 198",
          "--page-accent-2-rgb": "255, 255, 255",
        } as CSSProperties
      }
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(760px circle at 18% 12%, rgba(var(--page-accent-rgb), 0.22), transparent 58%), radial-gradient(980px circle at 82% 28%, rgba(var(--page-accent-2-rgb), 0.1), transparent 62%), radial-gradient(1100px circle at 50% 100%, rgba(113, 124, 125, 0.12), transparent 60%)",
        }}
      />

      <main className="relative mx-auto w-full max-w-[88rem] px-6 pb-24 pt-32 sm:px-8 sm:pt-36 xl:px-10">
        <section className="grid gap-12 border-b border-white/8 pb-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 lg:self-center">
            <div className="flex items-center gap-3 text-[10px] tracking-[0.32em] text-[var(--brand-spa)]/90">
              <span className="inline-block h-px w-10 bg-[var(--brand-spa)]/60" />
              <span>IN SPA</span>
            </div>

            <div className="mt-7 relative h-14 w-56 sm:h-16 sm:w-72">
              <Image
                src="/logos/inspa.png"
                alt="IN SPA"
                fill
                className="object-contain object-left"
                priority
              />
            </div>

            <h1 className="mt-6 max-w-xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
              Sublimer
              <span className="block italic text-luxe-accent">
                le corps
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-white/70">
              Personnalisez vos expériences avec la réservation en ligne et
              découvrez un univers pensé pour les rituels de détente et de soin.
            </p>

            <div className="mt-9">
              <a
                href="#carte"
                className="btn-frame inline-flex h-11 items-center rounded-full px-6 text-[11px] font-medium tracking-[0.24em] shadow-[0_18px_50px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-0.5"
              >
                DÉCOUVRIR
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 lg:self-center">
            <ReservationFormContainer
              accent="#01afc6"
              title="Mon rendez-vous"
              subtitle="CHOIX DES SERVICES"
              locations={bookingLocations}
            />
          </div>
        </section>

        <section className="grid gap-10 py-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/spa.jpg"
                  alt="IN SPA"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-10">
            <div className="flex items-center gap-3 text-[10px] tracking-[0.32em] text-[var(--brand-spa)]/90">
              <span className="inline-block h-px w-10 bg-[var(--brand-spa)]/60" />
              <span>DÉCOUVREZ</span>
            </div>
            <h2 className="mt-5 max-w-md font-serif text-4xl leading-[0.98] tracking-tight sm:text-6xl">
              IN SPA
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-8 text-white/70">
              À la croisée des dernières techniques dans le monde de la beauté
              et du bien-être, entrez dans un cadre orienté vers le IN SPA pour
              vous ressourcer profondément.
            </p>

            <div className="mt-8 flex items-center gap-3">
              {["f", "x", "◉"].map((icon, index) => (
                <span
                  key={icon + index}
                  className={[
                    "grid size-9 place-items-center rounded-full border bg-white/5 text-sm",
                    index === 2
                      ? "border-[var(--brand-spa)]/35 text-[var(--brand-spa)]"
                      : "border-white/10 text-white/60",
                  ].join(" ")}
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="carte" className="border-t border-white/8 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">
              Notre carte des soins
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Laissez-vous transporter par nos rituels de soin exclusifs alliant
              traditions orientales et techniques de pointe.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-8">
            <div className="text-[10px] tracking-[0.28em] text-[var(--brand-spa)]/90">
              RITUELS &amp; MASSAGES
            </div>

            <div className="mt-6 divide-y divide-white/8">
              {careRows.map((row, index) => (
                <div
                  key={row.title}
                  className="grid gap-3 py-5 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="font-serif text-2xl tracking-tight">
                        {row.title}
                      </div>
                      <div className="mt-1 text-[11px] tracking-[0.2em] text-white/60">
                        {row.subtitle}
                      </div>
                    </div>
                    {index === 1 ? (
                      <span className="mt-3 hidden size-2 rounded-full bg-[var(--brand-spa)] sm:block" />
                    ) : null}
                  </div>
                  <div className="text-sm text-[var(--brand-spa)]">
                    {row.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
