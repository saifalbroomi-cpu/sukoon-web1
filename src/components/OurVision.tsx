"use client";

import { useEffect, useRef, type CSSProperties } from "react";

export default function OurVision() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-inview");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.classList.add("is-inview");
          observer.disconnect();
        }
      },
      { threshold: 0.28, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="vision-section relative overflow-hidden bg-milk px-6 py-28 sm:px-10 sm:py-36 md:py-44"
      aria-labelledby="our-vision-heading"
    >
      <div className="vision-glow" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-[34rem] flex-col items-center text-center md:max-w-[38rem]">
        <h2
          id="our-vision-heading"
          className="vision-reveal font-sans text-[0.68rem] font-normal uppercase tracking-[0.48em] text-brown sm:text-[0.72rem] sm:tracking-[0.55em]"
          style={{ "--reveal-delay": "0ms" } as CSSProperties}
        >
          Our Vision
        </h2>

        <div className="vision-rule mt-7 sm:mt-8" aria-hidden="true" />

        <p
          className="vision-reveal mt-10 font-display text-[1.45rem] font-light leading-[1.45] tracking-wide text-ink sm:mt-12 sm:text-[1.75rem] sm:leading-[1.4] md:text-[1.9rem]"
          style={{ "--reveal-delay": "140ms" } as CSSProperties}
        >
          Sukoon is about finding comfort in simplicity.
        </p>

        <p
          className="vision-reveal mt-7 max-w-[32rem] font-display text-[1.05rem] font-light leading-[1.75] tracking-wide text-chocolate/90 sm:mt-8 sm:text-[1.15rem] sm:leading-[1.8]"
          style={{ "--reveal-delay": "280ms" } as CSSProperties}
        >
          We want to create clothing that feels effortless — pieces made to be
          worn, lived in, and remembered. Inspired by calm tones, everyday
          moments, and the feeling of being at ease.
        </p>

        <p
          className="vision-reveal mt-10 font-sans text-[0.72rem] font-normal uppercase tracking-[0.28em] text-brown sm:mt-12 sm:text-[0.78rem] sm:tracking-[0.32em]"
          style={{ "--reveal-delay": "440ms" } as CSSProperties}
        >
          Less noise. More comfort. More Sukoon.
        </p>
      </div>
    </section>
  );
}
