"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

type Item = { title: string; stat?: string; body: string; bullets: string[] };
type ServicesT = {
  eyebrow: string;
  heading: string;
  sub: string;
  items: Item[];
};

const icons = [CustomsIcon, WarehouseIcon, TruckIcon, TrackIcon];

const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

const reverentEase = [0.22, 0.8, 0.32, 1] as const;

export function Services({ t }: { t: ServicesT }) {
  return (
    <section
      id="services"
      className="relative isolate overflow-hidden bg-paper py-20 md:py-24"
    >
      {/* Ambient drifting amber blob — gives the section continuous
          background motion so it never feels static. */}
      <motion.div
        aria-hidden="true"
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/3 top-1/4 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(212, 146, 46, 0.16) 0%, rgba(212, 146, 46, 0) 70%)",
        }}
      />
      <motion.div
        aria-hidden="true"
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -30, 0],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-0 bottom-0 -z-10 h-[500px] w-[500px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(31, 58, 138, 0.10) 0%, rgba(31, 58, 138, 0) 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Centered intro block — eyebrow, heading, supporting copy
            all stack on a single max-w-3xl axis. */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={reveal}
          transition={{ duration: 0.7, ease: reverentEase }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="eyebrow text-cobalt/70">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            {t.eyebrow}
            <span className="ml-3 inline-block h-px w-8 align-middle bg-amber" />
          </span>
          <h2 className="mt-5 font-display text-[32px] leading-[1.05] tracking-tight text-cobalt-ink md:text-[42px]">
            {t.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-cobalt-ink/75 md:text-[16px]">
            {t.sub}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-5">
          {t.items.map((item, i) => (
            <Card
              key={item.title}
              item={item}
              index={i}
              Icon={icons[i % icons.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({
  item,
  index,
  Icon,
}: {
  item: Item;
  index: number;
  Icon: (props: { className?: string }) => React.JSX.Element;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.85,
        delay: index * 0.12,
        ease: reverentEase,
      }}
      whileHover={{ y: -3 }}
      className="group relative isolate overflow-hidden rounded-xl border border-line-soft bg-ivory p-6 transition-colors duration-300 hover:border-cobalt/30 md:p-7"
    >
      {/* Watermark numeral — smaller and slimmer for a more elegant card */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-1 -top-2 select-none font-serif text-[130px] leading-none italic text-cobalt-ink/[0.04] md:-right-2 md:-top-3 md:text-[160px]"
      >
        0{index + 1}
      </span>

      {/* Diagonal amber shine sweep on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-amber/15 to-transparent opacity-0 group-hover:opacity-100 group-hover:card-shine"
      />

      <div className="relative flex items-start justify-between gap-4">
        <motion.div
          whileHover={{ scale: 1.06, rotate: -2 }}
          transition={{ duration: 0.4, ease: reverentEase }}
          className="relative"
        >
          <span
            aria-hidden="true"
            className="absolute -inset-2.5 -z-10 rounded-full bg-amber/0 transition-colors duration-500 group-hover:bg-amber/15"
          />
          <Icon className="h-8 w-8 text-cobalt transition-colors group-hover:text-amber-deep md:h-9 md:w-9" />
        </motion.div>
        {item.stat && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber/30 bg-amber/10 px-2 py-0.5 text-[9.5px] font-medium uppercase tracking-[0.16em] text-amber-deep">
            <span className="inline-block h-1 w-1 rounded-full bg-amber" />
            {item.stat}
          </span>
        )}
      </div>

      <h3 className="relative mt-5 font-display text-[20px] leading-tight tracking-tight text-cobalt-ink md:text-[22px]">
        {item.title}
      </h3>
      <p className="relative mt-2 text-[14px] leading-relaxed text-cobalt-ink/70">
        {item.body}
      </p>

      {/* Hairline rule that extends on hover */}
      <span
        aria-hidden="true"
        className="relative mt-4 block h-px w-10 origin-left scale-x-100 bg-amber transition-transform duration-500 group-hover:scale-x-[3]"
      />

      <ul className="relative mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-cobalt-ink/65">
        {item.bullets.map((b) => (
          <li key={b} className="flex items-center gap-1.5">
            <span className="inline-block h-1 w-1 rounded-full bg-amber" />
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function CustomsIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="6" y="5" width="20" height="22" rx="2" />
      <path d="M10 11h12M10 15h12M10 19h8" strokeLinecap="round" />
      <circle cx="22" cy="22" r="3.5" fill="currentColor" fillOpacity="0.1" />
      <path d="m20.5 22 1.2 1.2L24 21" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function WarehouseIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 13 16 6l12 7v14H4z" strokeLinejoin="round" />
      <rect x="10" y="17" width="5" height="5" />
      <rect x="17" y="17" width="5" height="5" />
      <path d="M4 27h24" strokeLinecap="round" />
    </svg>
  );
}
function TruckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="9" width="15" height="12" rx="1" />
      <path d="M18 13h6l4 4v4h-10z" strokeLinejoin="round" />
      <circle cx="9" cy="23" r="2.5" fill="currentColor" />
      <circle cx="23" cy="23" r="2.5" fill="currentColor" />
    </svg>
  );
}
function TrackIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="16" cy="16" r="11" />
      <circle cx="16" cy="16" r="6" />
      <circle cx="16" cy="16" r="2" fill="currentColor" />
      <path d="M16 2v4M16 26v4M2 16h4M26 16h4" strokeLinecap="round" />
    </svg>
  );
}
