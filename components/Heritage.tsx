"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type HeritageT = {
  eyebrow: string;
  heading: string;
  body: string;
  pull: string;
  milestones: { year: string; label: string }[];
};

export function Heritage({ t }: { t: HeritageT }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="heritage" className="relative bg-paper-warm py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-20">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="eyebrow text-cobalt/70"
            >
              <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
              {t.eyebrow}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="mt-5 font-display text-[34px] leading-[1.05] tracking-tight text-cobalt-ink md:text-[44px]"
            >
              {t.heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-cobalt-ink/75 md:text-[17px]"
            >
              {t.body}
            </motion.p>
            <motion.blockquote
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-10 max-w-lg border-l-2 border-amber pl-5 font-serif text-[20px] italic leading-snug text-cobalt-ink/85 md:text-[24px]"
            >
              {t.pull}
            </motion.blockquote>
          </div>

          <div ref={ref} className="relative">
            {/* Track */}
            <div className="absolute left-3 top-2 bottom-2 w-px bg-cobalt-ink/10" aria-hidden="true" />
            {/* Filled progress line */}
            <motion.div
              aria-hidden="true"
              style={{ scaleY: lineScale, transformOrigin: "top" }}
              className="absolute left-3 top-2 bottom-2 w-px bg-amber"
            />
            <ul className="space-y-6 md:space-y-8">
              {t.milestones.map((m, i) => (
                <motion.li
                  key={`${m.year}-${i}`}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.07,
                    ease: [0.22, 0.8, 0.32, 1],
                  }}
                  className="relative pl-12"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-amber bg-paper-warm"
                  />
                  <div className="font-display text-2xl tracking-tight text-cobalt md:text-3xl">
                    {m.year}
                  </div>
                  <div className="mt-1 text-[15px] leading-relaxed text-cobalt-ink/75">
                    {m.label}
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
