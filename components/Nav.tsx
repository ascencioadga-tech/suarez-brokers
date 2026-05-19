"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import type { Locale } from "@/lib/i18n";

type NavT = {
  services: string;
  locations: string;
  heritage: string;
  commodities: string;
  contact: string;
  quote: string;
  login: string;
};

export function Nav({ locale, t }: { locale: Locale; t: NavT }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const otherLocale: Locale = locale === "en" ? "es" : "en";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#services", label: t.services },
    { href: "#locations", label: t.locations },
    { href: "#heritage", label: t.heritage },
    { href: "#commodities", label: t.commodities },
    { href: "#contact", label: t.contact },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 0.8, 0.32, 1] }}
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled
          ? "bg-paper/85 backdrop-blur-md border-b border-line-soft"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 md:px-10">
        <Link
          href={`/${locale}`}
          className="text-cobalt-ink transition-colors hover:text-cobalt"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm font-medium text-cobalt-ink/75 transition-colors hover:text-cobalt"
            >
              <span>{l.label}</span>
              <span className="absolute inset-x-0 -bottom-1.5 h-px origin-left scale-x-0 bg-amber transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={`/${otherLocale}`}
            className="hidden items-center gap-1.5 text-[11px] font-medium tracking-[0.18em] uppercase text-cobalt-ink/60 transition-colors hover:text-cobalt md:inline-flex"
            aria-label={`Switch language to ${otherLocale.toUpperCase()}`}
          >
            <span className={locale === "en" ? "text-cobalt" : ""}>EN</span>
            <span className="text-cobalt-ink/30">/</span>
            <span className={locale === "es" ? "text-cobalt" : ""}>ES</span>
          </Link>

          <Link
            href="/admin"
            className="hidden items-center gap-1.5 rounded-full border border-cobalt/25 px-4 py-2 text-[12px] font-medium tracking-wide text-cobalt-ink/75 transition hover:border-cobalt hover:bg-cobalt/5 hover:text-cobalt md:inline-flex"
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75" />
              <rect x="4.5" y="10.5" width="15" height="11" rx="2" />
            </svg>
            {t.login}
          </Link>

          <Link
            href="#contact"
            className="group/cta relative hidden items-center justify-center overflow-hidden rounded-full bg-cobalt px-5 py-2.5 text-[13px] font-medium text-ivory transition lg:inline-flex"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-left scale-x-0 bg-amber transition-transform duration-500 group-hover/cta:scale-x-100"
            />
            <span className="relative z-10 transition-colors group-hover/cta:text-cobalt-ink">
              {t.quote}
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-cobalt-ink lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 right-0 h-px bg-current transition-transform ${
                  menuOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 right-0 top-1.5 h-px bg-current transition-opacity ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 right-0 h-px bg-current transition-transform ${
                  menuOpen ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 0.8, 0.32, 1] }}
            className="overflow-hidden border-t border-line-soft bg-paper/95 backdrop-blur-md lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-2 py-2.5 text-base font-medium text-cobalt-ink/80 transition-colors hover:bg-cobalt/5 hover:text-cobalt"
                >
                  {l.label}
                </a>
              ))}
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className="mt-1 flex items-center gap-2 rounded-md px-2 py-2.5 text-base font-medium text-cobalt-ink/70 transition-colors hover:bg-cobalt/5 hover:text-cobalt"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75" />
                  <rect x="4.5" y="10.5" width="15" height="11" rx="2" />
                </svg>
                {t.login}
              </Link>
              <div className="mt-2 flex items-center justify-between border-t border-line-soft pt-4">
                <Link
                  href={`/${otherLocale}`}
                  className="text-[11px] font-medium tracking-[0.18em] uppercase text-cobalt-ink/60"
                >
                  <span className={locale === "en" ? "text-cobalt" : ""}>EN</span>
                  <span className="mx-2 text-cobalt-ink/30">/</span>
                  <span className={locale === "es" ? "text-cobalt" : ""}>ES</span>
                </Link>
                <Link
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center rounded-full bg-cobalt px-5 py-2.5 text-[13px] font-medium text-ivory"
                >
                  {t.quote}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
