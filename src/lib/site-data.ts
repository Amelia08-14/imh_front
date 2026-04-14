export const pageAccents = {
  home: {
    hex: "#b66b00",
    text: "text-[var(--brand-amber)]",
    softText: "text-[var(--brand-amber)]/85",
    line: "bg-[var(--brand-amber)]/60",
    border: "border-[var(--brand-amber)]/35",
    softBg: "bg-[var(--brand-amber)]/10",
    button: "bg-[var(--brand-amber)]",
    buttonHover:
      "hover:bg-[color:color-mix(in_srgb,var(--brand-amber)_88%,white)]",
    ring: "hover:border-[var(--brand-amber)]/45",
  },
  homme: {
    hex: "#b66b00",
    text: "text-[var(--brand-amber)]",
    softText: "text-[var(--brand-amber)]/85",
    line: "bg-[var(--brand-amber)]/60",
    border: "border-[var(--brand-amber)]/35",
    softBg: "bg-[var(--brand-amber)]/10",
    button: "bg-[var(--brand-amber)]",
    buttonHover:
      "hover:bg-[color:color-mix(in_srgb,var(--brand-amber)_88%,white)]",
    navHover: "hover:text-[var(--brand-amber)]",
  },
  femme: {
    hex: "#b4918f",
    text: "text-[var(--brand-femme)]",
    softText: "text-[var(--brand-femme)]/90",
    line: "bg-[var(--brand-femme)]/60",
    border: "border-[var(--brand-femme)]/35",
    softBg: "bg-[var(--brand-femme)]/10",
    button: "bg-[var(--brand-femme)]",
    buttonHover:
      "hover:bg-[color:color-mix(in_srgb,var(--brand-femme)_86%,white)]",
    navHover: "hover:text-[var(--brand-femme)]",
  },
  mrmrs: {
    hex: "#ff4f38",
    text: "text-[var(--brand-coral)]",
    softText: "text-[var(--brand-coral)]/90",
    line: "bg-[var(--brand-coral)]/60",
    border: "border-[var(--brand-coral)]/35",
    softBg: "bg-[var(--brand-coral)]/10",
    button: "bg-[var(--brand-coral)]",
    buttonHover:
      "hover:bg-[color:color-mix(in_srgb,var(--brand-coral)_88%,white)]",
    navHover: "hover:text-[var(--brand-coral)]",
  },
  spa: {
    hex: "#00b0c7",
    text: "text-[var(--brand-cyan)]",
    softText: "text-[var(--brand-cyan)]/90",
    line: "bg-[var(--brand-cyan)]/60",
    border: "border-[var(--brand-cyan)]/35",
    softBg: "bg-[var(--brand-cyan)]/10",
    button: "bg-[var(--brand-cyan)]",
    buttonHover:
      "hover:bg-[color:color-mix(in_srgb,var(--brand-cyan)_82%,white)]",
    navHover: "hover:text-[var(--brand-cyan)]",
  },
} as const;

export const siteNavigation = [
  {
    label: "LA MAISON DE L'HOMME",
    href: "/la-maison-de-l-homme",
    hoverClass: pageAccents.homme.navHover,
  },
  {
    label: "LA MAISON DE LA FEMME",
    href: "/la-maison-de-la-femme",
    hoverClass: pageAccents.femme.navHover,
  },
  {
    label: "FOR MR & MRS",
    href: "/for-mr-and-mrs",
    hoverClass: pageAccents.mrmrs.navHover,
  },
  {
    label: "IN SPA",
    href: "/in-spa",
    hoverClass: pageAccents.spa.navHover,
  },
  {
    label: "OÙ NOUS TROUVER",
    href: "/#localisation",
    hoverClass: "hover:text-[var(--brand-amber)]",
  },
] as const;

export const footerGroups = [
  {
    title: "NOS MAISONS",
    links: [
      { label: "La Maison de l'Homme", href: "/la-maison-de-l-homme" },
      { label: "La Maison de la Femme", href: "/la-maison-de-la-femme" },
      { label: "For Mr & Mrs", href: "/for-mr-and-mrs" },
      { label: "La Maison Spa", href: "/in-spa" },
    ],
  },
  {
    title: "DÉCOUVRIR",
    links: [
      { label: "Carte des services", href: "/#decouvrir" },
      { label: "Nos emplacements", href: "/#localisation" },
      { label: "Devenir franchisé", href: "/contact" },
      { label: "Réserver un soin", href: "/contact" },
      { label: "Contactez-nous", href: "/contact" },
    ],
  },
] as const;

export const socialLinks = [
  { label: "Instagram", short: "IG", href: "#" },
  { label: "Facebook", short: "f", href: "#" },
] as const;
