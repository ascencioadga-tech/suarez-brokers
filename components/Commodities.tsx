"use client";

import { motion } from "framer-motion";

type Side = { title: string; body: string; tags: string[] };
type CommoditiesT = {
  eyebrow: string;
  heading: string;
  sub: string;
  dry: Side;
  produce: Side;
  clientsLead: string;
};

// Client roster for the trusted-by belt. PLACEHOLDER companies — drop in
// the real client names + real logo files later. Each entry can take a
// `logo` path (e.g. "/logos/clientname.svg") in which case the monogram
// fallback is skipped and the <img> is rendered instead.
type Client = {
  name: string;
  initials: string;
  accent: string;
  shape?: "square" | "circle" | "diamond";
  /** Optional path to a real logo file under /public — wires directly. */
  logo?: string;
};

const clients: Client[] = [
  { name: "Sierra Foods",          initials: "SF", accent: "#fa0109", shape: "square" },
  { name: "Pacific Border Co.",    initials: "PB", accent: "#142654", shape: "circle" },
  { name: "Cordillera Trading",    initials: "CT", accent: "#a86a18", shape: "diamond" },
  { name: "Frontera Fresh",        initials: "FF", accent: "#1f3a8a", shape: "circle" },
  { name: "Atlas Wholesale",       initials: "AW", accent: "#0b1830", shape: "square" },
  { name: "Sun Valley Brands",     initials: "SV", accent: "#d4922e", shape: "circle" },
  { name: "Bridge Logistics",      initials: "BL", accent: "#1f3a8a", shape: "square" },
  { name: "Calavera Distribution", initials: "CD", accent: "#7a4a10", shape: "diamond" },
];

export function Commodities({ t }: { t: CommoditiesT }) {
  return (
    <section id="commodities" className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-3xl">
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
            className="mt-6 max-w-2xl text-base leading-relaxed text-cobalt-ink/75 md:text-[17px]"
          >
            {t.sub}
          </motion.p>
        </div>

        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 md:gap-6">
          <Panel
            side={t.dry}
            kind="dry"
            index={0}
          />
          <Panel
            side={t.produce}
            kind="produce"
            index={1}
          />
        </div>

        {/* Client roster belt — replaces the prior commodity-tag marquee.
            Soft "trusted by" lead, then a continuous drift of partner
            wordmarks paired with a small monogram mark. Doubled in the
            DOM so the CSS marquee loop is seamless. */}
        <div className="mt-16 md:mt-20">
          <div className="text-center">
            <span className="eyebrow text-cobalt/60">
              <span className="mr-3 inline-block h-px w-8 align-middle bg-amber/70" />
              {t.clientsLead}
              <span className="ml-3 inline-block h-px w-8 align-middle bg-amber/70" />
            </span>
          </div>
          <div className="relative mt-7 overflow-hidden border-y border-line-soft py-7">
            <div className="tag-marquee flex w-max items-center gap-14 md:gap-20">
              {[...clients, ...clients].map((c, i) => (
                <ClientMark key={`${c.name}-${i}`} client={c} />
              ))}
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-paper via-paper/90 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-paper via-paper/90 to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({
  side,
  kind,
  index,
}: {
  side: Side;
  kind: "dry" | "produce";
  index: number;
}) {
  const isDry = kind === "dry";
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.75,
        delay: index * 0.1,
        ease: [0.22, 0.8, 0.32, 1],
      }}
      className={`group relative overflow-hidden rounded-2xl border p-8 md:p-10 ${
        isDry
          ? "border-line-soft bg-ivory"
          : "border-amber/25 bg-gradient-to-br from-amber/[0.06] to-amber/[0.02]"
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] ${
            isDry
              ? "bg-cobalt/10 text-cobalt"
              : "bg-amber text-cobalt-ink"
          }`}
        >
          <span className={`inline-block h-1.5 w-1.5 rounded-full ${isDry ? "bg-cobalt" : "bg-cobalt-ink"}`} />
          {isDry ? "Dry" : "Cold"}
        </span>
        {isDry ? <BoxIcon className="h-9 w-9 text-cobalt/40" /> : <LeafIcon className="h-9 w-9 text-amber-deep" />}
      </div>

      <h3 className="mt-7 font-display text-[28px] leading-tight tracking-tight text-cobalt-ink md:text-[34px]">
        {side.title}
      </h3>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-cobalt-ink/70">
        {side.body}
      </p>

      <div className="mt-7 flex flex-wrap gap-2">
        {side.tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full border px-3 py-1 text-[12px] ${
              isDry
                ? "border-cobalt/15 bg-paper text-cobalt/80"
                : "border-amber/35 bg-ivory text-amber-deep"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function ClientMark({ client: c }: { client: Client }) {
  return (
    <div className="flex shrink-0 items-center gap-3.5">
      {c.logo ? (
        // Real client logo — drop a transparent SVG/PNG into /public/clients/
        // and reference it via the `logo` field above.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={c.logo}
          alt={c.name}
          className="h-9 w-auto opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
        />
      ) : (
        <MonogramShape
          initials={c.initials}
          accent={c.accent}
          shape={c.shape ?? "square"}
        />
      )}
      <span className="font-display text-[18px] font-medium tracking-tight text-cobalt-ink/65 md:text-[20px]">
        {c.name}
      </span>
    </div>
  );
}

function MonogramShape({
  initials,
  accent,
  shape,
}: {
  initials: string;
  accent: string;
  shape: "square" | "circle" | "diamond";
}) {
  const common =
    "relative inline-flex h-9 w-9 items-center justify-center text-[11px] font-bold uppercase tracking-tight text-ivory shadow-sm";
  if (shape === "circle") {
    return (
      <span
        className={`${common} rounded-full`}
        style={{ background: accent }}
        aria-hidden="true"
      >
        {initials}
      </span>
    );
  }
  if (shape === "diamond") {
    return (
      <span
        className="relative inline-flex h-9 w-9 items-center justify-center"
        aria-hidden="true"
      >
        <span
          className="absolute inset-0 rotate-45 rounded-[3px]"
          style={{ background: accent }}
        />
        <span className="relative z-10 text-[11px] font-bold uppercase tracking-tight text-ivory">
          {initials}
        </span>
      </span>
    );
  }
  return (
    <span
      className={`${common} rounded-md`}
      style={{ background: accent }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

function BoxIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="m4 10 12-6 12 6v14l-12 6L4 24z" strokeLinejoin="round" />
      <path d="M4 10l12 6 12-6M16 16v14" />
    </svg>
  );
}
function LeafIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        d="M6 26C6 14 14 6 26 6c0 12-8 20-20 20z"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path d="M6 26 22 10" strokeLinecap="round" />
    </svg>
  );
}
