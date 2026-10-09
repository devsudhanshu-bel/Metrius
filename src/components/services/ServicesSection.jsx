"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   SERVICE DATA
============================================================ */

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
        description: "A sharp digital presence for businesses ready to launch.",
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


/* ============================================================
   SERVICE CARD
============================================================ */

function ServiceCard({ plan, className = "" }) {
  return (
    <article
      className={`
        service-card
        group
        relative
        flex
        min-h-[430px]
        flex-col
        overflow-hidden
        rounded-[22px]
        border
        border-black/10
        bg-black/[0.035]
        p-7
        transition-all
        duration-500
        hover:-translate-y-2
        hover:bg-black/[0.055]
        hover:shadow-[0_30px_80px_rgba(0,0,0,0.10)]
        md:p-8
        ${className}
      `}
    >
      {/* ======================================================
          CARD SHINE
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -translate-x-[120%]
          bg-gradient-to-r
          from-transparent
          via-white/70
          to-transparent
          opacity-0
          transition-all
          duration-1000
          group-hover:translate-x-[120%]
          group-hover:opacity-100
        "
      />

      {/* ======================================================
          TOP
      ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
          border-b
          border-black/10
          pb-5
        "
      >
        <span
          className="
            text-[10px]
            font-medium
            tracking-[0.28em]
            text-black/45
          "
        >
          {plan.number}
        </span>

        {plan.featured && (
          <span
            className="
              rounded-full
              border
              border-black/15
              bg-black
              px-3
              py-1.5
              text-[8px]
              font-medium
              tracking-[0.2em]
              text-white
            "
          >
            RECOMMENDED
          </span>
        )}
      </div>


      {/* ======================================================
          PLAN NAME
      ====================================================== */}

      <div className="relative z-10 mt-8">

        <p
          className="
            text-[9px]
            font-medium
            uppercase
            tracking-[0.28em]
            text-black/40
          "
        >
          PLAN
        </p>

        <h3
          className="
            mt-3
            text-[clamp(2rem,3vw,3rem)]
            font-light
            uppercase
            leading-none
            tracking-[-0.055em]
            text-black
          "
        >
          {plan.name}
        </h3>

      </div>


      {/* ======================================================
          PRICE
      ====================================================== */}

      <div className="relative z-10 mt-8">

        <span
          className="
            text-[clamp(3.5rem,5vw,5.5rem)]
            font-light
            leading-none
            tracking-[-0.07em]
            text-black
          "
        >
          {plan.price}
        </span>

        <span
          className="
            ml-2
            text-[10px]
            uppercase
            tracking-[0.18em]
            text-black/35
          "
        >
          starting
        </span>

      </div>


      {/* ======================================================
          DESCRIPTION
      ====================================================== */}

      <p
        className="
          relative
          z-10
          mt-7
          max-w-[360px]
          text-[13px]
          leading-[1.7]
          text-black/50
        "
      >
        {plan.description}
      </p>


      {/* ======================================================
          FEATURES
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mt-auto
          border-t
          border-black/10
          pt-6
        "
      >

        <div className="space-y-3">

          {plan.features.map((feature, index) => (
            <div
              key={`${plan.number}-${index}`}
              className="
                flex
                items-center
                gap-3
                text-[10px]
                uppercase
                tracking-[0.12em]
                text-black/55
              "
            >

              <span
                className="
                  flex
                  h-4
                  w-4
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-black/15
                  text-[8px]
                "
              >
                +
              </span>

              <span>
                {feature}
              </span>

            </div>
          ))}

        </div>

      </div>


      {/* ======================================================
          CORNER INDEX
      ====================================================== */}

      <div
        className="
          absolute
          bottom-6
          right-7
          text-[8px]
          tracking-[0.25em]
          text-black/20
        "
      >
        METRIUS
      </div>

    </article>
  );
}


/* ============================================================
   SERVICE CATEGORY
============================================================ */

function ServiceCategory({ service }) {
  return (
    <section
      className="
        service-category
        relative
        w-full
        px-[6vw]
        py-24
        md:py-32
      "
    >

      {/* ======================================================
          CATEGORY HEADER
      ====================================================== */}

      <div
        className="
          service-category-header
          mb-14
          flex
          flex-col
          gap-8
          border-b
          border-black/10
          pb-8
          md:flex-row
          md:items-end
          md:justify-between
        "
      >

        <div>

          <div
            className="
              flex
              items-center
              gap-5
              text-[9px]
              font-medium
              uppercase
              tracking-[0.28em]
              text-black/40
            "
          >

            <span>
              {service.number}
            </span>

            <span
              className="
                h-px
                w-12
                bg-black/15
              "
            />

            <span>
              {service.category}
            </span>

          </div>


          <h2
            className="
              service-category-title
              mt-6
              text-[clamp(3.5rem,8vw,9rem)]
              font-light
              uppercase
              leading-[0.8]
              tracking-[-0.075em]
              text-black
            "
          >
            {service.title}
          </h2>

        </div>


        <p
          className="
            max-w-[300px]
            text-[11px]
            uppercase
            leading-[1.8]
            tracking-[0.16em]
            text-black/35
            md:pb-2
          "
        >
          DIGITAL PRODUCTS
          <br />
          BUILT AROUND
          <br />
          YOUR REQUIREMENTS.
        </p>

      </div>


      {/* ======================================================
          CARDS
      ====================================================== */}

      <div
        className={`
          service-cards
          grid
          gap-5
          ${
            service.plans.length === 1
              ? "max-w-[520px]"
              : "md:grid-cols-2 xl:grid-cols-3"
          }
        `}
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


/* ============================================================
   MAIN SERVICES SECTION
============================================================ */

export default function ServicesSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {

      /* ======================================================
         INITIAL STATES
      ====================================================== */

      gsap.set(".services-white-content", {
        opacity: 0,
      });

      gsap.set(".services-circle", {
        scale: 0.05,
      });

      gsap.set(".services-circle-inner", {
        scale: 0.7,
        opacity: 0.4,
      });

      gsap.set(".services-intro-content", {
        opacity: 1,
        y: 0,
      });


      /* ======================================================
         BLACK → WHITE TRANSITION

         The white circle grows from the middle and takes
         over the entire viewport.
      ====================================================== */

      const transitionTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".services-transition",
          start: "top top",
          end: "+=1700",
          scrub: 1.3,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });


      /* ------------------------------------------------------
         CIRCLE ENTER
      ------------------------------------------------------ */

      transitionTimeline.to(
        ".services-circle",
        {
          scale: 1,
          duration: 2.2,
          ease: "power3.inOut",
        }
      );


      /* ------------------------------------------------------
         INNER GLOW
      ------------------------------------------------------ */

      transitionTimeline.to(
        ".services-circle-inner",
        {
          scale: 1.4,
          opacity: 0.15,
          duration: 1.2,
          ease: "power3.out",
        },
        "<0.2"
      );


      /* ------------------------------------------------------
         INTRO TEXT MOVES AWAY
      ------------------------------------------------------ */

      transitionTimeline.to(
        ".services-intro-content",
        {
          opacity: 0,
          y: -80,
          duration: 0.8,
          ease: "power3.in",
        },
        "<0.4"
      );


      /* ------------------------------------------------------
         WHITE CONTENT APPEARS
      ------------------------------------------------------ */

      transitionTimeline.to(
        ".services-white-content",
        {
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=0.4"
      );


      /* ======================================================
         CIRCLE BECOMES BACKGROUND
      ====================================================== */

      transitionTimeline.to(
        ".services-circle",
        {
          scale: 1.08,
          duration: 1.4,
          ease: "power2.out",
        },
        "<"
      );


      /* ======================================================
         SERVICES CONTENT REVEAL
      ====================================================== */

      gsap.fromTo(
        ".services-header-element",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-content",
            start: "top 75%",
            end: "top 35%",
            scrub: 1,
          },
        }
      );


      /* ======================================================
         CATEGORY HEADINGS
      ====================================================== */

      gsap.utils
        .toArray(".service-category")
        .forEach((category) => {

          const title = category.querySelector(
            ".service-category-title"
          );

          const header = category.querySelector(
            ".service-category-header"
          );

          const cards = category.querySelectorAll(
            ".service-card"
          );

          if (title) {
            gsap.fromTo(
              title,
              {
                opacity: 0,
                y: 80,
                skewY: 3,
              },
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
              {
                opacity: 0,
                y: 40,
              },
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
              {
                opacity: 0,
                y: 80,
                scale: 0.96,
              },
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


      /* ======================================================
         CARD MOUSE TILT

         Lightweight premium interaction.
      ====================================================== */

      const cards =
        gsap.utils.toArray(".service-card");

      cards.forEach((card) => {

        const handleMove = (event) => {

          const rect = card.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          const rotateY =
            ((x / rect.width) - 0.5) * 4;

          const rotateX =
            ((y / rect.height) - 0.5) * -4;

          gsap.to(card, {
            rotateX,
            rotateY,
            transformPerspective: 1000,
            duration: 0.35,
            ease: "power2.out",
          });
        };


        const handleLeave = () => {

          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.7,
            ease: "power3.out",
          });

        };


        card.addEventListener(
          "mousemove",
          handleMove
        );

        card.addEventListener(
          "mouseleave",
          handleLeave
        );


        card._servicesMove = handleMove;
        card._servicesLeave = handleLeave;
      });


      /* ======================================================
         FINAL REFRESH
      ====================================================== */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

    }, section);

    return () => {

      section
        .querySelectorAll(".service-card")
        .forEach((card) => {

          if (card._servicesMove) {
            card.removeEventListener(
              "mousemove",
              card._servicesMove
            );
          }

          if (card._servicesLeave) {
            card.removeEventListener(
              "mouseleave",
              card._servicesLeave
            );
          }

        });

      ctx.revert();
    };

  }, []);


  return (
    <section
      ref={sectionRef}
      id="services"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#050505]
      "
    >

      {/* ======================================================
          TRANSITION AREA

          Black section where the circle expands.
      ====================================================== */}

      <section
        className="
          services-transition
          relative
          flex
          h-screen
          w-full
          items-center
          justify-center
          overflow-hidden
          bg-[#050505]
        "
      >

        {/* ====================================================
            BACKGROUND GRID
        ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
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


        {/* ====================================================
            TOP META
        ==================================================== */}

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
            03 / 04
          </span>

        </div>


        {/* ====================================================
            WHITE CIRCLE
        ==================================================== */}

        <div
          className="
            services-circle
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            z-10
            h-[120vw]
            w-[120vw]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#f5f5f3]
            will-change-transform
          "
        >

          {/* Inner atmospheric layer */}

          <div
            className="
              services-circle-inner
              absolute
              left-1/2
              top-1/2
              h-[65%]
              w-[65%]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-white
              blur-[80px]
            "
          />

        </div>


        {/* ====================================================
            INTRO CONTENT
        ==================================================== */}

        <div
          className="
            services-intro-content
            relative
            z-20
            w-full
            px-[7vw]
            text-white
          "
        >

          <div
            className="
              flex
              items-center
              gap-5
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-white/40
            "
          >

            <span>
              03 / 04
            </span>

            <span
              className="
                h-px
                w-12
                bg-white/20
              "
            />

            <span>
              SERVICES
            </span>

          </div>


          <h2
            className="
              mt-8
              max-w-[1100px]
              text-[clamp(4.5rem,11vw,13rem)]
              font-light
              uppercase
              leading-[0.78]
              tracking-[-0.08em]
            "
          >
            BUILT
            <br />
            TO SCALE.
          </h2>


          <p
            className="
              mt-10
              max-w-[430px]
              text-[14px]
              leading-[1.8]
              text-white/50
              md:text-[16px]
            "
          >
            From focused websites to custom software systems,
            we build digital products around the way your
            business actually works.
          </p>

        </div>


        {/* ====================================================
            WHITE CONTENT PREVIEW

            It becomes visible as the circle takes over.
        ==================================================== */}

        <div
          className="
            services-white-content
            pointer-events-none
            absolute
            inset-0
            z-20
            bg-[#f5f5f3]
          "
        />

      </section>


      {/* ======================================================
          SERVICES CONTENT

          WHITE WORLD
      ====================================================== */}

      <div
        className="
          services-content
          relative
          z-30
          bg-[#f5f5f3]
          text-black
        "
      >

        {/* ====================================================
            SERVICES HEADER
        ==================================================== */}

        <section
          className="
            relative
            flex
            min-h-[90vh]
            w-full
            items-center
            overflow-hidden
            px-[6vw]
            py-32
          "
        >

          {/* subtle grid */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.035]
            "
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(0,0,0,0.5) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(0,0,0,0.5) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "100px 100px",
            }}
          />


          <div className="relative z-10 w-full">

            <div
              className="
                services-header-element
                flex
                items-center
                gap-5
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-black/40
              "
            >

              <span>
                METRIUS / 03
              </span>

              <span
                className="
                  h-px
                  w-12
                  bg-black/20
                "
              />

              <span>
                SERVICES
              </span>

            </div>


            <h1
              className="
                services-header-element
                mt-10
                max-w-[1300px]
                text-[clamp(5rem,12vw,14rem)]
                font-light
                uppercase
                leading-[0.76]
                tracking-[-0.085em]
              "
            >
              DIGITAL
              <br />
              PRODUCTS.
            </h1>


            <div
              className="
                services-header-element
                mt-14
                flex
                max-w-[1000px]
                flex-col
                gap-10
                md:flex-row
                md:items-end
                md:justify-between
              "
            >

              <p
                className="
                  max-w-[500px]
                  text-[16px]
                  leading-[1.8]
                  text-black/50
                  md:text-[18px]
                "
              >
                Clear pricing. Serious engineering.
                No unnecessary packages. Every service is
                designed to give ambitious businesses a
                practical path from idea to product.
              </p>


              <div
                className="
                  text-[9px]
                  uppercase
                  leading-[1.8]
                  tracking-[0.2em]
                  text-black/35
                "
              >
                WEBSITE
                <br />
                MOBILE
                <br />
                CUSTOM SYSTEMS
              </div>

            </div>


            <div
              className="
                services-header-element
                mt-16
                h-px
                w-full
                bg-black/15
              "
            />

          </div>

        </section>


        {/* ====================================================
            WEBSITE
        ==================================================== */}

        <ServiceCategory service={services[0]} />


        {/* ====================================================
            MOBILE
        ==================================================== */}

        <ServiceCategory service={services[1]} />


        {/* ====================================================
            CUSTOM APPLICATIONS
        ==================================================== */}

        <ServiceCategory service={services[2]} />


        {/* ====================================================
            SERVICES OUTRO
        ==================================================== */}

        <section
          className="
            relative
            flex
            min-h-[90vh]
            w-full
            items-center
            overflow-hidden
            px-[6vw]
            py-32
          "
        >

          <div
            className="
              pointer-events-none
              absolute
              right-[-15vw]
              top-1/2
              h-[55vw]
              w-[55vw]
              -translate-y-1/2
              rounded-full
              bg-black/[0.025]
              blur-[150px]
            "
          />


          <div className="relative z-10 w-full">

            <div
              className="
                flex
                items-center
                gap-5
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-black/35
              "
            >

              <span>
                03 / 04
              </span>

              <span
                className="
                  h-px
                  w-12
                  bg-black/15
                "
              />

              <span>
                METRIUS
              </span>

            </div>


            <h2
              className="
                mt-10
                max-w-[1200px]
                text-[clamp(4.5rem,10vw,12rem)]
                font-light
                uppercase
                leading-[0.78]
                tracking-[-0.08em]
              "
            >
              BUILD
              <br />
              SOMETHING
              <br />
              <span className="text-black/35">
                REAL.
              </span>
            </h2>


            <div
              className="
                mt-16
                flex
                items-center
                justify-between
                border-t
                border-black/15
                pt-6
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-black/35
              "
            >

              <span>
                METRIUS
              </span>

              <span>
                DIGITAL SYSTEMS
              </span>

              <span>
                03 / 04 → CONTACT
              </span>

            </div>

          </div>

        </section>

      </div>

    </section>
  );
}