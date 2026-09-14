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

const TITLE = "COMING SOON";
const INSTAGRAM_URL = "https://www.instagram.com/wearsukoon.om/";

/** Swap this path to replace the fashion hero without redesigning the page. */
const HERO_IMAGE = {
  src: "/sukoon-fabric-hero.jpg",
  alt: "Editorial close-up of cream and brown Sukoon fabrics",
  width: 1280,
  height: 720,
} as const;

const LOGO = {
  src: "/sukoon-logo.png",
  alt: "Sukoon",
  width: 839,
  height: 429,
} as const;

export default function ComingSoon() {
  const stageRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  const parallax = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const cursorPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  const [customCursor, setCustomCursor] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const sync = () => {
      setReducedMotion(motionQuery.matches);
      setCustomCursor(pointerQuery.matches && !motionQuery.matches);
    };

    sync();
    motionQuery.addEventListener("change", sync);
    pointerQuery.addEventListener("change", sync);
    return () => {
      motionQuery.removeEventListener("change", sync);
      pointerQuery.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("has-custom-cursor", customCursor);
    return () => {
      document.documentElement.classList.remove(
        "has-custom-cursor",
        "cursor-hover",
      );
    };
  }, [customCursor]);

  useEffect(() => {
    if (reducedMotion) return;

    let frame = 0;
    const tick = () => {
      const p = parallax.current;
      p.tx += (p.x - p.tx) * 0.07;
      p.ty += (p.y - p.ty) * 0.07;

      if (mediaRef.current) {
        mediaRef.current.style.transform = `translate3d(${p.tx * 14}px, ${p.ty * 9}px, 0)`;
      }
      if (copyRef.current) {
        copyRef.current.style.transform = `translate3d(${p.tx * -2.5}px, ${p.ty * -1.8}px, 0)`;
      }

      if (customCursor && cursorDotRef.current && cursorRingRef.current) {
        ringPos.current.x += (cursorPos.current.x - ringPos.current.x) * 0.16;
        ringPos.current.y += (cursorPos.current.y - ringPos.current.y) * 0.16;
        cursorDotRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion, customCursor]);

  const onStageMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const rect = stageRef.current?.getBoundingClientRect();
      if (!rect) return;

      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      parallax.current.x = Math.max(-1, Math.min(1, nx));
      parallax.current.y = Math.max(-1, Math.min(1, ny));
    },
    [reducedMotion],
  );

  const onStageLeave = useCallback(() => {
    parallax.current.x = 0;
    parallax.current.y = 0;
  }, []);

  useEffect(() => {
    if (!customCursor) return;
    const onMove = (event: globalThis.MouseEvent) => {
      cursorPos.current.x = event.clientX;
      cursorPos.current.y = event.clientY;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [customCursor]);

  const setHover = (active: boolean) => {
    document.documentElement.classList.toggle("cursor-hover", active);
  };

  return (
    <>
      <div className="noise" aria-hidden="true" />
      {customCursor ? (
        <>
          <div ref={cursorDotRef} className="cursor-dot" aria-hidden="true" />
          <div ref={cursorRingRef} className="cursor-ring" aria-hidden="true" />
        </>
      ) : null}

      <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-milk px-3 py-6 sm:px-8 sm:py-10 md:px-12">
        <div
          className="ambient-light left-[6%] top-[10%]"
          aria-hidden="true"
        />
        <div
          className="ambient-light bottom-[6%] right-[4%]"
          style={{ animationDelay: "-11s" } as CSSProperties}
          aria-hidden="true"
        />

        <div
          ref={stageRef}
          onMouseMove={onStageMove}
          onMouseLeave={onStageLeave}
          className="stage relative flex h-[min(92dvh,980px)] w-full max-w-[1280px] flex-col overflow-hidden rounded-[2px] bg-cream md:h-[min(86dvh,860px)]"
        >
          {/* Fashion hero — replace HERO_IMAGE.src to swap campaign visual */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              ref={mediaRef}
              className="absolute inset-[-5%] will-change-transform"
            >
              <div className="hero-media h-full w-full will-change-transform">
                <Image
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                  width={HERO_IMAGE.width}
                  height={HERO_IMAGE.height}
                  priority
                  className="h-full w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 1280px"
                />
              </div>
            </div>
            <div
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(244,239,230,0.62)_0%,rgba(244,239,230,0.22)_30%,rgba(26,20,16,0.22)_58%,rgba(26,20,16,0.62)_100%)]"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(61,43,31,0.32)_100%)]"
              aria-hidden="true"
            />
          </div>

          <div className="meta-reveal relative z-10 flex items-start justify-between px-5 pt-5 sm:px-8 sm:pt-7 md:px-10">
            <p className="font-sans text-[0.58rem] font-normal uppercase tracking-[0.42em] text-chocolate/85 sm:text-[0.62rem]">
              Est. 2026
            </p>
            <p className="font-sans text-[0.58rem] font-normal uppercase tracking-[0.42em] text-chocolate/85 sm:text-[0.62rem]">
              Oman
            </p>
          </div>

          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-4 pt-2 text-center sm:px-10">
            <div ref={copyRef} className="will-change-transform">
              <div className="logo-reveal relative mx-auto mb-10 w-[min(78vw,360px)] sm:mb-12 sm:w-[min(54vw,420px)] md:mb-14 md:w-[440px]">
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(244,239,230,0.55)_0%,rgba(244,239,230,0)_70%)]"
                  aria-hidden="true"
                />
                <Image
                  src={LOGO.src}
                  alt={LOGO.alt}
                  width={LOGO.width}
                  height={LOGO.height}
                  priority
                  className="relative h-auto w-full select-none"
                  sizes="(max-width: 640px) 78vw, 440px"
                />
              </div>

              <h1
                className="font-sans text-[clamp(1.55rem,6.2vw,4.1rem)] font-normal uppercase leading-none tracking-[0.26em] text-white sm:tracking-[0.36em]"
                aria-label="Coming Soon"
              >
                <span className="inline-block pl-[0.26em] sm:pl-[0.36em]">
                  {TITLE.split("").map((char, index) => (
                    <span
                      key={`${char}-${index}`}
                      className="char"
                      style={
                        {
                          animationDelay: `${1 + index * 0.045}s`,
                        } as CSSProperties
                      }
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
              </h1>

              <p className="tagline-reveal mt-6 font-display text-[1.05rem] font-light italic tracking-wide text-beige sm:mt-7 sm:text-[1.22rem]">
                Something worth waiting for.
              </p>
            </div>
          </div>

          <div className="ig-reveal relative z-10 flex justify-center px-5 pb-6 sm:pb-8">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ig-link font-sans text-[0.62rem] font-light tracking-[0.18em] text-beige transition-colors duration-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand sm:text-[0.68rem]"
              aria-label="Sukoon on Instagram, @wearsukoon.om"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              @wearsukoon.om
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
