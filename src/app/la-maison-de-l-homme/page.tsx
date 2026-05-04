import Image from "next/image";
import type { CSSProperties } from "react";
import { MaisonHommePricing } from "@/components/maison-homme-pricing";
import { ReservationFormContainer } from "@/components/reservation-form-container";

const team = [
  { name: "Karim Z.", role: "Maître barbier", image: "/maison_homme.jpg" },
  { name: "Mehdi R.", role: "Coiffeur artistique", image: "/Hero02.jpg" },
  { name: "Omar K.", role: "Skin & hair specialist", image: "/Hero03.jpg" },
];

export default function MaisonHommePage() {
  return (
    <div
      className="min-h-full bg-[var(--brand-ink)] text-white"
      style={
        {
          "--page-accent": "var(--foreground)",
          "--page-accent-2": "var(--brand-slate)",
          "--page-accent-rgb": "246, 244, 239",
          "--page-accent-2-rgb": "113, 124, 125",
        } as CSSProperties
      }
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(760px circle at 18% 12%, rgba(var(--page-accent-rgb), 0.2), transparent 58%), radial-gradient(980px circle at 82% 28%, rgba(var(--page-accent-2-rgb), 0.1), transparent 62%), radial-gradient(1100px circle at 50% 100%, rgba(113, 124, 125, 0.12), transparent 60%)",
        }}
      />

      <main className="relative mx-auto w-full max-w-[88rem] px-6 pb-24 pt-32 sm:px-8 sm:pt-36 xl:px-10">
        <section className="grid gap-12 border-b border-white/8 pb-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 lg:self-center">
            <div className="flex items-center gap-3 text-[10px] tracking-[0.32em] text-[var(--page-accent)]/85">
              <span className="inline-block h-px w-10 bg-[var(--page-accent)]/60" />
              <span>LA MAISON DE L&apos;HOMME</span>
            </div>

            <div className="mt-7 relative h-14 w-72 sm:h-16 sm:w-[22rem]">
              <Image
                src="/logos/LA%20MAISON%20DE%20L%27HOMME.png"
                alt="LA MAISON DE L'HOMME"
                fill
                className="object-contain object-left"
                priority
              />
            </div>

            <h1 className="mt-6 max-w-xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
              L&apos;élégance
              <span className="block italic text-luxe-accent">
                au masculin
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-white/70">
              Découvrez notre maison dédiée à l&apos;univers masculin, entre
              coiffure, barbe, soin et relaxation dans un cadre raffiné.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#tarification"
                className="btn-luxe-cta inline-flex h-11 items-center rounded-full px-6 text-[11px] font-medium tracking-[0.24em] text-black shadow-[0_18px_50px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-0.5"
              >
                RÉSERVER
              </a>
              <a
                href="#barbiers"
                className="inline-flex h-11 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 text-[11px] tracking-[0.24em] text-white transition-colors hover:border-[var(--brand-cyan)]/30 hover:bg-white/8"
              >
                NOTRE ÉQUIPE
                <span className="grid size-7 place-items-center rounded-full border border-[var(--brand-cyan)]/30 text-[var(--brand-cyan)]">
                  →
                </span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 lg:self-center">
            <ReservationFormContainer
              accent="#f6f4ef"
              title="Choix des services"
              subtitle="RÉSERVATION PERSONNALISÉE"
              locations={[
                "Maison IN El Biar",
                "Maison IN El Mouradia",
              ]}
            />
          </div>
        </section>

        <section className="grid gap-10 py-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/maison_homme.jpg"
                  alt="La Maison de l'Homme"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-10">
            <div className="flex items-center gap-3 text-[10px] tracking-[0.32em] text-[var(--page-accent)]/85">
              <span className="inline-block h-px w-10 bg-[var(--page-accent)]/60" />
              <span>UN UNIVERS D&apos;EXCEPTION</span>
            </div>

            <h2 className="mt-5 max-w-md font-serif text-4xl leading-[0.98] tracking-tight sm:text-6xl">
              La Maison de l&apos;Homme
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-8 text-white/70">
              Grâce à un protocole sur mesure, La Maison de l&apos;Homme se
              distingue par sa vision du bien-être masculin. Barbering,
              coiffure, soins du visage et relaxation se croisent dans un lieu
              pensé comme un sanctuaire de luxe.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/60">
                ←
              </span>
              <span className="grid size-9 place-items-center rounded-full border border-[var(--page-accent)]/35 bg-[var(--page-accent)]/10 text-[var(--page-accent)]">
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
            <div className="flex items-center justify-center gap-3 text-[10px] tracking-[0.32em] text-[var(--page-accent)]/85">
              <span className="inline-block h-px w-10 bg-[var(--page-accent)]/60" />
              <span>NOS PRESTATIONS</span>
            </div>
            <h2 className="mt-6 font-serif text-4xl tracking-tight sm:text-5xl">
              Notre tarification
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Découvrez notre liste de prestations et de tarifs pensée pour
              répondre au mieux à vos attentes.
            </p>
          </div>
          <MaisonHommePricing />
        </section>

        <section id="barbiers" className="border-t border-white/8 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3 text-[10px] tracking-[0.32em] text-[var(--page-accent)]/85">
              <span className="inline-block h-px w-10 bg-[var(--page-accent)]/60" />
              <span>L&apos;ÉQUIPE</span>
            </div>
            <h2 className="mt-6 font-serif text-4xl tracking-tight sm:text-5xl">
              Nos coiffeurs &amp; barbiers
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Découvrez notre équipe experte à travers des profils pensés pour
              refléter la maison et son savoir-faire.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {team.map((member) => (
              <article
                key={member.name}
                className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                </div>
                <div className="relative -mt-20 px-5 pb-5">
                  <div className="rounded-[1.25rem] border border-white/10 bg-black/55 p-4 backdrop-blur-sm">
                    <div className="font-serif text-xl">{member.name}</div>
                    <div className="mt-1 text-[10px] tracking-[0.24em] text-white/60">
                      {member.role}
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
