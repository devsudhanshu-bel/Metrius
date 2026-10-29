
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Custom404() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white px-5 py-10 text-[#171717] sm:px-8">
      <div className="relative flex w-full max-w-[1100px] flex-col items-center">

        {/* 404 HERO */}

        <motion.div
          className="relative flex h-[clamp(260px,36vw,440px)] w-full items-center justify-center"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.85,
            ease: EASE,
          }}
        >
          {/* OVERSIZED 404 */}

          <div
            aria-hidden="true"
            className="absolute inset-0 flex select-none items-center justify-center font-sans text-[clamp(13rem,34vw,24rem)] font-bold leading-[0.8] tracking-[-0.09em]"
          >
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </div>

          {/* NEWSPAPER CHARACTER */}

          <motion.div
            className="absolute left-1/2 top-[48%] z-10 h-[clamp(225px,29vw,350px)] w-[clamp(235px,31vw,365px)] -translate-x-1/2 -translate-y-1/2"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 20, scale: 0.97 }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: reduceMotion ? 0 : 1,
              delay: reduceMotion ? 0 : 0.12,
              ease: EASE,
            }}
          >
            <Image
              src="/images/404.avif"
              alt="A person holding a newspaper in front of their face"
              fill
              priority
              sizes="(max-width: 640px) 72vw, (max-width: 1024px) 36vw, 365px"
              className="object-contain"
            />
          </motion.div>
        </motion.div>

        {/* ERROR MESSAGE */}

        <motion.div
          className="relative z-20 mt-7 flex w-full flex-col items-center text-center sm:mt-9"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.75,
            delay: reduceMotion ? 0 : 0.25,
            ease: EASE,
          }}
        >
          <h1 className="max-w-[900px] font-sans text-[clamp(1rem,1.8vw,1.4rem)] font-medium leading-[1.6] tracking-[-0.035em]">
            We are sorry, but the page you are looking
            for cannot be found.
          </h1>

          <p className="mt-5 font-sans text-[12px] leading-6 text-[#777777] sm:mt-6 sm:text-[13px]">
            You might try exploring our site or visiting the{" "}
            <Link
              href="/"
              className="font-semibold text-[#269bb4] underline decoration-[#269bb4]/40 underline-offset-2 transition-colors duration-300 hover:text-black hover:decoration-black"
            >
              homepage
            </Link>
            .
          </p>
        </motion.div>

        {/* FOOTNOTE */}

        <motion.div
          className="mt-10 flex items-center gap-3 font-sans text-[9px] font-medium uppercase tracking-[0.17em] text-black/35 sm:mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            delay: reduceMotion ? 0 : 0.45,
          }}
        >
          <span className="h-px w-7 bg-black/20" />
          <span>METRIUS / PAGE NOT FOUND</span>
          <span className="h-px w-7 bg-black/20" />
        </motion.div>
      </div>
    </main>
  );
}
