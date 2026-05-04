export const pageAccents = {
  home: {
    hex: "#717c7d",
    text: "text-[var(--brand-slate)]",
    softText: "text-[var(--brand-slate)]/85",
    line: "bg-[var(--brand-slate)]/60",
    border: "border-[var(--brand-slate)]/35",
    softBg: "bg-[var(--brand-slate)]/10",
    button: "bg-[var(--brand-slate)]",
    buttonHover:
      "hover:bg-[color:color-mix(in_srgb,var(--brand-slate)_88%,white)]",
    ring: "hover:border-[var(--brand-slate)]/45",
  },
  homme: {
    hex: "#f6f4ef",
    text: "text-white",
    softText: "text-white/85",
    line: "bg-white/60",
    border: "border-white/35",
    softBg: "bg-white/10",
    button: "bg-white text-black",
    buttonHover:
      "hover:bg-[color:color-mix(in_srgb,white_88%,var(--brand-slate))]",
    navHover: "hover:text-white",
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
    hex: "#897646",
    text: "text-[var(--brand-mrmrs)]",
    softText: "text-[var(--brand-mrmrs)]/90",
    line: "bg-[var(--brand-mrmrs)]/60",
    border: "border-[var(--brand-mrmrs)]/35",
    softBg: "bg-[var(--brand-mrmrs)]/10",
    button: "bg-[var(--brand-mrmrs)]",
    buttonHover:
      "hover:bg-[color:color-mix(in_srgb,var(--brand-mrmrs)_88%,white)]",
    navHover: "hover:text-[var(--brand-mrmrs)]",
  },
  spa: {
    hex: "#01afc6",
    text: "text-[var(--brand-spa)]",
    softText: "text-[var(--brand-spa)]/90",
    line: "bg-[var(--brand-spa)]/60",
    border: "border-[var(--brand-spa)]/35",
    softBg: "bg-[var(--brand-spa)]/10",
    button: "bg-[var(--brand-spa)]",
    buttonHover:
      "hover:bg-[color:color-mix(in_srgb,var(--brand-spa)_82%,white)]",
    navHover: "hover:text-[var(--brand-spa)]",
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
    hoverClass: "hover:text-[var(--brand-slate)]",
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
