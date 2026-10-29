
"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

const navigationGroups = [
  [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Shipping Policy", href: "/shipping" },
  ],
  [
    { label: "Contact Us", href: "/contact" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];

const EASE = [0.22, 1, 0.36, 1];

const revealVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

const staggerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

function FooterLink({ link }) {
  const reduceMotion = useReducedMotion();
  const external = link.href.startsWith("https://");

  return (
    <motion.a
      href={link.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      variants={revealVariants}
      whileHover={
        reduceMotion ? undefined : { x: 5, color: "#ffffff" }
      }
      transition={{ duration: 0.25 }}
      className="group relative inline-flex w-fit py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/45 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:text-white sm:text-xs"
    >
      {link.label}

      <motion.span
        aria-hidden="true"
        className="absolute -bottom-1 left-0 h-px w-full origin-left bg-white/60"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}

function LaboratoryIllustration() {
  const reduceMotion = useReducedMotion();
  const clipId = useId().replace(/:/g, "");

  return (
    <motion.div
      className="group relative flex h-44 w-full items-center justify-center overflow-hidden bg-[#000000] sm:h-52 lg:h-full lg:min-h-[220px]"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE }}
      role="img"
      aria-label="Decorative laboratory glassware illustration"
    >
      {/* SOLID BLACK BACKGROUND */}

      <motion.svg
        viewBox="0 0 400 120"
        className="relative z-10 h-auto w-full max-w-[580px] overflow-visible px-3 text-white/45"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        aria-hidden="true"
        whileHover={
          reduceMotion ? undefined : { scale: 1.035 }
        }
        transition={{ duration: 0.6, ease: EASE }}
      >
        <defs>
          <clipPath id={`${clipId}-dropper`}>
            <path d="M215 35 Q215 30 220 30 H240 Q245 30 245 35 V80 Q245 90 230 90 Q215 90 215 80 Z" />
          </clipPath>

          <linearGradient
            id={`${clipId}-liquid`}
            x1="0"
            y1="58"
            x2="0"
            y2="94"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#b6a18a" stopOpacity="0.95" />
            <stop offset="1" stopColor="#665546" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* First vessel */}
        <g>
          <path d="M30 100 L40 30 H80 L90 100 Z" />
          <path d="M40 20 H80 V30 H40 Z" />
          <path d="M40 34 H80" strokeOpacity="0.2" />
        </g>

        {/* Tall vessel */}
        <g>
          <path d="M110 100 L120 18 H160 L170 100 Z" />
          <path d="M120 10 H160 V18 H120 Z" />
          <path d="M120 22 H160" strokeOpacity="0.2" />
        </g>

        {/* Dropper */}
        <g>
          <path d="M225 0 H235 V10 H240 V30 H220 V10 H225 Z" />

          <path d="M215 35 Q215 30 220 30 H240 Q245 30 245 35 V80 Q245 90 230 90 Q215 90 215 80 Z" />

          <g clipPath={`url(#${clipId}-dropper)`}>
            <motion.rect
              x="215"
              y="60"
              width="30"
              height="34"
              fill={`url(#${clipId}-liquid)`}
              stroke="none"
              animate={
                reduceMotion ? undefined : { y: [61, 57, 61] }
              }
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.path
              d="M213 62 Q222 56 230 60 T247 59 V95 H213 Z"
              fill={`url(#${clipId}-liquid)`}
              stroke="none"
              animate={
                reduceMotion ? undefined : { y: [0, 2, 0] }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </g>
        </g>

        {/* Third vessel */}
        <g>
          <path d="M275 100 L285 28 H325 L335 100 Z" />
          <path d="M285 18 H325 V28 H285 Z" />
          <path d="M285 32 H325" strokeOpacity="0.2" />
        </g>

        {/* Small vial */}
        <g>
          <path d="M360 22 H370 V40 H360 Z" />
          <path d="M350 48 Q350 42 356 42 H374 Q380 42 380 48 V90 Q380 103 365 103 Q350 103 350 90 Z" />
          <path d="M354 48 H376" strokeOpacity="0.2" />
        </g>

        {/* Animated baseline */}
        <motion.path
          d="M18 108 H390"
          stroke="white"
          strokeOpacity="0.12"
          strokeWidth="0.6"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.5,
            delay: 0.3,
            ease: EASE,
          }}
        />
      </motion.svg>

      <div className="pointer-events-none absolute bottom-3 left-4 text-[7px] uppercase tracking-[0.22em] text-white/20 sm:bottom-4 sm:left-6">
        Metrius / Research &amp; Development
      </div>
    </motion.div>
  );
}

export default function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <footer className="relative isolate overflow-hidden bg-[#000000] text-white">
      {/* METRIUS WORDMARK */}

      <div className="relative mx-auto w-full max-w-[1800px] overflow-hidden bg-black px-2 pb-12 pt-20 sm:px-5 sm:pb-16 sm:pt-24 md:pb-20 md:pt-28">
        <motion.div
          className="relative flex origin-center items-center justify-center overflow-hidden bg-black py-3"
          initial={
            reduceMotion ? false : { opacity: 0, scale: 0.55 }
          }
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.35, ease: EASE }}
        >
          <motion.h2
            aria-label="METRIUS"
            className="select-none whitespace-nowrap text-[23vw] font-bold leading-[0.8] tracking-[-0.09em] text-[#191919] sm:text-[22vw]"
            whileHover={
              reduceMotion
                ? undefined
                : { color: "#242424", scale: 1.015 }
            }
            transition={{ duration: 0.5, ease: EASE }}
          >
            METRIUS
          </motion.h2>

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.025] to-transparent"
            initial={{ x: "-130%" }}
            whileInView={{ x: "400%" }}
            viewport={{ once: true }}
            transition={{
              duration: 2,
              delay: 0.4,
              ease: EASE,
            }}
          />
        </motion.div>
      </div>

      {/* NAVIGATION AND ILLUSTRATION */}

      <div className="grid grid-cols-1 border-y border-white/[0.08] bg-black lg:grid-cols-2">
        <motion.nav
          aria-label="Footer navigation"
          className="grid grid-cols-2 gap-8 border-b border-white/[0.08] bg-black p-7 sm:gap-12 sm:p-10 md:p-14 lg:border-b-0 lg:border-r"
          variants={staggerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {navigationGroups.map((group, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-5 sm:gap-6"
            >
              {group.map((link) => (
                <FooterLink key={link.label} link={link} />
              ))}
            </div>
          ))}
        </motion.nav>

        <LaboratoryIllustration />
      </div>

      {/* COPYRIGHT AND LEGAL LINKS */}

      <motion.div
        className="flex flex-col items-start justify-between gap-5 border-t border-white/[0.07] bg-black px-7 py-6 text-[9px] font-medium tracking-[0.08em] text-white/35 sm:flex-row sm:items-center sm:px-10 md:px-14"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <span>
          © {new Date().getFullYear()} METRIUS. ALL RIGHTS RESERVED.
        </span>

        <nav
          aria-label="Legal navigation"
          className="flex flex-wrap gap-x-5 gap-y-3 sm:gap-x-7"
        >
          {legalLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              whileHover={
                reduceMotion ? undefined : { opacity: 1, y: -2 }
              }
              className="transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:text-white"
            >
              {link.label}
            </motion.a>
          ))}
        </nav>
      </motion.div>
    </footer>
  );
}
