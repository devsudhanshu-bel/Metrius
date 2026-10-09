"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;

    if (!footer) return;

    const ctx = gsap.context(() => {
      /* =====================================================
         INITIAL STATES
      ===================================================== */

      gsap.set(".footer-kicker", {
        opacity: 0,
        y: 20,
      });

      gsap.set(".footer-heading-line", {
        yPercent: 110,
      });

      gsap.set(".footer-copy", {
        opacity: 0,
        y: 25,
      });

      gsap.set(".footer-meta", {
        opacity: 0,
        y: 15,
      });

      gsap.set(".footer-giant", {
        opacity: 0,
        scale: 0.85,
      });

      /* =====================================================
         REVEAL
      ===================================================== */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".metrius-footer",
          start: "top 80%",
          end: "center 40%",
          scrub: 1,
        },
      });

      timeline.to(
        ".footer-giant",
        {
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
        },
        0
      );

      timeline.to(
        ".footer-kicker",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        0.15
      );

      timeline.to(
        ".footer-heading-line",
        {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power4.out",
        },
        0.25
      );

      timeline.to(
        ".footer-copy",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        0.65
      );

      timeline.to(
        ".footer-meta",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        },
        0.8
      );

      /* =====================================================
         GIANT METRIUS PARALLAX
      ===================================================== */

      gsap.to(".footer-giant", {
        y: -100,
        x: 40,
        ease: "none",
        scrollTrigger: {
          trigger: ".metrius-footer",
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      /* =====================================================
         FOOTER LINE
      ===================================================== */

      gsap.fromTo(
        ".footer-line",
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".metrius-footer",
            start: "top 70%",
            end: "top 35%",
            scrub: 1,
          },
        }
      );

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="
        metrius-footer
        relative
        min-h-[85vh]
        w-full
        overflow-hidden
        bg-[#030303]
        text-white
      "
    >

      {/* =====================================================
          GRID
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-[-10%]
          opacity-[0.025]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.5) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.5) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "100px 100px",
        }}
      />

      {/* =====================================================
          GIANT BACKGROUND METRIUS
      ===================================================== */}

      <div
        className="
          footer-giant
          pointer-events-none
          absolute
          bottom-[-12vw]
          left-[-4vw]
          select-none
          whitespace-nowrap
          text-[29vw]
          font-light
          leading-none
          tracking-[-0.11em]
          text-white/[0.025]
          will-change-transform
        "
      >
        METRIUS
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-[85vh]
          flex-col
          justify-between
          px-[5vw]
          py-10
        "
      >

        {/* =================================================
            TOP
        ================================================= */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-white/10
            pb-5
          "
        >
          <span
            className="
              footer-kicker
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-white/35
            "
          >
            METRIUS
          </span>

          <span
            className="
              footer-kicker
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-white/35
            "
          >
            DIGITAL SYSTEMS
          </span>
        </div>

        {/* =================================================
            CENTER
        ================================================= */}

        <div className="py-24">

          <div
            className="
              footer-kicker
              mb-8
              text-[10px]
              uppercase
              tracking-[0.3em]
              text-white/30
            "
          >
            AI / SOFTWARE / SYSTEMS
          </div>

          <h2
            className="
              max-w-[1200px]
              overflow-hidden
              text-[clamp(4rem,9vw,10rem)]
              font-light
              uppercase
              leading-[0.8]
              tracking-[-0.08em]
            "
          >

            <span className="footer-heading-line block">
              BUILDING
            </span>

            <span className="footer-heading-line block text-white/40">
              DIGITAL
            </span>

            <span className="footer-heading-line block">
              SYSTEMS.
            </span>

          </h2>

          <p
            className="
              footer-copy
              mt-12
              max-w-[520px]
              text-[14px]
              leading-[1.8]
              text-white/35
              md:text-[16px]
            "
          >
            Premium digital products, intelligent software
            and systems designed to move businesses forward.
          </p>

        </div>

        {/* =================================================
            LINE
        ================================================= */}

        <div className="footer-line h-px w-full bg-white/15" />

        {/* =================================================
            BOTTOM META
        ================================================= */}

        <div
          className="
            mt-7
            grid
            grid-cols-1
            gap-7
            text-[9px]
            uppercase
            tracking-[0.25em]
            text-white/30
            md:grid-cols-4
            md:items-end
          "
        >

          <div className="footer-meta">
            <span className="block text-white/20">
              COMPANY
            </span>

            <span className="mt-2 block">
              METRIUS
            </span>
          </div>

          <div className="footer-meta">
            <span className="block text-white/20">
              DISCIPLINES
            </span>

            <span className="mt-2 block">
              AI / SOFTWARE / SYSTEMS
            </span>
          </div>

          <div className="footer-meta">
            <span className="block text-white/20">
              CONTACT
            </span>

            <a
              href="mailto:hello@metrius.com"
              className="
                mt-2
                block
                transition-colors
                duration-300
                hover:text-white
              "
            >
              HELLO@METRIUS.COM
            </a>
          </div>

          <div
            className="
              footer-meta
              md:text-right
            "
          >
            <span className="block text-white/20">
              END
            </span>

            <span className="mt-2 block text-white/60">
              04 / 04
            </span>
          </div>

        </div>

        {/* =================================================
            COPYRIGHT
        ================================================= */}

        <div
          className="
            footer-meta
            mt-14
            flex
            flex-col
            gap-3
            border-t
            border-white/10
            pt-6
            text-[8px]
            uppercase
            tracking-[0.25em]
            text-white/20
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <span>
            © 2026 METRIUS. ALL RIGHTS RESERVED.
          </span>

          <span>
            BUILD THINGS THAT MATTER.
          </span>
        </div>

      </div>
    </footer>
  );
}