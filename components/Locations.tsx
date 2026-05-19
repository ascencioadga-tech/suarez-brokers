"use client";

import { motion } from "framer-motion";
import { ports } from "@/lib/locations";
import type { Locale } from "@/lib/i18n";

type LocationsT = {
  eyebrow: string;
  heading: string;
  sub: string;
  legend: { hq: string; primary: string; satellite: string };
  liveLabel: string;
  ctaLead: string;
  ctaLabel: string;
};

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const reverentEase = [0.22, 0.8, 0.32, 1] as const;

// Render order: Nogales (HQ) first, then west → east. Source data in
// lib/locations.ts is geographic order, so we sort here for display.
const RENDER_ORDER = [
  "nogales",
  "san-diego",
  "calexico",
  "santa-teresa",
  "laredo",
  "pharr",
];
const sortedPorts = [...ports].sort(
  (a, b) => RENDER_ORDER.indexOf(a.id) - RENDER_ORDER.indexOf(b.id),
);

export function Locations({ locale, t }: { locale: Locale; t: LocationsT }) {
  return (
    <section
      id="locations"
      className="relative isolate overflow-hidden bg-cobalt-ink py-20 text-ivory md:py-24"
    >
      {/* Soft amber spotlight at the top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[340px] max-w-5xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(212, 146, 46, 0.16) 0%, rgba(212, 146, 46, 0) 100%)",
        }}
      />

      {/* Thin amber sweep — a horizontal line that drifts continuously
          across the bottom edge to give the section quiet motion. */}
      <motion.div
        aria-hidden="true"
        initial={{ x: "-30%" }}
        animate={{ x: "130%" }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute bottom-0 left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-amber/70 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Centered intro — tighter than before */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={reveal}
            transition={{ duration: 0.7 }}
            className="eyebrow text-amber-light/85"
          >
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            {t.eyebrow}
            <span className="ml-3 inline-block h-px w-8 align-middle bg-amber" />
          </motion.span>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={reveal}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="mt-5 font-display text-[28px] leading-[1.05] tracking-tight md:text-[40px]"
          >
            {t.heading}
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={reveal}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-5 max-w-2xl text-[14px] leading-relaxed text-ivory/75 md:text-[16px]"
          >
            {t.sub}
          </motion.p>
        </div>

        {/* Cards — slimmer, Nogales first */}
        <div className="mt-12 grid gap-3 md:mt-14 md:grid-cols-3 md:gap-4">
          {sortedPorts.map((p, i) => {
            const isHq = p.role === "headquarters";
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.06,
                  ease: reverentEase,
                }}
                whileHover={{ y: -2 }}
                className={`group relative overflow-hidden rounded-xl border p-5 transition-colors md:p-6 ${
                  isHq
                    ? "border-amber/55 bg-amber/[0.08] hover:border-amber"
                    : "border-ivory/12 bg-ivory/[0.03] hover:border-ivory/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[9.5px] font-medium uppercase tracking-[0.18em] ${
                      isHq
                        ? "bg-amber text-cobalt-ink"
                        : p.role === "primary"
                          ? "border border-ivory/25 text-ivory/80"
                          : "border border-ivory/15 text-ivory/65"
                    }`}
                  >
                    <span
                      className={`inline-block h-1 w-1 rounded-full ${
                        isHq
                          ? "bg-cobalt-ink"
                          : p.role === "primary"
                            ? "bg-ivory"
                            : "bg-ivory/60"
                      }`}
                    />
                    {isHq
                      ? t.legend.hq
                      : p.role === "primary"
                        ? t.legend.primary
                        : t.legend.satellite}
                  </span>
                  <div className="flex items-center gap-2">
                    {isHq && (
                      <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.2em] text-amber-light">
                        <span className="relative inline-flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
                        </span>
                        {t.liveLabel}
                      </span>
                    )}
                    <span className="font-serif italic text-[11px] text-ivory/35">
                      0{i + 1}
                    </span>
                  </div>
                </div>
                <h3 className="mt-4 font-display text-[20px] leading-tight tracking-tight md:text-[22px]">
                  {p.city}
                </h3>
                <p className="mt-0.5 text-[11px] uppercase tracking-[0.22em] text-ivory/55">
                  {p.state}
                  {isHq && (
                    <span className="ml-2 normal-case tracking-normal text-amber-light/75">
                      · est. 1979
                    </span>
                  )}
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-ivory/70">
                  {p.blurb[locale]}
                </p>
                <span
                  aria-hidden="true"
                  className="absolute -right-6 -bottom-6 h-20 w-20 rounded-full bg-amber/0 blur-2xl transition-colors duration-500 group-hover:bg-amber/15"
                />
              </motion.div>
            );
          })}
        </div>

        {/* CTA — supporting line + arrow-animated action button */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: reverentEase }}
          className="mt-12 flex flex-col items-center gap-5 text-center md:mt-14"
        >
          <p className="font-serif text-[15px] italic text-ivory/65 md:text-[17px]">
            {t.ctaLead}
          </p>
          <a
            href="#contact"
            className="group/cta relative inline-flex items-center justify-center overflow-hidden rounded-full bg-ivory px-7 py-3.5 text-sm font-medium tracking-wide text-cobalt-ink transition md:px-9 md:py-4 md:text-[15px]"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-left scale-x-0 bg-amber transition-transform duration-500 group-hover/cta:scale-x-100"
            />
            <span className="relative z-10">{t.ctaLabel}</span>
            <motion.span
              aria-hidden="true"
              className="relative z-10 ml-2.5 inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
