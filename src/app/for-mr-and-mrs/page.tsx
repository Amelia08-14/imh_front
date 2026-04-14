import Image from "next/image";
import { ReservationForm } from "@/components/reservation-form";

const bookingServices = [
  "Service",
  "Rituel duo premium",
  "Package hôtel signature",
  "Soin duo & détente",
  "Expérience sur demande",
];

const bookingLocations = [
  "Maison IN Hôtel El Aurassi",
  "Maison IN Hôtel Oran Bay",
  "Maison IN Hôtel privé",
];

const assistants = [
  "Assistant : Peu importe",
  "Équipe Suite Prestige",
  "Équipe Signature Duo",
];

export default function ForMrAndMrsPage() {
  return (
    <div className="min-h-full bg-[var(--brand-ink)] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-55 [background:radial-gradient(700px_circle_at_18%_12%,color-mix(in_srgb,var(--brand-mrmrs)_16%,transparent),transparent_60%),radial-gradient(900px_circle_at_82%_28%,color-mix(in_srgb,var(--brand-amber)_8%,transparent),transparent_60%),radial-gradient(1000px_circle_at_50%_100%,color-mix(in_srgb,var(--brand-slate)_8%,transparent),transparent_60%)]" />

      <main className="relative mx-auto w-full max-w-[88rem] px-6 pb-24 pt-32 sm:px-8 sm:pt-36 xl:px-10">
        <section className="grid gap-12 border-b border-white/8 pb-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 lg:self-center">
            <div className="flex items-center gap-3 text-[10px] tracking-[0.32em] text-[var(--brand-mrmrs)]/90">
              <span className="inline-block h-px w-10 bg-[var(--brand-mrmrs)]/60" />
              <span>FOR MR &amp; MRS</span>
            </div>

            <h1 className="mt-6 max-w-xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
              La beauté
              <span className="block italic text-[var(--brand-mrmrs)]">
                sans frontières
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-[var(--brand-slate)]">
              Personnalisez votre expérience avec la réservation en ligne dans
              un univers pensé pour elle et lui, entre élégance, bien-être et
              services haut de gamme.
            </p>

            <div className="mt-9">
              <a
                href="#decouvrir"
                className="inline-flex h-11 items-center rounded-full bg-[var(--brand-mrmrs)] px-6 text-[11px] font-medium tracking-[0.24em] text-white transition-colors hover:bg-[color:color-mix(in_srgb,var(--brand-mrmrs)_88%,white)]"
              >
                DÉCOUVRIR
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 lg:self-center">
            <ReservationForm
              accent="#ff4f38"
              title="Mon rendez-vous"
              subtitle="CHOIX DES SERVICES"
              locations={bookingLocations}
              services={bookingServices}
              assistants={assistants}
              schedule={[
                {
                  value: "2026-03-27",
                  label: "Jeudi 27/03/2026",
                  times: ["08:00", "19:00", "22:30"],
                },
                {
                  value: "2026-03-28",
                  label: "Vendredi 28/03/2026",
                  times: ["09:00", "18:30", "21:30"],
                },
              ]}
            />
          </div>
        </section>

        <section
          id="decouvrir"
          className="grid gap-10 py-16 lg:grid-cols-12 lg:items-center"
        >
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/mme_mr.jpg"
                  alt="For MR & MRS"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-10">
            <div className="flex items-center gap-3 text-[10px] tracking-[0.32em] text-[var(--brand-mrmrs)]/90">
              <span className="inline-block h-px w-10 bg-[var(--brand-mrmrs)]/60" />
              <span>DÉCOUVREZ</span>
            </div>
            <h2 className="mt-5 max-w-lg font-serif text-4xl leading-[0.98] tracking-tight sm:text-6xl">
              La Maison for MR &amp; MRS
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-8 text-[var(--brand-slate)]">
              Une gamme dédiée spécialement aux hôtels. Des services pour Elle
              &amp; Lui dans un cadre fastueux, où l&apos;élégance se conjugue au
              bien-être absolu pour une expérience inoubliable.
            </p>

            <div className="mt-8 flex items-center gap-3">
              {["f", "x", "◉"].map((icon, index) => (
                <span
                  key={icon + index}
                  className={[
                    "grid size-9 place-items-center rounded-full border bg-white/5 text-sm",
                    index === 2
                      ? "border-[var(--brand-mrmrs)]/35 text-[var(--brand-mrmrs)]"
                      : "border-white/10 text-[var(--brand-slate)]",
                  ].join(" ")}
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
