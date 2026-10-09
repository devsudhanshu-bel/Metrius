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

    let refreshFrame = 0;

    const ctx = gsap.context(() => {
      const select = (selector) => section.querySelectorAll(selector);
      const kickers = select(".contact-kicker");
      const titleLines = select(".contact-title-line");
      const copies = select(".contact-copy");
      const actions = select(".contact-action");
      const metaItems = select(".contact-meta-item");
      const lines = select(".contact-line");
      const background = select(".contact-background-m");
      const orbit = select(".contact-orbit");
      const ring1 = select(".contact-orbit-ring-1");
      const ring2 = select(".contact-orbit-ring-2");
      const dots = select(".contact-orbit-dot");
      const core = select(".contact-core");

      gsap.set(kickers, { autoAlpha: 0, y: 25 });
      gsap.set(titleLines, { yPercent: 115 });
      gsap.set(copies, { autoAlpha: 0, y: 35 });
      gsap.set(actions, { autoAlpha: 0, y: 35 });
      gsap.set(metaItems, { autoAlpha: 0, y: 20 });
      gsap.set(lines, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(background, { autoAlpha: 0, scale: 0.8, rotation: -8 });
      gsap.set(orbit, { autoAlpha: 0, scale: 0.7 });

      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "center 35%",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      reveal
        .to(background, {
          autoAlpha: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: "power3.out",
        }, 0)
        .to(orbit, {
          autoAlpha: 1,
          scale: 1,
          duration: 1.3,
          ease: "power3.out",
        }, 0.1)
        .to(kickers, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        }, 0.15)
        .to(titleLines, {
          yPercent: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
        }, 0.25)
        .to(copies, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        }, 0.65)
        .to(actions, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        }, 0.75)
        .to(metaItems, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: "power3.out",
        }, 0.85)
        .to(lines, {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.inOut",
        }, 0.9);

      if (background.length) {
        gsap.to(background, {
          y: -120,
          x: 50,
          rotation: 4,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
            invalidateOnRefresh: true,
          },
        });
      }

      if (ring1.length) {
        gsap.to(ring1, {
          rotation: 360,
          duration: 28,
          repeat: -1,
          ease: "none",
        });
      }

      if (ring2.length) {
        gsap.to(ring2, {
          rotation: -360,
          duration: 36,
          repeat: -1,
          ease: "none",
        });
      }

      if (dots.length) {
        gsap.to(dots, {
          rotation: 360,
          duration: 8,
          repeat: -1,
          ease: "none",
        });
      }

      if (core.length) {
        gsap.to(core, {
          scale: 1.12,
          opacity: 0.75,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      const cleanupListeners = [];

      actions.forEach((button) => {
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

        cleanupListeners.push(() => {
          button.removeEventListener("mousemove", handleMove);
          button.removeEventListener("mouseleave", handleLeave);
        });
      });

      refreshFrame = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        cleanupListeners.forEach((cleanup) => cleanup());
      };
    }, section);

    return () => {
      cancelAnimationFrame(refreshFrame);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="contact-section relative min-h-screen w-full overflow-hidden bg-[#050505] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-10%] opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[20%] top-[30%] h-[35vw] w-[35vw] rounded-full bg-white/[0.025] blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[45vw] w-[45vw] rounded-full bg-white/[0.025] blur-[170px]"
      />

      <div
        aria-hidden="true"
        className="contact-background-m pointer-events-none absolute right-[-5vw] top-[8%] select-none text-[48vw] font-light leading-none tracking-[-0.15em] text-white/[0.025] will-change-transform"
      >
        M
      </div>

      <div
        aria-hidden="true"
        className="contact-orbit pointer-events-none absolute right-[-12vw] top-1/2 h-[48vw] w-[48vw] -translate-y-1/2 opacity-70"
      >
        <div className="absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-[50px]" />

        <div className="contact-orbit-ring-1 absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.09]">
          <span className="contact-orbit-dot absolute left-[18%] top-[8%] h-[5px] w-[5px] rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.8)]" />
        </div>

        <div className="contact-orbit-ring-2 absolute left-1/2 top-1/2 h-[65%] w-full -translate-x-1/2 -translate-y-1/2 rotate-[28deg] rounded-[50%] border border-white/[0.07]" />

        <div className="absolute left-1/2 top-1/2 h-full w-[58%] -translate-x-1/2 -translate-y-1/2 rotate-[-25deg] rounded-[50%] border border-white/[0.05]" />

        <div className="contact-core absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-white/[0.10] shadow-[0_0_40px_rgba(255,255,255,0.18)] backdrop-blur-md">
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,1)]" />
        </div>
      </div>

      <div className="absolute left-[5vw] right-[5vw] top-8 z-30 flex items-center justify-between border-b border-white/10 pb-5">
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/35">
          METRIUS
        </span>
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/35">
          CONTACT
        </span>
      </div>

      <div className="relative z-20 flex min-h-screen w-full items-center px-[7vw] py-40">
        <div className="w-full">
          <div className="contact-kicker mb-10 flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-white/40">
            <span>04 / 04</span>
            <span className="h-px w-12 bg-white/20" />
            <span>LET&apos;S BUILD</span>
          </div>

          <div className="max-w-[1250px]">
            <h2 className="overflow-hidden text-[clamp(4.5rem,10vw,11rem)] font-light uppercase leading-[0.78] tracking-[-0.08em]">
              <span className="contact-title-line block">LET&apos;S</span>
              <span className="contact-title-line block text-white/45">
                BUILD
              </span>
              <span className="contact-title-line block">SOMETHING.</span>
            </h2>
          </div>

          <div className="mt-16 grid max-w-[1100px] grid-cols-1 gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="contact-copy max-w-[520px] text-[16px] leading-[1.8] text-white/45 md:text-[18px]">
                Have an idea, a product or a problem worth solving? Let&apos;s
                turn it into something people remember.
              </p>

              <div className="contact-copy mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[10px] uppercase tracking-[0.2em] text-white/30">
                <span>AI</span>
                <span>SOFTWARE</span>
                <span>SYSTEMS</span>
                <span>PRODUCTS</span>
              </div>
            </div>

            <a
              href="mailto:hello@metrius.com"
              className="contact-action group relative flex h-[76px] w-full max-w-[390px] items-center justify-between overflow-hidden rounded-[18px] border border-white/20 bg-white/[0.07] px-6 text-[12px] font-medium uppercase tracking-[0.12em] text-white shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-500 hover:border-white/40 hover:bg-white/[0.12]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.10] to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

              <span className="relative z-10">START A CONVERSATION</span>

              <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-lg transition-all duration-500 group-hover:bg-white group-hover:text-black">
                ↗
              </span>
            </a>
          </div>

          <div className="contact-line mt-20 h-px w-full bg-white/15" />

          <div className="mt-7 grid grid-cols-1 gap-6 text-[9px] uppercase tracking-[0.25em] text-white/30 md:grid-cols-3">
            <div className="contact-meta-item">
              <span className="block text-white/20">EMAIL</span>
              <a
                href="mailto:hello@metrius.com"
                className="mt-2 block text-white/55 transition-colors hover:text-white"
              >
                HELLO@METRIUS.COM
              </a>
            </div>

            <div className="contact-meta-item">
              <span className="block text-white/20">STUDIO</span>
              <span className="mt-2 block text-white/55">
                DIGITAL SYSTEMS
              </span>
            </div>

            <div className="contact-meta-item md:text-right">
              <span className="block text-white/20">NEXT</span>
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