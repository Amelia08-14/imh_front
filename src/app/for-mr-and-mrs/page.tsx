import Image from "next/image";
import type { CSSProperties } from "react";
import { ReservationFormContainer } from "@/components/reservation-form-container";

const bookingLocations = [
  "Maison IN Hôtel El Aurassi",
  "Maison IN Hôtel Oran Bay",
  "Maison IN Hôtel privé",
];

export default function ForMrAndMrsPage() {
  return (
    <div
      className="min-h-full bg-[var(--brand-ink)] text-white"
      style={
        {
          "--page-accent": "var(--brand-mrmrs)",
          "--page-accent-2": "white",
          "--page-accent-rgb": "137, 118, 70",
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
            <div className="flex items-center gap-3 text-[10px] tracking-[0.32em] text-[var(--brand-mrmrs)]/90">
              <span className="inline-block h-px w-10 bg-[var(--brand-mrmrs)]/60" />
              <span>FOR MR &amp; MRS</span>
            </div>

            <div className="mt-7 relative h-14 w-72 sm:h-16 sm:w-[22rem]">
              <Image
                src="/logos/La%20Maison%20MR%20%26%20MRS.png"
                alt="La Maison MR & MRS"
                fill
                className="object-contain object-left"
                priority
              />
            </div>

            <h1 className="mt-6 max-w-xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
              La beauté
              <span className="block italic text-luxe-accent">
                sans frontières
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-white/70">
              Personnalisez votre expérience avec la réservation en ligne dans
              un univers pensé pour elle et lui, entre élégance, bien-être et
              services haut de gamme.
            </p>

            <div className="mt-9">
              <a
                href="#decouvrir"
                className="btn-frame inline-flex h-11 items-center rounded-full px-6 text-[11px] font-medium tracking-[0.24em] shadow-[0_18px_50px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-0.5"
              >
                DÉCOUVRIR
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 lg:self-center">
            <ReservationFormContainer
              accent="#897646"
              title="Mon rendez-vous"
              subtitle="CHOIX DES SERVICES"
              locations={bookingLocations}
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
            <p className="mt-6 max-w-xl text-sm leading-8 text-white/70">
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
                      : "border-white/10 text-white/60",
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
