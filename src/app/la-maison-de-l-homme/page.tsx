import Image from "next/image";

const services = [
  "Soin complet & coiffure",
  "Barbe premium",
  "Rasage signature",
  "Coloration",
];

const bookingSteps = [
  "SERVICE",
  "RENDEZ-VOUS",
  "DÉTAILS",
  "PAIEMENT",
  "CONFIRMATION",
];

const pricingTabs = [
  "Coiffures",
  "Couleurs",
  "Brushing",
  "Finishing",
  "Soins de visage",
  "Soins capillaires",
];

const pricingRows = [
  { title: "Coupe Adulte", subtitle: "Coiffure & mise en forme", price: "à partir de 2000 DA" },
  { title: "Coupe Enfant", subtitle: "Finition nette et rapide", price: "500 DA" },
  { title: "Contour & Barbe", subtitle: "Traçage et entretien", price: "600 DA" },
  { title: "Rasage Premium", subtitle: "Serviette chaude & finition", price: "900 DA" },
];

const team = [
  { name: "Karim Z.", role: "Maître barbier", image: "/maison_homme.jpg" },
  { name: "Mehdi R.", role: "Coiffeur artistique", image: "/Hero02.jpg" },
  { name: "Omar K.", role: "Skin & hair specialist", image: "/Hero03.jpg" },
];

export default function MaisonHommePage() {
  return (
    <div className="min-h-full bg-[var(--brand-ink)] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-55 [background:radial-gradient(700px_circle_at_18%_12%,color-mix(in_srgb,var(--brand-amber)_14%,transparent),transparent_60%),radial-gradient(900px_circle_at_82%_28%,color-mix(in_srgb,var(--brand-cyan)_8%,transparent),transparent_60%),radial-gradient(1000px_circle_at_50%_100%,color-mix(in_srgb,var(--brand-slate)_8%,transparent),transparent_60%)]" />

      <main className="relative mx-auto w-full max-w-[88rem] px-6 pb-24 pt-32 sm:px-8 sm:pt-36 xl:px-10">
        <section className="grid gap-12 border-b border-white/8 pb-16 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 text-[10px] tracking-[0.32em] text-[var(--brand-amber)]/85">
              <span className="inline-block h-px w-10 bg-[var(--brand-amber)]/60" />
              <span>LA MAISON DE L&apos;HOMME</span>
            </div>

            <h1 className="mt-6 max-w-xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
              L&apos;élégance
              <span className="block italic text-[var(--brand-amber)]">
                au masculin
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-[var(--brand-slate)]">
              Découvrez notre maison dédiée à l&apos;univers masculin, entre
              coiffure, barbe, soin et relaxation dans un cadre raffiné.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#tarification"
                className="inline-flex h-11 items-center rounded-full bg-[var(--brand-amber)] px-6 text-[11px] font-medium tracking-[0.24em] text-white transition-colors hover:bg-[color:color-mix(in_srgb,var(--brand-amber)_88%,white)]"
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

          <div className="lg:col-span-6">
            <div className="ml-auto max-w-[42rem] rounded-[2.25rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:p-8">
              <div className="relative flex items-center justify-between gap-3 overflow-hidden pb-6">
                <div className="absolute left-0 right-0 top-2 h-px bg-white/8" />
                {bookingSteps.map((step, index) => (
                  <div
                    key={step}
                    className="relative z-10 flex flex-col items-center gap-3"
                  >
                    <span
                      className={[
                        "grid size-4 place-items-center rounded-full border text-[8px]",
                        index === 0
                          ? "border-[var(--brand-amber)] bg-[var(--brand-amber)] text-white"
                          : "border-white/10 bg-[var(--brand-ink)] text-transparent",
                      ].join(" ")}
                    >
                      •
                    </span>
                    <span
                      className={[
                        "text-[10px] tracking-[0.2em]",
                        index === 0
                          ? "text-[var(--brand-amber)]"
                          : "text-white/30",
                      ].join(" ")}
                    >
                      {`${index + 1}. ${step}`}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <div className="font-serif text-[2.6rem] leading-none tracking-tight">
                  Choix des services
                </div>
              </div>

              <div className="mt-8 space-y-5">
                <div className="relative">
                  <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[var(--brand-slate)]">
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
                  <select className="h-16 w-full appearance-none rounded-[1.4rem] border border-white/10 bg-black/20 px-14 pr-14 text-base text-[var(--brand-slate)] outline-none">
                    <option>Maison IN (Location)</option>
                  </select>
                  <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[var(--brand-slate)]">
                    ˅
                  </span>
                </div>

                <div className="relative">
                  <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[var(--brand-slate)]">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 7h6M4 17h6M14 7h6M14 17h6M9 4l6 16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <select className="h-16 w-full appearance-none rounded-[1.4rem] border border-white/10 bg-black/20 px-14 pr-14 text-base text-[var(--brand-slate)] outline-none">
                    <option>Service</option>
                    {services.map((service) => (
                      <option key={service}>{service}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[var(--brand-slate)]">
                    ˅
                  </span>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="relative">
                    <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[var(--brand-slate)]">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M12 12a3 3 0 100-6 3 3 0 000 6z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M5 20c1.7-3 4-4.5 7-4.5S17.3 17 19 20"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <select className="h-16 w-full appearance-none rounded-[1.4rem] border border-white/10 bg-black/20 px-14 pr-14 text-base text-[var(--brand-slate)] outline-none">
                      <option>Assistant: Peu importe</option>
                    </select>
                    <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[var(--brand-slate)]">
                      ˅
                    </span>
                  </div>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[var(--brand-slate)]">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M12 8v4l3 2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <select className="h-16 w-full appearance-none rounded-[1.4rem] border border-white/10 bg-black/20 px-14 pr-14 text-base text-[var(--brand-slate)] outline-none">
                      <option>Date & Heure</option>
                    </select>
                    <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[var(--brand-slate)]">
                      ˅
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mt-8 inline-flex h-14 w-full items-center justify-center rounded-[1.25rem] bg-white px-6 text-[11px] font-medium tracking-[0.24em] text-black transition-colors hover:bg-white/90"
              >
                VÉRIFIER LES DISPONIBILITÉS
              </button>
            </div>
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
            <div className="flex items-center gap-3 text-[10px] tracking-[0.32em] text-[var(--brand-amber)]/85">
              <span className="inline-block h-px w-10 bg-[var(--brand-amber)]/60" />
              <span>UN UNIVERS D&apos;EXCEPTION</span>
            </div>

            <h2 className="mt-5 max-w-md font-serif text-4xl leading-[0.98] tracking-tight sm:text-6xl">
              La Maison de l&apos;Homme
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-8 text-[var(--brand-slate)]">
              Grâce à un protocole sur mesure, La Maison de l&apos;Homme se
              distingue par sa vision du bien-être masculin. Barbering,
              coiffure, soins du visage et relaxation se croisent dans un lieu
              pensé comme un sanctuaire de luxe.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-[var(--brand-slate)]">
                ←
              </span>
              <span className="grid size-9 place-items-center rounded-full border border-[var(--brand-amber)]/35 bg-[var(--brand-amber)]/10 text-[var(--brand-amber)]">
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
            <div className="flex items-center justify-center gap-3 text-[10px] tracking-[0.32em] text-[var(--brand-amber)]/85">
              <span className="inline-block h-px w-10 bg-[var(--brand-amber)]/60" />
              <span>NOS PRESTATIONS</span>
            </div>
            <h2 className="mt-6 font-serif text-4xl tracking-tight sm:text-5xl">
              Notre tarification
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-slate)]">
              Découvrez notre liste de prestations et de tarifs pensée pour
              répondre au mieux à vos attentes.
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
                      ? "bg-[var(--brand-amber)] text-white"
                      : "border border-white/10 bg-white/4 text-[var(--brand-slate)] hover:text-white",
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
                    <div className="mt-1 text-[11px] tracking-[0.2em] text-[var(--brand-slate)]">
                      {row.subtitle}
                    </div>
                  </div>
                  <div className="text-sm text-[var(--brand-amber)]">
                    {row.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="barbiers" className="border-t border-white/8 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3 text-[10px] tracking-[0.32em] text-[var(--brand-amber)]/85">
              <span className="inline-block h-px w-10 bg-[var(--brand-amber)]/60" />
              <span>L&apos;ÉQUIPE</span>
            </div>
            <h2 className="mt-6 font-serif text-4xl tracking-tight sm:text-5xl">
              Nos coiffeurs &amp; barbiers
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-slate)]">
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
                    <div className="mt-1 text-[10px] tracking-[0.24em] text-[var(--brand-slate)]">
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
