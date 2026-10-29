"use client";

import { memo, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const PRODUCTS = [
  {
    id: 1,
    name: "Blazer Lungo",
    category: "Tailored Collection",
    price: 5179,
    cloth: "/images/cloth1.avif",
    model: "/images/bg1.avif",
    colors: ["#d7d0c4", "#a39a85", "#75634b"],
    description:
      "Straight-cut jacket in stretch imitation suede with raw edges.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Blazer Jungle",
    category: "Essential Collection",
    price: 3890,
    cloth: "/images/cloth2.avif",
    model: "/images/bg2.avif",
    colors: ["#646951", "#35372e", "#8b8068"],
    description:
      "A relaxed statement blazer with sculpted shoulders and understated detailing.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Blazer Studio",
    category: "Minimal Collection",
    price: 4290,
    cloth: "/images/cloth3.avif",
    model: "/images/bg3.avif",
    colors: ["#e3d8c6", "#b9a58a", "#6d695d"],
    description:
      "Contemporary tailoring designed for versatile everyday elegance.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
] as const;

type Product = (typeof PRODUCTS)[number];

const EASE = [0.16, 1, 0.3, 1] as const;

/* =========================================================
   ANIMATION VARIANTS
   Original animation timings, blur and stagger effects kept.
========================================================= */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.085,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 38,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.68,
      ease: EASE,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.97,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

/* =========================================================
   ICONS
========================================================= */

function ArrowIcon({
  direction = "right",
  className = "h-4 w-4",
}: {
  direction?: "left" | "right";
  className?: string;
}) {
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
            strokeWidth="1.5"
          />
          <path
            d="m11 6-6 6 6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          <path
            d="M5 12h14"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="m13 6 6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}

function BagIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
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

function HeartIcon({
  filled = false,
  className = "h-4 w-4",
}: {
  filled?: boolean;
  className?: string;
}) {
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
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="10.8"
        cy="10.8"
        r="6.8"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m16 16 4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* =========================================================
   OPTIMIZED IMAGE COMPONENT
   Memoized to avoid unnecessary rerenders when its props
   have not changed. AVIF assets and visual styling retained.
========================================================= */

const ProductImage = memo(function ProductImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={`pointer-events-none select-none object-contain ${className}`}
    />
  );
});

ProductImage.displayName = "ProductImage";

/* =========================================================
   REUSABLE BUTTON
========================================================= */

function IconButton({
  label,
  onClick,
  children,
  className = "",
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`grid h-[clamp(24px,2.5vw,30px)] w-[clamp(24px,2.5vw,30px)] shrink-0 place-items-center rounded-[7px] border border-neutral-800 transition-colors duration-200 hover:bg-black hover:text-white ${className}`}
    >
      {children}
    </button>
  );
}

/* =========================================================
   APP VISUAL 2
========================================================= */

export default function AppVisual2() {
  const rootRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(rootRef, {
    once: true,
    amount: 0.18,
  });

  const reducedMotion = useReducedMotion();

  const [page, setPage] = useState<"store" | "detail">("store");
  const [selectedProduct, setSelectedProduct] =
    useState<Product>(PRODUCTS[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Blazers");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [showAdded, setShowAdded] = useState(false);

  const duration = reducedMotion ? 0.01 : 0.7;

  function openProduct(product: Product) {
    setSelectedProduct(product);
    setSelectedSize("M");
    setSelectedColor(0);
    setShowAdded(false);
    setPage("detail");
  }

  function returnToStore() {
    setPage("store");
    setShowAdded(false);
  }

  function toggleFavorite(id: number) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function addToBag() {
    setCartCount((count) => count + 1);
    setShowAdded(true);
  }

  const isFavorite = favorites.includes(selectedProduct.id);

  return (
    <div
      ref={rootRef}
      className="relative flex h-full w-full items-center justify-center overflow-visible [perspective:1400px]"
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ====================================================== */}

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={
          isInView
            ? { opacity: page === "detail" ? 0.9 : 0.65 }
            : { opacity: 0 }
        }
        transition={{ duration: reducedMotion ? 0.01 : 1 }}
        className="pointer-events-none absolute inset-[8%] rounded-full bg-neutral-200/70 blur-3xl"
      />

      {/* Outer orbit */}

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.88 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{
          duration: reducedMotion ? 0.01 : 1.1,
          ease: EASE,
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[84%] max-w-[570px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.07]"
      />

      {/* Inner orbit */}

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.82 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{
          duration: reducedMotion ? 0.01 : 1.2,
          delay: reducedMotion ? 0 : 0.1,
          ease: EASE,
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[68%] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-black/[0.09]"
      />

      {/* =====================================================
          MAIN PHONE — ORIGINAL 3D ENTRANCE KEPT
      ====================================================== */}

      <motion.div
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                y: 48,
                rotateX: 18,
                rotateY: -14,
                rotateZ: 7,
                scale: 0.94,
                filter: "blur(5px)",
              }
        }
        animate={
          isInView
            ? {
                opacity: 1,
                y: -6,
                rotateX: 7,
                rotateY: -15,
                rotateZ: 10,
                scale: 1,
                filter: "blur(0px)",
              }
            : {}
        }
        transition={{
          duration: reducedMotion ? 0.01 : 1.1,
          ease: EASE,
        }}

className="relative z-10 h-auto w-[clamp(220px,25vw,282px)] max-w-[82vw] shrink-0 overflow-hidden rounded-[30px] border border-white bg-white text-neutral-950 shadow-[0_3px_5px_rgba(255,255,255,0.9),0_20px_42px_rgba(0,0,0,0.10),0_45px_85px_rgba(0,0,0,0.15)] [aspect-ratio:0.505] [transform-style:preserve-3d] [backface-visibility:hidden] will-change-transform transition-shadow duration-300 hover:shadow-[0_4px_8px_rgba(255,255,255,0.9),0_25px_48px_rgba(0,0,0,0.12),0_48px_90px_rgba(0,0,0,0.17)] sm:rounded-[36px]"
      >
        {/* Slide between storefront and product detail */}

        <motion.div
          animate={{ x: page === "detail" ? "-50%" : "0%" }}
          transition={{
            duration: reducedMotion ? 0.01 : 0.75,
            ease: EASE,
          }}
          className="flex h-full w-[200%]"
        >
          {/* =================================================
              SCREEN 1 — FASHION STOREFRONT
          ================================================== */}

          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative flex h-full w-1/2 min-w-0 flex-col overflow-hidden bg-white px-[5.5%] pb-[4%] pt-[6%]"
          >
            {/* Header */}

            <motion.header
              variants={itemVariants}
              className="flex shrink-0 items-center justify-between gap-2"
            >
              <IconButton
                label="Open menu"
                onClick={() =>
                  setActiveCategory(
                    activeCategory === "All" ? "Blazers" : "All",
                  )
                }
                className="border-0"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 7h16M4 12h16M4 17h10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </IconButton>

              <div className="flex min-w-0 flex-1 flex-col items-center leading-tight">
                <span className="text-[clamp(5px,0.52vw,7px)] uppercase tracking-[0.18em] text-neutral-400">
                  <span className="mr-1">⌖</span>
                  LOCATION
                </span>
                <span className="mt-0.5 text-[clamp(7px,0.72vw,9px)] font-medium text-neutral-700">
                  France, Paris
                </span>
              </div>

              <motion.button
                variants={itemVariants}
                type="button"
                aria-label="Profile"
                onClick={() => setShowAdded((value) => !value)}
                className="grid h-[clamp(23px,2.3vw,29px)] w-[clamp(23px,2.3vw,29px)] shrink-0 place-items-center overflow-hidden rounded-full border border-neutral-200 bg-[#e8e7e1] text-[clamp(7px,0.7vw,9px)] font-medium text-neutral-600"
              >
                AS
              </motion.button>
            </motion.header>

            {/* Search */}

            <motion.button
              variants={itemVariants}
              type="button"
              onClick={() => setActiveCategory("All")}
              className="mx-[1%] mt-[7%] flex shrink-0 items-center gap-2 rounded-full bg-[#f3f4f1] px-[5%] py-[4%] text-left transition-colors hover:bg-[#e9ebe7]"
            >
              <span className="text-neutral-400">
                <SearchIcon />
              </span>
              <span className="text-[clamp(7px,0.7vw,9px)] text-neutral-400">
                Search
              </span>
              <svg
                className="ml-auto h-3 w-3 text-neutral-400"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 7h16M7 12h10M10 17h4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </motion.button>

            {/* Categories */}

            <motion.div
              variants={containerVariants}
              className="mt-[6%] grid shrink-0 grid-cols-4 gap-[3%]"
            >
              {[
                { name: "Bags", symbol: "▱" },
                { name: "Dresses", symbol: "♧" },
                { name: "Sweaters", symbol: "◇" },
                { name: "Blazers", symbol: "▥" },
              ].map((category) => (
                <motion.button
                  variants={itemVariants}
                  key={category.name}
                  type="button"
                  onClick={() => setActiveCategory(category.name)}
                  whileTap={reducedMotion ? undefined : { scale: 0.94 }}
                  className="flex min-w-0 flex-col items-center gap-1"
                >
                  <span
                    className={`grid aspect-square w-full max-w-[44px] place-items-center rounded-[10px] text-[clamp(13px,1.4vw,17px)] transition-colors ${
                      activeCategory === category.name
                        ? "bg-neutral-950 text-white"
                        : "bg-[#f0f1ee] text-neutral-500 hover:bg-[#e6e8e4]"
                    }`}
                  >
                    {category.symbol}
                  </span>
                  <span
                    className={`text-[clamp(5px,0.58vw,7px)] ${
                      activeCategory === category.name
                        ? "font-medium text-neutral-900"
                        : "text-neutral-400"
                    }`}
                  >
                    {category.name}
                  </span>
                </motion.button>
              ))}
            </motion.div>

            {/* Collection heading */}

            <motion.div
              variants={itemVariants}
              className="mx-[1%] mt-[7%] flex shrink-0 items-end justify-between"
            >
              <div>
                <p className="text-[clamp(5px,0.55vw,7px)] uppercase tracking-[0.17em] text-neutral-400">
                  Curated for you
                </p>
                <h3 className="mt-1 text-[clamp(14px,1.45vw,18px)] font-medium leading-tight tracking-[-0.06em]">
                  The blazer edit
                </h3>
              </div>
              <span className="pb-0.5 text-[clamp(5px,0.55vw,7px)] text-neutral-400">
                03 pieces
              </span>
            </motion.div>

            {/* Product cards — individual entrance animations */}

            <motion.div
              variants={containerVariants}
              className="relative mt-[5%] min-h-0 flex-1"
            >
              {PRODUCTS.map((product, index) => {
                const productIsFavorite = favorites.includes(product.id);

                return (
                  <motion.button
                    variants={cardVariants}
                    key={product.id}
                    type="button"
                    onClick={() => openProduct(product)}
                    whileHover={
                      reducedMotion ? undefined : { y: -3, scale: 1.01 }
                    }
                    whileTap={
                      reducedMotion ? undefined : { scale: 0.985 }
                    }
                    className={`group absolute flex items-center overflow-visible rounded-[12px] border border-white/90 bg-white/95 p-[3%] text-left shadow-[0_7px_18px_rgba(0,0,0,0.09)] transition-shadow duration-300 hover:shadow-[0_10px_22px_rgba(0,0,0,0.13)] ${
                      index === 0
                        ? "left-[17%] top-[3%] z-30 w-[79%]"
                        : index === 1
                          ? "left-[1%] top-[35%] z-20 w-[82%]"
                          : "left-[12%] top-[66%] z-10 w-[80%]"
                    }`}
                  >
                    <span
                      className={`relative -ml-[11%] grid aspect-[0.78] w-[43%] shrink-0 place-items-center overflow-hidden rounded-[9px] ${
                        index === 1 ? "bg-[#e6e7df]" : "bg-[#f1f1ed]"
                      }`}
                    >
                      <ProductImage
                        src={product.cloth}
                        alt={product.name}
                        className="h-full w-full scale-[1.18] p-[2%] transition-transform duration-500 group-hover:scale-[1.28]"
                      />
                    </span>

                    <span className="flex min-w-0 flex-1 flex-col justify-center pl-[5%]">
                      <span className="truncate text-[clamp(7px,0.72vw,9px)] font-medium tracking-[-0.03em]">
                        {product.name}
                      </span>
                      <span className="mt-1 text-[clamp(5px,0.55vw,7px)] text-neutral-400">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      <span className="mt-[8%] flex items-center gap-1">
                        {product.colors.slice(0, 3).map((color) => (
                          <i
                            key={color}
                            className="h-[7px] w-[7px] rounded-full border border-black/5"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </span>
                    </span>

                    {/* Favorite control */}

                    <span
                      role="button"
                      aria-label={`Favorite ${product.name}`}
                      aria-pressed={productIsFavorite}
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleFavorite(product.id);
                      }}
                      className={`absolute right-[5%] top-[12%] z-40 cursor-pointer ${
                        productIsFavorite
                          ? "text-rose-600"
                          : "text-neutral-300 hover:text-neutral-700"
                      }`}
                    >
                      <HeartIcon filled={productIsFavorite} />
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Footer */}

            <motion.footer
              variants={itemVariants}
              className="mt-[3%] flex shrink-0 items-center justify-between border-t border-neutral-100 px-[2%] pt-[3%]"
            >
              <span className="text-[clamp(5px,0.55vw,7px)] uppercase tracking-[0.15em] text-neutral-400">
                Atelier
              </span>
              <button
                type="button"
                aria-label={`Shopping bag, ${cartCount} items`}
                onClick={() => setShowAdded((value) => !value)}
                className="relative text-neutral-600 transition hover:text-neutral-950"
              >
                <BagIcon />
                {cartCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 grid h-3.5 min-w-3.5 place-items-center rounded-full bg-black px-1 text-[7px] text-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </motion.footer>

            {/* Bag notification */}

            {showAdded && (
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration, ease: EASE }}
                className="absolute inset-x-[7%] bottom-[12%] z-50 rounded-xl border border-neutral-200 bg-white/95 p-3 text-center text-[9px] text-neutral-700 shadow-lg backdrop-blur-xl"
              >
                Your bag contains {cartCount}{" "}
                {cartCount === 1 ? "item" : "items"}.
              </motion.div>
            )}
          </motion.section>

          {/* =================================================
              SCREEN 2 — FASHION PRODUCT DETAIL
          ================================================== */}

          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate={isInView && page === "detail" ? "visible" : "hidden"}
            className="relative h-full w-1/2 min-w-0 overflow-hidden bg-[#c7c9c3] text-neutral-950"
          >
            {/* Fashion photograph */}

            <motion.div
              key={`model-${selectedProduct.id}`}
              variants={itemVariants}
              initial="hidden"
              animate={
                isInView && page === "detail" ? "visible" : "hidden"
              }
              transition={{ duration, ease: EASE }}
              className="absolute inset-0"
            >
              <motion.img
                src={selectedProduct.model}
                alt={`${selectedProduct.name} fashion model`}
                loading="lazy"
                decoding="async"
                draggable={false}
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, scale: 1.07, y: 18 }
                }
                animate={
                  isInView && page === "detail"
                    ? { opacity: 1, scale: 1, y: 0 }
                    : reducedMotion
                      ? { opacity: 0, scale: 1, y: 18 }
                      : { opacity: 0, scale: 1.07, y: 18 }
                }
                transition={{
                  duration: reducedMotion ? 0.01 : 0.85,
                  ease: EASE,
                }}
                className="h-full w-full select-none object-cover object-center"
              />
            </motion.div>

            {/* Image overlay */}

            <motion.div
              variants={itemVariants}
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.03] via-transparent to-black/10"
            />

            {/* Detail header */}

            <motion.header
              variants={containerVariants}
              className="absolute inset-x-[7%] top-[6%] z-20 flex items-center justify-between"
            >
              <motion.button
                variants={itemVariants}
                type="button"
                aria-label="Back to storefront"
                onClick={returnToStore}
                className="grid h-[30px] w-[30px] place-items-center rounded-full text-neutral-900 transition hover:bg-white/50"
              >
                <ArrowIcon direction="left" className="h-5 w-5" />
              </motion.button>

              <motion.span
                variants={itemVariants}
                className="text-[clamp(11px,1.05vw,14px)] font-semibold tracking-[-0.07em]"
              >
                atelier
              </motion.span>

              <motion.button
                variants={itemVariants}
                type="button"
                aria-label={`Shopping bag, ${cartCount} items`}
                onClick={() => setShowAdded((value) => !value)}
                className="relative grid h-[30px] w-[30px] place-items-center rounded-full text-neutral-900 transition hover:bg-white/50"
              >
                <BagIcon />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-black px-1 text-[8px] text-white">
                    {cartCount}
                  </span>
                )}
              </motion.button>
            </motion.header>

            {/* Product navigation dots */}

            <motion.div
              variants={containerVariants}
              className="absolute left-[8%] top-[47%] z-20 flex items-center gap-1.5"
            >
              {PRODUCTS.map((product) => (
                <motion.button
                  variants={itemVariants}
                  key={product.id}
                  type="button"
                  aria-label={`View ${product.name}`}
                  aria-pressed={selectedProduct.id === product.id}
                  onClick={() => openProduct(product)}
                  className={`h-1.5 rounded-full transition-all ${
                    selectedProduct.id === product.id
                      ? "w-4 bg-neutral-950"
                      : "w-1.5 bg-white/70 hover:bg-white"
                  }`}
                />
              ))}
            </motion.div>

            {/* Product information card */}

            <motion.div
              key={`details-${selectedProduct.id}`}
              variants={containerVariants}
              initial="hidden"
              animate={
                isInView && page === "detail" ? "visible" : "hidden"
              }
              className="absolute inset-x-[7%] bottom-[5%] z-30 overflow-hidden rounded-[22px] border border-white/45 bg-white/55 p-[6%] shadow-[0_12px_35px_rgba(0,0,0,0.12)] backdrop-blur-[22px]"
            >
              {/* Name and favourite */}

              <motion.div
                variants={itemVariants}
                className="flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-[clamp(6px,0.62vw,8px)] uppercase tracking-[0.16em] text-neutral-500">
                    {selectedProduct.category}
                  </p>
                  <h2 className="mt-1 text-[clamp(15px,1.5vw,20px)] font-medium leading-tight tracking-[-0.06em]">
                    {selectedProduct.name}
                  </h2>
                  <p className="mt-1 text-[clamp(7px,0.7vw,9px)] text-neutral-600">
                    ₹{selectedProduct.price.toLocaleString("en-IN")}
                  </p>
                </div>

                <button
                  type="button"
                  aria-label={
                    isFavorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                  aria-pressed={isFavorite}
                  onClick={() => toggleFavorite(selectedProduct.id)}
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/60 bg-white/30 transition hover:bg-white/70 ${
                    isFavorite ? "text-rose-600" : "text-neutral-700"
                  }`}
                >
                  <HeartIcon
                    filled={isFavorite}
                    className="h-4 w-4"
                  />
                </button>
              </motion.div>

              {/* Colour swatches */}

              <motion.div
                variants={itemVariants}
                className="mt-[5%] flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-1.5">
                  {selectedProduct.colors.map((color, index) => (
                    <motion.button
                      key={color}
                      type="button"
                      aria-label={`Select colour ${index + 1}`}
                      aria-pressed={selectedColor === index}
                      onClick={() => setSelectedColor(index)}
                      whileTap={
                        reducedMotion ? undefined : { scale: 0.88 }
                      }
                      className={`grid h-[22px] w-[22px] place-items-center rounded-full border transition ${
                        selectedColor === index
                          ? "border-neutral-800"
                          : "border-transparent"
                      }`}
                    >
                      <span
                        className="h-[15px] w-[15px] rounded-full border border-black/5"
                        style={{ backgroundColor: color }}
                      />
                    </motion.button>
                  ))}
                </div>

                <span className="text-[clamp(6px,0.62vw,8px)] text-neutral-600">
                  {selectedProduct.colors.length} colours
                </span>
              </motion.div>

              {/* Sizes */}

              <motion.div
                variants={itemVariants}
                className="mt-[4%]"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[clamp(7px,0.7vw,9px)] font-medium text-neutral-800">
                    Select size
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedSize("M")}
                    className="text-[clamp(6px,0.62vw,8px)] text-neutral-600 underline underline-offset-2"
                  >
                    Size guide
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-1.5">
                  {selectedProduct.sizes.map((size) => (
                    <motion.button
                      key={size}
                      type="button"
                      aria-pressed={selectedSize === size}
                      onClick={() => setSelectedSize(size)}
                      whileTap={
                        reducedMotion ? undefined : { scale: 0.95 }
                      }
                      className={`rounded-[8px] border py-[8px] text-[clamp(7px,0.7vw,9px)] transition ${
                        selectedSize === size
                          ? "border-neutral-950 bg-neutral-950 text-white"
                          : "border-white/70 bg-white/35 text-neutral-800 hover:bg-white/70"
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Description */}

              <motion.p
                variants={itemVariants}
                className="mt-[4%] text-[clamp(6px,0.65vw,8px)] leading-relaxed text-neutral-700"
              >
                {selectedProduct.description}
              </motion.p>

              {/* Add to bag */}

              <motion.button
                variants={itemVariants}
                type="button"
                onClick={addToBag}
                whileTap={
                  reducedMotion ? undefined : { scale: 0.98 }
                }
                className="mt-[5%] flex w-full items-center justify-center gap-2 rounded-[10px] bg-neutral-950 px-3 py-[11px] text-[clamp(8px,0.8vw,10px)] font-medium text-white transition-colors hover:bg-neutral-700"
              >
                {showAdded ? (
                  <>
                    <span>✓</span>
                    Added to your bag
                  </>
                ) : (
                  <>
                    Add to your bag
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </>
                )}
              </motion.button>

              {/* Shipping message */}

              <motion.p
                variants={itemVariants}
                className="mt-2 text-center text-[clamp(6px,0.58vw,7px)] text-neutral-600"
              >
                {showAdded
                  ? `${cartCount} ${cartCount === 1 ? "item" : "items"} in your bag`
                  : "Complimentary shipping on your first order"}
              </motion.p>
            </motion.div>
          </motion.section>
        </motion.div>
      </motion.div>
    </div>
  );
}