"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navigationGroups = [
  [
    {  label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-and-conditions" },
    { label: "Shipping Policy", href: "/shipping-and-policy" },
  ],
  [
    { label: "Contact Us", href: "/contact" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-and-conditions" },
];

function LaboratoryIllustration() {
  const illustrationRef = useRef(null);

  useLayoutEffect(() => {
    const root = illustrationRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const wave = root.querySelector(".liquid-wave");
      const fill = root.querySelector(".liquid-fill");
      const svg = root.querySelector("svg");

      const animation = gsap.timeline({ paused: true, repeat: -1 });

      animation
        .to(
          wave,
          {
            x: -2,
            y: -2,
            duration: 0.9,
            ease: "sine.inOut",
          },
          0
        )
        .to(
          wave,
          {
            x: 2,
            y: 1,
            duration: 0.9,
            ease: "sine.inOut",
          },
          0.9
        )
        .to(
          fill,
          {
            y: -3,
            duration: 0.9,
            ease: "sine.inOut",
          },
          0
        )
        .to(
          fill,
          {
            y: 0,
            duration: 0.9,
            ease: "sine.inOut",
          },
          0.9
        );

      const startAnimation = () => animation.play();
      const stopAnimation = () => animation.pause(0);

      svg?.addEventListener("mouseenter", startAnimation);
      svg?.addEventListener("mouseleave", stopAnimation);
      svg?.addEventListener("focusin", startAnimation);
      svg?.addEventListener("focusout", stopAnimation);

      return () => {
        svg?.removeEventListener("mouseenter", startAnimation);
        svg?.removeEventListener("mouseleave", stopAnimation);
        svg?.removeEventListener("focusin", startAnimation);
        svg?.removeEventListener("focusout", stopAnimation);
        animation.kill();
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={illustrationRef}
      className="metrius-lab relative flex h-40 w-full items-center justify-center overflow-hidden border-t border-white/[0.07] sm:h-48 lg:h-full lg:min-h-[220px] lg:border-l lg:border-t-0"
      aria-label="Decorative laboratory glassware illustration"
      role="img"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <svg
        viewBox="0 0 400 120"
        className="relative z-10 h-auto w-full max-w-[580px] overflow-visible px-3 text-white opacity-25"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="metrius-dropper-clip">
            <path d="M215 35 Q215 30 220 30 L240 30 Q245 30 245 35 L245 80 Q245 90 230 90 Q215 90 215 80 Z" />
          </clipPath>
        </defs>

        {/* Glass tube */}
        <path d="M30 100 L40 30 L80 30 L90 100 Z" />
        <rect x="40" y="20" width="40" height="10" />

        {/* Tall glass vessel */}
        <path d="M110 100 L120 18 L160 18 L170 100 Z" />
        <rect x="120" y="10" width="40" height="8" />

        {/* Dropper cap */}
        <path d="M225 0 L225 10 L220 10 L220 30 L240 30 L240 10 L235 10 L235 0 Z" />

        {/* Dropper body */}
        <path d="M215 35 Q215 30 220 30 L240 30 Q245 30 245 35 L245 80 Q245 90 230 90 Q215 90 215 80 Z" />

        {/* Liquid */}
        <g clipPath="url(#metrius-dropper-clip)">
          <rect
            className="liquid-fill"
            x="215"
            y="62"
            width="30"
            height="30"
            fill="#8c735e"
            fillOpacity="0.7"
            stroke="none"
          />

          <path
            className="liquid-wave"
            d="M215 62 Q223 57 230 60 Q238 63 245 58 L245 92 L215 92 Z"
            fill="#8c735e"
            fillOpacity="0.9"
            stroke="none"
          />
        </g>

        {/* Third vessel */}
        <path d="M275 100 L285 28 L325 28 L335 100 Z" />
        <rect x="285" y="18" width="40" height="10" />

        {/* Small dropper */}
        <g transform="translate(345 22)">
          <rect x="25" y="0" width="10" height="18" />
          <path d="M15 25 Q15 20 20 20 L40 20 Q45 20 45 25 L45 70 Q45 80 30 80 Q15 80 15 70 Z" />
        </g>
      </svg>
    </div>
  );
}

export default function Footer() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const select = (selector) => footer.querySelectorAll(selector);

      gsap.set(select(".footer-reveal"), {
        autoAlpha: 0,
        y: 12,
      });

      gsap.set(select(".footer-wordmark"), {
        autoAlpha: 0,
        y: 15,
      });

      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });

      reveal
        .to(
          select(".footer-wordmark"),
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          0
        )
        .to(
          select(".footer-reveal"),
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: "power2.out",
          },
          0.12
        );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="metrius-footer relative overflow-hidden border-t border-white/[0.08] bg-[#050505] pt-12 text-white md:pt-16"
    >
      {/* Oversized brand wordmark */}
      <div
        className="footer-wordmark mb-10 w-full overflow-hidden px-2 text-center sm:mb-14 md:mb-16"
        style={{
          maskImage:
            "linear-gradient(180deg, transparent 0%, black 18%, black 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, black 18%, black 70%, transparent 100%)",
        }}
      >
        <h2
          aria-label="METRIUS"
          className="select-none whitespace-nowrap text-[23vw] font-bold leading-[0.8] tracking-[-0.09em] text-[#141414] mix-blend-screen sm:text-[22vw]"
        >
          METRIUS
        </h2>
      </div>

      {/* Navigation and illustration */}
      <div className="grid grid-cols-1 border-t border-white/[0.07] lg:grid-cols-2">
        <nav
          aria-label="Footer navigation"
          className="grid grid-cols-2 gap-8 border-b border-white/[0.07] p-7 sm:gap-12 sm:p-10 md:p-14 lg:border-b-0 lg:border-r"
        >
          {navigationGroups.map((group, index) => (
            <div key={index} className="flex flex-col items-start gap-6">
              {group.map((link) => {
                const external = link.href.startsWith("https://");

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:text-white sm:text-xs"
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          ))}
        </nav>

        <LaboratoryIllustration />
      </div>

      {/* Copyright and legal links */}
      <div className="flex flex-col items-start justify-between gap-5 border-t border-white/[0.07] px-7 py-6 text-[9px] font-medium tracking-[0.08em] text-white/35 sm:flex-row sm:items-center sm:px-10 md:px-14">
        <span>
          © {new Date().getFullYear()} METRIUS. ALL RIGHTS RESERVED.
        </span>

        <nav
          aria-label="Legal navigation"
          className="flex flex-wrap gap-x-5 gap-y-3 sm:gap-x-7"
        >
          {legalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}