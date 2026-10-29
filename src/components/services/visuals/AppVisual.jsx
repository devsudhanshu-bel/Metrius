
"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useReducedMotion,
} from "framer-motion";

const PRODUCTS = [
  {
    id: 1,
    name: "JMDA Max Lift 001",
    category: "Men's shoes",
    price: 200,
    image: "/images/shoes1.avif",
    colors: ["#ff3838", "#d9f1f4", "#111111", "#8468ff"],
    description: "Precision engineered. Made for movement.",
  },
  {
    id: 2,
    name: "JMDA Air",
    category: "Lifestyle",
    price: 200,
    image: "/images/shoes2.avif",
    colors: ["#ffffff", "#159bff", "#111111"],
    description: "Lightweight design with a distinctive edge.",
  },
  {
    id: 3,
    name: "JMDA Fly",
    category: "Performance series",
    price: 200,
    image: "/images/shoes3.avif",
    colors: ["#ff3838", "#ffd52b", "#d9f1f4"],
    description: "Bold materials. Uncompromising movement.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.085,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 42,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function ArrowIcon({ direction = "right", className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {direction === "left" ? (
        <>
          <path
            d="M19 12H5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="m11 6-6 6 6 6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          <path
            d="M5 12h14"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="m13 6 6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}

function BagIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="7"
        width="16"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 9V6a4 4 0 0 1 8 0v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeartIcon({ filled = false, className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      aria-hidden="true"
    >
      <path
        d="M20.8 8.8c0 4.1-8.8 10-8.8 10s-8.8-5.9-8.8-10A4.8 4.8 0 0 1 12 6.4a4.8 4.8 0 0 1 8.8 2.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShoeImage({ product, className = "" }) {
  const [failed, setFailed] = useState(false);

  return (
    <img
      src={product.image}
      alt={product.name}
      draggable={false}
      onError={() => setFailed(true)}
      className={`${className} pointer-events-none select-none object-contain ${
        failed ? "invisible" : "visible"
      }`}
    />
  );
}

function SwipeToBuy({ onComplete, disabled }) {
  const trackRef = useRef(null);
  const controls = useAnimation();
  const [dragging, setDragging] = useState(false);
  const [completing, setCompleting] = useState(false);
  const reducedMotion = useReducedMotion();

  async function handleDragEnd(_, info) {
    setDragging(false);

    const trackWidth =
      trackRef.current?.getBoundingClientRect().width ?? 220;
    const distance = trackWidth * 0.36;

    if (info.offset.x > distance || info.velocity.x > 550) {
      setCompleting(true);

      await controls.start({
        x: Math.max(0, trackWidth - 43),
        transition: {
          duration: reducedMotion ? 0.01 : 0.22,
          ease: "easeOut",
        },
      });

      onComplete();
      return;
    }

    controls.start({
      x: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 35,
      },
    });
  }

  return (
    <motion.div
      ref={trackRef}
      animate={
        completing
          ? { scale: 1.12, opacity: 0, filter: "blur(2px)" }
          : { scale: 1, opacity: 1, filter: "blur(0px)" }
      }
      transition={{ duration: reducedMotion ? 0.01 : 0.3 }}
      onAnimationComplete={() => {
        if (completing) onComplete(true);
      }}
      className={`relative mx-auto mt-[6%] flex min-h-[clamp(38px,4vw,46px)] w-[min(100%,220px)] shrink-0 items-center justify-center overflow-hidden rounded-full bg-black px-2 text-white ${
        disabled ? "pointer-events-none opacity-60" : ""
      }`}
      aria-label="Swipe to add the shoe to your bag"
    >
      <span
        className={`pointer-events-none absolute inset-0 flex items-center justify-center gap-2 pl-5 transition-opacity duration-200 ${
          dragging || completing ? "opacity-20" : "opacity-100"
        }`}
      >
        <span className="text-[clamp(9px,0.9vw,12px)] font-light">
          {completing ? "Added" : "Swipe"}
        </span>
        <span className="flex items-center">
          <ArrowIcon className="h-3.5 w-3.5" />
          <ArrowIcon className="-ml-1.5 h-3.5 w-3.5" />
          <ArrowIcon className="-ml-1.5 h-3.5 w-3.5" />
        </span>
      </span>

      <motion.div
        drag="x"
        dragDirectionLock
        dragConstraints={trackRef}
        dragElastic={0.025}
        dragMomentum={false}
        animate={controls}
        onDragStart={() => setDragging(true)}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 0.96 }}
        className="absolute left-1 top-1 z-10 grid h-[clamp(30px,3vw,38px)] w-[clamp(30px,3vw,38px)] cursor-grab touch-pan-y place-items-center rounded-full bg-neutral-700 active:cursor-grabbing"
      >
        <BagIcon className="h-3.5 w-3.5" />
      </motion.div>
    </motion.div>
  );
}

export default function AppVisual() {
  const [page, setPage] = useState("store");
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [activeCategory, setActiveCategory] = useState("Running");
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedSize, setSelectedSize] = useState("10");
  const [selectedColor, setSelectedColor] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [added, setAdded] = useState(false);
  const [swipeComplete, setSwipeComplete] = useState(false);

  const rootRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const isInView = useInView(rootRef, {
    once: true,
    amount: 0.18,
  });

  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!swipeComplete) return;

    const timer = window.setTimeout(() => {
      setPage("store");
      setAdded(true);
      setSwipeComplete(false);
    }, reducedMotion ? 0 : 450);

    return () => window.clearTimeout(timer);
  }, [swipeComplete, reducedMotion]);

  function openProduct(product) {
    setSelectedProduct(product);
    setSelectedSize("10");
    setSelectedColor(0);
    setFavorite(false);
    setAdded(false);
    setSwipeComplete(false);
    setPage("detail");
  }

  function returnToStore() {
    setPage("store");
    setSwipeComplete(false);
  }

  function handleTouchStart(event) {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  }

  function handleTouchEnd(event) {
    if (touchStartX.current === null) return;

    const deltaX =
      event.changedTouches[0].clientX - touchStartX.current;
    const deltaY =
      event.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > 65 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0 && page === "store") {
        openProduct(selectedProduct);
      } else if (deltaX > 0 && page === "detail") {
        returnToStore();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  }

  function chooseCarouselProduct(index) {
    const product = PRODUCTS[index];
    if (!product) return;

    setActiveSlide(index);
    setSelectedProduct(product);
  }

  function handleSwipeComplete(animationFinished = false) {
    if (animationFinished) {
      setPage("store");
      setAdded(true);
      setSwipeComplete(false);
      return;
    }

    if (swipeComplete) return;

    setCartCount((count) => count + 1);
    setSwipeComplete(true);
  }

  return (
    <div
      ref={rootRef}
      className="relative flex h-full w-full items-center justify-center overflow-visible [perspective:1400px]"
    >
      {/* Soft background glow */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,rgba(255,255,255,0.8),transparent_68%)]"
      />

      {/* Outer orbit */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.07]"
      />

      {/* Inner orbit */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.88 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{
          duration: 1.2,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[69%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-black/[0.09]"
      />

      {/* Complete phone: 3D X/Y/Z pose with existing intro animation */}
      <motion.div
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                x: 90,
                y: 48,
                rotateX: 18,
                rotateY: -14,
                rotateZ: 7,
                scale: 0.94,
              }
        }
        animate={
          isInView
            ? {
                opacity: 1,
                x: 110,
                y: -6,
                rotateX: 7,
                rotateY: 15,
                rotateZ: -10,
                scale: 1,
              }
            : {}
        }
        transition={{
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        
className="relative z-10 h-auto max-h-[560px] w-[clamp(220px,25vw,282px)] max-w-[82vw] shrink-0 overflow-hidden rounded-[32px] border border-white bg-white text-neutral-950 shadow-[0_3px_5px_rgba(255,255,255,0.9),0_20px_42px_rgba(0,0,0,0.10),0_45px_85px_rgba(0,0,0,0.14)] [aspect-ratio:0.505] [transform-style:preserve-3d] [backface-visibility:hidden] will-change-transform transition-shadow duration-300 hover:shadow-[0_4px_8px_rgba(255,255,255,0.9),0_25px_48px_rgba(0,0,0,0.12),0_48px_90px_rgba(0,0,0,0.17)]"

      >
        {/* Both screens remain inside the same phone */}
        <motion.div
          animate={{ x: page === "detail" ? "-50%" : "0%" }}
          transition={{
            duration: reducedMotion ? 0.01 : 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex h-full w-[200%]"
        >
          {/* SCREEN ONE: STOREFRONT */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex h-full w-1/2 min-w-0 flex-col overflow-hidden bg-white px-[5.2%] pb-[5%] pt-[7%]"
          >
            <motion.header
              variants={itemVariants}
              className="flex shrink-0 items-center justify-between gap-2"
            >
              <button
                type="button"
                aria-label="Reset collection"
                onClick={() => {
                  setActiveCategory("Running");
                  chooseCarouselProduct(0);
                }}
                className="grid h-[clamp(22px,2.3vw,28px)] w-[clamp(22px,2.3vw,28px)] shrink-0 place-items-center rounded-[7px] border border-neutral-800 transition-colors duration-200 hover:bg-black hover:text-white"
              >
                <ArrowIcon direction="left" />
              </button>

              {/* Slightly raised and tilted logo */}
              <div className="translate-x-[3px] -translate-y-[2px] rotate-[-3deg] skew-x-[-12deg] text-[clamp(17px,2vw,25px)] font-black italic tracking-[-0.09em] text-neutral-200">
                JMDF
              </div>

              <button
                type="button"
                aria-label={`Shopping bag, ${cartCount} items`}
                className="relative grid h-[clamp(22px,2.3vw,28px)] w-[clamp(22px,2.3vw,28px)] shrink-0 place-items-center rounded-[7px] border border-neutral-800 transition-colors duration-200 hover:bg-black hover:text-white"
              >
                <BagIcon />
                {cartCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-black px-1 text-[8px] text-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </motion.header>

            <motion.div
              variants={itemVariants}
              className="mt-[7%] shrink-0"
            >
              <h2 className="text-[clamp(14px,1.5vw,20px)] font-semibold leading-[1.1] tracking-[-0.045em]">
                New Collection
              </h2>
              <p className="mt-[3px] text-[clamp(6px,0.65vw,8px)] font-medium">
                JMDA Original 2025
              </p>
            </motion.div>

            {/* Featured product */}
            <motion.button
              variants={itemVariants}
              type="button"
              onClick={() => openProduct(PRODUCTS[0])}
              className="group relative mt-[6%] flex min-h-[76px] shrink-0 items-center overflow-hidden rounded-[17px] bg-[#f7f6f6] p-[5%] text-left transition-colors duration-300 hover:bg-[#efeeee]"
            >
              <span className="relative z-10 flex w-[64%] flex-col">
                <strong className="text-[clamp(8px,0.85vw,11px)] font-medium leading-[1.3]">
                  JMDA Max Lift 001
                </strong>
                <small className="mt-1 text-[clamp(6px,0.6vw,8px)]">
                  Men&apos;s shoes
                </small>
                <span className="mt-2 inline-flex w-fit rounded-[8px] bg-black px-[15px] py-[6px] text-[clamp(6px,0.6vw,8px)] text-white transition-transform duration-300 group-hover:translate-x-1">
                  Shop now
                </span>
              </span>

              <span className="absolute -right-[2%] top-[-8%] h-[116%] w-[54%] rotate-[-5deg] transition-transform duration-300 group-hover:rotate-[-1deg] group-hover:scale-105">
                <ShoeImage
                  product={PRODUCTS[0]}
                  className="h-full w-full"
                />
              </span>
            </motion.button>

            {/* Featured product indicators */}
            <motion.div
              variants={itemVariants}
              className="mt-[5%] flex shrink-0 items-center justify-center gap-[5px]"
            >
              {PRODUCTS.map((product, index) => (
                <button
                  key={product.id}
                  type="button"
                  aria-label={`Feature ${product.name}`}
                  onClick={() => chooseCarouselProduct(index)}
                  className={`h-[5px] w-[5px] rounded-full transition-all duration-200 ${
                    activeSlide === index
                      ? "scale-125 bg-[#f04452]"
                      : "bg-[#d8d8d8] hover:bg-neutral-500"
                  }`}
                />
              ))}
              <span className="h-[5px] w-[5px] rounded-full bg-[#d8d8d8]" />
            </motion.div>

            {/* Categories */}
            <motion.div
              variants={itemVariants}
              className="mt-[8%] grid shrink-0 grid-cols-3 gap-[5px]"
            >
              {[
                ["Running", "4 items"],
                ["Lifestyle", "9 items"],
                ["Gym", "5 items"],
              ].map(([name, count]) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setActiveCategory(name)}
                  className={`min-w-0 text-left transition-colors duration-200 ${
                    activeCategory === name
                      ? "text-neutral-950"
                      : "text-neutral-300 hover:text-neutral-600"
                  }`}
                >
                  <span className="block text-[clamp(11px,1.2vw,16px)] font-medium leading-[1.15] tracking-[-0.045em]">
                    {name}
                  </span>
                  <small className="mt-px block text-[clamp(6px,0.6vw,8px)]">
                    {count}
                  </small>
                </button>
              ))}
            </motion.div>

            {/* Product cards */}
            <motion.div
              variants={itemVariants}
              className="mt-[8%] grid min-h-0 flex-1 grid-cols-2 gap-[5%]"
            >
              {PRODUCTS.slice(1).map((product) => (
                <article
                  key={product.id}
                  className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[14px] border border-transparent bg-[#f7f6f6] p-[7%] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f0efef]"
                >
                  <button
                    type="button"
                    onClick={() => openProduct(product)}
                    aria-label={`View ${product.name}`}
                    className="flex min-h-0 w-full flex-1 flex-col text-left"
                  >
                    <span className="truncate text-[clamp(7px,0.75vw,10px)] font-medium">
                      {product.name}
                    </span>

                    <span className="mt-1 flex shrink-0 gap-[3px]">
                      {product.colors.slice(0, 3).map((color) => (
                        <i
                          key={color}
                          style={{ backgroundColor: color }}
                          className="h-[5px] w-[5px] rounded-full"
                        />
                      ))}
                    </span>

                    <span className="flex min-h-0 flex-1 items-center justify-center py-[3px]">
                      <ShoeImage
                        product={product}
                        className="h-full w-full transition-transform duration-300"
                      />
                    </span>
                  </button>

                  <div className="flex shrink-0 items-end justify-between gap-1">
                    <span>
                      <strong className="block text-[clamp(10px,1vw,14px)] font-semibold leading-tight">
                        $ {product.price}
                      </strong>
                      <small className="mt-0.5 block text-[clamp(6px,0.6vw,8px)]">
                        Price
                      </small>
                    </span>

                    <button
                      type="button"
                      aria-label={`View ${product.name}`}
                      onClick={() => openProduct(product)}
                      className="grid h-[clamp(21px,2.2vw,28px)] w-[clamp(21px,2.2vw,28px)] shrink-0 place-items-center rounded-[7px] border border-neutral-900 transition-all duration-200 hover:translate-x-0.5 hover:bg-black hover:text-white"
                    >
                      <ArrowIcon />
                    </button>
                  </div>
                </article>
              ))}
            </motion.div>

            {/* Bottom navigation */}
            <motion.footer
              variants={itemVariants}
              className="mt-[7%] flex shrink-0 items-center justify-around pt-[3px]"
            >
              <button
                type="button"
                aria-label="Home"
                onClick={() => setActiveCategory("Running")}
                className="grid h-8 w-8 place-items-center transition-transform duration-200 hover:-translate-y-0.5"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="m3 11 9-8 9 8v9H14v-6h-4v6H3z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                aria-label="Featured shoe"
                onClick={() => openProduct(selectedProduct)}
                className="grid h-[42px] w-[42px] place-items-center rounded-full bg-black text-white shadow-[0_8px_15px_rgba(0,0,0,0.13)] transition-transform duration-200 hover:scale-105"
              >
                <svg
                  className="h-[19px] w-[19px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="10.8"
                    cy="10.8"
                    r="6.7"
                    stroke="white"
                    strokeWidth="1.7"
                  />
                  <path
                    d="m16 16 4.5 4.5"
                    stroke="white"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                aria-label={favorite ? "Remove favorite" : "Add favorite"}
                onClick={() => setFavorite((value) => !value)}
                className={`grid h-8 w-8 place-items-center transition-all duration-200 hover:-translate-y-0.5 ${
                  favorite ? "text-red-500" : "text-neutral-950"
                }`}
              >
                <HeartIcon filled={favorite} />
              </button>
            </motion.footer>
          </motion.section>

          {/* SCREEN TWO: PRODUCT DETAIL */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex h-full w-1/2 min-w-0 flex-col overflow-hidden bg-white px-[5.2%] pb-[6%] pt-[7%]"
          >
            <motion.header
              variants={itemVariants}
              className="flex shrink-0 items-center justify-between gap-2"
            >
              <button
                type="button"
                aria-label="Return to collection"
                onClick={returnToStore}
                className="grid h-[clamp(22px,2.3vw,28px)] w-[clamp(22px,2.3vw,28px)] shrink-0 place-items-center rounded-[7px] border border-neutral-800 transition-colors duration-200 hover:bg-black hover:text-white"
              >
                <ArrowIcon direction="left" />
              </button>

              <span className="max-w-[65%] truncate text-center text-[clamp(8px,0.85vw,12px)] font-medium">
                {selectedProduct.name}
              </span>

              <button
                type="button"
                aria-label={`Shopping bag, ${cartCount} items`}
                className="relative grid h-[clamp(22px,2.3vw,28px)] w-[clamp(22px,2.3vw,28px)] shrink-0 place-items-center rounded-[7px] border border-neutral-800 transition-colors duration-200 hover:bg-black hover:text-white"
              >
                <BagIcon />
                {cartCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-black px-1 text-[8px] text-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </motion.header>

            {/* Product canvas and tilted vertical JMDF wordmark */}
            <motion.div
              key={selectedProduct.id}
              variants={itemVariants}
              className="relative mt-[4%] min-h-0 flex-1"
            >
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
                <span
                  style={{
                    transform:
                      "translate(8px, -12px) rotate(175deg) skewY(-5deg)",
                  }}
                  className="select-none whitespace-nowrap text-[clamp(78px,11vw,130px)] font-black italic leading-none tracking-[-0.12em] text-[#eeeeee] [writing-mode:vertical-rl]"
                >
                  JMDF
                </span>
              </div>

              {/* Size selector */}
              <div className="absolute left-0 top-[22%] z-10 flex flex-col gap-[6px]">
                <span className="mb-px text-[clamp(6px,0.6vw,8px)]">
                  Size
                </span>

                {["9", "9.5", "10", "10.5"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`grid h-[clamp(22px,2.3vw,29px)] w-[clamp(22px,2.3vw,29px)] place-items-center rounded-[8px] border text-[clamp(7px,0.7vw,9px)] transition-all duration-200 hover:scale-105 ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-neutral-800 bg-white text-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Favorite */}
              <motion.button
                variants={itemVariants}
                type="button"
                onClick={() => setFavorite((value) => !value)}
                className={`absolute right-0 top-[22%] z-10 flex flex-col items-center gap-1 ${
                  favorite ? "text-red-500" : "text-black"
                }`}
              >
                <span className="text-[clamp(6px,0.6vw,8px)]">Fav</span>
                <span className="grid h-[clamp(25px,2.5vw,31px)] w-[clamp(25px,2.5vw,31px)] place-items-center rounded-[8px] border border-neutral-800 bg-white transition-transform duration-200 hover:scale-105">
                  <HeartIcon filled={favorite} className="h-4 w-4" />
                </span>
              </motion.button>

              {/* Product shoe */}
              <motion.div
                initial={{ opacity: 0, y: 48, scale: 0.86, rotate: -9 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, scale: 1, rotate: -4 }
                    : {}
                }
                transition={{
                  duration: 0.85,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-[12%_5%_12%] z-[2] flex items-center justify-center"
              >
                <ShoeImage
                  product={selectedProduct}
                  className="h-full w-full transition-transform duration-500 hover:scale-[1.035] hover:rotate-0"
                />
              </motion.div>

              {/* Color selector */}
              <motion.div
                variants={itemVariants}
                className="absolute bottom-[10%] right-0 z-10 flex flex-col items-center gap-[5px]"
              >
                {selectedProduct.colors.map((color, index) => (
                  <button
                    key={`${selectedProduct.id}-${color}`}
                    type="button"
                    aria-label={`Select color ${index + 1}`}
                    onClick={() => setSelectedColor(index)}
                    className={`grid h-[clamp(19px,2vw,25px)] w-[clamp(19px,2vw,25px)] place-items-center rounded-[7px] border bg-white transition-transform duration-200 hover:scale-110 ${
                      selectedColor === index
                        ? "border-black"
                        : "border-neutral-300"
                    }`}
                  >
                    <span
                      style={{ backgroundColor: color }}
                      className="h-[6px] w-[6px] rounded-full"
                    />
                  </button>
                ))}
                <small className="mt-px text-[clamp(6px,0.6vw,8px)]">
                  Color
                </small>
              </motion.div>
            </motion.div>

            {/* Price */}
            <motion.div
              variants={itemVariants}
              className="flex shrink-0 items-end justify-between"
            >
              <div>
                <strong className="block text-[clamp(19px,2vw,27px)] font-semibold leading-none tracking-[-0.05em]">
                  $ {selectedProduct.price}
                </strong>
                <small className="mt-1 block text-[clamp(7px,0.65vw,9px)]">
                  Price
                </small>
              </div>

              <span className="text-right text-[9px] text-neutral-400">
                SIZE {selectedSize}
              </span>
            </motion.div>

            {/* Actual draggable swipe control */}
            <motion.div variants={itemVariants} className="shrink-0">
              <SwipeToBuy
                disabled={swipeComplete}
                onComplete={handleSwipeComplete}
              />
            </motion.div>

            {added && page === "store" && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 shrink-0 text-center text-[9px] text-neutral-500"
              >
                Added to bag · {cartCount}{" "}
                {cartCount === 1 ? "item" : "items"}
              </motion.p>
            )}
          </motion.section>
        </motion.div>
      </motion.div>
    </div>
  );
}
