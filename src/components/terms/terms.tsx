
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

const termsSections = [
  {
    number: "01",
    title: "Acceptance of Terms",
    description:
      "By accessing or using Metrius websites, applications, software, or digital services, you agree to comply with these Terms of Use and applicable laws. If you do not agree with these terms, you should discontinue using the relevant services.",
  },
  {
    number: "02",
    title: "Use of Our Services",
    description:
      "Metrius provides technology solutions, software products, AI-powered tools, and digital experiences designed to support innovation and productivity. You agree to use our services only for lawful purposes and in a manner that does not compromise their functionality, security, or availability.",
  },
  {
    number: "03",
    title: "User Responsibilities",
    description:
      "You are responsible for ensuring that your use of Metrius services complies with applicable laws and respects the rights of others. You must provide accurate information where required, protect your account credentials, and refrain from activities that may harm other users or our systems.",
  },
  {
    number: "04",
    title: "Prohibited Activities",
    description:
      "Users must not attempt unauthorized access, distribute malicious software, exploit system vulnerabilities without authorization, interfere with platform operations, engage in fraudulent activity, or use Metrius services to violate another person's privacy, security, or intellectual property rights.",
  },
  {
    number: "05",
    title: "Intellectual Property Rights",
    description:
      "All Metrius branding, logos, original designs, software, website content, and proprietary materials remain the property of Metrius or their respective rights holders unless otherwise stated. You may not reproduce, modify, distribute, or commercially exploit protected materials without appropriate authorization.",
  },
  {
    number: "06",
    title: "AI-Generated Content",
    description:
      "Certain Metrius services may incorporate artificial intelligence to generate information, recommendations, or other digital outputs. AI-generated content may contain inaccuracies or limitations, and users are responsible for reviewing and verifying outputs before relying on them for important decisions or professional purposes.",
  },
  {
    number: "07",
    title: "User-Submitted Content",
    description:
      "You retain the rights you lawfully hold in content submitted through our services. By submitting content, you authorize Metrius to process it as reasonably necessary to provide the requested functionality, maintain security, and fulfil applicable service obligations, subject to our Privacy Policy and any additional product-specific terms.",
  },
  {
    number: "08",
    title: "Third-Party Services",
    description:
      "Our platforms may integrate with or provide links to third-party websites, APIs, tools, or services. These external services may operate under their own terms and privacy policies, and users are responsible for reviewing the relevant conditions before using them.",
  },
  {
    number: "09",
    title: "Service Availability and Modifications",
    description:
      "Metrius strives to provide reliable and secure digital experiences but does not guarantee uninterrupted or error-free operation. We may update, modify, suspend, or discontinue features when necessary, subject to applicable law and any contractual commitments.",
  },
  {
    number: "10",
    title: "Limitation of Liability",
    description:
      "To the extent permitted by applicable law, Metrius shall not be liable for indirect or consequential losses arising from the use of our services. Nothing in these Terms excludes liability or statutory rights that cannot legally be excluded or limited.",
  },
  {
    number: "11",
    title: "Suspension and Termination",
    description:
      "Metrius reserves the right to restrict or suspend access when necessary to address security threats, unlawful activity, or material violations of these Terms. Where appropriate and legally permissible, we may provide notice and an opportunity to resolve the issue.",
  },
  {
    number: "12",
    title: "Privacy and Data Protection",
    description:
      "Your use of Metrius services is also subject to our Privacy Policy, which explains how personal information may be collected, processed, stored, and protected. By using our services, you acknowledge the applicable privacy terms; any consent required by law will be obtained separately.",
  },
  {
    number: "13",
    title: "Changes to These Terms",
    description:
      "We may revise these Terms of Use as our products, business practices, and legal obligations evolve. Updated terms will be published on our website with a revised effective date, and additional notice or consent will be provided where required.",
  },
  {
    number: "14",
    title: "Governing Law",
    description:
      "These Terms are subject to the laws of India, to the extent applicable and subject to mandatory legal protections. Any disputes will be addressed through appropriate legal procedures and the competent jurisdiction determined under applicable law.",
  },
  {
    number: "15",
    title: "Contact Information",
    description:
      "For questions, concerns, or requests regarding these Terms of Use, please contact Metrius through our official communication channels at bussiness@metrius.in.",
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

export default function TermsOfUse() {
  const reduceMotion = useReducedMotion();

  return (
    <main
      id="terms-of-use"
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
          className="text-[13px] font-semibold tracking-[-0.04em]"
        >
          METRIUS <sup className="text-[8px]">®</sup>
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex items-center gap-3 text-[9px] uppercase tracking-[0.05em] sm:gap-5 sm:text-[10px] md:gap-8"
        >
          <Link
            href="/#work"
            className="transition-opacity duration-300 hover:opacity-45"
          >
            Work
          </Link>

          <Link
            href="/#services"
            className="hidden transition-opacity duration-300 hover:opacity-45 sm:inline"
          >
            Services
          </Link>

          <Link
            href="/#about"
            className="transition-opacity duration-300 hover:opacity-45"
          >
            About
          </Link>

          <Link
            href="/#contact"
            className="transition-opacity duration-300 hover:opacity-45"
          >
            Contact
          </Link>
        </nav>
      </motion.header>

      {/* EDITORIAL META STRIP */}

      <div className="relative z-10 grid grid-cols-3 gap-3 px-5 pt-5 text-[8px] uppercase tracking-[0.13em] text-black/45 sm:px-8 sm:text-[9px] md:px-[5.5vw]">
        <span>Metrius / Legal</span>

        <span className="text-center">
          Clarity through responsibility
        </span>

        <span className="text-right">
          Terms / 001—015
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

                <Link
                  href="/privacy-policy"
                  className="transition-opacity hover:opacity-50"
                >
                  Privacy
                </Link>

                <span>Terms</span>

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

          {/* TERMS OF USE QUOTE */}

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
              Good technology
              <br />
              begins with
              <br />
              clear boundaries.
            </h2>

            <div className="mt-7 max-w-[310px] border-t border-black/15 pt-4 sm:mt-8">
              <p className="text-[11px] leading-[1.9] text-black/50 sm:text-[12px]">
                Clear expectations. Responsible use.
                Better digital experiences.
              </p>
            </div>
          </Reveal>

          {/* SOFT GLOW BEHIND THE CHARACTER */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[15%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#e9e7e1]/70 blur-[85px] sm:h-[400px] sm:w-[400px] md:h-[430px] md:w-[430px]"
          />

          {/* TERMS OF USE ILLUSTRATION */}

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
                src="/images/terms-of-use.avif"
                alt="Illustration of a woman reviewing a digital agreement on a laptop"
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
            <span>FAIR USE</span>
            <span>BY DESIGN</span>
          </div>

          <div className="pointer-events-none absolute right-[2%] top-[50%] hidden flex-col gap-1.5 text-right font-mono text-[9px] leading-[1.8] tracking-[0.08em] text-black/40 lg:flex">
            <span>CLARITY</span>
            <span>RESPECT</span>
            <span>ACCOUNTABILITY</span>
          </div>

          {/* OVERSIZED HEADLINE */}

          <Reveal
            className="relative z-10 mt-auto pt-5"
            delay={0.3}
            distance={22}
            duration={1}
          >
            <p className="mb-5 text-[10px] uppercase tracking-[0.18em] text-black/45 sm:text-[11px]">
              Our commitment to responsible use
            </p>

            <h1 className="max-w-[800px] font-serif text-[clamp(3.4rem,6.3vw,7rem)] font-normal leading-[0.85] tracking-[-0.065em]">
              Built with
              <br />
              purpose,
              <br />
              guided by
              <br />
              responsibility.
            </h1>

            {/* CLOSING STATEMENT */}

            <div className="mt-8 border-t border-black/15 pt-5 sm:mt-10">
              <p className="max-w-[420px] text-[13px] leading-[1.9] text-black/65 sm:text-[14px]">
                Understand the principles that guide
                how you use Metrius products, services,
                software, and AI-powered experiences.
              </p>
            </div>
          </Reveal>
        </section>

        {/* RIGHT — TERMS OF USE DOCUMENT */}

        <motion.section
          aria-labelledby="terms-heading"
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
                id="terms-heading"
                className="max-w-[650px] font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[0.9] tracking-[-0.065em]"
              >
                Terms
                <br />
                of Use.
              </h2>
            </div>

            <span className="mt-1 shrink-0 rounded-full border border-black/35 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.08em] sm:text-[10px]">
              001 — 015
            </span>
          </div>

          {/* OVERVIEW */}

          <div className="grid grid-cols-1 gap-3 border-b border-black/15 py-6 sm:grid-cols-[0.4fr_1fr] sm:gap-5 sm:py-7">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-black/45 sm:text-[11px]">
              Overview
            </span>

            <p className="text-[13px] leading-[1.9] text-black/75 sm:text-[14px]">
              Metrius provides technology solutions,
              software products, AI-powered tools, and
              digital experiences designed to support
              innovation and productivity. These Terms
              of Use explain the responsibilities and
              conditions that govern your use of our services.
            </p>
          </div>

          {/* ALL FIFTEEN TERMS OF USE SECTIONS */}

          <div className="flex-1">
            {termsSections.map((item, index) => (
              <Reveal
                key={item.number}
                delay={0.04 + index * 0.025}
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
              Questions about these terms?
            </p>

            <p className="mt-3 font-serif text-[32px] leading-none tracking-[-0.045em] sm:text-[38px]">
              Let&apos;s talk.
            </p>

            <a
              href="mailto:bussiness@metrius.in"
              className="mt-4 inline-block text-[13px] text-black/65 underline decoration-black/25 underline-offset-4 transition-colors hover:text-black"
            >
              bussiness@metrius.in
            </a>
          </div>
        </motion.section>
      </div>

      <Footer />
    </main>
  );
}
