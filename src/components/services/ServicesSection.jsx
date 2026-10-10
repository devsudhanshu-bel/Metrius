"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    category: "WEBSITES",
    title: "WEBSITE",
    plans: [
      {
        number: "01",
        name: "STARTER",
        price: "₹10K",
        description:
          "A sharp digital presence for businesses ready to launch.",
        features: [
          "Premium responsive design",
          "Modern frontend development",
          "Mobile optimized",
          "Essential animations",
        ],
      },
      {
        number: "02",
        name: "PRO",
        price: "₹20K",
        description:
          "A complete web product with backend infrastructure and Redis handling.",
        features: [
          "Everything in Starter",
          "Custom backend",
          "Database integration",
          "Redis handling",
          "Advanced interactions",
        ],
        featured: true,
      },
      {
        number: "03",
        name: "ENTERPRISE",
        price: "₹30K",
        description:
          "A scalable web system designed around complex business requirements.",
        features: [
          "Everything in Pro",
          "Advanced architecture",
          "Scalable infrastructure",
          "Custom integrations",
          "Priority development",
        ],
      },
    ],
  },
  {
    number: "02",
    category: "MOBILE",
    title: "MOBILE APP",
    plans: [
      {
        number: "01",
        name: "STARTER",
        price: "₹15K",
        description:
          "A focused mobile application built around your core product idea.",
        features: [
          "Premium mobile UI",
          "Cross-platform development",
          "Responsive layouts",
          "Core application flows",
        ],
      },
      {
        number: "02",
        name: "PRO",
        price: "₹25K",
        description:
          "A production-ready mobile product built for higher traffic and usage.",
        features: [
          "Everything in Starter",
          "Backend integration",
          "High-traffic management",
          "Performance optimization",
          "Advanced application flows",
        ],
        featured: true,
      },
      {
        number: "03",
        name: "ENTERPRISE",
        price: "₹35K",
        description:
          "A complete mobile ecosystem engineered for demanding applications.",
        features: [
          "Everything in Pro",
          "Advanced architecture",
          "Scalable infrastructure",
          "Custom integrations",
          "Production optimization",
        ],
      },
    ],
  },
  {
    number: "03",
    category: "CUSTOM",
    title: "CUSTOM APPLICATIONS",
    plans: [
      {
        number: "01",
        name: "CUSTOM",
        price: "₹40K",
        description:
          "Purpose-built software for ideas that do not fit inside a standard package.",
        features: [
          "Custom product architecture",
          "Frontend engineering",
          "Backend systems",
          "Database architecture",
          "API integrations",
          "Tailored business logic",
        ],
        featured: true,
      },
    ],
  },
];

const projects = [
  {
    title: "E-commerce Platform",
    description: "Modern marketplace with seamless UX",
    category: "Web Design",
    icon: "monitor",
    image:
      "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/d7050fd5-9b66-45d7-a30a-569d8f5e9017_800w.jpg",
    size: "large",
  },
  {
    title: "Banking App",
    description: "Fintech mobile solution",
    category: "Mobile",
    icon: "smartphone",
    image:
      "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/fb6b509f-d7d6-4c5a-ab4e-9cc3661e184b_800w.jpg",
    size: "small",
  },
  {
    title: "Brand Identity",
    description: "Complete visual system",
    category: "Branding",
    icon: "palette",
    image:
      "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/c987757e-3c22-4afb-8315-50113caa4754_800w.jpg",
    size: "small",
  },
  {
    title: "Creative Direction",
    description: "Digital identity and art direction",
    category: "Branding",
    icon: "palette",
    image:
      "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/6739d5c9-2ec9-43c0-94be-ec961704a2e0_800w.jpg",
    size: "small",
  },
  {
    title: "Video Platform",
    description: "Streaming interface",
    category: "Motion",
    icon: "play",
    image:
      "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/dcb7f82e-bf8a-4d5c-8c36-ce765f8a2932_800w.jpg",
    size: "small",
  },
];

function ProjectIcon({ name, className = "h-3.5 w-3.5" }) {
  const common = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };

  switch (name) {
    case "monitor":
      return (
        <svg {...common}>
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
      );

    case "smartphone":
      return (
        <svg {...common}>
          <rect width="14" height="20" x="5" y="2" rx="2" />
          <path d="M12 18h.01" />
        </svg>
      );

    case "palette":
      return (
        <svg {...common}>
          <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
          <circle cx="13.5" cy="6.5" r=".5" />
          <circle cx="17.5" cy="10.5" r=".5" />
          <circle cx="6.5" cy="12.5" r=".5" />
          <circle cx="8.5" cy="7.5" r=".5" />
        </svg>
      );

    case "play":
      return (
        <svg {...common}>
          <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
        </svg>
      );

    default:
      return (
        <svg {...common}>
          <path d="M14 3h7v7" />
          <path d="M10 14 21 3" />
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        </svg>
      );
  }
}

function ServiceCard({ plan }) {
  return (
    <article className="service-card group relative flex min-h-[430px] flex-col overflow-hidden rounded-[22px] border border-black/10 bg-black/[0.035] p-7 transition-all duration-500 hover:-translate-y-2 hover:bg-black/[0.055] hover:shadow-[0_30px_80px_rgba(0,0,0,0.10)] md:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-all duration-1000 group-hover:translate-x-[120%] group-hover:opacity-100"
      />

      <div className="relative z-10 flex items-center justify-between border-b border-black/10 pb-5">
        <span className="text-[10px] font-medium tracking-[0.28em] text-black/45">
          {plan.number}
        </span>

        {plan.featured && (
          <span className="rounded-full border border-black/15 bg-black px-3 py-1.5 text-[8px] font-medium tracking-[0.2em] text-white">
            RECOMMENDED
          </span>
        )}
      </div>

      <div className="relative z-10 mt-8">
        <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-black/40">
          PLAN
        </p>

        <h3 className="mt-3 text-[clamp(2rem,3vw,3rem)] font-light uppercase leading-none tracking-[-0.055em] text-black">
          {plan.name}
        </h3>
      </div>

      <div className="relative z-10 mt-8">
        <span className="text-[clamp(3.5rem,5vw,5.5rem)] font-light leading-none tracking-[-0.07em] text-black">
          {plan.price}
        </span>

        <span className="ml-2 text-[10px] uppercase tracking-[0.18em] text-black/35">
          starting
        </span>
      </div>

      <p className="relative z-10 mt-7 max-w-[360px] text-[13px] leading-[1.7] text-black/50">
        {plan.description}
      </p>

      <div className="relative z-10 mt-auto border-t border-black/10 pt-6">
        <div className="space-y-3">
          {plan.features.map((feature, index) => (
            <div
              key={`${plan.number}-${index}-${feature}`}
              className="flex items-center gap-3 text-[10px] uppercase tracking-[0.12em] text-black/55"
            >
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-black/15 text-[8px]">
                +
              </span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-6 right-7 text-[8px] tracking-[0.25em] text-black/20"
      >
        METRIUS
      </div>
    </article>
  );
}

function ServiceCategory({ service }) {
  return (
    <section className="service-category relative w-full px-[6vw] py-24 md:py-32">
      <div className="service-category-header mb-14 flex flex-col gap-8 border-b border-black/10 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-5 text-[9px] font-medium uppercase tracking-[0.28em] text-black/40">
            <span>{service.number}</span>
            <span className="h-px w-12 bg-black/15" />
            <span>{service.category}</span>
          </div>

          <h2 className="service-category-title mt-6 text-[clamp(3.5rem,8vw,9rem)] font-light uppercase leading-[0.8] tracking-[-0.075em] text-black">
            {service.title}
          </h2>
        </div>

        <p className="max-w-[300px] text-[11px] uppercase leading-[1.8] tracking-[0.16em] text-black/35 md:pb-2">
          DIGITAL PRODUCTS
          <br />
          BUILT AROUND
          <br />
          YOUR REQUIREMENTS.
        </p>
      </div>

      <div
        className={`service-cards grid gap-5 ${
          service.plans.length === 1
            ? "max-w-[520px] grid-cols-1"
            : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
        }`}
      >
        {service.plans.map((plan) => (
          <ServiceCard
            key={`${service.number}-${plan.number}`}
            plan={plan}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <article
      className={`project-card group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 transition-all duration-300 hover:border-white/20 ${
        project.size === "large" ? "md:col-span-2" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          project.size === "large" ? "aspect-[16/10]" : "aspect-square"
        }`}
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/70" />

        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2 py-1.5 text-xs text-white/90 backdrop-blur">
            <ProjectIcon name={project.icon} />
            {project.category}
          </span>
        </div>

        <a
          href="/work"
          aria-label={`Explore ${project.title}`}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/40 opacity-0 backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-black/60 group-hover:opacity-100"
        >
          <ProjectIcon name="external-link" className="h-4 w-4 text-white" />
        </a>
      </div>

      <div className="p-4">
        <h3 className="text-base font-medium tracking-tight text-white">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-neutral-400">
          {project.description}
        </p>
      </div>
    </article>
  );
}

function ServicesStatement() {
  return (
    <section
      aria-labelledby="services-outro-title"
      className="services-outro relative flex min-h-[65vh] w-full flex-col justify-between overflow-hidden bg-[#f5f5f3] px-[6vw] pb-8 pt-20 text-black md:min-h-[78vh] md:pb-10 md:pt-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.35) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      <div className="services-outro-element relative z-10 flex items-center gap-5 text-[9px] font-medium uppercase tracking-[0.3em] text-black/40">
        <span>03 / 04</span>
        <span className="h-px w-10 bg-black/20" />
        <span>METRIUS</span>
      </div>

      <div className="relative z-10 my-16 md:my-20">
        <h2
          id="services-outro-title"
          className="services-outro-element max-w-[1200px] text-[clamp(4rem,11.8vw,15rem)] font-light uppercase leading-[0.78] tracking-[-0.085em]"
        >
          <span className="block">BUILD</span>
          <span className="block whitespace-nowrap">SOMETHING</span>
          <span className="block text-black/35">REAL.</span>
        </h2>
      </div>

      <div className="services-outro-element relative z-10 flex flex-col gap-4 border-t border-black/15 pt-5 text-[8px] font-medium uppercase tracking-[0.25em] text-black/40 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <span>METRIUS</span>
        <span>DIGITAL SYSTEMS</span>
        <span>03 / 04 — CONTACT</span>
      </div>
    </section>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const cleanupFunctions = [];

    const ctx = gsap.context(() => {
      const select = (selector) => section.querySelectorAll(selector);

      const circle = select(".services-circle");
      const innerCircle = select(".services-circle-inner");
      const intro = select(".services-intro-content");
      const whiteContent = select(".services-white-content");

      gsap.set(whiteContent, { opacity: 0 });
      gsap.set(circle, { scale: 0.05 });
      gsap.set(innerCircle, { scale: 0.7, opacity: 0.4 });
      gsap.set(intro, { opacity: 1, y: 0 });

      const transitionSection = section.querySelector(
        ".services-transition"
      );

      if (transitionSection) {
        const transitionTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: transitionSection,
            start: "top top",
            end: "+=1700",
            scrub: 1.3,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        transitionTimeline.to(circle, {
          scale: 1,
          duration: 2.2,
          ease: "power3.inOut",
        });

        transitionTimeline.to(
          innerCircle,
          {
            scale: 1.4,
            opacity: 0.15,
            duration: 1.2,
            ease: "power3.out",
          },
          "<0.2"
        );

        transitionTimeline.to(
          intro,
          {
            opacity: 0,
            y: -80,
            duration: 0.8,
            ease: "power3.in",
          },
          "<0.4"
        );

        transitionTimeline.to(
          whiteContent,
          {
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          "-=0.4"
        );

        transitionTimeline.to(
          circle,
          {
            scale: 1.08,
            duration: 1.4,
            ease: "power2.out",
          },
          "<"
        );
      }

      const servicesContent = section.querySelector(".services-content");

      if (servicesContent) {
        gsap.fromTo(
          select(".services-header-element"),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: servicesContent,
              start: "top 75%",
              end: "top 35%",
              scrub: 1,
            },
          }
        );
      }

      section.querySelectorAll(".service-category").forEach((category) => {
        const title = category.querySelector(".service-category-title");
        const header = category.querySelector(".service-category-header");
        const cards = category.querySelectorAll(".service-card");

        if (title) {
          gsap.fromTo(
            title,
            { opacity: 0, y: 80, skewY: 3 },
            {
              opacity: 1,
              y: 0,
              skewY: 0,
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: category,
                start: "top 75%",
                end: "top 35%",
                scrub: 1,
              },
            }
          );
        }

        if (header) {
          gsap.fromTo(
            header,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: category,
                start: "top 80%",
                end: "top 45%",
                scrub: 1,
              },
            }
          );
        }

        if (cards.length) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 80, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: category,
                start: "top 55%",
                end: "center 40%",
                scrub: 1,
              },
            }
          );
        }
      });

      const outro = section.querySelector(".services-outro");
      const outroElements = outro?.querySelectorAll(
        ".services-outro-element"
      );

      if (outro && outroElements?.length) {
        gsap.fromTo(
          outroElements,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: outro,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      section.querySelectorAll(".service-card").forEach((card) => {
        const handleMove = (event) => {
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          const rotateY = (x / rect.width - 0.5) * 4;
          const rotateX = (y / rect.height - 0.5) * -4;

          gsap.to(card, {
            rotateX,
            rotateY,
            transformPerspective: 1000,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const handleLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.7,
            ease: "power3.out",
            overwrite: "auto",
          });
        };

        card.addEventListener("mousemove", handleMove);
        card.addEventListener("mouseleave", handleLeave);

        cleanupFunctions.push(() => {
          card.removeEventListener("mousemove", handleMove);
          card.removeEventListener("mouseleave", handleLeave);
        });
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full overflow-hidden bg-[#050505]"
    >
      {/* Black-to-white transition */}
      <section className="services-transition relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050505]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />

        <div className="absolute left-[5vw] right-[5vw] top-8 z-30 flex items-center justify-between border-b border-white/10 pb-5">
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/35">
            METRIUS
          </span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/35">
            03 / 04
          </span>
        </div>

        <div className="services-circle pointer-events-none absolute left-1/2 top-1/2 z-10 h-[120vw] w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5f5f3] will-change-transform">
          <div className="services-circle-inner absolute left-1/2 top-1/2 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[80px]" />
        </div>

        <div className="services-intro-content relative z-20 w-full px-[6vw] py-32 text-white">
          <p className="mb-8 text-[10px] uppercase tracking-[0.3em] text-white/45">
            INDEPENDENT DIGITAL STUDIO
          </p>

          <h2 className="max-w-[1100px] text-[clamp(4rem,12vw,12rem)] font-light uppercase leading-[0.78] tracking-[-0.085em]">
            DESIGN
            <br />
            THAT MOVES.
          </h2>

          <p className="mt-10 max-w-md text-sm leading-7 text-white/55 md:text-base">
            We build digital experiences, mobile products, and custom systems
            for businesses ready to move forward.
          </p>
        </div>

        <div className="services-white-content pointer-events-none absolute inset-0 z-20 bg-[#f5f5f3]" />
      </section>

      {/* White services area */}
      <div className="services-content relative z-30 bg-[#f5f5f3] text-black">
        <section className="relative flex min-h-[90vh] w-full items-center overflow-hidden px-[6vw] py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)",
              backgroundSize: "100px 100px",
            }}
          />

          <div className="relative z-10 w-full">
            <div className="services-header-element flex items-center gap-5 text-[9px] uppercase tracking-[0.3em] text-black/40">
              <span>METRIUS / 03</span>
              <span className="h-px w-12 bg-black/20" />
              <span>SERVICES</span>
            </div>

            <h1 className="services-header-element mt-10 max-w-[1300px] text-[clamp(5rem,12vw,14rem)] font-light uppercase leading-[0.76] tracking-[-0.085em]">
              DIGITAL
              <br />
              PRODUCTS.
            </h1>

            <div className="services-header-element mt-14 flex max-w-[1000px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <p className="max-w-[500px] text-[16px] leading-[1.8] text-black/50 md:text-[18px]">
                Clear pricing. Serious engineering. No unnecessary packages.
                Every service is designed to give ambitious businesses a
                practical path from idea to product.
              </p>

              <div className="text-[9px] uppercase leading-[1.8] tracking-[0.2em] text-black/35">
                WEBSITE
                <br />
                MOBILE
                <br />
                CUSTOM SYSTEMS
              </div>
            </div>

            <div className="services-header-element mt-16 h-px w-full bg-black/15" />
          </div>
        </section>

        <ServiceCategory service={services[0]} />
        <ServiceCategory service={services[1]} />
        <ServiceCategory service={services[2]} />

        <ServicesStatement />
      </div>
    </section>
  );
}