
"use client";

import { useCallback, useState } from "react";

const INTRO_VIDEO = "/videos/metrius-intro.mp4";
const LOOP_VIDEO = "/videos/metrius-loop.mp4";

export default function HeroScene() {
  const [introReady, setIntroReady] = useState(false);
  const [loopReady, setLoopReady] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleIntroReady = useCallback(() => {
    setIntroReady(true);
  }, []);

  const handleLoopReady = useCallback(() => {
    setLoopReady(true);
  }, []);

  const handleIntroEnd = useCallback(() => {
    setIntroFinished(true);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden bg-black">
      {/* Original dark background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#191919_0%,#080808_55%,#000_100%)]"
      />

      {/* Intro: plays once */}
      {!introFinished && !videoError && (
        <video
          autoPlay
          muted
          playsInline
          preload="auto"
          onCanPlay={handleIntroReady}
          onEnded={handleIntroEnd}
          onError={() => setVideoError(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            introReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={INTRO_VIDEO} type="video/mp4" />
        </video>
      )}

      {/* Main scene: loops after the intro */}
      {introFinished && !videoError && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={handleLoopReady}
          onError={() => setVideoError(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            loopReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={LOOP_VIDEO} type="video/mp4" />
        </video>
      )}

      {/* Fallback if a video is missing */}
      {videoError && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#191919_0%,#080808_55%,#000_100%)]" />
      )}

      {/* Loading screen */}
      {!introReady && !videoError && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#050505]">
          <div className="flex flex-col items-center gap-7 px-6">
            <div className="relative flex h-16 w-16 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-[#D9FF50]" />
              <div className="h-2 w-2 rounded-full bg-[#D9FF50] shadow-[0_0_18px_#D9FF50]" />
            </div>

            <div className="text-center">
              <p className="text-sm font-semibold tracking-[0.45em] text-white">
                METRIUS
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/45">
                Preparing your experience
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Preserve the dark transition effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,#151515_0%,#080808_50%,#000_100%)] opacity-0"
      />
    </div>
  );
}
