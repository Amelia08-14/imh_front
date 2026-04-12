import Image from "next/image";

const services = [
  "Coiffure & brushing",
  "Coloration sur-mesure",
  "Soin cheveux & détente",
  "Beauté des mains",
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
    <div className="min-h-full bg-[var(--brand-ink)] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-55 [background:radial-gradient(700px_circle_at_18%_12%,rgba(216,150,184,0.16),transparent_60%),radial-gradient(900px_circle_at_82%_28%,rgba(230,181,205,0.08),transparent_60%),radial-gradient(1000px_circle_at_50%_100%,color-mix(in_srgb,var(--brand-slate)_8%,transparent),transparent_60%)]" />

      <main className="relative mx-auto w-full max-w-[88rem] px-6 pb-24 pt-32 sm:px-8 sm:pt-36 xl:px-10">
        <section className="grid gap-12 border-b border-white/8 pb-16 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 text-[10px] tracking-[0.32em] text-[#d896b8]/90">
              <span className="inline-block h-px w-10 bg-[#d896b8]/60" />
              <span>LA MAISON DE LA FEMME</span>
            </div>

            <h1 className="mt-6 max-w-xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
              Révélez votre
              <span className="block italic text-[#d896b8]">
                féminité
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-[var(--brand-slate)]">
              La première franchise de soins et d&apos;instituts au féminin.
              Plongez dans un univers où la coiffure, l&apos;esthétique et le
              bien-être prennent soin de vous.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#tarification"
                className="inline-flex h-11 items-center rounded-full bg-[#d896b8] px-6 text-[11px] font-medium tracking-[0.24em] text-white transition-colors hover:bg-[#e1abc7]"
              >
                DÉCOUVRIR
              </a>
              <a
                href="#expertes"
                className="inline-flex h-11 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 text-[11px] tracking-[0.24em] text-white transition-colors hover:border-[#d896b8]/30 hover:bg-white/8"
              >
                NOS EXPERTES
                <span className="grid size-7 place-items-center rounded-full border border-[#d896b8]/30 text-[#d896b8]">
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
                          ? "border-[#d896b8] bg-[#d896b8] text-white"
                          : "border-white/10 bg-[var(--brand-ink)] text-transparent",
                      ].join(" ")}
                    >
                      •
                    </span>
                    <span
                      className={[
                        "text-[10px] tracking-[0.2em]",
                        index === 0
                          ? "text-[#d896b8]"
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
                      <option>Expert: Peu importe</option>
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
            <div className="flex items-center gap-3 text-[10px] tracking-[0.32em] text-[#d896b8]/90">
              <span className="inline-block h-px w-10 bg-[#d896b8]/60" />
              <span>UN UNIVERS D&apos;EXCELLENCE</span>
            </div>

            <h2 className="mt-5 max-w-md font-serif text-4xl leading-[0.98] tracking-tight sm:text-6xl">
              La Maison de la Femme
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-8 text-[var(--brand-slate)]">
              Pour une parenthèse de détente et de bien-être, La Maison de la
              Femme est un espace dédié à la beauté féminine. Découvrez des
              prestations de beauté et de relaxation dans un cadre luxueux dédié
              à votre sérénité.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-[var(--brand-slate)]">
                ←
              </span>
              <span className="grid size-9 place-items-center rounded-full border border-[#d896b8]/35 bg-[#d896b8]/10 text-[#d896b8]">
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
            <div className="flex items-center justify-center gap-3 text-[10px] tracking-[0.32em] text-[#d896b8]/90">
              <span className="inline-block h-px w-10 bg-[#d896b8]/60" />
              <span>NOS PRESTATIONS</span>
            </div>
            <h2 className="mt-6 font-serif text-4xl tracking-tight sm:text-5xl">
              Notre Tarification
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-slate)]">
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
                      ? "bg-[#d896b8] text-white"
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
                  <div className="text-sm text-[#d896b8]">
                    {row.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="expertes" className="border-t border-white/8 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3 text-[10px] tracking-[0.32em] text-[#d896b8]/90">
              <span className="inline-block h-px w-10 bg-[#d896b8]/60" />
              <span>L&apos;EXCELLENCE</span>
            </div>
            <h2 className="mt-6 font-serif text-4xl tracking-tight sm:text-5xl">
              Nos Expertes
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-slate)]">
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
                    <div className="mt-1 text-[10px] tracking-[0.24em] text-[var(--brand-slate)]">
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
