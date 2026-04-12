"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navigation = [
  { label: "LA MAISON DE L'HOMME", href: "/la-maison-de-l-homme" },
  { label: "LA MAISON DE LA FEMME", href: "/la-maison-de-la-femme" },
  { label: "FOR MR & MRS", href: "/#decouvrir" },
  { label: "IN SPA", href: "/#decouvrir" },
  { label: "OÙ NOUS TROUVER", href: "/#localisation" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = menuOpen ? "hidden" : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <div className="mx-auto flex w-full max-w-[88rem] items-center justify-between rounded-full border border-white/10 bg-[color:color-mix(in_srgb,var(--brand-ink)_92%,transparent)] px-4 py-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-6 xl:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-[var(--brand-cyan)]/40 hover:bg-white/10"
              aria-label="Ouvrir le menu"
            >
              <span className="flex flex-col gap-1">
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </span>
            </button>
            <div className="hidden items-center gap-3 text-xs tracking-[0.35em] text-[var(--brand-slate)] sm:flex">
              <button type="button" className="text-white">
                FR
              </button>
              <span className="text-white/30">|</span>
              <button type="button" className="text-[var(--brand-slate)]">
                EN
              </button>
            </div>
          </div>

          <Link href="/" className="relative h-10 w-24 shrink-0 sm:h-12 sm:w-28">
            <Image
              src="/IMH%20BLANC.png"
              alt="IN Beauty & Health"
              fill
              className="object-contain"
              priority
            />
          </Link>

          <a
            href="#footer-contact"
            className="inline-flex h-10 items-center rounded-full border border-white/10 bg-white/3 px-5 text-[10px] font-medium tracking-[0.3em] text-white transition-colors hover:border-[var(--brand-amber)]/45 hover:bg-[var(--brand-amber)]/12 sm:px-8"
          >
            RÉSERVER
          </a>
        </div>
      </header>

      <div
        className={[
          "fixed inset-0 z-[60] bg-black/60 backdrop-blur-md transition duration-300",
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        <button
          type="button"
          aria-label="Fermer le menu"
          onClick={() => setMenuOpen(false)}
          className="absolute inset-0"
        />
        <aside
          className={[
            "relative h-full w-full max-w-[420px] border-r border-white/10 bg-[var(--brand-ink)] px-7 py-8 shadow-[30px_0_120px_rgba(0,0,0,0.55)] transition duration-300 sm:px-8",
            menuOpen ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
        >
          <div className="flex items-center justify-between">
            <div className="relative h-10 w-24 sm:h-12 sm:w-28">
              <Image
                src="/IMH%20BLANC.png"
                alt="IN Beauty & Health"
                fill
                className="object-contain object-left"
              />
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-[var(--brand-cyan)]/40 hover:bg-white/10"
              aria-label="Fermer le menu"
            >
              ✕
            </button>
          </div>

          <nav className="mt-10 rounded-[2rem] border border-white/10 bg-black/40 px-6 py-8 shadow-[0_22px_60px_rgba(0,0,0,0.55)]">
            <ul className="space-y-9 text-[0.92rem] tracking-[0.28em] text-white/80">
              {navigation.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="transition-colors hover:text-[var(--brand-cyan)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-9 border-t border-white/10 pt-8">
              <a
                href="#footer-contact"
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium tracking-[0.22em] text-[var(--brand-amber)]"
              >
                CONTACT
              </a>
            </div>
          </nav>
        </aside>
      </div>
    </>
  );
}
