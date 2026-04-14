export default function ContactPage() {
  const infoCards = [
    {
      title: "Nos Salons",
      body: "Alger Centre, Hydra\nOran, Sidi Bel Abbès\nVoir la liste complète sur la carte",
      icon: "⌖",
    },
    {
      title: "Téléphone",
      body: "Principal: +213 550 00 00 00\nService Client: +213 550 00 00 01",
      icon: "◔",
    },
    {
      title: "Email",
      body: "contact@inbeauty.dz\nfranchise@inbeauty.dz",
      icon: "✉",
    },
    {
      title: "Horaires",
      body: "Tous les jours: 09:00 - 20:00\nVendredi: 14:00 - 21:00",
      icon: "◷",
    },
  ];

  return (
    <div className="min-h-full bg-[var(--brand-ink)] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-55 [background:radial-gradient(700px_circle_at_18%_12%,color-mix(in_srgb,var(--brand-amber)_14%,transparent),transparent_60%),radial-gradient(900px_circle_at_82%_28%,color-mix(in_srgb,var(--brand-amber)_8%,transparent),transparent_60%),radial-gradient(1000px_circle_at_50%_100%,color-mix(in_srgb,var(--brand-slate)_8%,transparent),transparent_60%)]" />

      <main className="relative mx-auto w-full max-w-[88rem] px-6 pb-24 pt-32 sm:px-8 sm:pt-36 xl:px-10">
        <section className="text-center">
          <div className="flex items-center justify-center gap-3 text-[10px] tracking-[0.32em] text-[var(--brand-amber)]/90">
            <span className="inline-block h-px w-10 bg-[var(--brand-amber)]/60" />
            <span>RESTEZ EN CONTACT</span>
            <span className="inline-block h-px w-10 bg-[var(--brand-amber)]/60" />
          </div>
          <h1 className="mt-6 font-serif text-5xl tracking-tight sm:text-7xl">
            Écrivez-nous
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[var(--brand-slate)]">
            Une question, une demande de réservation de groupe ou un besoin
            d&apos;information sur nos franchises ? Notre équipe est à votre
            disposition.
          </p>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-8">
            <h2 className="font-serif text-3xl tracking-tight">
              Envoyer un message
            </h2>

            <form className="mt-8 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] tracking-[0.24em] text-[var(--brand-slate)]">
                    NOM COMPLET
                  </label>
                  <input
                    className="mt-2 h-12 w-full rounded-[1rem] border border-white/10 bg-black/20 px-4 text-sm outline-none placeholder:text-white/25"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.24em] text-[var(--brand-slate)]">
                    TÉLÉPHONE
                  </label>
                  <input
                    className="mt-2 h-12 w-full rounded-[1rem] border border-white/10 bg-black/20 px-4 text-sm outline-none placeholder:text-white/25"
                    placeholder="+213 XXX XX XX XX"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] tracking-[0.24em] text-[var(--brand-slate)]">
                  ADRESSE EMAIL
                </label>
                <input
                  className="mt-2 h-12 w-full rounded-[1rem] border border-white/10 bg-black/20 px-4 text-sm outline-none placeholder:text-white/25"
                  placeholder="vous@example.com"
                />
              </div>

              <div>
                <label className="text-[10px] tracking-[0.24em] text-[var(--brand-slate)]">
                  SUJET
                </label>
                <input className="mt-2 h-12 w-full rounded-[1rem] border border-white/10 bg-black/20 px-4 text-sm outline-none" />
              </div>

              <div>
                <label className="text-[10px] tracking-[0.24em] text-[var(--brand-slate)]">
                  MESSAGE
                </label>
                <textarea
                  className="mt-2 min-h-36 w-full rounded-[1rem] border border-white/10 bg-black/20 px-4 py-4 text-sm outline-none placeholder:text-white/25"
                  placeholder="Comment pouvons-nous vous aider ?"
                />
              </div>

              <button
                type="button"
                className="inline-flex h-12 w-full items-center justify-center rounded-[1rem] bg-[var(--brand-amber)] px-6 text-[11px] font-medium tracking-[0.24em] text-black transition-colors hover:bg-[color:color-mix(in_srgb,var(--brand-amber)_88%,white)]"
              >
                ENVOYER LE MESSAGE
              </button>
            </form>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {infoCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="grid size-10 place-items-center rounded-full border border-[var(--brand-amber)]/35 bg-[var(--brand-amber)]/10 text-[var(--brand-amber)]">
                  {card.icon}
                </div>
                <h2 className="mt-5 font-serif text-3xl tracking-tight">
                  {card.title}
                </h2>
                <p className="mt-4 whitespace-pre-line text-sm leading-8 text-[var(--brand-slate)]">
                  {card.body}
                </p>
              </article>
            ))}

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:col-span-2">
              <div className="text-[10px] tracking-[0.24em] text-[var(--brand-slate)]">
                SUIVEZ-NOUS
              </div>
              <div className="mt-5 flex items-center gap-3">
                {["IG", "f", "x"].map((social) => (
                  <span
                    key={social}
                    className="grid size-10 place-items-center rounded-full border border-white/10 text-[var(--brand-slate)]"
                  >
                    {social}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
