
"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

import Footer from "@/components/footer/Footer";

const EASE = [0.16, 1, 0.3, 1] as const;

const policySections = [
  {
    number: "01",
    title: "Privacy Policy",
    description:
      "At Metrius, we respect your privacy and are committed to handling your personal information responsibly. Our Privacy Policy explains what information we collect, how we use and store it, when it may be shared, and the measures we take to protect your data across our products and services.",
  },
  {
    number: "02",
    title: "Terms of Service",
    description:
      "Our Terms of Service establish the guidelines and conditions governing your use of Metrius websites, applications, software, and digital platforms. They outline user responsibilities, permitted activities, service limitations, and the terms under which our products are provided.",
  },
  {
    number: "03",
    title: "Cookie Policy",
    description:
      "Metrius may use cookies and similar technologies to maintain essential website functionality, remember user preferences, and understand how visitors interact with our platforms. Our Cookie Policy explains these technologies, their purposes, and the choices available to users for managing their preferences.",
  },
  {
    number: "04",
    title: "Data Protection",
    description:
      "We are committed to protecting personal information through appropriate technical and organizational safeguards. Metrius aims to minimize unnecessary data collection, restrict access to authorized parties, and handle information responsibly throughout its lifecycle, in accordance with applicable privacy laws.",
  },
  {
    number: "05",
    title: "AI Ethics & Responsibility",
    description:
      "At Metrius, we believe artificial intelligence should be developed and used responsibly, transparently, and with respect for human autonomy. We strive to build AI-powered experiences that prioritize user safety, privacy, fairness, and accountability while recognizing the limitations of AI-generated outputs.",
  },
  {
    number: "06",
    title: "Acceptable Use Policy",
    description:
      "Our Acceptable Use Policy defines the standards expected of everyone using Metrius services. Users must not engage in unlawful activities, unauthorized system access, malicious behavior, infringement of others' rights, or any activity that compromises the safety, integrity, or availability of our platforms.",
  },
  {
    number: "07",
    title: "Intellectual Property",
    description:
      "Metrius's branding, logos, original designs, software, website content, and other proprietary materials are protected by applicable intellectual property laws. Users may not reproduce, distribute, modify, or commercially exploit these materials without appropriate authorization, except where permitted by law or an applicable license.",
  },
  {
    number: "08",
    title: "Security Policy",
    description:
      "We take reasonable measures to maintain the security and integrity of our digital infrastructure, including appropriate access controls, system monitoring, and security maintenance. We continuously seek to identify vulnerabilities, reduce potential risks, and improve our security practices as our technology and services evolve.",
  },
  {
    number: "09",
    title: "Data Retention & Deletion",
    description:
      "Metrius retains personal information only for as long as reasonably necessary to provide services, meet legitimate operational requirements, and comply with applicable laws. Where permitted, users may request access to, correction of, or deletion of their personal information, subject to applicable legal obligations and retention requirements.",
  },
  {
    number: "10",
    title: "Contact & Legal Inquiries",
    description:
      "We believe that clear communication is essential to maintaining trust with our users and partners. For questions regarding our privacy practices, data protection, intellectual property, or legal policies, please contact the Metrius team through our official communication channels.",
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
  distance = 18,
  duration = 0.85,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    once: true,
    amount: 0.06,
  });

  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={
        reduceMotion ? false : { opacity: 0, y: distance }
      }
      animate={
        reduceMotion || inView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: distance }
      }
      transition={{
        duration: reduceMotion ? 0 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function PrivacyPolicy() {
  const reduceMotion = useReducedMotion();

  return (
    <main
      id="privacy-policy"
      className="relative min-h-screen w-full overflow-x-clip bg-[#f8f8f6] text-[#111111]"
    >
      {/* BACKGROUND — SOFT EDITORIAL GRADIENTS */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-[12%] top-[12%] h-[460px] w-[460px] rounded-full bg-[#e9e7e1]/60 blur-[110px] md:h-[650px] md:w-[650px]" />

        <div className="absolute right-[8%] top-[20%] h-[400px] w-[400px] rounded-full bg-[#e9e5dc]/45 blur-[120px] md:h-[550px] md:w-[550px]" />

        <div className="absolute bottom-[5%] left-[20%] h-[300px] w-[300px] rounded-full bg-[#efede8]/40 blur-[100px]" />
      </div>

      {/* HEADER */}

      <motion.header
        className="relative z-20 flex min-h-[76px] w-full items-center justify-between border-b border-black/10 px-5 sm:px-8 md:px-[5.5vw]"
        initial={
          reduceMotion ? false : { opacity: 0, y: -12 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.8,
          ease: EASE,
        }}
      >
        <Link
          href="/"
          aria-label="Metrius home"
          className="text-[30px] font-semibold tracking-[-0.04em]"
        >
          METRIUS <sup className="text-[8px]"></sup>
        </Link>
      </motion.header>

      {/* EDITORIAL META STRIP */}

      <div className="relative z-10 grid grid-cols-3 gap-3 px-5 pt-5 text-[12px] uppercase tracking-[0.13em] text-black/45 sm:px-8 sm:text-[9px] md:px-[5.5vw]">
        <span>Metrius / Legal</span>

        <span className="text-center">
          Trust through transparency
        </span>

        <span className="text-right">
          Policies / 001—010
        </span>
      </div>

      {/* MAIN EDITORIAL COMPOSITION */}

      <div className="relative z-10 grid w-full grid-cols-1 gap-12 px-5 pb-12 pt-9 sm:px-8 md:grid-cols-[48%_52%] md:gap-0 md:px-[5.5vw] md:pb-14 md:pt-8">

        {/* LEFT — EDITORIAL CONTENT */}

        <section className="relative flex min-w-0 flex-col md:pr-[3.2vw]">

          {/* EDITORIAL NAVIGATION */}

          <Reveal delay={0.08} distance={10}>
            <div className="flex items-start justify-between">
              <div className="flex flex-col font-serif text-[17px] leading-[1.3] sm:text-[18px]">
                <Link
                  href="/#work"
                  className="transition-opacity hover:opacity-50"
                >
                  — Work
                </Link>

                <Link
                  href="/#about"
                  className="transition-opacity hover:opacity-50"
                >
                  About
                </Link>

                <span>Privacy</span>

                <Link
                  href="/#contact"
                  className="transition-opacity hover:opacity-50"
                >
                  Contact
                </Link>
              </div>

              <p className="max-w-[190px] text-right font-mono text-[9px] leading-[1.9] tracking-[0.08em] text-black/45 sm:text-[10px]">
                DIGITAL EXPERIENCES
                <br />
                BUILT WITH INTENTION
              </p>
            </div>
          </Reveal>

          {/* NEW — LARGE PRIVACY QUOTE */}

          <Reveal
            className="relative z-10 mt-16 max-w-[520px] sm:mt-20 md:mt-[clamp(4rem,10vh,8rem)]"
            delay={0.18}
            distance={24}
            duration={1.05}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-black/35" />

              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/45 sm:text-[10px]">
                A principle we stand by
              </p>
            </div>

            <h2 className="max-w-[520px] font-serif text-[clamp(2.8rem,4.3vw,5rem)] font-normal leading-[0.96] tracking-[-0.065em]">
              Privacy is not
              <br />
              optional.
              <br />
              <span className="text-black/45">
                It is fundamental.
              </span>
            </h2>

            <div className="mt-7 max-w-[310px] border-t border-black/15 pt-4 sm:mt-8">
              <p className="text-[11px] leading-[1.9] text-black/50 sm:text-[12px]">
                Your trust matters in everything
                we create, protect, and deliver.
              </p>
            </div>
          </Reveal>

          {/* SOFT GLOW BEHIND THE CHARACTER */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[15%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#e9e7e1]/70 blur-[85px] sm:h-[400px] sm:w-[400px] md:h-[430px] md:w-[430px]"
          />

          {/* CHARACTER ILLUSTRATION */}

          <Reveal
            className="relative z-10 flex min-h-[340px] flex-1 items-center justify-center py-8 sm:min-h-[410px] md:min-h-[min(48vh,490px)] md:py-0"
            delay={0.24}
            distance={25}
            duration={1.1}
          >
            <motion.div
              className="relative h-[330px] w-full max-w-[390px] sm:h-[390px] sm:max-w-[450px] md:h-[min(43vh,450px)] md:max-w-[490px] lg:h-[min(48vh,490px)]"
              whileHover={
                reduceMotion ? undefined : { y: -4 }
              }
              transition={{
                duration: 0.7,
                ease: EASE,
              }}
            >
              <Image
                src="/images/privacy-policy.avif"
                alt="Illustration of a person seated and working on a laptop"
                fill
                priority
                sizes="(max-width: 767px) 90vw, (max-width: 1200px) 44vw, 40vw"
                className="object-contain object-center"
              />
            </motion.div>
          </Reveal>

          {/* EDITORIAL SIDE ANNOTATIONS */}

          <div className="pointer-events-none absolute left-0 top-[43%] hidden flex-col gap-1.5 font-mono text-[9px] leading-[1.8] tracking-[0.08em] text-black/40 lg:flex">
            <span>01 /</span>
            <span>SECURE</span>
            <span>BY DESIGN</span>
          </div>

          <div className="pointer-events-none absolute right-[2%] top-[50%] hidden flex-col gap-1.5 text-right font-mono text-[9px] leading-[1.8] tracking-[0.08em] text-black/40 lg:flex">
            <span>DATA</span>
            <span>RESPECT</span>
            <span>TRUST</span>
          </div>

          {/* OVERSIZED HEADLINE */}

          <Reveal
            className="relative z-10 mt-auto pt-5"
            delay={0.3}
            distance={22}
            duration={1}
          >
            <p className="mb-5 text-[10px] uppercase tracking-[0.18em] text-black/45 sm:text-[11px]">
              Our commitment to you
            </p>

            <h1 className="max-w-[800px] font-serif text-[clamp(3.4rem,6.3vw,7rem)] font-normal leading-[0.85] tracking-[-0.065em]">
              Shaping digital
              <br />
              experiences with
              <br />
              clarity, intention,
              <br />
              and character.
            </h1>

            {/* CLOSING STATEMENT */}

            <div className="mt-8 border-t border-black/15 pt-5 sm:mt-10">
              <p className="max-w-[420px] text-[13px] leading-[1.9] text-black/65 sm:text-[14px]">
                Trust matters. Discover the principles behind
                how Metrius approaches privacy, data and
                responsible innovation.
              </p>
            </div>
          </Reveal>
        </section>

        {/* RIGHT — PRIVACY & POLICIES DOCUMENT */}

        <motion.section
          aria-labelledby="policy-heading"
          className="relative flex min-w-0 flex-col self-start bg-[#efefed]/95 px-5 py-7 sm:px-8 sm:py-9 md:ml-[-1px] md:px-[3vw] md:py-9 lg:px-[3.4vw] lg:py-10"
          initial={
            reduceMotion ? false : { opacity: 0, x: 24 }
          }
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 1,
            delay: reduceMotion ? 0 : 0.15,
            ease: EASE,
          }}
        >
          {/* DOCUMENT HEADING */}

          <div className="flex items-start justify-between gap-4 border-b border-black/15 pb-6 sm:pb-7">
            <div>
              <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.16em] text-black/45 sm:text-[10px]">
                Metrius / Legal document
              </p>

              <h2
                id="policy-heading"
                className="max-w-[650px] font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[0.9] tracking-[-0.065em]"
              >
                Privacy
                <br />
                &amp; Policies.
              </h2>
            </div>

            <span className="mt-1 shrink-0 rounded-full border border-black/35 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.08em] sm:text-[10px]">
              001 — 010
            </span>
          </div>

          {/* OVERVIEW */}

          <div className="grid grid-cols-1 gap-3 border-b border-black/15 py-6 sm:grid-cols-[0.4fr_1fr] sm:gap-5 sm:py-7">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-black/45 sm:text-[11px]">
              Overview
            </span>

            <p className="text-[13px] leading-[1.9] text-black/75 sm:text-[14px]">
              Metrius — trust, transparency and responsible
              innovation. These policies explain how we
              approach personal information, responsible AI,
              security and the use of our digital platforms.
            </p>
          </div>

          {/* ALL TEN POLICY SECTIONS */}

          <div className="flex-1">
            {policySections.map((item, index) => (
              <Reveal
                key={item.number}
                delay={0.04 + index * 0.035}
                distance={12}
                duration={0.75}
              >
                <article className="grid grid-cols-[30px_1fr] gap-3 border-b border-black/15 py-5 sm:grid-cols-[38px_1fr] sm:gap-4 sm:py-6">
                  <span className="pt-1 font-mono text-[10px] tracking-[0.08em] text-black/45 sm:text-[11px]">
                    {item.number}
                  </span>

                  <div>
                    <h3 className="font-serif text-[23px] leading-[1.12] tracking-[-0.045em] sm:text-[26px] md:text-[clamp(1.4rem,1.8vw,1.8rem)]">
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-[700px] text-[13px] leading-[1.9] text-black/70 sm:text-[14px]">
                      {item.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* DOCUMENT ENDING */}

          <div className="mt-8 border-t border-black/20 pt-7 sm:mt-10 sm:pt-8">
            <p className="text-[10px] uppercase tracking-[0.15em] text-black/45 sm:text-[11px]">
              Questions about our policies?
            </p>

            <p className="mt-3 font-serif text-[32px] leading-none tracking-[-0.045em] sm:text-[38px]">
              Let&apos;s talk.
            </p>
          </div>
        </motion.section>
      </div>
      <Footer />
    </main>
  );
}
