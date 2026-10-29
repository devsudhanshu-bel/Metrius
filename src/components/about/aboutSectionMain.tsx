
"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

const projects = [
  { number: "01.", name: "Doble Era", position: "top-[8%]", active: false },
  {
    number: "02.",
    name: "Frank de Paula",
    position: "top-[24%]",
    active: true,
  },
  {
    number: "03.",
    name: "Movent",
    position: "top-[43%]",
    active: false,
  },
  {
    number: "04.",
    name: "Grana Coffee",
    position: "top-[59%]",
    active: false,
  },
  {
    number: "05.",
    name: "San Cayetano",
    position: "top-[76%]",
    active: false,
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

const reveal = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 1.05,
  distance = 20,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.12,
    margin: "0px 0px -35px 0px",
  });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: distance }
      }
      animate={
        reduceMotion || isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: distance }
      }
      transition={{
        duration: reduceMotion ? 0 : duration,
        delay: reduceMotion ? 0 : delay,
        ease,
      }}
      style={{ willChange: !reduceMotion && !isInView ? "transform, opacity" : "auto" }}
    >
      {children}
    </motion.div>
  );
}

function ScrollSeal() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative flex h-[66px] w-[66px] shrink-0 items-center justify-center">
      <svg
        className={`absolute inset-0 h-full w-full ${
          reduceMotion ? "" : "animate-[spin_30s_linear_infinite]"
        }`}
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <defs>
          <path
            id="about-seal-circle"
            d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
          />
        </defs>

        <text
          fill="currentColor"
          fontSize="9"
          letterSpacing="2"
        >
          <textPath href="#about-seal-circle">
            METRIUS · SCROLL TO EXPLORE ·
          </textPath>
        </text>
      </svg>

      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        aria-hidden="true"
      >
        <path d="M12 3v18M5 14l7 7 7-7" />
      </svg>
    </div>
  );
}

export default function AboutSectionMain() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative isolate w-full overflow-hidden bg-[#f8f8f6] text-[#111111] selection:bg-[#d7c59d] selection:text-black"
    >
      {/* =====================================================
          AMBIENT BACKGROUND
          Static gradients for smooth performance
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute left-[-13%] top-[5%] h-[500px] w-[500px] rounded-full blur-[100px] md:h-[620px] md:w-[620px] md:blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(155,155,151,0.20) 0%, rgba(190,190,185,0.09) 42%, transparent 72%)",
          }}
        />

        <div
          className="absolute right-[5%] top-[16%] h-[430px] w-[430px] rounded-full blur-[100px] md:right-[10%] md:h-[620px] md:w-[620px] md:blur-[145px]"
          style={{
            background:
              "radial-gradient(circle, rgba(215,187,126,0.46) 0%, rgba(225,208,170,0.22) 38%, transparent 72%)",
          }}
        />

        <div
          className="absolute left-[27%] top-[35%] h-[350px] w-[350px] rounded-full blur-[120px] md:left-[35%] md:h-[500px] md:w-[500px]"
          style={{
            background:
              "radial-gradient(circle, rgba(212,205,190,0.17), transparent 72%)",
          }}
        />
      </div>

      {/* =====================================================
          HERO / TYPOGRAPHIC INTRODUCTION
      ====================================================== */}

      <section className="relative mx-auto w-full max-w-[1600px] px-6 pb-20 pt-12 sm:px-10 sm:pt-16 md:px-[7.5%] md:pb-28 md:pt-20 lg:pt-24">
        <Reveal
          className="absolute right-[12%] top-[14%] z-10 hidden max-w-[175px] lg:block"
          delay={0.35}
          duration={1.2}
          distance={12}
        >
          <p className="text-[10px] leading-[1.55] text-black/65">
            Metrius is a multidisciplinary technology studio that
            shapes ideas through thoughtful design, intelligent
            systems and engineering built around functionality.
          </p>
        </Reveal>

        <div className="relative">
          {/* Headline enters as a single smooth composition */}

          <Reveal duration={1.3} distance={30}>
            <h1 className="max-w-[1200px] font-serif text-[clamp(4rem,12.2vw,11.5rem)] font-normal leading-[0.76] tracking-[-0.075em]">
              <span className="block">Where</span>

              <span className="mt-[0.10em] block whitespace-nowrap">
                aesthetics and
              </span>

              <span className="mt-[0.10em] block">
                functionality
              </span>

              <span className="mt-[0.10em] block pl-[20%] sm:pl-[22%]">
                meet
              </span>
            </h1>
          </Reveal>

          {/* Mobile side note */}

          <Reveal
            className="mt-8 max-w-[235px] lg:hidden"
            delay={0.25}
            duration={1.1}
            distance={14}
          >
            <p className="text-[11px] leading-[1.7] text-black/60">
              Metrius is a multidisciplinary technology studio
              bringing together design, intelligence and engineering
              to create meaningful digital experiences.
            </p>
          </Reveal>

          {/* Supporting note */}

          <Reveal
            className="mt-12 max-w-[180px] sm:mt-16 md:mt-20 lg:mt-[-2px]"
            delay={0.4}
            duration={1.15}
            distance={14}
          >
            <p className="text-[10px] leading-[1.65] text-black/65">
              We build for what comes next, combining thoughtful
              design with technology that makes a difference.
            </p>
          </Reveal>

          {/* Scroll indicator */}

          <div className="absolute right-0 top-[39%] hidden flex-col items-center gap-5 lg:flex">
            <Reveal delay={0.5} duration={1.2} distance={8}>
              <ScrollSeal />
            </Reveal>

            <div className="relative h-[175px] w-px bg-black/20">
              <motion.div
                aria-hidden="true"
                className="absolute left-0 top-0 w-px origin-top bg-black"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: reduceMotion ? 0 : 1.5,
                  delay: reduceMotion ? 0 : 0.5,
                  ease,
                }}
                style={{ height: "100%" }}
              />

              <svg
                className="absolute bottom-0 left-1/2 h-5 w-8 -translate-x-1/2 translate-y-[1px]"
                viewBox="0 0 32 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                aria-hidden="true"
              >
                <path d="M1 1C12 1 16 19 16 19S20 1 31 1" />
              </svg>
            </div>
          </div>
        </div>

        {/* ===================================================
            MISSION STATEMENT
        ==================================================== */}

        <div className="mt-28 grid grid-cols-1 gap-9 sm:mt-36 md:mt-44 lg:mt-36">
          <Reveal
            className="max-w-[950px]"
            delay={0.08}
            duration={1.25}
            distance={24}
          >
            <h2 className="font-serif text-[clamp(2rem,5.05vw,4.7rem)] font-normal leading-[0.99] tracking-[-0.055em]">
              We are committed to creating memorable experiences
              through concept-driven design and intelligent
              engineering solutions.
            </h2>
          </Reveal>

          <div className="grid max-w-[690px] grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
            <Reveal delay={0.12} duration={1.1} distance={16}>
              <p className="text-[12px] leading-[1.7] text-black/75 sm:text-[13px]">
                Have you ever wondered what makes some digital
                experiences stand out? What makes them intuitive,
                memorable and meaningful? It is the clarity of an
                idea and the precision with which it is brought
                to life.
              </p>
            </Reveal>

            <Reveal delay={0.24} duration={1.1} distance={16}>
              <p className="text-[12px] leading-[1.7] text-black/75 sm:text-[13px]">
                At Metrius, we help businesses define their unique
                identity, connect with their audiences and transform
                ambitious ideas into purposeful digital products.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.18} duration={1.1} distance={12}>
            <Link
              href="/#services"
              aria-label="Explore Metrius services"
              className="group mt-1 inline-flex w-fit items-center gap-5"
            >
              <span className="relative flex h-[58px] w-[58px] items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className={`absolute inset-0 h-full w-full ${
                    reduceMotion ? "" : "animate-[spin_30s_linear_infinite]"
                  }`}
                  aria-hidden="true"
                >
                  <defs>
                    <path
                      id="about-more-circle"
                      d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                    />
                  </defs>

                  <text
                    fill="currentColor"
                    fontSize="9"
                    letterSpacing="2"
                  >
                    <textPath href="#about-more-circle">
                      DISCOVER MORE · DISCOVER MORE ·
                    </textPath>
                  </text>
                </svg>

                <span className="text-[18px]">↗</span>
              </span>

              <span className="h-px w-12 bg-black/50 transition-[width] duration-500 ease-out group-hover:w-20" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          SELECTED WORK
      ====================================================== */}

      <section
        id="work"
        className="relative mx-auto w-full max-w-[1600px] px-6 pb-28 pt-8 sm:px-10 sm:pb-36 md:px-[7.5%] md:pb-44"
      >
        <Reveal delay={0.05} duration={1.1} distance={12}>
          <div className="mb-8 grid grid-cols-[auto_1fr_auto] items-center gap-5 sm:gap-8">
            <span className="whitespace-nowrap text-[11px] font-medium">
              Selected work
            </span>

            <span className="h-px w-full bg-black/25" />

            <span className="whitespace-nowrap text-[11px] font-medium">
              Projects
            </span>
          </div>
        </Reveal>

        {/* Project image and overlapping titles */}

        <div className="relative mx-auto min-h-[530px] w-full max-w-[1100px] sm:min-h-[650px] md:min-h-[790px]">
          <Reveal
            className="absolute left-1/2 top-[7%] z-0 h-[310px] w-[65%] -translate-x-1/2 sm:top-[5%] sm:h-[470px] sm:w-[57%] md:h-[590px] md:w-[49%]"
            delay={0.12}
            duration={1.35}
            distance={22}
          >
            <div className="relative h-full w-full overflow-hidden bg-[#e8e5de]">
              <Image
                src="/images/about-us-reference.avif"
                alt="Architectural plans and design drawings being developed by hand"
                fill
                sizes="(max-width: 640px) 65vw, (max-width: 1024px) 57vw, 49vw"
                className="object-cover object-center transition-transform duration-1000 ease-out hover:scale-[1.025]"
              />
            </div>
          </Reveal>

          <div className="absolute inset-0 z-10">
            {projects.map((project, index) => (
              <Reveal
                key={project.number}
                delay={0.18 + index * 0.11}
                duration={1.15}
                distance={16}
                className={`absolute left-0 w-full ${project.position}`}
              >
                <Link
                  href="/#contact"
                  className="group relative flex items-baseline"
                  aria-label={`Explore project ${project.name}`}
                >
                  <span
                    className={`mr-3 shrink-0 text-[9px] transition-colors duration-500 sm:mr-5 sm:text-[11px] ${
                      project.active
                        ? "text-black/70"
                        : "text-black/25"
                    }`}
                  >
                    {project.number}
                  </span>

                  <span
                    className={`font-serif text-[clamp(2.8rem,9.4vw,8.2rem)] font-normal leading-[0.9] tracking-[-0.075em] transition-colors duration-500 ease-out ${
                      project.active
                        ? "text-black"
                        : "text-black/[0.22] group-hover:text-black/70"
                    }`}
                  >
                    {project.name}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Closing line */}

        <Reveal
          className="mt-10 flex items-center justify-between border-t border-black/20 pt-5"
          delay={0.12}
          duration={1.1}
          distance={12}
        >
          <span className="text-[9px] uppercase tracking-[0.16em] text-black/55">
            Metrius® — Design / Intelligence / Engineering
          </span>

          <Link
            href="/#contact"
            className="text-[10px] transition-opacity duration-300 hover:opacity-50"
          >
            Start a project ↗
          </Link>
        </Reveal>
      </section>
    </section>
  );
}
