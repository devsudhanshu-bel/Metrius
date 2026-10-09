"use client";

import { ArrowUpRight } from "lucide-react";

export default function HeroContent() {
  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav
        className="
          hero-nav
          absolute
          left-0
          top-0
          z-30
          flex
          w-full
          items-center
          justify-between
          px-[3vw]
          py-8
        "
      >
        {/* LOGO */}

        <div
          className="
            text-[1.45rem]
            font-medium
            tracking-[0.28em]
            text-white
          "
        >
          METRIUS
        </div>

        {/* NAVIGATION */}

        <div
          className="
            hidden
            items-center
            gap-14
            text-[0.85rem]
            font-medium
            tracking-[0.08em]
            text-white
            md:flex
          "
        >
          <a
            href="#home"
            className="transition-opacity duration-300 hover:opacity-60"
          >
            HOME
          </a>

          <a
            href="#about"
            className="transition-opacity duration-300 hover:opacity-60"
          >
            ABOUT
          </a>

          <a
            href="#services"
            className="transition-opacity duration-300 hover:opacity-60"
          >
            SERVICES
          </a>

          <a
            href="#contact"
            className="transition-opacity duration-300 hover:opacity-60"
          >
            CONTACT
          </a>
        </div>
      </nav>


      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <div
        className="
          flex
          min-h-screen
          w-full
          items-start
          px-[8.5vw]
          pt-[27vh]
          pb-24
        "
      >
        <div
          className="
            w-full
            max-w-[650px]
            text-white
          "
        >

          {/* =================================================
              LINE
          ================================================= */}

          <div
            className="
              hero-line
              mb-8
              h-[2px]
              w-12
              bg-white
              shadow-[0_0_12px_rgba(255,255,255,0.35)]
            "
          />


          {/* =================================================
              TITLE
          ================================================= */}

          <h1
            className="
              hero-title
              text-[clamp(4rem,7vw,7.5rem)]
              font-light
              leading-[0.85]
              tracking-[-0.065em]
              text-white
              drop-shadow-[0_3px_20px_rgba(0,0,0,0.6)]
            "
          >
            METRIUS
          </h1>


          {/* =================================================
              TAGLINE
          ================================================= */}

          <h2
            className="
              hero-tagline
              mt-10
              max-w-[650px]
              text-[clamp(2rem,3.3vw,3.7rem)]
              font-light
              leading-[0.95]
              tracking-[-0.045em]
              text-white
              drop-shadow-[0_3px_18px_rgba(0,0,0,0.7)]
            "
          >
            Building Digital Products
            <br />
            People Remember.
          </h2>


          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            className="
              hero-description
              mt-8
              max-w-[500px]
              text-[15px]
              leading-[1.7]
              tracking-[0.01em]
              text-white/75
              drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]
              md:text-[17px]
            "
          >
            We design, develop and scale premium websites,
            applications and AI solutions for ambitious
            businesses.
          </p>


          {/* =================================================
              PREMIUM LIQUID GLASS BUTTONS
          ================================================= */}

          <div
            className="
              hero-actions
              mt-10
              flex
              flex-wrap
              gap-5
            "
          >

            {/* =================================================
                START A PROJECT
            ================================================= */}

            <a
              href="#contact"
              className="
                group
                relative
                flex
                h-[68px]
                min-w-[290px]
                items-center
                justify-between
                overflow-hidden
                rounded-[18px]

                border
                border-white/[0.32]

                bg-white/[0.72]

                px-[10px]
                pl-7

                text-[13px]
                font-medium
                tracking-[0.07em]
                text-black

                shadow-[0_12px_45px_rgba(0,0,0,0.35)]

                backdrop-blur-2xl

                transition-all
                duration-500
                ease-out

                hover:-translate-y-1
                hover:border-white/[0.55]
                hover:bg-white/[0.82]
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]
              "
            >

              {/* LIQUID GLASS */}

              <span
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  rounded-[18px]
                  bg-gradient-to-br
                  from-white/[0.30]
                  via-white/[0.08]
                  to-black/[0.08]
                "
              />

              {/* TOP REFLECTION */}

              <span
                className="
                  pointer-events-none
                  absolute
                  left-[8%]
                  right-[8%]
                  top-0
                  h-px
                  bg-white/[0.75]
                  blur-[0.5px]
                "
              />

              {/* INNER BORDER */}

              <span
                className="
                  pointer-events-none
                  absolute
                  inset-[1px]
                  rounded-[17px]
                  border
                  border-white/[0.12]
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-12px_25px_rgba(0,0,0,0.08)]
                "
              />

              {/* LIQUID REFLECTION */}

              <span
                className="
                  pointer-events-none
                  absolute
                  -left-[35%]
                  top-[-100%]
                  h-[300%]
                  w-[35%]
                  rotate-[18deg]
                  bg-gradient-to-r
                  from-transparent
                  via-white/[0.38]
                  to-transparent
                  blur-[8px]
                  transition-all
                  duration-1000
                  ease-out
                  group-hover:left-[120%]
                "
              />

              {/* TEXT */}

              <span
                className="
                  relative
                  z-10
                  whitespace-nowrap
                  transition-transform
                  duration-500
                  group-hover:translate-x-[2px]
                "
              >
                START A PROJECT
              </span>


              {/* =================================================
                  ARROW GLASS
              ================================================= */}

              <span
                className="
                  relative
                  z-10
                  flex
                  h-[48px]
                  w-[48px]
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-[13px]

                  border
                  border-black/[0.13]

                  bg-black/[0.055]

                  shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-8px_15px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.08)]

                  backdrop-blur-xl

                  transition-all
                  duration-500

                  group-hover:bg-black/[0.09]
                  group-hover:border-black/[0.20]
                  group-hover:scale-[1.04]
                "
              >

                {/* REFLECTION */}

                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-x-2
                    top-0
                    h-px
                    bg-white/[0.65]
                  "
                />

                {/* REAL ICON */}

                <ArrowUpRight
                  size={19}
                  strokeWidth={1.8}
                  className="
                    relative
                    z-10
                    transition-transform
                    duration-500
                    ease-out
                    group-hover:translate-x-[2px]
                    group-hover:-translate-y-[2px]
                  "
                />
              </span>
            </a>


            {/* =================================================
                OUR WORK
            ================================================= */}

            <a
              href="#work"
              className="
                group
                relative
                flex
                h-[68px]
                min-w-[240px]
                items-center
                justify-between
                overflow-hidden
                rounded-[18px]

                border
                border-white/[0.26]

                bg-black/[0.38]

                px-[10px]
                pl-7

                text-[13px]
                font-medium
                tracking-[0.07em]
                text-white

                shadow-[0_12px_45px_rgba(0,0,0,0.35)]

                backdrop-blur-2xl

                transition-all
                duration-500
                ease-out

                hover:-translate-y-1
                hover:border-white/[0.48]
                hover:bg-black/[0.48]
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]
              "
            >

              {/* DARK LIQUID GLASS */}

              <span
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  rounded-[18px]
                  bg-gradient-to-br
                  from-white/[0.12]
                  via-white/[0.035]
                  to-black/[0.18]
                "
              />

              {/* TOP REFLECTION */}

              <span
                className="
                  pointer-events-none
                  absolute
                  left-[8%]
                  right-[8%]
                  top-0
                  h-px
                  bg-white/[0.50]
                "
              />

              {/* INNER BORDER */}

              <span
                className="
                  pointer-events-none
                  absolute
                  inset-[1px]
                  rounded-[17px]
                  border
                  border-white/[0.08]
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-12px_25px_rgba(0,0,0,0.18)]
                "
              />

              {/* LIQUID REFLECTION */}

              <span
                className="
                  pointer-events-none
                  absolute
                  -left-[35%]
                  top-[-100%]
                  h-[300%]
                  w-[35%]
                  rotate-[18deg]
                  bg-gradient-to-r
                  from-transparent
                  via-white/[0.18]
                  to-transparent
                  blur-[8px]
                  transition-all
                  duration-1000
                  ease-out
                  group-hover:left-[120%]
                "
              />

              {/* TEXT */}

              <span
                className="
                  relative
                  z-10
                  whitespace-nowrap
                  text-white/[0.92]
                  transition-transform
                  duration-500
                  group-hover:translate-x-[2px]
                "
              >
                OUR WORK
              </span>


              {/* =================================================
                  ARROW GLASS
              ================================================= */}

              <span
                className="
                  relative
                  z-10
                  flex
                  h-[48px]
                  w-[48px]
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-[13px]

                  border
                  border-white/[0.18]

                  bg-white/[0.075]

                  shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-8px_15px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.16)]

                  backdrop-blur-xl

                  transition-all
                  duration-500

                  group-hover:bg-white/[0.13]
                  group-hover:border-white/[0.32]
                  group-hover:scale-[1.04]
                "
              >

                {/* REFLECTION */}

                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-x-2
                    top-0
                    h-px
                    bg-white/[0.50]
                  "
                />

                {/* REAL ICON */}

                <ArrowUpRight
                  size={19}
                  strokeWidth={1.8}
                  className="
                    relative
                    z-10
                    text-white
                    transition-transform
                    duration-500
                    ease-out
                    group-hover:translate-x-[2px]
                    group-hover:-translate-y-[2px]
                  "
                />
              </span>
            </a>

          </div>
        </div>
      </div>


      {/* =====================================================
          SCENE INFO BOX
          BOTTOM RIGHT
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-5
          right-[1vw]
          z-40
          flex
          items-stretch
          gap-4
          rounded-[6px]
          border
          border-white/15
          bg-black/35
          px-4
          py-3
          text-white
          backdrop-blur-md
        "
      >

        {/* 01 / 04 */}

        <div
          className="
            flex
            items-center
            text-[10px]
            font-medium
            tracking-[0.18em]
            text-white/55
          "
        >
          01 / 04
        </div>


        {/* DIVIDER */}

        <div
          className="w-px bg-white/20"
        />


        {/* LABEL */}

        <div
          className="
            flex
            flex-col
            justify-center
            gap-[2px]
          "
        >
          <span
            className="
              text-[8px]
              font-medium
              tracking-[0.25em]
              text-white/45
            "
          >
            METRIUS
          </span>

          <span
            className="
              text-[10px]
              font-medium
              tracking-[0.16em]
              text-white/80
            "
          >
            DIGITAL SYSTEMS
          </span>
        </div>
      </div>
    </>
  );
}