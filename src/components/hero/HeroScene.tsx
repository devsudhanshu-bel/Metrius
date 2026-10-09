
"use client";

import { useEffect, useRef, useState } from "react";

const SPLINE_URL =
  "https://my.spline.design/thestrangeworld-vjeHpdxRcK3lFJCgJ8fDkXTS/";

export default function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let intersecting = false;
    let tabVisible = !document.hidden;
    let disposed = false;
    let delayTimer: ReturnType<typeof setTimeout> | undefined;
    let readyToLoad = false;

    const sync = () => {
      if (!disposed) {
        setActive(
          readyToLoad && intersecting && tabVisible
        );
      }
    };

    // Give the main page a head start before loading the 3D scene.
    delayTimer = setTimeout(() => {
      readyToLoad = true;
      setReady(true);
      sync();
    }, 700);

    const observer = new IntersectionObserver(
      ([entry]) => {
        intersecting = entry.isIntersecting;
        sync();
      },
      {
        threshold: 0,
        rootMargin: "100px",
      }
    );

    observer.observe(host);

    const onVisibilityChange = () => {
      tabVisible = !document.hidden;
      sync();
    };

    document.addEventListener(
      "visibilitychange",
      onVisibilityChange
    );

    return () => {
      disposed = true;
      if (delayTimer) clearTimeout(delayTimer);
      observer.disconnect();
      document.removeEventListener(
        "visibilitychange",
        onVisibilityChange
      );
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden bg-black"
      aria-hidden="true"
    >
      {/* Lightweight fallback while the scene is unloaded */}
      <div
        className="absolute inset-0 bg-black"
        aria-hidden="true"
      />

      {ready && active && (
        <iframe
          key="metrius-spline-scene"
          src={SPLINE_URL}
          title="METRIUS — The Strange World"
          className="absolute inset-0 h-full w-full border-0"
          allow="fullscreen"
          loading="eager"
          tabIndex={-1}
        />
      )}
    </div>
  );
}
