"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import OurVision from "@/components/OurVision";

const TITLE = "COMING SOON";
const INSTAGRAM_URL = "https://www.instagram.com/wearsukoon.om/";

/** Full-page fashion backdrop — swap path to change campaign visual. */
const HERO_IMAGE = {
  src: "/sukoon-fabric-hero.jpg",
  alt: "",
  width: 1600,
  height: 900,
} as const;

const LOGO = {
  src: "/sukoon-logo.png",
  alt: "Sukoon",
  width: 839,
  height: 429,
} as const;

export default function ComingSoon() {
  const heroRef = useRef<HTMLElement>(null);
  const backdropMediaRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const parallax = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const rafRef = useRef<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(motionQuery.matches);
    sync();
    motionQuery.addEventListener("change", sync);
    return () => motionQuery.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const ensureTick = useCallback(() => {
    if (rafRef.current != null) return;

    const tick = () => {
      const p = parallax.current;
      p.tx += (p.x - p.tx) * 0.08;
      p.ty += (p.y - p.ty) * 0.08;

      if (backdropMediaRef.current) {
        backdropMediaRef.current.style.transform = `translate3d(${p.tx * 6}px, ${p.ty * 4}px, 0)`;
      }
      if (copyRef.current) {
        copyRef.current.style.transform = `translate3d(${p.tx * -1.5}px, ${p.ty * -1}px, 0)`;
      }

      const still =
        Math.abs(p.x - p.tx) < 0.001 && Math.abs(p.y - p.ty) < 0.001;
      if (!still) rafRef.current = requestAnimationFrame(tick);
      else rafRef.current = null;
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const onHeroMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (reducedMotion) return;
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;

      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      parallax.current.x = Math.max(-1, Math.min(1, nx));
      parallax.current.y = Math.max(-1, Math.min(1, ny));
      ensureTick();
    },
    [reducedMotion, ensureTick],
  );

  const onHeroLeave = useCallback(() => {
    parallax.current.x = 0;
    parallax.current.y = 0;
    ensureTick();
  }, [ensureTick]);

  const scrollToVision = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById("our-vision");
    if (!target) return;
    target.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <>
      <div className="noise" aria-hidden="true" />

      <div className="page-backdrop" aria-hidden="true">
        <div ref={backdropMediaRef} className="page-backdrop__media">
          <div className="hero-media absolute inset-0">
            <Image
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              fill
              priority
              quality={70}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        </div>
        <div className="page-backdrop__wash" />
        <div className="page-backdrop__vignette" />
      </div>

      <nav className="site-nav" aria-label="Primary">
        <a
          href="#our-vision"
          onClick={scrollToVision}
          className="site-nav__link"
        >
          Our Vision
        </a>
      </nav>

      <div className="relative z-10">
        <section
          ref={heroRef}
          onMouseMove={onHeroMove}
          onMouseLeave={onHeroLeave}
          className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-24 sm:px-10"
          aria-label="Coming soon"
        >
          <div
            ref={copyRef}
            className="relative z-10 flex w-full max-w-[900px] flex-col items-center text-center"
          >
            <div className="logo-reveal relative mx-auto mb-10 w-[min(72vw,340px)] sm:mb-12 sm:w-[min(50vw,400px)] md:mb-14 md:w-[420px]">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(244,239,230,0.5)_0%,rgba(244,239,230,0)_70%)]"
                aria-hidden="true"
              />
              <Image
                src={LOGO.src}
                alt={LOGO.alt}
                width={LOGO.width}
                height={LOGO.height}
                priority
                className="relative h-auto w-full select-none"
                sizes="(max-width: 640px) 72vw, 420px"
              />
            </div>

            <h1
              className="whitespace-nowrap font-sans text-[clamp(1.35rem,5.2vw,3.75rem)] font-normal uppercase leading-none tracking-[0.22em] text-ink sm:tracking-[0.3em] md:tracking-[0.34em]"
              aria-label="Coming Soon"
            >
              <span className="inline-block pl-[0.22em] sm:pl-[0.3em] md:pl-[0.34em]">
                {TITLE.split("").map((char, index) => (
                  <span
                    key={`${char}-${index}`}
                    className="char"
                    style={
                      {
                        animationDelay: `${0.85 + index * 0.04}s`,
                      } as CSSProperties
                    }
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            </h1>

            <p className="tagline-reveal mt-6 font-display text-[1.05rem] font-light italic tracking-wide text-brown sm:mt-7 sm:text-[1.2rem]">
              Something worth waiting for.
            </p>
          </div>
        </section>

        <OurVision />

        <footer className="site-footer">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ig-link ig-reveal font-sans text-[0.62rem] font-light tracking-[0.18em] text-chocolate/80 transition-colors duration-500 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brown sm:text-[0.68rem]"
            aria-label="Sukoon on Instagram, @wearsukoon.om"
          >
            @wearsukoon.om
          </a>
        </footer>
      </div>
    </>
  );
}
