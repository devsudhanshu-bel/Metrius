
"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Globe,
  Mail,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const lineContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.1,
    },
  },
};

const lineVariant = {
  hidden: {
    y: 100,
    opacity: 0,
    filter: "blur(8px)",
  },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.95,
      ease: EASE,
    },
  },
};

const contentVariant = {
  hidden: {
    y: 35,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

const letterContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.12,
    },
  },
};

const letterVariant = {
  hidden: {
    y: "115%",
    rotateX: -80,
    opacity: 0,
    filter: "blur(8px)",
  },
  visible: {
    y: "0%",
    rotateX: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: EASE,
    },
  },
};

function AnimatedText({ text }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      className="inline-block"
      variants={reduceMotion ? undefined : letterContainer}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.7 }}
      aria-label={text}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block"
          style={{
            whiteSpace: char === " " ? "pre" : "normal",
            transformOrigin: "bottom center",
          }}
          variants={reduceMotion ? undefined : letterVariant}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={contentVariant}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({
  children,
  href,
  secondary = false,
}) {
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 180,
    damping: 14,
    mass: 0.3,
  });

  const springY = useSpring(y, {
    stiffness: 180,
    damping: 14,
    mass: 0.3,
  });

  const handleMouseMove = (event) => {
    if (reduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const pointerX =
      event.clientX - rect.left - rect.width / 2;

    const pointerY =
      event.clientY - rect.top - rect.height / 2;

    x.set(pointerX * 0.12);
    y.set(pointerY * 0.12);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        reduceMotion
          ? undefined
          : {
              x: springX,
              y: springY,
            }
      }
      whileHover={
        reduceMotion ? undefined : { scale: 1.025 }
      }
      whileTap={
        reduceMotion ? undefined : { scale: 0.975 }
      }
      className="group relative inline-flex min-h-[62px] items-center justify-between gap-8 overflow-hidden rounded-full border border-black/15 bg-transparent px-7 text-[11px] font-medium uppercase tracking-[0.14em] text-black transition-colors duration-500 hover:border-black hover:bg-black hover:text-white"
    >
      {/* Subtle hover shimmer */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/[0.04] to-transparent group-hover:via-white/10"
        whileHover={{ x: "200%" }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      />

      {/* Button label */}
      <span className="relative z-10">
        {children}
      </span>

      {/* Circular arrow — identical on both buttons */}
      <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-current/20 transition-all duration-500 group-hover:rotate-45">
        <ArrowUpRight
          size={16}
          strokeWidth={1.6}
        />
      </span>
    </motion.a>
  );
}

function SocialLink({
  href,
  label,
  children,
  index,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      initial={
        reduceMotion ? false : { opacity: 0, y: 18 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: 0.35 + index * 0.1,
        duration: 0.65,
        ease: EASE,
      }}
      whileHover={
        reduceMotion ? undefined : { y: -4, scale: 1.05 }
      }
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
    >
      {children}
    </motion.a>
  );
}

export default function ContactSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative isolate w-full overflow-hidden bg-[#f5f4f0] text-[#111111]"
    >
      {/* Background texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
        }}
      />

      {/* Animated background glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 -z-10 h-[450px] w-[450px] rounded-full bg-[#d9d8d0]/50 blur-[120px] md:h-[600px] md:w-[600px]"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -35, 0],
                y: [0, 30, 0],
                scale: [1, 1.08, 1],
              }
        }
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Top navigation */}
      <div className="mx-auto w-full max-w-[1800px] px-6 pt-7 sm:px-10 lg:px-[7vw] lg:pt-10">
        <motion.div
          initial={
            reduceMotion ? false : { opacity: 0, y: -15 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex items-center justify-between border-b border-black/15 pb-5"
        >
          <a
            href="/"
            className="group inline-flex items-center gap-1.5 text-xl font-black tracking-[-0.09em] sm:text-2xl"
          >
            METRIUS
            <Asterisk
              size={19}
              strokeWidth={2.5}
              className="transition-transform duration-500 group-hover:rotate-90"
            />
          </a>

          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-black/45 sm:gap-4 sm:text-[10px]">
            <span className="hidden sm:inline">
              Independent Digital Studio
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
            <span>Contact / 04</span>
          </div>
        </motion.div>
      </div>

      {/* Contact details */}
      <div className="mx-auto w-full max-w-[1800px] px-6 py-20 sm:px-10 sm:py-28 lg:px-[7vw] lg:py-36">
        <div className="mb-8 flex items-center gap-4 sm:mb-10">
          <motion.span
            initial={
              reduceMotion ? false : { scaleX: 0 }
            }
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: EASE,
            }}
            className="h-px w-10 origin-left bg-black/50 sm:w-16"
          />

          <motion.p
            initial={
              reduceMotion ? false : { opacity: 0, y: 12 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: EASE,
            }}
            className="text-[9px] uppercase tracking-[0.3em] text-black/50 sm:text-[10px]"
          >
            CONTACT / METRIUS
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          {/* Email block */}
          <div>
            <Reveal>
              <div className="mb-8 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15">
                  <Mail size={15} strokeWidth={1.5} />
                </span>

                <span className="text-[10px] uppercase tracking-[0.22em] text-black/45">
                  01 / Get in touch
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="max-w-[500px] text-sm leading-[1.8] text-black/55 sm:text-base">
                Have a project in mind? Tell us what you&apos;re
                working on. We&apos;d love to hear about it and
                explore how we can build something meaningful
                together.
              </h2>
            </Reveal>

            <div className="mt-8 overflow-hidden">
              <a
                href="mailto:business@metrius.com"
                className="group inline-flex max-w-full items-center gap-3 break-all text-[clamp(1.5rem,4vw,3.2rem)] font-semibold uppercase leading-none tracking-[-0.075em]"
              >
                <AnimatedText text="BUSSINESS@METRIUS.COM" />

                <ArrowUpRight
                  size={25}
                  strokeWidth={1.5}
                  className="hidden shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 sm:block"
                />
              </a>
            </div>

            <Reveal delay={0.2} className="mt-9">
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-black/35">
                <span className="h-px w-10 bg-black/20" />
                <span>We&apos;re listening</span>
              </div>
            </Reveal>
          </div>

          {/* Other contact options */}
          <div className="flex flex-col gap-12 sm:gap-14">
            {/* NEW PROJECTS */}
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15">
                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.5}
                  />
                </span>

                <span className="text-[10px] uppercase tracking-[0.22em] text-black/45">
                  02 / New projects
                </span>
              </div>

              <h3 className="text-2xl font-bold uppercase tracking-[-0.06em] sm:text-3xl">
                Have an idea?
              </h3>

              <p className="mt-3 max-w-[390px] text-sm leading-[1.8] text-black/55 sm:text-base">
                From AI-powered applications to thoughtful
                digital experiences, let&apos;s build something
                with purpose.
              </p>

              <div className="mt-6">
                <MagneticButton href="mailto:bussiness@metrius.com">
                  Discuss your project
                </MagneticButton>
              </div>
            </Reveal>

            {/* COLLABORATION */}
            <Reveal delay={0.15}>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15">
                  <Globe size={15} strokeWidth={1.5} />
                </span>

                <span className="text-[10px] uppercase tracking-[0.22em] text-black/45">
                  03 / Collaborate
                </span>
              </div>

              <h3 className="text-2xl font-bold uppercase tracking-[-0.06em] sm:text-3xl">
                Let&apos;s connect.
              </h3>

              <p className="mt-3 max-w-[390px] text-sm leading-[1.8] text-black/55 sm:text-base">
                Interested in working together, exploring a
                partnership, or exchanging ideas? Get in touch.
              </p>

              <div className="mt-6">
                <MagneticButton
                  href="mailto:hello@metrius.com?subject=Collaboration%20with%20Metrius"
                  secondary
                >
                  Explore collaboration
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Closing statement */}
      <footer className="relative overflow-hidden bg-[#111111] text-[#f5f4f0]">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-[-30%] h-[500px] w-[500px] rounded-full border border-white/[0.07] sm:h-[700px] sm:w-[700px]"
          animate={
            reduceMotion ? undefined : { rotate: 360 }
          }
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute left-[18%] top-[8%] h-2 w-2 rounded-full bg-white/70" />
        </motion.div>

        <div className="mx-auto w-full max-w-[1800px] px-6 py-20 sm:px-10 sm:py-28 lg:px-[7vw] lg:py-36">
          <Reveal>
            <div className="mb-9 flex items-center gap-4 text-[9px] uppercase tracking-[0.28em] text-white/40 sm:text-[10px]">
              <span className="h-px w-10 bg-white/30" />
              <span>
                Good things start with a conversation
              </span>
            </div>
          </Reveal>

          <motion.h2
            variants={lineContainer}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="relative z-10 max-w-[1400px] text-[clamp(3.6rem,11.7vw,12rem)] font-black uppercase leading-[0.8] tracking-[-0.09em]"
          >
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                variants={lineVariant}
                className="block"
              >
                LET&apos;S WORK
              </motion.span>
            </span>

            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                variants={lineVariant}
                className="block text-white/35"
              >
                TOGETHER.
              </motion.span>
            </span>
          </motion.h2>

          <Reveal delay={0.1}>
            <a
              href="mailto:hello@metrius.com"
              className="group mt-12 flex items-center gap-4 sm:mt-16 sm:gap-7"
            >
              <span className="shrink-0 text-xs text-white/55 sm:text-base">
                Have a project in mind?
              </span>

              <span className="relative h-px flex-1 overflow-hidden bg-white/30">
                <motion.span
                  className="absolute inset-0 origin-left bg-white"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                    delay: 0.2,
                    ease: EASE,
                  }}
                />
              </span>

              <span className="flex shrink-0 items-center gap-2 text-xs transition-colors duration-300 group-hover:text-white/60 sm:text-base">
                Say hello
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </a>
          </Reveal>

          {/* Footer bottom */}
          <div className="mt-20 flex flex-col justify-between gap-8 border-t border-white/15 pt-7 sm:mt-28 sm:flex-row sm:items-end">
            <Reveal>
              <a
                href="/"
                className="inline-flex items-center gap-2 text-2xl font-black tracking-[-0.09em]"
              >
                METRIUS
                <Asterisk size={19} strokeWidth={2.5} />
              </a>

              <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-white/35">
                AI · Software · Systems
              </p>
            </Reveal>

            <div className="flex flex-wrap items-center gap-3">
              {/* LinkedIn */}
              <SocialLink
                href="https://www.linkedin.com/"
                label="LinkedIn"
                index={0}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V8.99h3.56v11.46ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.44c.98 0 1.79-.77 1.79-1.72V1.72C24 .77 23.19 0 22.21 0h.01Z" />
                </svg>
              </SocialLink>

              {/* Discord */}
              <SocialLink
                href="https://discord.com/"
                label="Discord"
                index={1}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19.73 5.05a19.2 19.2 0 0 0-4.76-1.48.07.07 0 0 0-.08.04c-.21.37-.44.85-.6 1.23a17.8 17.8 0 0 0-5.37 0c-.16-.39-.4-.86-.61-1.23a.08.08 0 0 0-.08-.04 19.1 19.1 0 0 0-4.76 1.48.07.07 0 0 0-.03.03C.42 9.52-.4 13.86.01 18.15c0 .02.01.04.03.05a19.4 19.4 0 0 0 5.83 2.96.08.08 0 0 0 .09-.03c.45-.62.85-1.27 1.2-1.96a.08.08 0 0 0-.04-.1 12.8 12.8 0 0 1-1.82-.87.08.08 0 0 1-.01-.13l.36-.28a.08.08 0 0 1 .08-.01c3.82 1.75 7.95 1.75 11.72 0a.08.08 0 0 1 .08.01l.36.28a.08.08 0 0 1-.01.13c-.58.34-1.18.63-1.82.87a.08.08 0 0 0-.04.1c.35.69.75 1.34 1.2 1.96a.08.08 0 0 0 .09.03 19.3 19.3 0 0 0 5.84-2.96.08.08 0 0 0 .03-.05c.49-4.96-.82-9.26-3.46-13.07a.06.06 0 0 0-.03-.03ZM8.02 14.86c-1.14 0-2.08-1.05-2.08-2.34 0-1.3.92-2.35 2.08-2.35 1.17 0 2.1 1.06 2.08 2.35 0 1.29-.92 2.34-2.08 2.34Zm7.96 0c-1.14 0-2.08-1.05-2.08-2.34 0-1.3.92-2.35 2.08-2.35 1.17 0 2.08 1.06 2.08 2.35 0 1.29-.91 2.34-2.08 2.34Z" />
                </svg>
              </SocialLink>

              {/* Instagram */}
              <SocialLink
                href="https://www.instagram.com/"
                label="Instagram"
                index={2}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
                </svg>
              </SocialLink>
            </div>

            <Reveal>
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/35 sm:text-right">
                © {new Date().getFullYear()} Metrius
                <span className="mt-2 block">
                  Built with intention.
                </span>
              </p>
            </Reveal>
          </div>

          <motion.div
            aria-hidden="true"
            initial={
              reduceMotion ? false : { scaleX: 0 }
            }
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              ease: EASE,
            }}
            className="mt-10 h-px origin-left bg-gradient-to-r from-white/40 via-white/10 to-transparent"
          />
        </div>
      </footer>
    </section>
  );
}
