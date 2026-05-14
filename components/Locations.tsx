"use client";

import { motion } from "framer-motion";
import { ports } from "@/lib/locations";
import type { Locale } from "@/lib/i18n";

type LocationsT = {
  eyebrow: string;
  heading: string;
  sub: string;
  legend: { hq: string; primary: string; satellite: string };
};

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export function Locations({ locale, t }: { locale: Locale; t: LocationsT }) {
  return (
    <section id="locations" className="relative bg-cobalt-ink py-24 text-ivory md:py-32">
      {/* Faint amber spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[420px] max-w-5xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(212, 146, 46, 0.18) 0%, rgba(212, 146, 46, 0) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-3xl">
          <motion.span
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={reveal}
            transition={{ duration: 0.7 }}
            className="eyebrow text-amber-light/80"
          >
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            {t.eyebrow}
          </motion.span>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={reveal}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="mt-5 font-display text-[34px] leading-[1.05] tracking-tight md:text-[48px]"
          >
            {t.heading}
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={reveal}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/75 md:text-[17px]"
          >
            {t.sub}
          </motion.p>
        </div>

        <div className="mt-14 grid gap-3 md:mt-20 md:grid-cols-3 md:gap-4">
          {ports.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.65,
                delay: i * 0.07,
                ease: [0.22, 0.8, 0.32, 1],
              }}
              className={`group relative overflow-hidden rounded-2xl border p-6 transition-colors md:p-7 ${
                p.role === "headquarters"
                  ? "border-amber/50 bg-amber/[0.06] hover:border-amber"
                  : "border-ivory/12 bg-ivory/[0.03] hover:border-ivory/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] ${
                    p.role === "headquarters"
                      ? "bg-amber text-cobalt-ink"
                      : p.role === "primary"
                        ? "border border-ivory/25 text-ivory/80"
                        : "border border-ivory/15 text-ivory/65"
                  }`}
                >
                  <span className={`inline-block h-1.5 w-1.5 rounded-full ${
                    p.role === "headquarters"
                      ? "bg-cobalt-ink"
                      : p.role === "primary"
                        ? "bg-ivory"
                        : "bg-ivory/60"
                  }`} />
                  {p.role === "headquarters" ? t.legend.hq : p.role === "primary" ? t.legend.primary : t.legend.satellite}
                </span>
                <span className="font-serif italic text-[12px] text-ivory/35">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-[22px] leading-tight tracking-tight md:text-[26px]">
                {p.city}
              </h3>
              <p className="mt-1 text-[13px] uppercase tracking-[0.2em] text-ivory/55">
                {p.state}
              </p>
              <p className="mt-5 text-[14px] leading-relaxed text-ivory/70">
                {p.blurb[locale]}
              </p>
              <span
                aria-hidden="true"
                className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-amber/0 blur-2xl transition-colors duration-500 group-hover:bg-amber/15"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
