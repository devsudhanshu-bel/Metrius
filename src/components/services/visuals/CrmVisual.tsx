
"use client";

import {
  House,
  Folder,
  Users,
  FileText,
  Settings,
  LifeBuoy,
} from "lucide-react";
import {
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
    filter: "blur(2px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

function IconButton({
  children,
  label,
  className = "",
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#F0F0F3] !text-[10px] text-[#34343A] transition-colors hover:bg-[#E5E5EA] sm:h-8 sm:w-8 ${className}`}
    >
      {children}
    </motion.button>
  );
}

function Avatar({
  initials,
  color,
}: {
  initials: string;
  color: string;
}) {
  return (
    <div
      className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-white !text-[7px] font-medium text-[#33333A] shadow-sm sm:h-8 sm:w-8"
      style={{ background: color }}
    >
      {initials}
    </div>
  );
}

function Logo() {
  return (
    <div className="grid h-6 w-6 shrink-0 place-items-center sm:h-8 sm:w-8">
      <svg
        viewBox="0 0 36 36"
        className="h-5 w-5 sm:h-7 sm:w-7"
        fill="currentColor"
        aria-label="Company logo"
        role="img"
      >
        <path d="M5 29 14.5 6H19L9.5 29Z" />
        <path d="M16 21 20 12 28 29H22L19 22 16 29H11Z" />
      </svg>
    </div>
  );
}

function TopNavigation() {
  const [active, setActive] = useState("Dashboard");

  const navItems = [
    { name: "Dashboard", icon: "▦" },
    { name: "Payments", icon: "▱" },
    { name: "Reports", icon: "⚑" },
  ];

  return (
    <motion.header
      variants={reveal}
      className="flex h-7 shrink-0 items-center justify-between gap-1 sm:h-9 sm:gap-2"
    >
      <div className="flex min-w-0 flex-1 items-center gap-1 sm:gap-3">
        <Logo />

        <nav className="flex min-w-0 items-center gap-1 overflow-hidden">
          {navItems.map((item) => (
            <motion.button
              key={item.name}
              type="button"
              onClick={() => setActive(item.name)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className={`flex h-6 shrink-0 items-center gap-1 rounded-full px-1.5 !text-[10px] transition-colors sm:h-8 sm:gap-2 sm:px-3 ${
                active === item.name
                  ? "bg-[#17171B] text-white"
                  : "bg-[#F0F0F3] text-[#55555D] hover:bg-[#E6E6EA]"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </motion.button>
          ))}
        </nav>
      </div>

      <div className="hidden shrink-0 items-center gap-2 xl:flex">
        <div className="flex -space-x-2">
          <Avatar initials="JD" color="#D8B7A5" />
          <Avatar initials="MK" color="#D7C4AD" />
          <Avatar initials="AL" color="#C3D7CE" />

          <div className="grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-[#17171B] !text-[7px] text-white">
            +6
          </div>
        </div>

        <button
          type="button"
          className="flex h-8 items-center gap-2 rounded-full bg-[#F0F0F3] px-3 !text-[10px] text-[#44444B]"
        >
          + Add Manager
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <IconButton label="Notifications">
          <span className="relative">
            ♧
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#E49A9A]" />
          </span>
        </IconButton>

        <div className="hidden min-[380px]:block">
          <IconButton label="Messages">✉</IconButton>
        </div>

        <div className="scale-90 origin-right sm:scale-100">
          <Avatar initials="NM" color="#C9DED7" />
        </div>
      </div>
    </motion.header>
  );
}

function Sidebar() {
  const [active, setActive] = useState(0);

  const icons = [
    { icon: House, label: "Home" },
    { icon: Folder, label: "Projects" },
    { icon: Users, label: "Team" },
    { icon: FileText, label: "Reports" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <motion.aside
      variants={reveal}
      className="flex min-h-0 flex-col items-center justify-between py-1"
    >
      <div className="flex flex-col items-center gap-1 sm:gap-2">
        {icons.map(({ icon: Icon, label }, index) => (
          <motion.button
            key={label}
            type="button"
            aria-label={label}
            onClick={() => setActive(index)}
            whileHover={{ scale: 1.05, x: 1 }}
            whileTap={{ scale: 0.95 }}
            className={`grid h-6 w-6 place-items-center rounded-full transition-colors sm:h-9 sm:w-9 ${
              active === index
                ? "bg-[#17171B] text-white shadow-sm"
                : "bg-[#F0F0F3] text-[#777780] hover:bg-white"
            }`}
          >
            <Icon size={13} strokeWidth={1.6} />
          </motion.button>
        ))}
      </div>

      <motion.div whileHover={{ scale: 1.05 }}>
        <IconButton label="Support">
          <LifeBuoy size={13} strokeWidth={1.6} />
        </IconButton>
      </motion.div>
    </motion.aside>
  );
}

function PageHeading() {
  const [period, setPeriod] = useState("20-27 Jan, 2025");

  return (
    <motion.section
      variants={reveal}
      className="flex shrink-0 flex-col gap-1.5 sm:gap-2"
    >
      <div className="flex items-center gap-1 !text-[5px] text-[#85858D] sm:gap-2">
        <span>▢</span>
        <span>Home Page</span>
        <span>→</span>
        <span>▢</span>
        <span className="text-[#45454B]">Dashboard</span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-1.5">
        <h1 className="!text-[9px] font-normal leading-tight tracking-[-0.055em] text-[#17171B] sm:!text-[11px]">
          Client Dashboard
        </h1>

        <div className="flex flex-wrap items-center gap-1">
          <IconButton label="Search">⌕</IconButton>

          <IconButton label="Filters">⇅</IconButton>

          <label className="hidden h-7 items-center gap-1 rounded-full bg-[#F0F0F3] px-2 !text-[10px] text-[#424249] min-[440px]:flex sm:h-8">
            <span>▦</span>

            <select
              aria-label="Date range"
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              className="max-w-[90px] bg-transparent !text-[10px] outline-none"
            >
              <option>20-27 Jan, 2025</option>
              <option>1-7 Feb, 2025</option>
              <option>1-30 Jan, 2025</option>
            </select>
          </label>

          <button
            type="button"
            className="hidden h-7 items-center whitespace-nowrap rounded-full bg-[#F0F0F3] px-2 !text-[10px] text-[#424249] hover:bg-[#E5E5EA] min-[440px]:inline-flex sm:h-8"
          >
            + Add Widget
          </button>

          <button
            type="button"
            className="hidden h-7 items-center whitespace-nowrap rounded-full bg-[#F0F0F3] px-2 !text-[10px] text-[#424249] hover:bg-[#E5E5EA] min-[440px]:inline-flex sm:h-8"
          >
            Create a Report
          </button>
        </div>
      </div>
    </motion.section>
  );
}

function CrystalArtwork() {
  return (
    <div className="relative grid h-full min-h-0 w-full place-items-center overflow-hidden">
      <div className="absolute bottom-[10%] h-5 w-24 rounded-full bg-[#8297BD]/30 blur-xl" />

      <motion.svg
        viewBox="0 0 180 230"
        className="relative h-full max-h-[225px] w-full max-w-[165px]"
        fill="none"
        initial={{ opacity: 0, y: 8, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        role="img"
        aria-label="Crystal artwork"
      >
        <defs>
          <linearGradient id="ct" x1="20" y1="0" x2="145" y2="130">
            <stop stopColor="#82D8F5" />
            <stop offset=".3" stopColor="#9DA9FF" />
            <stop offset=".58" stopColor="#ED8EDB" />
            <stop offset=".78" stopColor="#4B7EEB" />
            <stop offset="1" stopColor="#B9F4F0" />
          </linearGradient>

          <linearGradient id="cb" x1="38" y1="100" x2="140" y2="195">
            <stop stopColor="#9BE4FF" />
            <stop offset=".36" stopColor="#B49BFF" />
            <stop offset=".65" stopColor="#F4A1D9" />
            <stop offset="1" stopColor="#5F8CF4" />
          </linearGradient>

          <linearGradient id="base" x1="30" y1="180" x2="130" y2="230">
            <stop stopColor="#91B3E7" />
            <stop offset=".5" stopColor="#536FAE" />
            <stop offset="1" stopColor="#7896CD" />
          </linearGradient>
        </defs>

        <ellipse
          cx="90"
          cy="218"
          rx="54"
          ry="8"
          fill="#536FAE"
          opacity=".15"
        />

        <motion.g
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            d="M90 8 140 75 90 111 40 75Z"
            fill="url(#ct)"
            stroke="white"
            strokeOpacity=".6"
          />

          <path d="M90 8 90 111 40 75Z" fill="#A5E9FF" fillOpacity=".4" />
          <path d="M90 8 111 76 140 75Z" fill="#5D73E8" fillOpacity=".5" />
          <path d="M40 75 90 111 72 60Z" fill="#F8B6ED" fillOpacity=".75" />
          <path d="M90 8 72 60 111 76Z" fill="white" fillOpacity=".25" />

          <path
            d="M40 82 90 116 140 82 90 165Z"
            fill="url(#cb)"
            stroke="white"
            strokeOpacity=".6"
          />

          <path d="M40 82 90 116 90 165Z" fill="#7ACDF9" fillOpacity=".55" />
          <path d="M90 116 140 82 90 165Z" fill="#D9A6F4" fillOpacity=".6" />

          <path
            d="M40 82 65 105 90 116 68 137Z"
            fill="#F7C1EC"
            fillOpacity=".55"
          />
        </motion.g>

        <path
          d="M48 181 90 161 132 181 90 201Z"
          fill="#A2C1EC"
          stroke="#D9E7FF"
          strokeOpacity=".7"
        />

        <path d="M48 181 90 201 90 222 48 200Z" fill="#6B8EC9" />
        <path d="M90 201 132 181 132 200 90 222Z" fill="#536FAE" />

        <path
          d="M48 181 90 161 132 181 90 201Z"
          fill="url(#base)"
          opacity=".8"
        />
      </motion.svg>
    </div>
  );
}

function ProVersionCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.section
      variants={reveal}
      className="relative isolate flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-[10px] bg-[#E3E9F3] text-[#24252B] sm:rounded-[20px]"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E6EBF4] via-[#E1E7F2] to-[#DCE4F1]" />

        <div className="absolute inset-x-0 top-0 bottom-[26%]">
          <CrystalArtwork />
        </div>

        <div className="absolute inset-x-0 bottom-[22%] h-[24%] bg-gradient-to-b from-transparent via-[#E0E6F2]/70 to-[#DFE5F1]" />

        <div className="absolute inset-x-0 bottom-0 h-[39%] rounded-t-[18px] bg-gradient-to-b from-[#DFE5F1]/95 to-[#DCE3F0]" />
      </div>

      <div className="relative z-10 flex shrink-0 items-center justify-between gap-1 px-1.5 pt-1.5 sm:px-3.5 sm:pt-3.5">
        <h2 className="truncate !text-[10px] font-medium leading-tight tracking-tight">
          Pro Version
        </h2>

        <IconButton
          label="Pro information"
          className="h-4 w-4 bg-white/80 !text-[10px] sm:h-6 sm:w-6"
        >
          ×
        </IconButton>
      </div>

      <div className="relative z-[1] min-h-0 flex-1" />

      <div className="relative z-10 flex shrink-0 flex-col px-1.5 pb-1.5 pt-1 sm:px-3.5 sm:pb-3">
        <div className="flex items-center justify-between gap-1">
          <h3 className="!text-[10px] font-medium leading-tight tracking-tight">
            Advantages
          </h3>

          <span className="shrink-0 rounded-full bg-[#E8F46B] px-1.5 py-0.5 !text-[4px] font-medium text-[#252519] sm:px-2 sm:py-1">
            ♛ 15 Days
          </span>
        </div>

        <p className="mt-1 !text-[4px] leading-relaxed text-[#656976]">
          Your earnings with the pro version
        </p>

        <div className="relative mt-1 h-[20px] shrink-0 overflow-hidden sm:mt-2 sm:h-[56px]">
          <svg
            viewBox="0 0 260 90"
            preserveAspectRatio="none"
            className="block h-full w-full"
            role="img"
            aria-label="Earnings trend"
          >
            <defs>
              <linearGradient
                id="proVersionChartFill"
                x1="0"
                y1="0"
                x2="0"
                y2="90"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#B7C2D5" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#B7C2D5" stopOpacity="0.03" />
              </linearGradient>
            </defs>

            {Array.from({ length: 26 }, (_, i) => (
              <path
                key={i}
                d={`M${i * 11 - 10} 90 L${i * 11 + 12} 18`}
                stroke="#AAB4C8"
                strokeWidth="4"
                opacity="0.3"
              />
            ))}

            <path
              d="M4 62 C34 55 46 46 69 51 S111 31 133 38 S175 52 201 28 S235 16 256 5 L256 90 L4 90 Z"
              fill="url(#proVersionChartFill)"
            />

            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: EASE }}
              d="M4 62 C34 55 46 46 69 51 S111 31 133 38 S175 52 201 28 S235 16 256 5"
              stroke="#8D96A9"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />

            <circle cx="4" cy="62" r="2" fill="#17171B" />
            <circle cx="256" cy="5" r="2" fill="#17171B" />
          </svg>
        </div>

        <div className="mt-1 flex justify-center sm:mt-2">
          <motion.button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center whitespace-nowrap rounded-full border border-white/80 bg-white px-2 py-1 !text-[10px] font-medium text-[#24252B] shadow-[0_3px_10px_rgba(40,50,70,0.08)] sm:px-3"
          >
            {expanded ? "Show less" : "Learn more"}
          </motion.button>
        </div>

        {expanded && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="overflow-hidden pt-2 !text-[5px] leading-relaxed text-[#555A68]"
          >
            Premium insights, additional analytics, and advanced account tools.
          </motion.p>
        )}

        <p className="mt-1.5 !text-[4px] leading-tight text-[#707586] sm:mt-2.5">
          Join the elite of the crypto world with{" "}
          <span className="font-semibold text-[#24252B]">Pro Version</span>
        </p>
      </div>
    </motion.section>
  );
}

function ActivityCard() {
  const [activeDay, setActiveDay] = useState("Fri");

  const days = [
    { day: "Mon", height: 30 },
    { day: "Tue", height: 45 },
    { day: "Wed", height: 46 },
    { day: "Thu", height: 70 },
    { day: "Fri", height: 100 },
    { day: "Sat", height: 65 },
    { day: "Sun", height: 76 },
  ];

  return (
    <motion.section
      variants={reveal}
      className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-[9px] bg-white p-1 sm:rounded-[18px] sm:p-2.5"
    >
      <div className="flex shrink-0 items-center justify-between gap-1">
        <h2 className="truncate !text-[10px] font-medium leading-tight tracking-tight text-[#24242A]">
          Activity
        </h2>

        <div className="flex shrink-0 gap-0.5 sm:gap-1">
          <IconButton
            label="Activity filters"
            className="h-4 w-4 !text-[5px] sm:h-5 sm:w-5"
          >
            ⇅
          </IconButton>

          <IconButton
            label="Expand activity"
            className="h-4 w-4 !text-[5px] sm:h-5 sm:w-5"
          >
            ↗
          </IconButton>
        </div>
      </div>

      <div className="mt-1 shrink-0 sm:mt-2">
        <p className="!text-[4px] leading-tight text-[#85858D]">
          Worked this week
        </p>

        <div className="mt-1 flex items-baseline gap-1">
          <span className="!text-[12px] leading-none tracking-[-0.055em] text-[#17171B]">
            186
          </span>
          <span className="!text-[5px] text-[#777780]">h</span>
        </div>
      </div>

      <div className="mt-1 flex min-h-0 flex-1 items-end gap-0.5 sm:mt-2 sm:gap-1">
        {days.map((item, index) => (
          <button
            key={item.day}
            type="button"
            aria-label={`${item.day} activity`}
            onClick={() => setActiveDay(item.day)}
            className="group relative flex h-full min-w-0 flex-1 flex-col items-center justify-end"
          >
            {activeDay === item.day && (
              <motion.span
                key={activeDay}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-[calc(100%-12px)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#EAF56E] px-1 py-0.5 !text-[4px] font-medium text-[#30301B]"
              >
                {item.day === "Fri" ? "16:30h" : `${item.height}%`}
              </motion.span>
            )}

            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${item.height}%` }}
              transition={{
                duration: 0.5,
                delay: index * 0.04,
                ease: EASE,
              }}
              className={`min-h-[3px] w-full rounded-full transition-colors ${
                activeDay === item.day
                  ? "bg-[#EAF56E]"
                  : "bg-[#F0F0F3] group-hover:bg-[#E4E5E9]"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="mt-1 grid shrink-0 grid-cols-7 gap-0.5 sm:mt-1.5">
        {days.map((item) => (
          <button
            key={item.day}
            type="button"
            onClick={() => setActiveDay(item.day)}
            className={`whitespace-nowrap text-center !text-[5px] transition-colors ${
              activeDay === item.day
                ? "font-medium text-[#29291F]"
                : "text-[#777780]"
            }`}
          >
            {item.day}
          </button>
        ))}
      </div>
    </motion.section>
  );
}

function VirtualCards() {
  const [selected, setSelected] = useState("Dollar");

  return (
    <motion.section
      variants={reveal}
      className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-[9px] bg-white p-1 sm:rounded-[18px] sm:p-2.5"
    >
      <div className="flex shrink-0 items-center justify-between gap-1">
        <h2 className="truncate !text-[10px] font-medium leading-tight tracking-tight text-[#24242A]">
          Virtual cards
        </h2>

        <IconButton
          label="Card options"
          className="h-4 w-4 !text-[5px] sm:h-5 sm:w-5"
        >
          ☷
        </IconButton>
      </div>

      <div className="mt-1 shrink-0 sm:mt-2">
        <p className="!text-[4px] leading-tight text-[#85858D]">
          Total Balance
        </p>

        <p className="mt-1 whitespace-nowrap !text-[10px] leading-none tracking-[-0.055em] text-[#24242A]">
          $6,010.29
        </p>

        <p className="mt-1 !text-[4px] text-[#84988A]">
          ↗ <span className="text-[#777780]">$205.00</span>
        </p>
      </div>

      <div className="mt-auto flex min-h-0 flex-col gap-1 pt-1 sm:gap-1.5 sm:pt-2">
        {[
          { name: "Dollar", value: 72 },
          { name: "Tether", value: 28 },
        ].map((item, index) => (
          <motion.button
            key={item.name}
            type="button"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            onClick={() => setSelected(item.name)}
            className="grid min-w-0 grid-cols-1 items-center gap-0.5 text-left sm:grid-cols-[25px_minmax(0,1fr)] sm:gap-1.5"
          >
            <span className="truncate !text-[4px] text-[#33333A]">
              {item.name}
            </span>

            <span className="relative h-3 min-w-0 overflow-hidden rounded-full bg-[#F3F3F5] sm:h-5">
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ duration: 0.5, ease: EASE }}
                className={`absolute inset-y-0 left-0 rounded-full ${
                  selected === item.name
                    ? "bg-[#E3E3E8]"
                    : "bg-[#EEEEF1]"
                }`}
              />

              <span className="relative z-10 flex h-full items-center px-1 !text-[4px] text-[#424249] sm:px-2">
                {item.value}%
              </span>
            </span>
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}

function VisaCard() {
  return (
    <motion.section
      variants={reveal}
      whileHover={{ y: -2 }}
      className="relative flex h-full min-h-0 min-w-0 flex-col justify-between overflow-hidden rounded-[9px] bg-[#CBE2D5] p-1 sm:rounded-[18px] sm:p-2.5"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="pointer-events-none absolute -right-5 -top-5 h-20 w-20 rounded-full bg-white/20"
      />

      <div className="relative z-10 text-right !text-[9px] font-black italic leading-none tracking-[-0.08em] text-[#101719]">
        VISA
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center">
        <span className="whitespace-nowrap !text-[10px] leading-none tracking-[-0.045em] text-[#17201E]">
          $390.00
        </span>
      </div>

      <div className="relative z-10 flex shrink-0 flex-col items-start justify-between gap-1 !text-[4px] text-[#34443D] sm:flex-row sm:items-center">
        <span>••• 6802</span>
        <span className="rounded-full bg-white/50 px-1 py-0.5 sm:px-2 sm:py-1.5">
          09 / 28
        </span>
      </div>

      <motion.button
        type="button"
        aria-label="Open card details"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="absolute -left-3 top-1/2 z-20 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full border border-white bg-white !text-[7px] shadow-sm"
      >
        ↗
      </motion.button>
    </motion.section>
  );
}

function SpendingChart() {
  const curve =
    "M8 112 C24 103 32 57 52 63 S83 103 103 78 S126 36 145 61 S171 90 190 72 S217 36 237 51 S264 72 282 40 S316 31 332 16";

  const area = `${curve} L332 140 L8 140 Z`;

  return (
    <svg
      viewBox="0 0 340 150"
      className="block h-full w-full overflow-visible"
      preserveAspectRatio="none"
      fill="none"
      role="img"
      aria-label="Weekly spending trend"
    >
      <defs>
        <linearGradient
          id="spendingFill"
          x1="0"
          y1="0"
          x2="0"
          y2="150"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#E7E7EB" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#E7E7EB" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      <motion.path
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        d={area}
        fill="url(#spendingFill)"
      />

      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        d={curve}
        stroke="#96969D"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />

      {[
        [8, 112],
        [52, 63],
        [103, 78],
        [145, 61],
        [190, 72],
        [237, 51],
        [282, 40],
        [332, 16],
      ].map(([x, y], index) => (
        <motion.circle
          key={index}
          cx={x}
          cy={y}
          r="2.5"
          fill="#17171B"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 + index * 0.04 }}
        />
      ))}
    </svg>
  );
}

function TotalSpent() {
  const [period, setPeriod] = useState("Week");
  const isWeek = period === "Week";

  return (
    <motion.section
      variants={reveal}
      className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-[9px] bg-white p-1 sm:rounded-[18px] sm:p-2.5"
    >
      <div className="flex shrink-0 items-center justify-between gap-1">
        <h2 className="!text-[10px] font-medium leading-tight tracking-tight text-[#24242A]">
          Total Spent
        </h2>

        <div className="flex shrink-0 gap-0.5 sm:gap-1">
          <IconButton
            label="Spending filters"
            className="h-4 w-4 !text-[5px] sm:h-5 sm:w-5"
          >
            ⇅
          </IconButton>

          <IconButton
            label="Expand spending"
            className="h-4 w-4 !text-[5px] sm:h-5 sm:w-5"
          >
            ↗
          </IconButton>
        </div>
      </div>

      <div className="mt-1 grid min-h-0 flex-1 grid-cols-[minmax(0,0.7fr)_minmax(0,1.5fr)] gap-1 sm:mt-1.5 sm:gap-1.5">
        <div className="flex min-h-0 min-w-0 flex-col">
          <p className="whitespace-nowrap !text-[4px] leading-tight text-[#85858D]">
            Spent this {isWeek ? "week" : "month"}
          </p>

          <motion.p
            key={period}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 whitespace-nowrap !text-[10px] leading-none tracking-[-0.055em] text-[#17171B]"
          >
            {isWeek ? "$820.65" : "$3,280.40"}
          </motion.p>

          <p className="mt-1 whitespace-nowrap !text-[4px] text-[#85858D]">
            <span className="text-[#83A6D5]">▰</span>{" "}
            {isWeek ? "$605.00" : "$2,420.00"}
          </p>

          <div className="mt-auto flex flex-col gap-1 pt-1 sm:pt-1.5">
            {[
              { value: "10", label: "Wallets" },
              { value: "26", label: "Assets" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-1 rounded-md bg-[#F5F5F7] px-1 py-0.5 sm:gap-1.5 sm:px-1.5 sm:py-1"
              >
                <span className="!text-[5px] font-medium text-[#28282E]">
                  {item.value}
                </span>

                <span className="truncate !text-[4px] text-[#777780]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex min-h-0 min-w-0 flex-col">
          <div className="relative min-h-0 flex-1">
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute left-[38%] top-0 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#EAF56E] px-1 py-0.5 !text-[4px] font-medium text-[#30301B] sm:px-1.5 sm:py-1"
            >
              {isWeek ? "$680.00" : "$2,720.00"}
            </motion.span>

            <div className="absolute inset-x-0 bottom-0 top-3">
              <SpendingChart />
            </div>
          </div>

          <div className="mt-1 flex shrink-0 justify-end">
            <div className="flex items-center rounded-full bg-[#F3F3F5] p-0.5">
              {["Week", "Month"].map((value) => (
                <motion.button
                  key={value}
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setPeriod(value)}
                  className={`whitespace-nowrap rounded-full px-1 py-0.5 !text-[10px] transition-colors sm:px-2 sm:py-1 ${
                    period === value
                      ? "bg-[#EAF56E] text-[#30301B]"
                      : "text-[#777780] hover:bg-white"
                  }`}
                >
                  {value}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mt-1 grid shrink-0 grid-cols-7">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (day) => (
                <span
                  key={day}
                  className="whitespace-nowrap text-center !text-[4px] text-[#777780]"
                >
                  {day}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ContractType() {
  const [active, setActive] = useState("86%");

  return (
    <motion.section
      variants={reveal}
      className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-[9px] bg-white p-1 sm:rounded-[18px] sm:p-2.5"
    >
      <div className="flex shrink-0 items-center justify-between gap-1">
        <h2 className="truncate !text-[5px] font-medium leading-tight tracking-tight text-[#24242A]">
          Contract Type
        </h2>

        <IconButton
          label="Contract details"
          className="h-4 w-4 !text-[5px] sm:h-5 sm:w-5"
        >
          ↗
        </IconButton>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        <motion.button
          type="button"
          onClick={() => setActive(active === "86%" ? "10%" : "86%")}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="absolute left-0 top-[18%] z-30 flex items-center gap-0.5 whitespace-nowrap rounded-full bg-[#F5F5F7] px-1 py-0.5 !text-[10px] text-[#35353B] transition-colors hover:bg-[#EBEBEF] sm:top-[28%] sm:gap-1 sm:px-2 sm:py-1"
        >
          Learn more <span>›</span>
        </motion.button>

        <div className="relative h-[55px] w-[65px] max-w-full sm:h-[84px] sm:w-[112px]">
          <motion.button
            type="button"
            aria-label="86 percent contract type"
            onClick={() => setActive("86%")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className={`absolute left-[15px] top-[13px] z-10 grid h-[34px] w-[34px] place-items-center rounded-full border border-white/80 bg-[#91D9D5] !text-[8px] text-[#243D3C] sm:left-[28px] sm:top-[18px] sm:h-[58px] sm:w-[58px] ${
              active === "86%" ? "ring-1 ring-white/40" : ""
            }`}
          >
            86%
          </motion.button>

          <motion.button
            type="button"
            aria-label="10 percent contract type"
            onClick={() => setActive("10%")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`absolute right-0 top-0 z-20 grid h-[23px] w-[23px] place-items-center rounded-full border border-white/80 bg-[#E7F2F0] !text-[7px] text-[#62817F] sm:h-[38px] sm:w-[38px] ${
              active === "10%" ? "ring-1 ring-[#C6E6E1]" : ""
            }`}
          >
            10%
          </motion.button>

          <motion.button
            type="button"
            aria-label="4 percent contract type"
            onClick={() => setActive("4%")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`absolute bottom-0 left-[8px] z-20 grid h-[20px] w-[20px] place-items-center rounded-full border border-white/80 bg-[#F0F5F3] !text-[10px] text-[#6A8784] sm:left-[14px] sm:h-[31px] sm:w-[31px] ${
              active === "4%" ? "ring-1 ring-[#C6E6E1]" : ""
            }`}
          >
            4%
          </motion.button>
        </div>
      </div>

      <div className="grid shrink-0 grid-cols-3 gap-0.5 border-t border-black/[0.045] pt-1 sm:gap-1 sm:pt-1.5">
        {[
          { value: "140", label: "Milestone" },
          { value: "48", label: "Bonuses" },
          { value: "16", label: "Hourly" },
        ].map((item) => (
          <div key={item.label} className="min-w-0">
            <p className="!text-[10px] font-medium leading-none tracking-tight text-[#202027]">
              {item.value}
            </p>

            <p className="mt-1 truncate !text-[4px] leading-tight text-[#777780]">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export default function CrmVisual() {
  const reduceMotion = useReducedMotion();

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateZRaw = useMotionValue(0);

  const rotateX = useSpring(rotateXRaw, {
    stiffness: 120,
    damping: 20,
    mass: 0.8,
  });

  const rotateY = useSpring(rotateYRaw, {
    stiffness: 100,
    damping: 20,
    mass: 0.8,
  });

  const rotateZ = useSpring(rotateZRaw, {
    stiffness: 100,
    damping: 22,
    mass: 0.8,
  });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();

    if (!bounds.width || !bounds.height) return;

    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    rotateXRaw.set((0.5 - y) * 14);
    rotateYRaw.set((x - 0.5) * 18);
    rotateZRaw.set((x - 0.5) * 3);
  };

  const resetTilt = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
    rotateZRaw.set(0);
  };

  return (
    <div
      className="w-full overflow-visible bg-transparent p-1.5 sm:p-4"
      style={{ perspective: 1600 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <motion.div
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 24, scale: 0.99, rotateX: 2 }
        }
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{
          once: true,
          amount: 0.15,
          margin: "0px 0px -6% 0px",
        }}
        transition={{ duration: 0.75, ease: EASE }}
        style={{
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          rotateZ: reduceMotion ? 0 : rotateZ,
          willChange: reduceMotion ? "auto" : "transform",
        }}
        className="relative mx-auto aspect-square w-full max-w-[1320px] overflow-hidden rounded-[16px] border-[3px] border-white bg-[#F7F7FB] p-1.5 shadow-[0_18px_55px_rgba(30,30,45,0.06)] sm:aspect-[4/3] sm:rounded-[32px] sm:border-[10px] sm:p-4 lg:aspect-[3/2] lg:p-5 xl:p-6"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
            margin: "0px 0px -6% 0px",
          }}
          className="flex h-full min-h-0 flex-col gap-1.5 sm:gap-3"
          style={{ transformStyle: "preserve-3d" }}
        >
          <TopNavigation />

          <motion.div
            variants={reveal}
            className="grid min-h-0 flex-1 grid-cols-[24px_minmax(0,1fr)] gap-1.5 sm:grid-cols-[36px_minmax(0,1fr)] sm:gap-3"
          >
            <Sidebar />

            <motion.main
              variants={stagger}
              className="flex min-h-0 min-w-0 flex-col gap-1.5 sm:gap-3"
            >
              <PageHeading />

              <motion.div
                variants={stagger}
                className="grid min-h-0 flex-1 grid-cols-[1.05fr_1fr_1fr_0.78fr] grid-rows-2 gap-1 sm:gap-2 lg:grid-cols-[1.08fr_1fr_1.05fr_0.72fr] lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-2.5"
              >
                <motion.div
                  variants={reveal}
                  className="col-span-1 row-span-2 min-h-0 min-w-0"
                >
                  <ProVersionCard />
                </motion.div>

                <motion.div
                  variants={reveal}
                  className="col-start-2 row-start-1 min-h-0 min-w-0"
                >
                  <ActivityCard />
                </motion.div>

                <motion.div
                  variants={reveal}
                  className="col-start-3 row-start-1 min-h-0 min-w-0"
                >
                  <VirtualCards />
                </motion.div>

                <motion.div
                  variants={reveal}
                  className="col-start-4 row-start-1 min-h-0 min-w-0"
                >
                  <VisaCard />
                </motion.div>

                <motion.div
                  variants={reveal}
                  className="col-span-2 col-start-2 row-start-2 min-h-0 min-w-0"
                >
                  <TotalSpent />
                </motion.div>

                <motion.div
                  variants={reveal}
                  className="col-start-4 row-start-2 min-h-0 min-w-0"
                >
                  <ContractType />
                </motion.div>
              </motion.div>
            </motion.main>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
