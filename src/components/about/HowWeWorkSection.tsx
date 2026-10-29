
"use client";

import { motion, useReducedMotion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Define",
    rotation: 5,
    position: "right",
    description:
      "We begin with the right questions. Together, we uncover your goals, understand your audience, and define a clear direction for what comes next.",
  },
  {
    number: "02",
    title: "Design",
    rotation: -7,
    position: "left",
    description:
      "We transform ideas into thoughtful experiences. Every interaction, visual detail, and decision serves a purpose.",
  },
  {
    number: "03",
    title: "Build",
    rotation: -6,
    position: "right",
    description:
      "We turn design into working systems through considered engineering, modern technology, and attention to every detail.",
  },
  {
    number: "04",
    title: "Launch",
    rotation: 6,
    position: "left",
    description:
      "We refine, test, and deliver the finished product, ready to perform in the real world and evolve with your ambitions.",
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

function ProcessCard({
  number,
  title,
  rotation,
  position,
  description,
  index,
}: {
  number: string;
  title: string;
  rotation: number;
  position: "left" | "right";
  description: string;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={[
        "process-card group relative mx-auto w-full max-w-[430px]",
        position === "right" ? "md:col-start-2" : "md:col-start-1",
        index === 0
          ? "md:row-start-1 md:mt-8"
          : index === 1
            ? "md:row-start-2 md:-mt-1"
            : index === 2
              ? "md:row-start-3 md:mt-0"
              : "md:row-start-4 md:-mt-2",
      ].join(" ")}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 38,
              rotate: rotation + (rotation > 0 ? 3 : -3),
              scale: 0.96,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        rotate: rotation,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -9,
              rotate: rotation + (rotation > 0 ? -1.5 : 1.5),
              transition: {
                duration: 0.3,
                ease: EASE,
              },
            }
      }
      transition={{
        opacity: { duration: 0.6, delay: index * 0.08 },
        y: { duration: 0.8, delay: index * 0.08, ease: EASE },
        rotate: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: index * 0.08,
        },
        scale: { duration: 0.75, delay: index * 0.08, ease: EASE },
      }}
      style={{
        transformOrigin: "50% 50%",
        zIndex: 10 + index,
      }}
    >
      <div className="process-card-inner relative rounded-[28px] bg-white p-[10px] shadow-[8px_14px_12px_rgba(0,0,0,0.035),0_30px_36px_rgba(0,0,0,0.13)] transition-shadow duration-500 group-hover:shadow-[10px_20px_24px_rgba(0,0,0,0.09),0_42px_60px_rgba(0,0,0,0.16)]">
        {/* Pin */}
        <motion.div
          className="absolute left-1/2 top-[25px] z-20 flex h-[43px] w-[43px] -translate-x-1/2 items-center justify-center rounded-full border-[5px] border-[#e6e6e4] bg-white shadow-[0_3px_7px_rgba(0,0,0,0.13)]"
          initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 17,
            delay: reduceMotion ? 0 : 0.2 + index * 0.08,
          }}
        >
          <span className="h-[23px] w-[23px] rounded-full bg-[#111] shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]" />
        </motion.div>

        {/* Card content */}
        <div className="relative min-h-[330px] overflow-hidden rounded-[22px] border-b border-black/30 bg-gradient-to-br from-[#f8f8f8] via-[#f1f1f1] to-[#e9e9e8] px-6 pb-8 pt-[83px] sm:min-h-[345px] sm:px-7 sm:pb-9 sm:pt-[88px]">
          <motion.span
            className="block text-[48px] font-normal leading-none tracking-[-0.085em] text-black sm:text-[58px]"
            initial={reduceMotion ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
          >
            {number}
          </motion.span>

          <h3 className="mt-5 text-[32px] font-semibold leading-tight tracking-[-0.06em] text-black sm:text-[36px]">
            {title}
          </h3>

          <p className="mt-4 text-[15px] leading-[1.75] text-black/65 sm:text-[16px]">
            {description}
          </p>

          {/* Light sweep on hover */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/80 to-transparent"
            initial={false}
            animate={{ x: "-10%", opacity: 0 }}
            whileHover={
              reduceMotion
                ? undefined
                : { x: "450%", opacity: 1 }
            }
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          {/* Bottom accent */}
          <motion.div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-[2px] bg-black"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            style={{ transformOrigin: "left" }}
            transition={{
              duration: 0.8,
              delay: 0.2 + index * 0.08,
              ease: EASE,
            }}
          />
        </div>
      </div>
    </motion.article>
  );
}

function Connector({
  d,
  delay,
}: {
  d: string;
  delay: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.path
      d={d}
      fill="none"
      stroke="#858585"
      strokeWidth="1.6"
      strokeDasharray="5 9"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      initial={
        reduceMotion
          ? false
          : { pathLength: 0, opacity: 0 }
      }
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration: 1.1,
        delay: reduceMotion ? 0 : delay,
        ease: EASE,
      }}
    />
  );
}

export default function HowWeWorkSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="how-we-work"
      className="relative isolate w-full overflow-hidden bg-[#f7f7f5] text-[#111]"
    >
      {/* Grey grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(60,60,60,0.055) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(60,60,60,0.055) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Soft centre illumination */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_25%,rgba(255,255,255,0.75),transparent_70%)]"
      />

      <div className="mx-auto max-w-[1600px] px-5 pb-28 pt-20 sm:px-8 md:px-[6vw] md:pb-36 md:pt-24">
        {/* Intro heading */}
        <motion.header
          className="process-intro relative z-10 max-w-[900px]"
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 28 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <motion.span
            className="inline-flex rounded-full border border-black/30 bg-white/60 px-4 py-2 text-[13px] font-medium tracking-wide text-black/75 backdrop-blur-sm"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            How we work
          </motion.span>

          <motion.h2
            className="mt-7 max-w-[900px] text-[clamp(2.5rem,5.2vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.075em] text-[#111]"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
          >
            From ambitious ideas
            <br className="hidden sm:block" />
            <span className="text-black/40">
              to things that move
            </span>
            <br className="hidden sm:block" />
            the world forward.
          </motion.h2>

          <motion.p
            className="mt-7 max-w-[570px] text-[16px] leading-[1.85] text-black/65 sm:text-[18px]"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.16, ease: EASE }}
          >
            Every meaningful product starts with a question. We
            bring clarity to the idea, craft the experience,
            engineer the system, and turn it into something real —
            built with purpose, designed to evolve, and made to
            matter.
          </motion.p>

          <motion.div
            className="mt-8 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-black/45"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.24, ease: EASE }}
          >
            <span className="h-px w-10 bg-black/35" />
            <span>
              Think clearly. Build intelligently. Move forward.
            </span>
          </motion.div>
        </motion.header>

        {/* Process cards and connectors */}
        <div className="process-stage relative mx-auto mt-16 max-w-[1160px] md:mt-[-35px]">
          {/* Desktop connector lines */}
          <svg
            className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full overflow-visible md:block"
            viewBox="0 0 1100 1500"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <Connector
              d="M690 180 C620 215 480 270 390 350"
              delay={0}
            />

            <Connector
              d="M390 350 C475 395 575 435 650 520"
              delay={0.2}
            />

            <Connector
              d="M650 520 C715 610 750 700 715 805"
              delay={0.4}
            />

            <Connector
              d="M715 805 C620 900 480 990 380 1090 S550 1290 750 1320"
              delay={0.6}
            />

            <motion.path
              d="M732 1304 L750 1320 L728 1317"
              fill="none"
              stroke="#777777"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, pathLength: 0 }
              }
              whileInView={{ opacity: 1, pathLength: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: reduceMotion ? 0 : 1.2,
                ease: EASE,
              }}
            />
          </svg>

          {/* Staggered card layout */}
          <div className="relative z-10 grid grid-cols-1 gap-14 sm:gap-16 md:min-h-[1370px] md:grid-cols-2 md:grid-rows-[300px_300px_300px_300px] md:gap-x-[8%] md:gap-y-[45px]">
            {steps.map((step, index) => (
              <ProcessCard
                key={step.number}
                number={step.number}
                title={step.title}
                rotation={step.rotation}
                position={step.position}
                description={step.description}
                index={index}
              />
            ))}
          </div>

          {/* Delivery message */}
          <motion.div
            className="process-finish relative z-10 mt-8 flex justify-center md:absolute md:left-[60%] md:top-[1200px] md:mt-0 md:justify-start"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 20, rotate: -1 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
              rotate: -5,
            }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="inline-block whitespace-nowrap text-[27px] font-normal italic tracking-[-0.055em] text-black sm:text-[34px]">
              Ready to be delivered!
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
