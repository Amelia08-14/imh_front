import Image from "next/image";
import Link from "next/link";
import { footerGroups, socialLinks } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer
      id="footer-contact"
      className="relative mt-28 border-t border-white/10 bg-[var(--brand-ink)]"
    >
      <div className="mx-auto grid w-full max-w-[88rem] gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[1.2fr_1fr_1fr_1fr] xl:px-10">
        <div>
          <Link href="/" className="relative block h-12 w-28">
            <Image
              src="/IMH%20BLANC.png"
              alt="IN Beauty & Health"
              fill
              className="object-contain object-left"
            />
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-8 text-[var(--brand-slate)]">
            Le premier réseau de maisons de beauté et de bien-être haut de
            gamme en Algérie. L&apos;excellence et le luxe au service de votre
            sérénité.
          </p>

          <div className="mt-8">
            <div className="text-xs tracking-[0.35em] text-[var(--brand-slate)]">
              SUIVEZ-NOUS
            </div>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className="grid size-11 place-items-center rounded-full border border-white/10 text-sm text-[var(--brand-slate)] transition-colors hover:border-[var(--brand-amber)]/50 hover:text-[var(--brand-amber)]"
                >
                  {link.short}
                </a>
              ))}
            </div>
          </div>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <div className="flex items-center gap-3 text-xs tracking-[0.32em] text-[var(--brand-amber)]">
              <span className="inline-block h-px w-6 bg-[var(--brand-amber)]/60" />
              <span>{group.title}</span>
            </div>
            <ul className="mt-7 space-y-4 text-[var(--brand-slate)]">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <div className="space-y-5 text-[var(--brand-slate)]">
            <div className="flex items-start gap-4">
              <span className="grid size-10 place-items-center rounded-full border border-white/10">
                <svg
                  width="16"
                  height="16"
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
              <p className="max-w-[12rem] leading-7">
                Résidence Zemoun Youcef,
                <br />
                El Biar
                <br />
                Alger, Algérie
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="grid size-10 place-items-center rounded-full border border-white/10">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2a1 1 0 011-.24c1.1.37 2.28.56 3.5.56a1 1 0 011 1V20a1 1 0 01-1 1C10.85 21 3 13.15 3 3.5a1 1 0 011-1H7.5a1 1 0 011 1c0 1.22.19 2.4.56 3.5a1 1 0 01-.24 1l-2.22 2.8z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <a
                href="tel:+2130555000000"
                className="transition-colors hover:text-white"
              >
                +213 (0) 555 00 00 00
              </a>
            </div>

            <div className="flex items-center gap-4">
              <span className="grid size-10 place-items-center rounded-full border border-white/10">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M4 6.5h16v11H4v-11z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M4.5 7l7.5 6 7.5-6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
              <a
                href="mailto:contact@inbeauty.dz"
                className="transition-colors hover:text-white"
              >
                contact@inbeauty.dz
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[88rem] flex-col gap-4 px-6 py-6 text-xs tracking-[0.18em] text-[var(--brand-slate)] sm:flex-row sm:items-center sm:justify-between sm:px-8 xl:px-10">
          <div>© 2026 IN BEAUTY &amp; HEALTH. TOUS DROITS RÉSERVÉS.</div>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#" className="transition-colors hover:text-white/60">
              MENTIONS LÉGALES
            </a>
            <a href="#" className="transition-colors hover:text-white/60">
              CONFIDENTIALITÉ
            </a>
            <a href="#" className="transition-colors hover:text-white/60">
              CGV
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
