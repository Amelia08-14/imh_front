"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const slides = [
  { src: "/Hero01.png", alt: "Espace bien-être et détente" },
  { src: "/Hero02.jpg", alt: "Salon de coiffure haut de gamme" },
  { src: "/Hero03.jpg", alt: "Expérience premium IN Beauty & Health" },
];

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(2);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const orderedSlides = useMemo(() => {
    const current = slides[activeIndex];
    const next = slides[(activeIndex + 1) % slides.length];
    const previous = slides[(activeIndex + slides.length - 1) % slides.length];

    return { current, next, previous };
  }, [activeIndex]);

  return (
    <div className="relative mx-auto h-[430px] max-w-[620px] sm:h-[620px]">
      <div className="absolute left-[4%] top-[2%] z-10 h-[42%] w-[46%] overflow-hidden rounded-[2rem] border border-[var(--brand-amber)]/85 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
        <Image
          src={orderedSlides.next.src}
          alt={orderedSlides.next.alt}
          fill
          className="object-cover transition duration-700"
          sizes="(max-width: 640px) 48vw, 280px"
        />
      </div>

      <div className="absolute right-0 top-[13%] h-[70%] w-[58%] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
        <Image
          src={orderedSlides.previous.src}
          alt={orderedSlides.previous.alt}
          fill
          className="object-cover transition duration-700"
          sizes="(max-width: 640px) 60vw, 360px"
        />
      </div>

      <div className="absolute bottom-[14%] left-[10%] z-20 h-[38%] w-[48%] overflow-hidden rounded-[2rem] border border-[var(--brand-amber)]/75 shadow-[0_22px_60px_rgba(0,0,0,0.65)]">
        <Image
          src={orderedSlides.current.src}
          alt={orderedSlides.current.alt}
          fill
          className="object-cover transition duration-700"
          sizes="(max-width: 640px) 52vw, 300px"
        />
      </div>

      <div className="absolute bottom-[20%] left-0 z-30 rounded-[1.5rem] border border-white/10 bg-[color:color-mix(in_srgb,var(--brand-ink)_86%,transparent)] px-6 py-5 shadow-[0_22px_60px_rgba(0,0,0,0.65)] backdrop-blur-sm">
        <div className="mb-2 flex items-center gap-1 text-[var(--brand-amber)]">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index}>★</span>
          ))}
        </div>
        <div className="text-2xl font-semibold tracking-tight">110 300+</div>
        <div className="mt-1 text-xs tracking-[0.24em] text-[var(--brand-slate)]">
          RÉSERVATIONS
        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Voir le visuel ${index + 1}`}
            className={[
              "size-3 rounded-full border transition-colors",
              activeIndex === index
                ? "border-[var(--brand-amber)] bg-[var(--brand-amber)]/70"
                : "border-white/15 bg-white/5",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
