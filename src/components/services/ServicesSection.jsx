"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import WebVisual from "@/components/services/visuals/WebVisual";
import AppVisual from "@/components/services/visuals/AppVisual";
import AppVisual2 from "@/components/services/visuals/AppVisual2";
import CrmVisual from "@/components/services/visuals/CrmVisual";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    number: "01",
    category: "DIGITAL EXPERIENCES",
    title: "Web applications.",
    subtitle: "Built for what's next.",
    description:
      "We transform ambitious ideas into powerful digital products. Fast, intuitive, and engineered to turn complex challenges into effortless experiences.",
    tags: ["Web Platforms", "Next.js", "E-Commerce", "AI Integration"],
    type: "web",
  },
  {
    number: "02",
    category: "MOBILE EXPERIENCES",
    title: "Mobile applications.",
    subtitle: "Innovation in your pocket.",
    description:
      "We build mobile experiences that feel natural from the first interaction. Thoughtful design meets dependable engineering to keep your product moving.",
    tags: ["iOS & Android", "Flutter", "Product Design", "APIs"],
    type: "mobile",
  },
  {
    number: "03",
    category: "INTELLIGENT BUSINESS SYSTEMS",
    title: "Custom CRM solutions.",
    subtitle: "Your business, in focus.",
    description:
      "We build intelligent business systems that connect your operations, simplify workflows, and turn scattered information into actionable insight.",
    tags: ["Custom CRM", "Analytics", "Automation", "Integrations"],
    type: "crm",
  },
];

/* =========================================================
   MOBILE VISUAL PAIR
========================================================= */

function MobileVisualPair() {
  return (
    <div className="mobile-visual-pair grid h-full w-full grid-cols-2 items-center gap-3 sm:gap-5 lg:gap-7">
      {/* Visual 1 */}
      <div className="mobile-demo-one relative flex h-[400px] min-w-0 items-center justify-center sm:h-[480px] md:h-[min(68vh,650px)]">
        <div className="pointer-events-none absolute inset-[12%] rounded-full bg-neutral-200/70 blur-3xl" />

        <div className="relative z-10 h-full w-full">
          <AppVisual />
        </div>
      </div>

      {/* Visual 2 */}
      <div className="mobile-demo-two relative flex h-[400px] min-w-0 items-center justify-center sm:h-[480px] md:h-[min(68vh,650px)]">
        <div className="pointer-events-none absolute inset-[12%] rounded-full bg-neutral-200/70 blur-3xl" />

        <div className="relative z-10 h-full w-full">
          <AppVisual2 />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SERVICE PANEL
========================================================= */

function ServicePanel({ service }) {
  const isMobile = service.type === "mobile";

  return (
    <article
      data-service-panel
      className={`service-panel relative grid min-h-svh w-full shrink-0 grid-cols-1 items-center gap-7 overflow-hidden bg-white px-6 pb-20 pt-16 md:h-svh md:min-h-0 md:w-screen md:px-[5.5vw] md:py-16 ${
        isMobile
          ? "md:grid-cols-[0.72fr_1.28fr] md:gap-5 lg:gap-7"
          : "md:grid-cols-[0.82fr_1.18fr] md:gap-8 lg:gap-12"
      }`}
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_48%,rgba(0,0,0,0.045),transparent_42%)]" />

      {/* Copy */}
      <div className="service-copy relative z-10 mx-auto w-full max-w-[560px] md:mx-0">
        <div className="flex items-center gap-3 text-[9px] font-medium tracking-[0.2em] text-neutral-500 sm:text-[10px]">
          <span className="h-1.5 w-1.5 rounded-full bg-black" />
          {service.category}
        </div>

        <div className="service-number mt-7 text-6xl font-medium leading-none tracking-[-0.09em] text-neutral-200 sm:mt-10 sm:text-7xl lg:text-8xl">
          {service.number}
        </div>

        <h2 className="service-heading mt-5 text-[clamp(2.5rem,4.4vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.075em]">
          {service.title}
          <span className="mt-2 block font-medium text-neutral-400">
            {service.subtitle}
          </span>
        </h2>

        <p className="service-description mt-6 max-w-[430px] text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
          {service.description}
        </p>

        <div className="service-tags mt-6 flex max-w-[440px] flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-neutral-200 px-3 py-2 text-[9px] text-neutral-600 transition-colors duration-300 hover:border-black hover:text-black sm:text-[10px]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="service-copy-footer mt-8 flex max-w-[430px] items-center justify-between border-t border-neutral-200 pt-4 text-[7px] tracking-[0.15em] text-neutral-400 sm:mt-12 sm:text-[8px]">
          <span>METRIUS / DIGITAL SYSTEMS</span>
          <span>{service.number} — 03</span>
        </div>
      </div>

      {/* Visual */}
      <div
        className={`service-art relative z-10 mx-auto w-full ${
          isMobile
            ? "h-auto max-w-[1000px] md:h-[min(72vh,690px)]"
            : "h-[440px] max-w-[760px] md:h-[min(72vh,690px)]"
        }`}
      >
        {service.type === "web" && <WebVisual />}

        {isMobile && <MobileVisualPair />}

        {service.type === "crm" && <CrmVisual />}

        <span className="pointer-events-none absolute bottom-0 right-0 z-30 text-[8px] tracking-[0.2em] text-neutral-400">
          {service.number} / METRIUS
        </span>
      </div>
    </article>
  );
}

/* =========================================================
   SERVICES SECTION
========================================================= */

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const countRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return undefined;

    let refreshFrame = 0;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* =====================================================
         DESKTOP: PINNED HORIZONTAL SCROLL
      ===================================================== */

      mm.add("(min-width: 768px)", () => {
        const panels = gsap.utils.toArray(
          "[data-service-panel]",
          track
        );

        if (!panels.length) return undefined;

        const getDistance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth);

        gsap.set(track, {
          x: 0,
          force3D: true,
        });

        // One master tween handles the horizontal movement.
        const horizontalTween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          force3D: true,
          overwrite: "auto",
          scrollTrigger: {
            id: "metrius-services-horizontal",
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 0.34,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            refreshPriority: 1,

            onUpdate: (self) => {
              if (progressRef.current) {
                gsap.set(progressRef.current, {
                  scaleX: Math.max(0.001, self.progress),
                });
              }

              if (countRef.current) {
                const current = Math.min(
                  SERVICES.length,
                  Math.floor(self.progress * SERVICES.length) + 1
                );

                countRef.current.textContent =
                  `0${current} — 0${SERVICES.length}`;
              }
            },
          },
        });

        /* ---------------------------------------------------
           COPY AND ART REVEALS
        --------------------------------------------------- */

        panels.forEach((panel, index) => {
          const copy = panel.querySelectorAll(
            ".service-number, .service-heading, .service-description, .service-tags, .service-copy-footer"
          );

          const art = panel.querySelector(".service-art");

          const copyTrigger =
            index === 0
              ? {
                  trigger: panel,
                  start: "top 78%",
                  once: true,
                }
              : {
                  trigger: panel,
                  containerAnimation: horizontalTween,
                  start: "left 78%",
                  toggleActions: "play none none reverse",
                };

          gsap.fromTo(
            copy,
            {
              y: 24,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              stagger: 0.075,
              ease: "power3.out",
              overwrite: "auto",
              force3D: true,
              scrollTrigger: copyTrigger,
            }
          );

          if (art) {
            gsap.fromTo(
              art,
              {
                autoAlpha: 0,
                y: 18,
                scale: 0.985,
              },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power3.out",
                overwrite: "auto",
                force3D: true,
                scrollTrigger:
                  index === 0
                    ? {
                        trigger: panel,
                        start: "top 78%",
                        once: true,
                      }
                    : {
                        trigger: panel,
                        containerAnimation: horizontalTween,
                        start: "left 82%",
                        toggleActions: "play none none reverse",
                      },
              }
            );
          }
        });

        /* ---------------------------------------------------
           LIGHTWEIGHT MOBILE MOCKUP FLOAT
           Scoped to this section and paused off-screen.
        --------------------------------------------------- */

        const mobileDemoOne = section.querySelector(".mobile-demo-one");
        const mobileDemoTwo = section.querySelector(".mobile-demo-two");

        const floatOne = mobileDemoOne
          ? gsap.to(mobileDemoOne, {
              y: -5,
              duration: 4.2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              paused: true,
              force3D: true,
            })
          : null;

        const floatTwo = mobileDemoTwo
          ? gsap.to(mobileDemoTwo, {
              y: 5,
              duration: 4.8,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              paused: true,
              force3D: true,
            })
          : null;

        const pauseFloating = () => {
          if (floatOne) floatOne.pause();
          if (floatTwo) floatTwo.pause();
        };

        const playFloating = () => {
          // Respect reduced-motion preferences.
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            pauseFloating();
            return;
          }

          if (floatOne) floatOne.play();
          if (floatTwo) floatTwo.play();
        };

        const visibilityTrigger = ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onEnter: playFloating,
          onEnterBack: playFloating,
          onLeave: pauseFloating,
          onLeaveBack: pauseFloating,
        });

        return () => {
          visibilityTrigger.kill();

          if (floatOne) floatOne.kill();
          if (floatTwo) floatTwo.kill();
        };
      });

      /* =====================================================
         MOBILE: NORMAL VERTICAL SCROLL
      ===================================================== */

      mm.add("(max-width: 767px)", () => {
        gsap.set(track, {
          clearProps: "transform",
        });

        const panels = gsap.utils.toArray(
          "[data-service-panel]",
          section
        );

        panels.forEach((panel) => {
          const copy = panel.querySelectorAll(
            ".service-number, .service-heading, .service-description, .service-tags, .service-copy-footer"
          );

          const art = panel.querySelector(".service-art");

          gsap.fromTo(
            copy,
            {
              y: 20,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.75,
              stagger: 0.065,
              ease: "power3.out",
              overwrite: "auto",
              force3D: true,
              scrollTrigger: {
                trigger: panel,
                start: "top 78%",
                once: true,
              },
            }
          );

          if (art) {
            gsap.fromTo(
              art,
              {
                y: 20,
                autoAlpha: 0,
                scale: 0.99,
              },
              {
                y: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 0.9,
                ease: "power3.out",
                overwrite: "auto",
                force3D: true,
                scrollTrigger: {
                  trigger: art,
                  start: "top 85%",
                  once: true,
                },
              }
            );
          }
        });

        // Keep the progress UI in a sensible state on mobile.
        if (progressRef.current) {
          gsap.set(progressRef.current, { scaleX: 0 });
        }

        return undefined;
      });

      return () => mm.revert();
    }, section);

    // Refresh once the browser has had a chance to lay out the section.
    refreshFrame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    // Recalculate pin distances if images or other page assets finish loading.
    const handleLoad = () => ScrollTrigger.refresh();

    window.addEventListener("load", handleLoad);

    return () => {
      cancelAnimationFrame(refreshFrame);
      window.removeEventListener("load", handleLoad);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      aria-label="Metrius services"
      className="relative w-full overflow-hidden bg-white text-neutral-950"
    >
      <div
        ref={trackRef}
        className="flex w-full flex-col md:w-[300vw] md:flex-row"
      >
        {SERVICES.map((service) => (
          <ServicePanel key={service.number} service={service} />
        ))}
      </div>

      {/* Desktop progress indicator */}
      <div className="pointer-events-none absolute bottom-5 left-6 right-6 z-30 hidden items-center gap-4 text-[8px] tracking-[0.17em] text-neutral-400 md:left-[5.5vw] md:right-[5.5vw] md:flex">
        <span>EXPLORE OUR SERVICES</span>

        <div className="h-px max-w-[240px] flex-1 overflow-hidden bg-neutral-200">
          <div
            ref={progressRef}
            className="h-full origin-left scale-x-0 bg-black"
          />
        </div>

        <span ref={countRef} className="ml-auto">
          01 — 03
        </span>
      </div>
    </section>
  );
}