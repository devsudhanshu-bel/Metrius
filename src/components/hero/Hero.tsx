
"use client";

import dynamic from "next/dynamic";

import HeroContent from "./HeroContent";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-black" />
  ),
});

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* 3D BACKGROUND SCENE */}
      <HeroScene />

      {/* CINEMATIC DARK OVERLAY */}
      <div className="spline-overlay pointer-events-none absolute inset-0 z-[5] bg-black/50" />

      {/* LEFT-SIDE SHADING */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[6] w-[60%] bg-gradient-to-r from-black/35 via-black/10 to-transparent" />

      {/* BOTTOM SHADING */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-[30%] bg-gradient-to-t from-black/45 to-transparent" />

      {/* HERO CONTENT — ANIMATED BY FRAMER MOTION */}
      <div className="relative z-20">
        <HeroContent />
      </div>
    </section>
  );
}
