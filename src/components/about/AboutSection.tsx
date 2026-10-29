"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useRef } from "react";

/* -------------------------------------------------------
   ANIMATION PRESETS
   Keep animations to transform and opacity where possible
------------------------------------------------------- */

const smoothEase = [0.16, 1, 0.3, 1] as const;

const revealUp: Variants = {
  hidden: {
    opacity: 0,
    y: 48,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};

const revealCopy: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: smoothEase,
    },
  },
};

const revealHeading: Variants = {
  hidden: {
    opacity: 0,
    y: 65,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: smoothEase,
    },
  },
};

/* -------------------------------------------------------
   DECORATIVE ELEMENTS
------------------------------------------------------- */

function DoodleStar() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className="h-full w-full"
    >
      <path
        d="M32 3L38 23L57 12L45 29L62 34L43 38L53 56L35 44L29 63L25 43L7 53L18 35L2 29L22 26L14 8L29 20Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DoodleArrow() {
  return (
    <svg
      viewBox="0 0 72 42"
      fill="none"
      aria-hidden="true"
      className="h-auto w-[72px]"
    >
      <path
        d="M3 30C16 9 28 12 31 24C34 36 18 37 20 25C23 12 49 10 57 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M48 7L59 17L48 23"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const leftCode = [
  "const metrius = {",
  '  design: "intentional",',
  '  intelligence: "applied",',
  '  engineering: "precise",',
  '  future: "unwritten"',
  "};",
];

const rightCode = [
  "SYSTEM / 001",
  "",
  "architecture: adaptive",
  "intelligence: integrated",
  "experience: human",
  "",
  "initialize_future();",
];

/* -------------------------------------------------------
   MAIN ABOUT SECTION
------------------------------------------------------- */

export default function AboutSection() {
  const bannerRef = useRef<HTMLDivElement>(null);

  // Tracks whether the banner is visible.
  // Ambient animation runs only while the banner is on-screen.
  const bannerInView = useInView(bannerRef, {
    amount: 0.1,
  });

  const reduceMotion = useReducedMotion();

  const shouldAnimate = !reduceMotion;

  const viewportOnce = {
    once: true,
    amount: 0.18,
  } as const;

  return (
    <section
      id="about"
      className="w-full overflow-hidden bg-[#f8f8f6] text-[#101010]"
    >
      {/* ===================================================
          ABOUT INTRO
      =================================================== */}

      <div className="about-top mx-auto max-w-[1600px] px-5 pb-20 pt-24 sm:px-8 md:px-[5.7vw] md:pb-28 md:pt-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* LEFT CONTENT */}

          <div className="relative z-10">
            <motion.div
              variants={revealCopy}
              initial={shouldAnimate ? "hidden" : false}
              whileInView={shouldAnimate ? "visible" : undefined}
              viewport={viewportOnce}
              className="about-eyebrow mb-7 flex flex-wrap items-center gap-3"
            >
              <span className="rounded-full border border-black/20 px-3 py-2 text-[10px] text-black/60">
                About us
              </span>

              <span className="text-[10px] uppercase tracking-[0.22em] text-black/40">
                METRIUS / DIGITAL SYSTEMS
              </span>
            </motion.div>

            {/* HEADLINE */}

            <h2 className="max-w-[900px] text-[clamp(2.7rem,5.6vw,5.8rem)] font-semibold leading-[0.97] tracking-[-0.075em]">
              <motion.span
                variants={revealHeading}
                initial={shouldAnimate ? "hidden" : false}
                whileInView={shouldAnimate ? "visible" : undefined}
                viewport={viewportOnce}
                className="about-heading block"
              >
                We build more
              </motion.span>

              <motion.span
                variants={revealHeading}
                initial={shouldAnimate ? "hidden" : false}
                whileInView={shouldAnimate ? "visible" : undefined}
                viewport={viewportOnce}
                transition={{
                  delay: 0.08,
                }}
                className="about-heading block"
              >
                than digital.
              </motion.span>

              <motion.span
                variants={revealHeading}
                initial={shouldAnimate ? "hidden" : false}
                whileInView={shouldAnimate ? "visible" : undefined}
                viewport={viewportOnce}
                transition={{
                  delay: 0.16,
                }}
                className="about-heading block text-black/40"
              >
                We build what&apos;s next.
              </motion.span>
            </h2>

            {/* DESCRIPTION */}

            <div className="mt-7 max-w-[650px] space-y-4">
              <motion.p
                variants={revealCopy}
                initial={shouldAnimate ? "hidden" : false}
                whileInView={shouldAnimate ? "visible" : undefined}
                viewport={viewportOnce}
                className="about-copy text-[15px] leading-[1.85] text-black/65 md:text-[17px]"
              >
                Metrius brings design, engineering and intelligence
                together to create digital products and systems
                that make a difference.
              </motion.p>

              <motion.p
                variants={revealCopy}
                initial={shouldAnimate ? "hidden" : false}
                whileInView={shouldAnimate ? "visible" : undefined}
                viewport={viewportOnce}
                transition={{
                  delay: 0.08,
                }}
                className="about-copy max-w-[480px] text-[12px] leading-[1.9] text-black/45 md:text-[13px]"
              >
                From thoughtful interfaces to intelligent software,
                we turn complex ideas into clear, useful experiences.
              </motion.p>
            </div>

            <motion.div
              variants={revealCopy}
              initial={shouldAnimate ? "hidden" : false}
              whileInView={shouldAnimate ? "visible" : undefined}
              viewport={viewportOnce}
              transition={{
                delay: 0.12,
              }}
              className="about-copy mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-black/55"
            >
              <span className="h-px w-8 bg-black/30" />
              Design / Engineering / Intelligence
            </motion.div>
          </div>

          {/* RIGHT IMAGE */}

          <div className="relative mx-auto w-full max-w-[660px] lg:ml-auto">
            {/* Decorative star */}

            <motion.div
              initial={
                shouldAnimate
                  ? {
                      opacity: 0,
                      scale: 0.55,
                      rotate: -35,
                    }
                  : false
              }
              whileInView={
                shouldAnimate
                  ? {
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                    }
                  : undefined
              }
              viewport={viewportOnce}
              transition={{
                duration: 0.7,
                delay: 0.35,
                ease: smoothEase,
              }}
              className="about-doodle pointer-events-none absolute -left-5 -top-7 z-20 h-14 w-14 text-black md:-left-7 md:-top-8 md:h-[76px] md:w-[76px]"
            >
              <DoodleStar />
            </motion.div>

            {/* Decorative arrow */}

            <motion.div
              initial={
                shouldAnimate
                  ? {
                      opacity: 0,
                      x: -16,
                    }
                  : false
              }
              whileInView={
                shouldAnimate
                  ? {
                      opacity: 1,
                      x: 0,
                    }
                  : undefined
              }
              viewport={viewportOnce}
              transition={{
                duration: 0.65,
                delay: 0.45,
                ease: smoothEase,
              }}
              className="about-doodle pointer-events-none absolute -left-8 top-[40%] z-20 hidden -translate-x-full text-black md:block"
            >
              <DoodleArrow />
            </motion.div>

            {/* IMAGE FLY-IN */}

            <motion.div
              initial={
                shouldAnimate
                  ? {
                      opacity: 0,
                      y: 110,
                      scale: 0.98,
                    }
                  : false
              }
              whileInView={
                shouldAnimate
                  ? {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }
                  : undefined
              }
              viewport={viewportOnce}
              transition={{
                duration: 1.05,
                delay: 0.12,
                ease: smoothEase,
              }}
              whileHover={
                shouldAnimate
                  ? {
                      y: -4,
                      transition: {
                        duration: 0.3,
                        ease: "easeOut",
                      },
                    }
                  : undefined
              }
              className="about-photo relative overflow-hidden rounded-[24px] bg-[#e6e6e4] will-change-transform"
            >
              <img
                src="/images/people.avif"
                alt="People looking down together and smiling"
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                className="aspect-[1.3/1] w-full object-cover grayscale transition-transform duration-700 ease-out hover:scale-[1.025]"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />

              <div className="absolute bottom-4 left-4 rounded-full border border-white/50 bg-white/85 px-3 py-2 text-[9px] uppercase tracking-[0.16em] text-black/70 backdrop-blur-md">
                Built around people
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      

      {/* ===================================================
          ABOUT FOOTER
      =================================================== */}

      <motion.div
        initial={
          shouldAnimate
            ? {
                opacity: 0,
                y: 12,
              }
            : false
        }
        whileInView={
          shouldAnimate
            ? {
                opacity: 1,
                y: 0,
              }
            : undefined
        }
        viewport={viewportOnce}
        transition={{
          duration: 0.6,
          ease: smoothEase,
        }}
        className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-5 py-6 text-[9px] uppercase tracking-[0.2em] text-black/35 sm:px-8 md:px-[5.7vw]"
      >
        <span>01 — Strategy</span>
        <span>02 — Design</span>
        <span>03 — Engineering</span>
        <span>04 — Intelligence</span>
      </motion.div>
    </section>
  );
}