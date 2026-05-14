"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { BorderMap } from "./BorderMap";
import type { Locale } from "@/lib/i18n";

const reverentEase = [0.22, 0.8, 0.32, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

type HeroT = {
  eyebrow: string;
  headline: string;
  headlineItalic: string;
  intro: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  rotating: string[];
  mapCaption: string;
};

export function Hero({ locale, t }: { locale: Locale; t: HeroT }) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, 80]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-paper pt-24 md:pt-32"
    >
      {/* Cinematic flyover background — autoplays muted, slow Ken-Burns drift */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover hero-slow-zoom"
      >
        <source src="/video/flyover.mp4" type="video/mp4" />
      </video>

      {/* Frosted-paper wash — lets the warehouse flyover whisper behind
          while keeping the editorial cream-on-cobalt typography intact. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(247,245,239,0.88) 0%, rgba(247,245,239,0.62) 40%, rgba(247,245,239,0.92) 100%)",
        }}
      />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-10 px-6 pb-20 pt-10 md:px-10 md:pb-24 lg:grid-cols-[0.9fr_1.4fr] lg:gap-14"
      >
        {/* Left rail — copy */}
        <div className="flex max-w-2xl flex-col">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.15, ease: reverentEase }}
            className="eyebrow text-cobalt/80"
          >
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            {t.eyebrow}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.95, delay: 0.3, ease: reverentEase }}
            className="mt-6 font-display text-[44px] leading-[1.02] tracking-tight text-cobalt-ink md:text-[64px] lg:text-[72px]"
          >
            {t.headline}{" "}
            <span className="font-serif italic text-cobalt">{t.headlineItalic}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.8, delay: 0.6, ease: reverentEase }}
            className="mt-7 max-w-xl text-base leading-relaxed text-cobalt-ink/75 md:text-[17px]"
          >
            {t.intro}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.85, ease: reverentEase }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href={t.primaryCta.href}
              className="group/cta relative inline-flex items-center justify-center overflow-hidden rounded-full bg-cobalt px-7 py-3.5 text-sm font-medium tracking-wide text-ivory transition"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 bg-amber transition-transform duration-500 group-hover/cta:scale-x-100"
              />
              <span className="relative z-10 transition-colors group-hover/cta:text-cobalt-ink">
                {t.primaryCta.label}
              </span>
              <span className="relative z-10 ml-2 transition-transform group-hover/cta:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href={t.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-cobalt/40 px-7 py-3.5 text-sm font-medium text-cobalt transition hover:border-cobalt hover:bg-cobalt/5"
            >
              {t.secondaryCta.label}
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 1.1, ease: reverentEase }}
            className="mt-10 flex h-7 items-center gap-3"
          >
            <span aria-hidden="true" className="block h-px w-8 bg-amber/70" />
            <RotatingVoice lines={t.rotating} />
          </motion.div>
        </div>

        {/* Right rail — map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: reverentEase }}
          className="relative flex flex-col self-center"
        >
          <div className="relative aspect-[1200/750] w-full overflow-hidden rounded-2xl border border-line-soft bg-ivory shadow-[0_30px_80px_-30px_rgba(20,38,84,0.25)]">
            <BorderMap
              locale={locale}
              legend={{
                hq: locale === "es" ? "Sede" : "Headquarters",
                primary: locale === "es" ? "Oficina principal" : "Primary office",
                satellite: locale === "es" ? "Oficina satélite" : "Satellite office",
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        style={{ opacity: contentOpacity }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
        aria-hidden="true"
      >
        <span className="eyebrow text-[10px] text-cobalt/55">Scroll</span>
        <span className="mx-auto mt-2 block h-10 w-px origin-top animate-scroll-cue bg-cobalt/40" />
      </motion.div>
    </motion.section>
  );
}

function RotatingVoice({ lines }: { lines: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % lines.length), 4800);
    return () => window.clearInterval(id);
  }, [lines.length]);
  return (
    <span
      aria-live="polite"
      className="font-serif relative h-7 w-full overflow-hidden text-base italic text-cobalt-ink/70 md:text-lg"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.7, ease: reverentEase }}
          className="absolute left-0 top-0 inline-block"
        >
          {lines[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
