"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /* =====================================================
         INITIAL STATES
      ===================================================== */

      gsap.set(".contact-kicker", {
        opacity: 0,
        y: 25,
      });

      gsap.set(".contact-title-line", {
        yPercent: 115,
      });

      gsap.set(".contact-copy", {
        opacity: 0,
        y: 35,
      });

      gsap.set(".contact-action", {
        opacity: 0,
        y: 35,
      });

      gsap.set(".contact-meta-item", {
        opacity: 0,
        y: 20,
      });

      gsap.set(".contact-line", {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(".contact-background-m", {
        opacity: 0,
        scale: 0.8,
        rotation: -8,
      });

      gsap.set(".contact-orbit", {
        opacity: 0,
        scale: 0.7,
      });

      /* =====================================================
         MAIN CONTACT REVEAL
         ===================================================== */

      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 70%",
          end: "center 35%",
          scrub: 1.2,
        },
      });

      reveal.to(
        ".contact-background-m",
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: "power3.out",
        },
        0
      );

      reveal.to(
        ".contact-orbit",
        {
          opacity: 1,
          scale: 1,
          duration: 1.3,
          ease: "power3.out",
        },
        0.1
      );

      reveal.to(
        ".contact-kicker",
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        0.15
      );

      reveal.to(
        ".contact-title-line",
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
        },
        0.25
      );

      reveal.to(
        ".contact-copy",
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        0.65
      );

      reveal.to(
        ".contact-action",
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        0.75
      );

      reveal.to(
        ".contact-meta-item",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: "power3.out",
        },
        0.85
      );

      reveal.to(
        ".contact-line",
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.inOut",
        },
        0.9
      );

      /* =====================================================
         BACKGROUND M PARALLAX
         ===================================================== */

      gsap.to(".contact-background-m", {
        y: -120,
        x: 50,
        rotation: 4,
        ease: "none",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      /* =====================================================
         ORBIT ROTATION
         ===================================================== */

      gsap.to(".contact-orbit-ring-1", {
        rotation: 360,
        duration: 28,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".contact-orbit-ring-2", {
        rotation: -360,
        duration: 36,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".contact-orbit-dot", {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
      });

      /* =====================================================
         CORE BREATHING
         ===================================================== */

      gsap.to(".contact-core", {
        scale: 1.12,
        opacity: 0.75,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* =====================================================
         BUTTON MAGNETIC HOVER
         ===================================================== */

      const buttons = gsap.utils.toArray(".contact-action");

      buttons.forEach((button) => {
        const xTo = gsap.quickTo(button, "x", {
          duration: 0.35,
          ease: "power3.out",
        });

        const yTo = gsap.quickTo(button, "y", {
          duration: 0.35,
          ease: "power3.out",
        });

        const handleMove = (event) => {
          const rect = button.getBoundingClientRect();

          const x = event.clientX - rect.left - rect.width / 2;
          const y = event.clientY - rect.top - rect.height / 2;

          xTo(x * 0.08);
          yTo(y * 0.08);
        };

        const handleLeave = () => {
          xTo(0);
          yTo(0);
        };

        button.addEventListener("mousemove", handleMove);
        button.addEventListener("mouseleave", handleLeave);

        button._metriusCleanup = () => {
          button.removeEventListener("mousemove", handleMove);
          button.removeEventListener("mouseleave", handleLeave);
        };
      });

      /* =====================================================
         REFRESH
         ===================================================== */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        buttons.forEach((button) => {
          if (button._metriusCleanup) {
            button._metriusCleanup();
          }
        });
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="
        contact-section
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-[#050505]
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
          opacity-[0.035]
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
          AMBIENT GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-[20%]
          top-[30%]
          h-[35vw]
          w-[35vw]
          rounded-full
          bg-white/[0.025]
          blur-[150px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-20%]
          right-[-10%]
          h-[45vw]
          w-[45vw]
          rounded-full
          bg-white/[0.025]
          blur-[170px]
        "
      />

      {/* =====================================================
          GIANT BACKGROUND M
      ===================================================== */}

      <div
        className="
          contact-background-m
          pointer-events-none
          absolute
          right-[-5vw]
          top-[8%]
          select-none
          text-[48vw]
          font-light
          leading-none
          tracking-[-0.15em]
          text-white/[0.025]
          will-change-transform
        "
      >
        M
      </div>

      {/* =====================================================
          ORBITAL SYSTEM
      ===================================================== */}

      <div
        className="
          contact-orbit
          pointer-events-none
          absolute
          right-[-12vw]
          top-1/2
          h-[48vw]
          w-[48vw]
          -translate-y-1/2
          opacity-70
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[34%]
            w-[34%]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-white/[0.035]
            blur-[50px]
          "
        />

        {/* Ring 1 */}

        <div
          className="
            contact-orbit-ring-1
            absolute
            left-1/2
            top-1/2
            h-full
            w-full
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-white/[0.09]
          "
        >
          <span
            className="
              contact-orbit-dot
              absolute
              left-[18%]
              top-[8%]
              h-[5px]
              w-[5px]
              rounded-full
              bg-white
              shadow-[0_0_18px_rgba(255,255,255,0.8)]
            "
          />
        </div>

        {/* Ring 2 */}

        <div
          className="
            contact-orbit-ring-2
            absolute
            left-1/2
            top-1/2
            h-[65%]
            w-full
            -translate-x-1/2
            -translate-y-1/2
            rotate-[28deg]
            rounded-[50%]
            border
            border-white/[0.07]
          "
        />

        {/* Ring 3 */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-full
            w-[58%]
            -translate-x-1/2
            -translate-y-1/2
            rotate-[-25deg]
            rounded-[50%]
            border
            border-white/[0.05]
          "
        />

        {/* Core */}

        <div
          className="
            contact-core
            absolute
            left-1/2
            top-1/2
            h-12
            w-12
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-white/25
            bg-white/[0.10]
            shadow-[0_0_40px_rgba(255,255,255,0.18)]
            backdrop-blur-md
          "
        >
          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-2
              w-2
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-white
              shadow-[0_0_20px_rgba(255,255,255,1)]
            "
          />
        </div>
      </div>

      {/* =====================================================
          TOP META
      ===================================================== */}

      <div
        className="
          absolute
          left-[5vw]
          right-[5vw]
          top-8
          z-30
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
            text-[9px]
            uppercase
            tracking-[0.3em]
            text-white/35
          "
        >
          CONTACT
        </span>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-20
          flex
          min-h-screen
          w-full
          items-center
          px-[7vw]
          py-40
        "
      >
        <div className="w-full">

          {/* KICKER */}

          <div
            className="
              contact-kicker
              mb-10
              flex
              items-center
              gap-6
              text-[10px]
              uppercase
              tracking-[0.3em]
              text-white/40
            "
          >
            <span>04 / 04</span>

            <span className="h-px w-12 bg-white/20" />

            <span>LET&apos;S BUILD</span>
          </div>

          {/* TITLE */}

          <div className="max-w-[1250px]">

            <h2
              className="
                overflow-hidden
                text-[clamp(4.5rem,10vw,11rem)]
                font-light
                uppercase
                leading-[0.78]
                tracking-[-0.08em]
              "
            >
              <span className="contact-title-line block">
                LET&apos;S
              </span>

              <span className="contact-title-line block text-white/45">
                BUILD
              </span>

              <span className="contact-title-line block">
                SOMETHING.
              </span>
            </h2>

          </div>

          {/* LOWER CONTENT */}

          <div
            className="
              mt-16
              grid
              max-w-[1100px]
              grid-cols-1
              gap-12
              lg:grid-cols-[1fr_auto]
              lg:items-end
            "
          >

            {/* COPY */}

            <div>
              <p
                className="
                  contact-copy
                  max-w-[520px]
                  text-[16px]
                  leading-[1.8]
                  text-white/45
                  md:text-[18px]
                "
              >
                Have an idea, a product or a problem worth
                solving? Let&apos;s turn it into something
                people remember.
              </p>

              <div
                className="
                  contact-copy
                  mt-8
                  flex
                  flex-wrap
                  gap-x-8
                  gap-y-3
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-white/30
                "
              >
                <span>AI</span>
                <span>SOFTWARE</span>
                <span>SYSTEMS</span>
                <span>PRODUCTS</span>
              </div>
            </div>

            {/* CTA */}

            <a
              href="mailto:hello@metrius.com"
              className="
                contact-action
                group
                relative
                flex
                h-[76px]
                w-full
                max-w-[390px]
                items-center
                justify-between
                overflow-hidden
                rounded-[18px]
                border
                border-white/20
                bg-white/[0.07]
                px-6
                text-[12px]
                font-medium
                uppercase
                tracking-[0.12em]
                text-white
                shadow-[0_20px_80px_rgba(0,0,0,0.35)]
                backdrop-blur-2xl
                transition-all
                duration-500
                hover:border-white/40
                hover:bg-white/[0.12]
              "
            >

              {/* Glass highlight */}

              <span
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  -translate-x-full
                  bg-gradient-to-r
                  from-transparent
                  via-white/[0.10]
                  to-transparent
                  transition-transform
                  duration-1000
                  group-hover:translate-x-full
                "
              />

              <span className="relative z-10">
                START A CONVERSATION
              </span>

              <span
                className="
                  relative
                  z-10
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-white/[0.06]
                  text-lg
                  transition-all
                  duration-500
                  group-hover:bg-white
                  group-hover:text-black
                "
              >
                ↗
              </span>

            </a>

          </div>

          {/* LINE */}

          <div
            className="
              contact-line
              mt-20
              h-px
              w-full
              bg-white/15
            "
          />

          {/* META */}

          <div
            className="
              mt-7
              grid
              grid-cols-1
              gap-6
              text-[9px]
              uppercase
              tracking-[0.25em]
              text-white/30
              md:grid-cols-3
            "
          >

            <div className="contact-meta-item">
              <span className="block text-white/20">
                EMAIL
              </span>

              <span className="mt-2 block text-white/55">
                hello@metrius.com
              </span>
            </div>

            <div className="contact-meta-item">
              <span className="block text-white/20">
                STUDIO
              </span>

              <span className="mt-2 block text-white/55">
                DIGITAL SYSTEMS
              </span>
            </div>

            <div className="contact-meta-item md:text-right">
              <span className="block text-white/20">
                NEXT
              </span>

              <span className="mt-2 block text-white/55">
                BUILD SOMETHING MEANINGFUL
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}