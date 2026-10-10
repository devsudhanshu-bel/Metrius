"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const SCENE_URL =
  "https://prod.spline.design/Lw-sYu2HOmivJhHf/scene.splinecode";

export default function HeroScene() {
  const sceneRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const handleLoad = () => {
      scene.dataset.loaded = "true";
    };

    scene.addEventListener("load-complete", handleLoad);

    return () => {
      scene.removeEventListener("load-complete", handleLoad);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden bg-black">
      <Script
        type="module"
        src="https://cdn.spline.design/@splinetool/viewer@2.0.75/build/spline-viewer.js"
        strategy="afterInteractive"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#191919_0%,#080808_55%,#000_100%)]"
      />

      <spline-viewer
        ref={sceneRef as React.RefObject<HTMLElement>}
        url={SCENE_URL}
        loading="lazy"
        unloadable
        className="absolute inset-0 block h-full w-full"
      />
    </div>
  );
}