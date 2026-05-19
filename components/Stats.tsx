"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

type StatsT = {
  eyebrow: string;
  heading: string;
  items: { value: string; label: string }[];
};

export function Stats({ t }: { t: StatsT }) {
  return (
    <section
      className="relative overflow-hidden py-24 text-ivory md:py-28"
      style={{
        // Faded brick / antique-red field — desaturated so the section
        // reads as a quiet accent moment, not a loud statement.
        background:
          "linear-gradient(180deg, #a85a52 0%, #82403b 55%, #5d2c29 100%)",
      }}
    >
      {/* Very quiet directional sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 65%)",
        }}
      />
      {/* Subtle dot pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="eyebrow text-ivory/85"
          >
            <span className="mr-3 inline-block h-px w-8 align-middle bg-ivory/80" />
            {t.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="mt-5 font-display text-[32px] leading-[1.05] tracking-tight text-ivory md:text-[44px]"
          >
            {t.heading}
          </motion.h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-16 md:grid-cols-3 lg:grid-cols-6">
          {t.items.map((item, i) => (
            <Stat key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ item, index }: { item: { value: string; label: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const numeric = parseInt(item.value.replace(/[^0-9]/g, ""), 10);
  const isNumeric = !isNaN(numeric) && item.value.trim() === String(numeric);

  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView || !isNumeric) return;
    const controls = animate(count, numeric, {
      duration: 1.4,
      delay: index * 0.05,
      ease: [0.22, 0.8, 0.32, 1],
    });
    return () => controls.stop();
  }, [inView, isNumeric, numeric, count, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 0.8, 0.32, 1] }}
      className="relative"
    >
      <div className="font-display text-[44px] leading-none tracking-tight text-ivory md:text-[60px]">
        {isNumeric ? <motion.span>{rounded}</motion.span> : item.value}
      </div>
      <div className="mt-3 text-[11px] uppercase tracking-[0.22em] text-ivory/80">
        {item.label}
      </div>
      <div aria-hidden="true" className="mt-4 h-px w-10 bg-ivory/45" />
    </motion.div>
  );
}
