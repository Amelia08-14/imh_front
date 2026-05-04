import type { Metadata } from "next";

import "./globals.css";
import { AppFrame } from "@/components/app-frame";

export const metadata: Metadata = {
  title: "IN Beauty & Health",
  description: "Maisons de beauté et de bien-être haut de gamme en Algérie",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[var(--brand-ink)] text-white">
        <AppFrame>{children}</AppFrame>
      </body>
    </html>
  );
}
