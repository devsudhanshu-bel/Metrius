
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

const shippingSections = [
  {
    number: "01",
    title: "Digital Delivery",
    description:
      "Metrius primarily delivers digital products, software, AI-powered tools, and technology services electronically through online platforms, email, or account access. Delivery timelines depend on the product purchased and any applicable setup or onboarding requirements.",
  },
  {
    number: "02",
    title: "Delivery Timelines",
    description:
      "Digital products are generally made available after successful payment verification, while customized services may follow agreed project schedules. Any applicable delivery estimates will be communicated during the purchase process or in the relevant service agreement.",
  },
  {
    number: "03",
    title: "Payment Methods",
    description:
      "Metrius may support payment methods such as UPI, debit and credit cards, net banking, and other options displayed at checkout. Available payment methods depend on the payment provider and the customer's location.",
  },
  {
    number: "04",
    title: "Payment Security",
    description:
      "Payments are processed through authorized payment service providers using their applicable security measures. Customers should never share their banking passwords, card PINs, UPI PINs, or one-time passwords with anyone claiming to represent Metrius.",
  },
  {
    number: "05",
    title: "Order Confirmation",
    description:
      "Customers will receive an order confirmation, payment acknowledgment, or invoice through the applicable communication channel after a transaction is successfully verified. Customers should retain their transaction reference for future inquiries.",
  },
  {
    number: "06",
    title: "Failed or Duplicate Payments",
    description:
      "If a payment fails, remains pending, or is charged more than once, customers can contact Metrius support with their transaction reference. Verified duplicate payments and eligible failed transactions will be reviewed for resolution or refund in accordance with applicable payment-provider procedures and law.",
  },
  {
    number: "07",
    title: "Refund Policy",
    description:
      "Refund requests will be assessed based on the product purchased, the reason for the request, the applicable purchase terms, and consumer protection requirements. Refunds may be available for verified duplicate payments, eligible delivery failures, or other qualifying circumstances, subject to applicable law.",
  },
  {
    number: "08",
    title: "Refund Processing",
    description:
      "Approved refunds will generally be initiated through the original payment method where supported. The time required for funds to appear in the customer's account depends on the payment provider and issuing bank.",
  },
  {
    number: "09",
    title: "Order Cancellation",
    description:
      "Customers may request cancellation where the relevant product or service permits it. Subscription cancellations, customized projects, and completed services may have specific conditions disclosed at purchase or agreed upon separately, without limiting mandatory legal rights.",
  },
  {
    number: "10",
    title: "Subscriptions and Recurring Payments",
    description:
      "Where Metrius offers subscriptions, applicable pricing, billing frequency, renewal conditions, and cancellation procedures will be disclosed before purchase. Customers can manage or cancel recurring payments through the available account controls or support channels, as applicable.",
  },
  {
    number: "11",
    title: "Custom Services and Project Delivery",
    description:
      "For website development, software implementation, consulting, and other customized technology services, delivery schedules, project milestones, payment terms, and deliverables will be established in the relevant proposal or written agreement. Additional requirements or changes in scope may affect the agreed timeline.",
  },
  {
    number: "12",
    title: "Physical Shipping",
    description:
      "Metrius primarily provides digital products and services, so physical shipping does not apply unless a physical product is expressly offered for sale. If physical products become available, applicable shipping charges, delivery estimates, and tracking details will be provided at purchase.",
  },
  {
    number: "13",
    title: "Customer Responsibilities",
    description:
      "Customers are responsible for providing accurate contact and billing information and ensuring they can access the email address or account associated with their purchase. Any delivery or payment issues should be reported promptly through official Metrius support channels.",
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

export default function ShippingPolicy() {
  const reduceMotion = useReducedMotion();

  return (
    <main
      id="shipping-policy"
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

      <div className="relative z-10 grid grid-cols-3 gap-3 px-5 pt-5 text-[8px] uppercase tracking-[0.13em] text-black/45 sm:px-8 sm:text-[9px] md:px-[5.5vw]">
        <span>Metrius / Legal</span>

        <span className="text-center">
          Delivery with intention
        </span>

        <span className="text-right">
          Shipping / 001—013
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

                <Link
                  href="/terms"
                  className="transition-opacity hover:opacity-50"
                >
                  Terms
                </Link>

                <span>Shipping</span>

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
                DELIVERED WITH INTENTION
              </p>
            </div>
          </Reveal>

          {/* SHIPPING QUOTE */}

          <Reveal
            className="relative z-10 mt-16 max-w-[520px] sm:mt-20 md:mt-[clamp(4rem,10vh,8rem)]"
            delay={0.18}
            distance={24}
            duration={1.05}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-black/35" />

              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/45 sm:text-[10px]">
                A promise behind every delivery
              </p>
            </div>

            <h2 className="max-w-[520px] font-serif text-[clamp(2.8rem,4.3vw,5rem)] font-normal leading-[0.96] tracking-[-0.065em]">
              Every delivery
              <br />
              begins with
              <br />
              <span className="text-black/45">
                a promise.
              </span>
            </h2>

            <div className="mt-7 max-w-[310px] border-t border-black/15 pt-4 sm:mt-8">
              <p className="text-[11px] leading-[1.9] text-black/50 sm:text-[12px]">
                Clear timelines. Secure payments.
                Thoughtful experiences.
              </p>
            </div>
          </Reveal>

          {/* SOFT GLOW BEHIND THE ILLUSTRATION */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[15%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#e9e7e1]/70 blur-[85px] sm:h-[400px] sm:w-[400px] md:h-[430px] md:w-[430px]"
          />

          {/* SHIPPING ILLUSTRATION */}

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
                src="/images/shipping.avif"
                alt="Black-and-white illustration of a delivery courier, packages, and a delivery truck"
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
            <span>DELIVERY</span>
          </div>

          <div className="pointer-events-none absolute right-[2%] top-[50%] hidden flex-col gap-1.5 text-right font-mono text-[9px] leading-[1.8] tracking-[0.08em] text-black/40 lg:flex">
            <span>PAYMENTS</span>
            <span>CLARITY</span>
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
              Our delivery commitment
            </p>

            <h1 className="max-w-[800px] font-serif text-[clamp(3.4rem,6.3vw,7rem)] font-normal leading-[0.85] tracking-[-0.065em]">
              From our
              <br />
              ideas to
              <br />
              your world,
              <br />
              with purpose.
            </h1>

            {/* CLOSING STATEMENT */}

            <div className="mt-8 border-t border-black/15 pt-5 sm:mt-10">
              <p className="max-w-[420px] text-[13px] leading-[1.9] text-black/65 sm:text-[14px]">
                Understand how Metrius handles digital
                delivery, payments, refunds, cancellations,
                and customized technology projects.
              </p>
            </div>
          </Reveal>
        </section>

        {/* RIGHT — SHIPPING & PAYMENT DOCUMENT */}

        <motion.section
          aria-labelledby="shipping-heading"
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
                id="shipping-heading"
                className="max-w-[650px] font-serif text-[clamp(2.7rem,4.5vw,5.2rem)] leading-[0.9] tracking-[-0.065em]"
              >
                Shipping,
                <br />
                Delivery
                <br />
                &amp; Payment.
              </h2>
            </div>

            <span className="mt-1 shrink-0 rounded-full border border-black/35 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.08em] sm:text-[10px]">
              001 — 013
            </span>
          </div>

          {/* OVERVIEW */}

          <div className="grid grid-cols-1 gap-3 border-b border-black/15 py-6 sm:grid-cols-[0.4fr_1fr] sm:gap-5 sm:py-7">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-black/45 sm:text-[11px]">
              Overview
            </span>

            <p className="text-[13px] leading-[1.9] text-black/75 sm:text-[14px]">
              Metrius primarily provides digital products,
              software, AI-powered tools, and technology
              services. This policy explains delivery
              timelines, payment methods, order
              confirmations, refunds, cancellations,
              and applicable physical shipping conditions.
            </p>
          </div>

          {/* ALL THIRTEEN POLICY SECTIONS */}

          <div className="flex-1">
            {shippingSections.map((item, index) => (
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

          {/* CONTACT & SUPPORT — SECTION 14 */}

          <Reveal delay={0.08} distance={12}>
            <article className="grid grid-cols-[30px_1fr] gap-3 border-b border-black/15 py-5 sm:grid-cols-[38px_1fr] sm:gap-4 sm:py-6">
              <span className="pt-1 font-mono text-[10px] tracking-[0.08em] text-black/45 sm:text-[11px]">
                14
              </span>

              <div>
                <h3 className="font-serif text-[23px] leading-[1.12] tracking-[-0.045em] sm:text-[26px] md:text-[clamp(1.4rem,1.8vw,1.8rem)]">
                  Contact &amp; Support
                </h3>

                <p className="mt-3 max-w-[700px] text-[13px] leading-[1.9] text-black/70 sm:text-[14px]">
                  For questions about payments, order
                  confirmations, delivery delays,
                  cancellations, or refunds, contact
                  Metrius at the email address below.
                  Please include the relevant order or
                  transaction reference and never share
                  confidential payment credentials.
                </p>
              </div>
            </article>
          </Reveal>

          {/* DOCUMENT ENDING */}

          <div className="mt-8 border-t border-black/20 pt-7 sm:mt-10 sm:pt-8">
            <p className="text-[10px] uppercase tracking-[0.15em] text-black/45 sm:text-[11px]">
              Questions about delivery or payments?
            </p>

            <p className="mt-3 font-serif text-[32px] leading-none tracking-[-0.045em] sm:text-[38px]">
              Let&apos;s talk.
            </p>

            <a
              href="mailto:bussiness@gmail.com"
              className="mt-4 inline-block break-all text-[13px] text-black/65 underline decoration-black/25 underline-offset-4 transition-colors hover:text-black"
            >
              bussiness@gmail.com
            </a>
          </div>
        </motion.section>
      </div>

      <Footer />
    </main>
  );
}
