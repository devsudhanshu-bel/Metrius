
"use client";

import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

const INITIAL_TILT = { x: 7, y: -10, z: -2 };
const PARALLAX_STRENGTH = 0.28;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

type Tilt = { x: number; y: number; z: number };

type ArtworkItem = {
  src: string;
  alt: string;
  className: string;
  depth: number;
  featured?: boolean;
};

const artwork: ArtworkItem[] = [
  {
    src: "/images/left.avif",
    alt: "Metrius web design project",
    className:
      "left-[1%] top-[14%] z-[4] h-[61%] w-[36%] rotate-[8deg]",
    depth: 12,
  },
  {
    src: "/images/1.avif",
    alt: "Generative digital experience",
    className:
      "left-[20.5%] top-0 z-[7] h-[58%] w-[23%] -rotate-[13deg]",
    depth: 25,
  },
  {
    src: "/images/2.avif",
    alt: "Metrius visual systems",
    className:
      "left-[15%] top-[51%] z-[8] h-[48%] w-[24%] rotate-[16deg]",
    depth: 18,
  },
  {
    src: "/images/middle.avif",
    alt: "Metrius signature emblem",
    className:
      "left-[39%] top-[7%] z-[12] h-[80%] w-[24%] -rotate-[7deg]",
    depth: 38,
    featured: true,
  },
  {
    src: "/images/3.avif",
    alt: "Creative portrait project",
    className:
      "left-[60%] top-[3%] z-[9] h-[65%] w-[24%] rotate-[13deg]",
    depth: 28,
  },
  {
    src: "/images/4.avif",
    alt: "Automotive website project",
    className:
      "right-[-1%] top-[14%] z-[6] h-[63%] w-[33%] -rotate-[12deg]",
    depth: 14,
  },
  {
    src: "/images/5.avif",
    alt: "Metrius digital product design",
    className:
      "left-[58.5%] top-[60%] z-[11] h-[44%] w-[26%] -rotate-[14deg]",
    depth: 32,
  },
];

const navigation = ["WORK", "ABOUT", "SERVICES", "CONTACT"];

/* =========================================================
   DECORATIVE COMPONENTS
========================================================= */

function Cross({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-30 h-3.5 w-3.5 opacity-50 ${className}`}
    >
      <span className="absolute left-1/2 top-0 h-full border-l border-black" />
      <span className="absolute left-0 top-1/2 w-full border-t border-black" />
    </span>
  );
}

function Arrow({
  direction = "right",
  className = "",
}: {
  direction?: "right" | "left";
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute top-[29%] z-30 ${className}`}
    >
      <span
        className={`block h-0 w-0 border-y-[6px] border-y-transparent ${
          direction === "right"
            ? "border-l-[9px] border-l-black"
            : "border-r-[9px] border-r-black"
        }`}
      />
    </span>
  );
}

const ArtworkImage = memo(function ArtworkImage({
  item,
}: {
  item: ArtworkItem;
}) {
  return (
    <img
      src={item.src}
      alt=""
      loading="eager"
      fetchPriority={item.featured ? "high" : "auto"}
      decoding="async"
      draggable={false}
      className="block h-full w-full select-none object-contain"
    />
  );
});

ArtworkImage.displayName = "ArtworkImage";

/* =========================================================
   MAIN WEB VISUAL
========================================================= */

export default function WebVisual() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);

  const parallaxLayersRef = useRef<HTMLElement[]>([]);
  const targetRef = useRef<Tilt>({ ...INITIAL_TILT });
  const currentRef = useRef<Tilt>({ ...INITIAL_TILT });

  const animationFrameRef = useRef<number | null>(null);
  const pointerFrameRef = useRef<number | null>(null);

  const pointerPositionRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(false);
  const isTabVisibleRef = useRef(true);
  const isPointerInsideRef = useRef(false);
  const hasPlayedRef = useRef(false);

  const [motionEnabled, setMotionEnabled] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  /* =======================================================
     REDUCED MOTION
  ======================================================== */

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const updateMotion = () => setMotionEnabled(!media.matches);

    updateMotion();
    media.addEventListener("change", updateMotion);

    return () => media.removeEventListener("change", updateMotion);
  }, []);

  /* =======================================================
     SCROLL TRIGGER
     Intro plays only when the section enters the viewport.
     It plays once, avoiding repeated heavy animations.
  ======================================================== */

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible =
          entry.isIntersecting && entry.intersectionRatio >= 0.12;

        isVisibleRef.current = visible;
        setIsVisible(visible);

        if (visible && !hasPlayedRef.current) {
          hasPlayedRef.current = true;
          setHasPlayed(true);
        }

        if (!visible) {
          // Stop all continuous work while off-screen.
          if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
          }

          if (pointerFrameRef.current !== null) {
            cancelAnimationFrame(pointerFrameRef.current);
            pointerFrameRef.current = null;
          }
        }
      },
      {
        threshold: [0, 0.12, 0.35],
        rootMargin: "0px 0px -5% 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* =======================================================
     TAB VISIBILITY
  ======================================================== */

  useEffect(() => {
    const handleVisibility = () => {
      isTabVisibleRef.current = !document.hidden;

      if (document.hidden) {
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }

        if (pointerFrameRef.current !== null) {
          cancelAnimationFrame(pointerFrameRef.current);
          pointerFrameRef.current = null;
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () =>
      document.removeEventListener(
        "visibilitychange",
        handleVisibility,
      );
  }, []);

  /* =======================================================
     CACHE PARALLAX LAYERS
  ======================================================== */

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    parallaxLayersRef.current = Array.from(
      frame.querySelectorAll<HTMLElement>("[data-parallax]"),
    );

    return () => {
      parallaxLayersRef.current = [];
    };
  }, []);

  /* =======================================================
     INTRO ANIMATION
     Triggered by scroll visibility rather than initial mount.
  ======================================================== */

  useEffect(() => {
    const root = frameRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !motionEnabled) {
      root.style.opacity = "1";
      root.style.filter = "none";
      root.style.translate = "0 0";

      root.querySelectorAll<HTMLElement>("[data-intro]").forEach(
        (element) => {
          element.style.opacity = "1";
          element.style.translate = "0 0";
          element.style.filter = "none";
        },
      );

      return;
    }

    if (!hasPlayed) return;

    const animations: Animation[] = [];

    const run = (
      element: Element | null,
      frames: Keyframe[],
      options: KeyframeAnimationOptions,
    ) => {
      if (!(element instanceof HTMLElement)) return;

      const animation = element.animate(frames, {
        fill: "both",
        ...options,
      });

      animations.push(animation);
    };

    // Main frame entrance.
    run(
      root,
      [
        {
          opacity: 0,
          filter: "blur(5px)",
          translate: "0 38px",
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          translate: "0 0",
        },
      ],
      {
        duration: 1500,
        easing: EASE,
      },
    );

    // Navigation.
    run(
      root.querySelector('[data-intro="nav"]'),
      [
        { opacity: 0, translate: "0 -12px" },
        { opacity: 1, translate: "0 0" },
      ],
      {
        duration: 1200,
        delay: 350,
        easing: EASE,
      },
    );

    // Central wordmark.
    run(
      root.querySelector('[data-intro="wordmark"]'),
      [
        { opacity: 0, translate: "0 30px" },
        { opacity: 1, translate: "0 0" },
      ],
      {
        duration: 1550,
        delay: 500,
        easing: EASE,
      },
    );

    // Supporting copy.
    root.querySelectorAll<HTMLElement>('[data-intro="copy"]').forEach(
      (element, index) => {
        run(
          element,
          [
            { opacity: 0, translate: "0 16px" },
            { opacity: 1, translate: "0 0" },
          ],
          {
            duration: 1100,
            delay: 650 + index * 180,
            easing: EASE,
          },
        );
      },
    );

    // Red panel.
    run(
      root.querySelector('[data-intro="panel"]'),
      [
        { opacity: 0, scale: "1 0.55" },
        { opacity: 1, scale: "1 1" },
      ],
      {
        duration: 1300,
        delay: 400,
        easing: EASE,
      },
    );

    // Star entrance and low-cost drift.
    const star = root.querySelector<HTMLElement>(
      '[data-intro="star"]',
    );

    if (star) {
      run(
        star,
        [
          { opacity: 0, translate: "0 15px" },
          { opacity: 1, translate: "0 0" },
        ],
        {
          duration: 1100,
          delay: 900,
          easing: EASE,
        },
      );

      run(
        star,
        [
          { rotate: "-8deg", offset: 0 },
          { rotate: "0deg", offset: 0.5 },
          { rotate: "-8deg", offset: 1 },
        ],
        {
          duration: 6000,
          delay: 2000,
          iterations: Infinity,
          easing: "ease-in-out",
        },
      );
    }

    // Stagger each artwork card.
    const cards = Array.from(
      root.querySelectorAll<HTMLElement>('[data-intro="artwork"]'),
    );

    cards.forEach((card, index) => {
      run(
        card,
        [
          {
            opacity: 0,
            translate: "0 54px",
            scale: 0.96,
            filter: "blur(3px)",
          },
          {
            opacity: 1,
            translate: "0 0",
            scale: 1,
            filter: "blur(0px)",
          },
        ],
        {
          duration: 1450,
          delay: 700 + index * 220,
          easing: EASE,
        },
      );
    });

    // Scroll arrow.
    const scrollArrow = root.querySelector<HTMLElement>(
      '[data-intro="scroll-arrow"]',
    );

    if (scrollArrow) {
      run(
        scrollArrow,
        [
          { translate: "0 0" },
          { translate: "0 5px" },
          { translate: "0 0" },
        ],
        {
          duration: 1700,
          delay: 1500,
          iterations: Infinity,
          easing: "ease-in-out",
        },
      );
    }

    return () => {
      animations.forEach((animation) => animation.cancel());
    };
  }, [hasPlayed, motionEnabled]);

  /* =======================================================
     LAZY, DEMAND-DRIVEN 3D TILT
     No permanent requestAnimationFrame loop.
  ======================================================== */

  const stopTiltLoop = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const startTiltLoop = useCallback(() => {
    if (
      animationFrameRef.current !== null ||
      !motionEnabled ||
      !isVisibleRef.current ||
      !isTabVisibleRef.current
    ) {
      return;
    }

    let previousTime = 0;

    const animate = (time: number) => {
      animationFrameRef.current = null;

      if (
        !motionEnabled ||
        !isVisibleRef.current ||
        !isTabVisibleRef.current
      ) {
        return;
      }

      // Frame-rate independent interpolation.
      const delta = previousTime ? Math.min(time - previousTime, 32) : 16;
      previousTime = time;

      const current = currentRef.current;
      const target = targetRef.current;

      const ease = 1 - Math.pow(
        isPointerInsideRef.current ? 0.0007 : 0.002,
        delta / 16.67,
      );

      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      current.z += (target.z - current.z) * ease;

      const frame = frameRef.current;

      if (frame) {
        frame.style.transform =
          `rotateX(${current.x}deg) ` +
          `rotateY(${current.y}deg) ` +
          `rotateZ(${current.z}deg)`;
      }

      const difference =
        Math.abs(target.x - current.x) +
        Math.abs(target.y - current.y) +
        Math.abs(target.z - current.z);

      if (difference > 0.025) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        current.x = target.x;
        current.y = target.y;
        current.z = target.z;

        if (frame) {
          frame.style.transform =
            `rotateX(${target.x}deg) ` +
            `rotateY(${target.y}deg) ` +
            `rotateZ(${target.z}deg)`;
        }
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [motionEnabled]);

  useEffect(() => {
    if (!motionEnabled) {
      stopTiltLoop();

      currentRef.current = { ...INITIAL_TILT };
      targetRef.current = { ...INITIAL_TILT };

      const frame = frameRef.current;
      if (frame) {
        frame.style.transform =
          `rotateX(${INITIAL_TILT.x}deg) ` +
          `rotateY(${INITIAL_TILT.y}deg) ` +
          `rotateZ(${INITIAL_TILT.z}deg)`;
      }
    }

    return stopTiltLoop;
  }, [motionEnabled, stopTiltLoop]);

  /* =======================================================
     PARALLAX
     Updates are batched into one frame.
  ======================================================== */

  const applyParallax = useCallback(() => {
    pointerFrameRef.current = null;

    if (
      !motionEnabled ||
      !isVisibleRef.current ||
      !isTabVisibleRef.current
    ) {
      return;
    }

    const { x, y } = pointerPositionRef.current;

    for (const layer of parallaxLayersRef.current) {
      const depth = Number(layer.dataset.parallax) || 0;
      const strength = depth * PARALLAX_STRENGTH;

      layer.style.translate =
        `${(-x * strength).toFixed(2)}px ` +
        `${(-y * strength).toFixed(2)}px`;
    }
  }, [motionEnabled]);

  const queueParallax = useCallback((x: number, y: number) => {
    pointerPositionRef.current = { x, y };

    if (pointerFrameRef.current === null) {
      pointerFrameRef.current =
        requestAnimationFrame(applyParallax);
    }
  }, [applyParallax]);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!motionEnabled || event.pointerType !== "mouse") return;

      const frame = frameRef.current;
      if (!frame) return;

      const rect = frame.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      targetRef.current = {
        x: INITIAL_TILT.x - y * 3.5,
        y: INITIAL_TILT.y + x * 6,
        z: INITIAL_TILT.z + x,
      };

      isPointerInsideRef.current = true;

      queueParallax(x, y);
      startTiltLoop();
    },
    [motionEnabled, queueParallax, startTiltLoop],
  );

  const handlePointerLeave = useCallback(() => {
    isPointerInsideRef.current = false;
    targetRef.current = { ...INITIAL_TILT };

    pointerPositionRef.current = { x: 0, y: 0 };
    queueParallax(0, 0);
    startTiltLoop();
  }, [queueParallax, startTiltLoop]);

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full overflow-visible bg-white text-[#080808]"
    >
      <div
        className="relative mx-auto flex w-full items-center justify-center px-3 py-10 sm:px-5 sm:py-14"
        style={{ perspective: "1500px" }}
      >
        {/* Ambient shadow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[9%] right-[9%] top-[22%] h-[65%] rounded-[50%] bg-black/[0.16] blur-[55px] sm:blur-[75px]"
          style={{ transform: "translateY(35px) rotate(-2deg)" }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[15%] right-[15%] top-[15%] h-[70%] rounded-full bg-neutral-300/40 blur-[80px]"
        />

        {/* Main 3D frame */}
        <div
          ref={frameRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative z-10 aspect-[2/1] w-full select-none overflow-hidden rounded-[12px] border border-white/90 bg-[#e9e7e1] transition-[box-shadow,border-color] duration-[450ms] ease-out hover:border-white md:rounded-[16px] lg:rounded-[26px]"
          style={{
            transform:
              `rotateX(${INITIAL_TILT.x}deg) ` +
              `rotateY(${INITIAL_TILT.y}deg) ` +
              `rotateZ(${INITIAL_TILT.z}deg)`,
            transformOrigin: "50% 50%",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            boxShadow: `
              0 2px 3px rgba(255,255,255,0.9),
              0 12px 25px rgba(0,0,0,0.055),
              0 35px 65px rgba(0,0,0,0.13),
              0 75px 110px rgba(0,0,0,0.09),
              inset 0 0 0 1px rgba(255,255,255,0.65)
            `,
            willChange: "transform",
            touchAction: "pan-y",
          }}
        >
          {/* Frame edge */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[100] rounded-[inherit] border border-white/50"
            style={{
              boxShadow:
                "inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -1px 2px rgba(0,0,0,0.04)",
            }}
          />

          <div
            className="absolute inset-0 overflow-hidden rounded-[inherit] bg-[#e9e7e1] [isolation:isolate] [backface-visibility:hidden]"
            style={{
              transformStyle: "preserve-3d",
              backgroundImage:
                "radial-gradient(ellipse at 50% 42%, rgba(255,255,255,.42), transparent 68%)",
            }}
          >
            {/* Background grid */}
            <div
              data-parallax="2"
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[5.3%] bottom-[8%] top-[11%] z-0 grid grid-cols-4"
              style={{
                transform: "translateZ(-20px)",
                transition: "translate 100ms ease-out",
              }}
            >
              {Array.from({ length: 4 }, (_, index) => (
                <span
                  key={index}
                  className="border-l border-black/[0.08]"
                />
              ))}

              <span className="absolute inset-x-[-5.6%] top-0 border-t border-black/[0.07]" />
              <span className="absolute inset-x-[-5.6%] bottom-0 border-t border-black/[0.07]" />
            </div>

            {/* Red panel */}
            <div
              data-parallax="5"
              data-intro="panel"
              className="absolute left-[42.6%] top-[11%] z-[1] h-[40%] w-[15.8%] bg-[#ff382d]"
              style={{
                transform: "translateZ(-10px)",
                transformOrigin: "top center",
                boxShadow: "0 12px 35px rgba(255,56,45,0.12)",
                transition: "translate 100ms ease-out",
              }}
            />

            {/* Navigation */}
            <header
              data-parallax="3"
              data-intro="nav"
              className="absolute inset-x-0 top-0 z-50 flex h-[11%] items-center justify-between px-[3.1%]"
              style={{
                transform: "translateZ(20px)",
                transition: "translate 100ms ease-out",
              }}
            >
              <div className="flex shrink-0 items-center gap-2 whitespace-nowrap text-[clamp(6px,0.49vw,9px)] font-semibold tracking-[0.3em] transition-opacity duration-200 hover:opacity-65">
                <span className="h-[clamp(6px,0.65vw,11px)] w-[clamp(6px,0.65vw,11px)] rounded-full bg-black" />
                METRIUS
              </div>

              <nav
                aria-label="Decorative navigation"
                className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[clamp(16px,2.5vw,38px)] whitespace-nowrap md:flex"
              >
                {navigation.map((label) => (
                  <span
                    key={label}
                    className="group relative inline-flex cursor-default items-center gap-2 text-[clamp(5.5px,0.48vw,8.5px)] tracking-[0.18em] transition-[opacity,transform] duration-200 ease-out hover:-translate-y-0.5 hover:opacity-65 after:absolute after:-bottom-[5px] after:left-0 after:right-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    {label}
                  </span>
                ))}
              </nav>

              <div className="ml-auto flex items-center gap-[clamp(7px,1vw,16px)]">
                <span className="group relative flex cursor-default items-center gap-2 whitespace-nowrap text-[clamp(5.5px,0.48vw,8.5px)] tracking-[0.18em] transition-[opacity,transform] duration-200 ease-out hover:-translate-y-0.5 hover:opacity-65 after:absolute after:-bottom-[5px] after:left-0 after:right-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100">
                  LET’S TALK
                  <span className="inline-block text-[clamp(14px,1.5vw,24px)] leading-none transition-transform duration-300 group-hover:translate-x-[3px]">
                    ⟶
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className="ml-1 grid aspect-square w-[clamp(21px,2.1vw,35px)] shrink-0 place-items-center rounded-full border border-black/35 transition-[transform,border-color] duration-300 hover:rotate-[35deg] hover:scale-[1.04] hover:border-black/70"
                >
                  <span className="relative flex h-[0.75em] w-[0.75em] items-center justify-center rounded-full border border-current">
                    <span className="h-[0.2em] w-[0.2em] rounded-full bg-current" />
                  </span>
                </span>
              </div>
            </header>

            {/* Welcome text */}
            <div
              data-parallax="6"
              data-intro="copy"
              className="absolute left-[9.6%] top-[14.7%] z-[15] text-[clamp(9px,0.95vw,16px)] font-black leading-[0.98] tracking-[-0.035em]"
              style={{
                transform: "translateZ(30px)",
                transition: "translate 100ms ease-out",
              }}
            >
              WELCOME
              <br />
              TO OUR
            </div>

            {/* Main wordmark */}
            <div
              data-parallax="8"
              data-intro="wordmark"
              className="pointer-events-none absolute left-1/2 top-[19.5%] z-[18] w-full whitespace-nowrap text-center leading-none"
              style={{
                transform: "translate3d(-50%, 0, 40px)",
                transformStyle: "preserve-3d",
                transition: "translate 100ms ease-out",
              }}
            >
              <span className="inline-block max-w-full text-[clamp(30px,5.5vw,82px)] font-black tracking-[-0.09em]">
                METRIUS
              </span>
              <sup className="relative top-[-2.6em] ml-1 text-[clamp(5px,0.45vw,8px)]">
                ®
              </sup>
            </div>

            {/* Star */}
            <span
              data-parallax="7"
              data-intro="star"
              aria-hidden="true"
              className="pointer-events-none absolute right-[13.5%] top-[16%] z-[16] text-[clamp(20px,2.7vw,42px)] leading-none"
              style={{
                transform: "translateZ(35px) rotateZ(-8deg)",
                transition: "translate 100ms ease-out",
              }}
            >
              ✦
            </span>

            {/* Side labels */}
            <div
              data-parallax="5"
              data-intro="copy"
              className="absolute left-[7.2%] top-[30.5%] z-[30] text-[clamp(4.5px,0.43vw,7px)] leading-[1.5] tracking-[0.16em]"
              style={{
                transform: "translateZ(35px)",
                transition: "translate 100ms ease-out",
              }}
            >
              CREATIVE
              <br />
              DEVELOPER
            </div>

            <div
              data-parallax="5"
              data-intro="copy"
              className="absolute right-[6.5%] top-[30.5%] z-[30] text-[clamp(4.5px,0.43vw,7px)] leading-[1.5] tracking-[0.16em]"
              style={{
                transform: "translateZ(35px)",
                transition: "translate 100ms ease-out",
              }}
            >
              DIGITAL
              <br />
              EXPERIENCES
            </div>

            <Arrow direction="right" className="left-[3.2%]" />
            <Arrow direction="left" className="right-[3.2%]" />

            {/* Artwork cards */}
            <div
              className="absolute inset-x-0 bottom-0 top-[38%] z-20"
              style={{ transformStyle: "preserve-3d" }}
            >
              {artwork.map((item) => (
                <div
                  key={item.src}
                  data-parallax={item.depth}
                  data-intro="artwork"
                  role="img"
                  aria-label={item.alt}
                  className={`absolute origin-center will-change-[scale,translate] transition-[scale,translate] duration-[280ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:z-[60] hover:scale-[1.025] max-md:hover:scale-[1.015] ${
                    item.featured
                      ? "hover:scale-[1.035] max-md:hover:scale-[1.015]"
                      : ""
                  } ${item.className}`}
                  style={{
                    transform: `translateZ(${item.depth}px)`,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    transition:
                      "scale 280ms cubic-bezier(0.2, 0.8, 0.2, 1), translate 100ms ease-out",
                  }}
                >
                  <ArtworkImage item={item} />
                </div>
              ))}
            </div>

            {/* Technical marks */}
            <div
              data-parallax="3"
              style={{
                transform: "translateZ(25px)",
                transition: "translate 100ms ease-out",
              }}
            >
              <Cross className="left-[5%] top-[12.5%]" />
              <Cross className="left-[32%] top-[12.5%]" />
              <Cross className="left-[68%] top-[12.5%]" />
              <Cross className="right-[5%] top-[12.5%]" />
              <Cross className="left-[39%] top-[44%]" />
              <Cross className="right-[32%] top-[44%]" />
            </div>

            {/* Year */}
            <div
              data-parallax="5"
              className="absolute left-[17.8%] top-[42.5%] z-[30] flex flex-col text-[clamp(5px,0.48vw,8px)] leading-[1.6] tracking-[0.08em]"
              style={{
                transform: "translateZ(35px)",
                transition: "translate 100ms ease-out",
              }}
            >
              <span className="absolute right-[120%] top-[30%] w-[20px] border-t border-black" />
              <span>20</span>
              <span>26</span>
            </div>

            {/* Ideas annotation */}
            <div
              data-parallax="5"
              className="absolute right-[12%] top-[38.7%] z-[30] flex flex-col text-[clamp(5px,0.46vw,8px)] leading-[1.5] tracking-[0.14em]"
              style={{
                transform: "translateZ(40px)",
                transition: "translate 100ms ease-out",
              }}
            >
              <span>IDEAS</span>
              <span>INTO REALITY</span>
              <span className="absolute left-[calc(100%+10px)] top-1/2 w-[clamp(18px,3.4vw,50px)] border-t border-black/50" />
            </div>

            {/* Scroll cue */}
            <div
              data-parallax="4"
              className="absolute bottom-[2%] left-1/2 z-40 flex flex-col items-center gap-[6px] whitespace-nowrap text-[clamp(4.5px,0.43vw,7px)] tracking-[0.17em]"
              style={{
                transform: "translate3d(-50%, 0, 45px)",
                transition: "translate 100ms ease-out",
              }}
            >
              <span>SCROLL TO EXPLORE</span>
              <span
                data-intro="scroll-arrow"
                className="text-[clamp(12px,1.2vw,19px)] leading-none"
              >
                ↓
              </span>
            </div>

            {/* Footer */}
            <div
              data-parallax="3"
              className="absolute bottom-[3.2%] left-[3.1%] z-40 whitespace-nowrap text-[clamp(4.5px,0.43vw,7px)] font-medium tracking-[0.19em]"
              style={{
                transform: "translateZ(45px)",
                transition: "translate 100ms ease-out",
              }}
            >
              © 2026 METRIUS
            </div>

            <div
              data-parallax="3"
              className="absolute bottom-[3.2%] right-[3.1%] z-40 whitespace-nowrap text-[clamp(4.5px,0.43vw,7px)] font-medium tracking-[0.19em]"
              style={{
                transform: "translateZ(45px)",
                transition: "translate 100ms ease-out",
              }}
            >
              PORTFOLIO / 01
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
