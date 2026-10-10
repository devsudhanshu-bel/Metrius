
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const elements = section.querySelectorAll(".statement-reveal");

      gsap.fromTo(
        elements,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[65vh] w-full flex-col justify-between overflow-hidden bg-[#f5f5f3] px-[6vw] pb-8 pt-24 text-black md:min-h-[78vh] md:pb-10 md:pt-28"
      aria-labelledby="services-statement-title"
    >
      {/* Subtle architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.35) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      {/* Top index */}
      <div className="statement-reveal relative z-10 flex items-center gap-5 text-[9px] font-medium uppercase tracking-[0.3em] text-black/40">
        <span>03 / 04</span>
        <span className="h-px w-10 bg-black/20" />
        <span>METRIUS</span>
      </div>

      {/* Main statement */}
      <div className="relative z-10 my-16 md:my-20">
        <h2
          id="services-statement-title"
          className="statement-reveal max-w-[1200px] text-[clamp(4rem,11.8vw,15rem)] font-light uppercase leading-[0.78] tracking-[-0.085em]"
        >
          <span className="block">BUILD</span>
          <span className="block whitespace-nowrap">SOMETHING</span>
          <span className="block text-black/35">REAL.</span>
        </h2>
      </div>

      {/* Bottom information line */}
      <div className="statement-reveal relative z-10 flex flex-col gap-4 border-t border-black/15 pt-5 text-[8px] font-medium uppercase tracking-[0.25em] text-black/40 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <span>METRIUS</span>
        <span>DIGITAL SYSTEMS</span>
        <span>03 / 04 — CONTACT</span>
      </div>
    </section>
  );
}
