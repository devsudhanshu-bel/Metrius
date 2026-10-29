"use client";

import { useCallback, type MouseEvent } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const INTRO_DELAY = 10;

const navigation = [
  { label: "HOME", target: "home" },
  { label: "ABOUT", target: "about" },
  { label: "SERVICES", target: "services" },
  { label: "CONTACT", target: "contact" },
];

const sectionIndicators = ["01", "02", "03", "04"];

export default function HeroContent() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  const handleSmoothScroll = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, targetId: string) => {
      event.preventDefault();

      document.getElementById(targetId)?.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "start",
      });
    },
    [shouldReduceMotion]
  );

  const getTransition = (delay = 0) =>
    shouldReduceMotion
      ? { duration: 0 }
      : {
          duration: 0.9,
          delay: INTRO_DELAY + delay,
          ease: [0.22, 1, 0.36, 1] as const,
        };

  const revealVariants: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          },
    },
  };

  const navVariants: Variants = {
    hidden: { opacity: 0, y: -14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            delay: INTRO_DELAY,
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          },
    },
  };

  const heroVariants: Variants = {
    hidden: {},
    visible: {
      transition: shouldReduceMotion
        ? { staggerChildren: 0 }
        : {
            delayChildren: INTRO_DELAY,
            staggerChildren: 0.42,
          },
    },
  };

  const delayedFadeVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            delay: INTRO_DELAY + 2.8,
            duration: 0.9,
            ease: "easeOut",
          },
    },
  };

  return (
    <>
      {/* NAVIGATION */}
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="hero-nav absolute inset-x-0 top-0 z-30 flex w-full items-center justify-between px-[4.5vw] py-7 md:py-8"
        aria-label="Main navigation"
      >
        <motion.a
          variants={revealVariants}
          href="#home"
          onClick={(event) => handleSmoothScroll(event, "home")}
          aria-label="Metrius home"
          className="shrink-0 text-[1.1rem] font-medium tracking-[0.32em] text-white transition-opacity duration-300 hover:opacity-65 sm:text-[1.35rem]"
        >
          METRIUS
        </motion.a>

        <div className="hidden items-center gap-8 text-[10px] font-medium tracking-[0.22em] text-white/65 sm:gap-10 md:flex lg:gap-14">
          {navigation.map((item, index) => (
            <motion.a
              key={item.target}
              variants={revealVariants}
              href={`#${item.target}`}
              onClick={(event) =>
                handleSmoothScroll(event, item.target)
              }
              className={`group relative py-2 transition-colors duration-300 hover:text-white ${
                index === 0 ? "text-white" : ""
              }`}
            >
              {item.label}

              <span
                className={`absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white transition-opacity duration-300 ${
                  index === 0
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              />
            </motion.a>
          ))}
        </div>

        {/* MOBILE NAVIGATION */}
        <motion.a
          variants={revealVariants}
          href="#contact"
          onClick={(event) => handleSmoothScroll(event, "contact")}
          className="text-[9px] tracking-[0.2em] text-white/75 transition-colors hover:text-white md:hidden"
        >
          CONTACT
        </motion.a>
      </motion.nav>

      {/* HERO CONTENT — ALL TEXT WAITS FOR THE INTRO */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        className="relative z-10 flex min-h-screen w-full items-start px-[6.5vw] pb-28 pt-[27vh] sm:pt-[28vh] lg:pt-[29vh]"
      >
        <div className="w-full max-w-[760px] text-white">
          {/* CATEGORY LABEL */}
          <motion.div
            variants={revealVariants}
            className="mb-7 flex items-center gap-4 sm:mb-9"
          >
            <motion.span
              initial={shouldReduceMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={getTransition(0.05)}
              style={{ transformOrigin: "left" }}
              className="h-px w-10 shrink-0 bg-white/90 sm:w-[60px]"
            />

            <span className="text-[8px] font-medium uppercase tracking-[0.3em] text-white/90 sm:text-[10px] sm:tracking-[0.34em]">
              AI <span className="mx-1">·</span> SOFTWARE{" "}
              <span className="mx-1">·</span> SYSTEMS
            </span>
          </motion.div>

          {/* FUTURISTIC METRIUS WORDMARK */}
          <motion.h1
            variants={revealVariants}
            className="font-metrius text-[clamp(3rem,7vw,7.5rem)] font-medium leading-[0.95] tracking-[0.12em] text-white"
          >
            METRIUS
          </motion.h1>

          {/* BRAND SLOGAN */}
          <motion.h2
            variants={revealVariants}
            className="mt-5 max-w-[720px] text-[clamp(2.2rem,4.15vw,4.5rem)] font-light uppercase leading-[0.94] tracking-[-0.045em] text-white sm:mt-6"
          >
            Originality
            <br />
            Has No Source
            <br />
            Code.
          </motion.h2>

          {/* SUPPORTING STATEMENT */}
          <motion.p
            variants={revealVariants}
            className="mt-5 max-w-[440px] text-[12px] font-light leading-relaxed tracking-[0.07em] text-white/65 sm:mt-6 sm:text-[15px] md:text-[17px]"
          >
            Tools can be replicated. Vision cannot.
          </motion.p>
        </div>
      </motion.div>

      {/* SCROLL INDICATOR — BOTTOM LEFT */}
      <motion.a
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={getTransition(2.8)}
        href="#about"
        onClick={(event) => handleSmoothScroll(event, "about")}
        className="absolute bottom-6 left-[5.1vw] z-20 flex items-center gap-5 text-white/60 transition-colors duration-300 hover:text-white sm:bottom-8"
        aria-label="Scroll to explore"
      >
        <span className="relative flex h-[54px] w-px items-center justify-center bg-white/35 sm:h-[68px]">
          <motion.span
            animate={
              shouldReduceMotion
                ? undefined
                : { y: [0, 13, 0], opacity: [1, 0.45, 1] }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
            className="absolute h-[5px] w-[5px] rounded-full bg-white"
          />
        </span>

        <span className="flex flex-col gap-1 text-[8px] font-medium uppercase tracking-[0.2em] sm:text-[9px]">
          <span>Scroll</span>
          <span>To Explore</span>
        </span>
      </motion.a>

      {/* SECTION INDICATORS — RIGHT */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={getTransition(3)}
        className="absolute right-[3.3vw] top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center md:flex"
        aria-label="Page sections"
      >
        <div className="relative flex flex-col items-center gap-7">
          <span className="absolute bottom-1 top-1 w-px bg-white/20" />

          {sectionIndicators.map((number, index) => (
            <motion.a
              key={number}
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, x: 6 }
              }
              animate={{ opacity: 1, x: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.45,
                      delay: INTRO_DELAY + 3.1 + index * 0.12,
                      ease: "easeOut",
                    }
              }
              href={`#${navigation[index]?.target ?? "home"}`}
              onClick={(event) =>
                handleSmoothScroll(
                  event,
                  navigation[index]?.target ?? "home"
                )
              }
              aria-label={`Navigate to section ${number}`}
              aria-current={index === 0 ? "page" : undefined}
              className="group relative flex items-center gap-3 pl-3 text-[9px] tracking-[0.12em] transition-colors duration-300"
            >
              <span
                className={`absolute left-0 h-1 w-1 rounded-full transition-all duration-300 ${
                  index === 0
                    ? "scale-100 bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                    : "scale-75 bg-white/30 group-hover:scale-100 group-hover:bg-white"
                }`}
              />

              <span
                className={
                  index === 0
                    ? "text-white"
                    : "text-white/40 group-hover:text-white/80"
                }
              >
                {number}
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </>
  );
}