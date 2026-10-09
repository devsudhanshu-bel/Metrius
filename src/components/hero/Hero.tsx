
"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";

import HeroContent from "./HeroContent";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-black" />
  ),
});

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      gsap.set(".hero-nav", { opacity: 0, y: -25 });

      gsap.set(".hero-line", {
        opacity: 0,
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(".hero-title", { opacity: 0, y: 70 });
      gsap.set(".hero-tagline", { opacity: 0, y: 50 });
      gsap.set(".hero-description", { opacity: 0, y: 35 });
      gsap.set(".hero-actions", { opacity: 0, y: 30 });

      gsap.set(".spline-overlay", { opacity: 0 });

      const timeline = gsap.timeline();

      // Darken the new background over 10 seconds.
      timeline.to(".spline-overlay", {
        opacity: 0.5,
        duration: 10,
        ease: "none",
      });

      timeline.to(
        ".hero-nav",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        ">-0.15"
      );

      timeline.to(
        ".hero-line",
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        ">-0.65"
      );

      timeline.to(
        ".hero-title",
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power4.out",
        },
        ">-0.5"
      );

      timeline.to(
        ".hero-tagline",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
        },
        ">-0.55"
      );

      timeline.to(
        ".hero-description",
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        ">-0.45"
      );

      timeline.to(
        ".hero-actions",
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        ">-0.4"
      );
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* New interactive wordmark background */}
      <HeroScene />

      {/* Cinematic darkening overlay */}
      <div
        className="
          spline-overlay
          pointer-events-none
          absolute
          inset-0
          z-[5]
          bg-black
        "
      />

      {/* Left-side readability gradient */}
      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          left-0
          z-[6]
          w-[60%]
          bg-gradient-to-r
          from-black/35
          via-black/10
          to-transparent
        "
      />

      {/* Bottom vignette */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[6]
          h-[30%]
          bg-gradient-to-t
          from-black/45
          to-transparent
        "
      />

      {/* Existing navigation, title, tagline and buttons */}
      <div className="relative z-20">
        <HeroContent />
      </div>
    </section>
  );
}
