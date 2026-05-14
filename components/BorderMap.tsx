"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import geo from "@/lib/geo.json";
import { ports as portsContent } from "@/lib/locations";
import type { Locale } from "@/lib/i18n";

type GeoCity = { id: string; name: string; x: number; y: number };
type GeoPort = GeoCity & {
  state: string;
  role: "headquarters" | "primary" | "satellite";
};
type GeoData = {
  usa: string[];
  mx: string[];
  ports: GeoPort[];
  mxOrigins: GeoCity[];
  usDestinations: GeoCity[];
  inbound: { from: string; to: string }[];
  outbound: { from: string; to: string }[];
  viewBox: string;
  width: number;
  height: number;
};
const G = geo as unknown as GeoData;

function portStyle(role: GeoPort["role"]) {
  if (role === "headquarters")
    return { fill: "#d4922e", stroke: "#7a4a10", r: 12, ring: 20 };
  if (role === "primary")
    return { fill: "#142654", stroke: "#0b1830", r: 9, ring: 16 };
  return { fill: "#3a5fc0", stroke: "#1f3a8a", r: 7.5, ring: 13 };
}

// When border ports sit close enough that their default above-the-pin labels
// would collide, we flip a label below the pin to keep both readable.
// Calexico sits ~29px east of San Diego/Otay Mesa — same row, same y. Putting
// Calexico's label below cleanly separates the two.
const LABEL_BELOW: Record<string, true> = {
  calexico: true,
};

// Quadratic-bezier path between two points with a perpendicular bow.
function curvedRoute(
  a: { x: number; y: number },
  b: { x: number; y: number },
  bowFactor = 0.18,
): string {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const px = -dy;
  const py = dx;
  const len = Math.hypot(px, py) || 1;
  const offset = Math.hypot(dx, dy) * bowFactor;
  const cx = mx + (px / len) * offset;
  const cy = my + (py / len) * offset;
  return `M${a.x},${a.y} Q${cx.toFixed(1)},${cy.toFixed(1)} ${b.x},${b.y}`;
}

const cityIndex = Object.fromEntries(
  [...G.ports, ...G.mxOrigins, ...G.usDestinations].map((c) => [c.id, c]),
) as Record<string, GeoCity>;

const inboundRoutes = G.inbound
  .map((r) => {
    const a = cityIndex[r.from];
    const b = cityIndex[r.to];
    return a && b ? { id: `${r.from}-${r.to}`, d: curvedRoute(a, b, 0.16) } : null;
  })
  .filter(Boolean) as { id: string; d: string }[];

const outboundRoutes = G.outbound
  .map((r) => {
    const a = cityIndex[r.from];
    const b = cityIndex[r.to];
    return a && b ? { id: `${r.from}-${r.to}`, d: curvedRoute(a, b, -0.14) } : null;
  })
  .filter(Boolean) as { id: string; d: string }[];

const portContentById = Object.fromEntries(portsContent.map((p) => [p.id, p]));

// ─── Ocean wave geometry ──────────────────────────────────────────────────
// Build sine-wave path strings once at module load — they're static.
// The mask clips them to ocean areas; CSS slides the whole layer.

function waveLine(opts: {
  y: number;
  xStart: number;
  xEnd: number;
  wavelength: number;
  amplitude: number;
  phaseFlip?: boolean;
}): string {
  const half = opts.wavelength / 2;
  const amp = opts.phaseFlip ? -opts.amplitude : opts.amplitude;
  let d = `M${opts.xStart},${opts.y}`;
  d += ` Q${(opts.xStart + half / 2).toFixed(1)},${(opts.y - amp).toFixed(1)} ${(opts.xStart + half).toFixed(1)},${opts.y}`;
  for (let x = opts.xStart + half; x < opts.xEnd; x += half) {
    d += ` T${(x + half).toFixed(1)},${opts.y}`;
  }
  return d;
}

// Generate two layers. Extra width on both sides gives room to translate.
const SLOW_WAVES: string[] = [];
for (let y = 10; y <= 740; y += 32) {
  SLOW_WAVES.push(
    waveLine({
      y,
      xStart: -300,
      xEnd: 1500,
      wavelength: 140,
      amplitude: 4,
      phaseFlip: (y / 32) % 2 === 0,
    }),
  );
}
const FAST_WAVES: string[] = [];
for (let y = 22; y <= 740; y += 32) {
  FAST_WAVES.push(
    waveLine({
      y,
      xStart: -300,
      xEnd: 1500,
      wavelength: 90,
      amplitude: 2.6,
      phaseFlip: (y / 32) % 2 === 1,
    }),
  );
}

export function BorderMap({
  locale,
  legend,
}: {
  locale: Locale;
  legend: { hq: string; primary: string; satellite: string };
}) {
  const [active, setActive] = useState<string | null>(null);
  const activePort = G.ports.find((p) => p.id === active) ?? null;
  const activeContent = activePort ? portContentById[activePort.id] : null;

  return (
    <div className="relative h-full w-full">
      <svg
        viewBox={G.viewBox}
        className="h-full w-full hero-drift"
        role="img"
        aria-label="Animated map of the journey from Mexican origin cities through U.S.–Mexico ports of entry to destinations across the United States."
      >
        <defs>
          {/* Country fills — subtle vertical gradient */}
          <linearGradient id="usa-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f3a8a" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#1f3a8a" stopOpacity="0.22" />
          </linearGradient>
          <linearGradient id="mx-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4922e" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#a86a18" stopOpacity="0.30" />
          </linearGradient>

          {/* Route gradients */}
          <linearGradient id="inbound-grad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#d4922e" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#a86a18" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#7a4a10" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="outbound-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#142654" stopOpacity="1" />
            <stop offset="100%" stopColor="#3a5fc0" stopOpacity="0.6" />
          </linearGradient>

          {/* Drop shadow for pins — gives editorial depth */}
          <filter id="pin-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="0" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft glow for the active route head */}
          <filter id="route-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Ocean mask — visible (white) everywhere EXCEPT inside the
              country shapes (black). Used to clip the wave layer so
              waves only appear in open water. */}
          <mask id="ocean-mask" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width={G.width} height={G.height} fill="white" />
            {G.usa.map((d, i) => (
              <path key={`mask-us-${i}`} d={d} fill="black" />
            ))}
            {G.mx.map((d, i) => (
              <path key={`mask-mx-${i}`} d={d} fill="black" />
            ))}
          </mask>
        </defs>

        {/* ── Ocean waves — animated sine-wave lines drifting in the
              open water. The ocean-mask clips them to areas outside
              USA/Mexico so they only show in the sea. ─────────────── */}
        <g mask="url(#ocean-mask)">
          {/* Soft wash so the ocean reads as water, not background */}
          <rect
            x="0"
            y="0"
            width={G.width}
            height={G.height}
            fill="#c9d4ee"
            fillOpacity="0.32"
          />
          {/* Layer 1: long, slow waves drifting left */}
          <g className="ocean-drift-slow">
            {SLOW_WAVES.map((d, i) => (
              <path
                key={`w1-${i}`}
                d={d}
                fill="none"
                stroke="#142654"
                strokeOpacity="0.18"
                strokeWidth="0.9"
              />
            ))}
          </g>
          {/* Layer 2: shorter, faster waves drifting right */}
          <g className="ocean-drift-fast">
            {FAST_WAVES.map((d, i) => (
              <path
                key={`w2-${i}`}
                d={d}
                fill="none"
                stroke="#142654"
                strokeOpacity="0.10"
                strokeWidth="0.7"
              />
            ))}
          </g>
        </g>

        {/* ── Country shapes ─────────────────────────────────────────── */}
        <g>
          {G.usa.map((d, i) => (
            <path
              key={`us-${i}`}
              d={d}
              fill="url(#usa-fill)"
              stroke="#142654"
              strokeOpacity="0.55"
              strokeWidth="1.1"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}
          {G.mx.map((d, i) => (
            <path
              key={`mx-${i}`}
              d={d}
              fill="url(#mx-fill)"
              stroke="#7a4a10"
              strokeOpacity="0.6"
              strokeWidth="1.1"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* ── Country labels — placed clearly INSIDE each country's
              outline. UNITED STATES sits in the central plains, MÉXICO
              sits in the south-central body. ────────────────────────── */}
        <text
          x="620"
          y="265"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize="50"
          fontWeight="400"
          fill="#142654"
          fillOpacity="0.34"
          letterSpacing="13"
        >
          UNITED STATES
        </text>
        <text
          x="430"
          y="660"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize="46"
          fontWeight="400"
          fill="#7a4a10"
          fillOpacity="0.52"
          letterSpacing="14"
        >
          MÉXICO
        </text>

        {/* ── Persistent faint trace of all routes (post-animation feel) ── */}
        <g stroke="#142654" strokeOpacity="0.06" strokeWidth="0.8" fill="none">
          {inboundRoutes.map((r) => (
            <path key={`trace-in-${r.id}`} d={r.d} />
          ))}
          {outboundRoutes.map((r) => (
            <path key={`trace-out-${r.id}`} d={r.d} />
          ))}
        </g>

        {/* ── Inbound routes: MX origin → border port ──────────────── */}
        {inboundRoutes.map((r, i) => (
          <g key={`in-${r.id}`}>
            <path
              d={r.d}
              fill="none"
              stroke="url(#inbound-grad)"
              strokeWidth="2.8"
              strokeLinecap="round"
              pathLength={1}
              className="route-inbound"
              style={{ animationDelay: `${i * 0.22}s` }}
            />
            <circle
              r="4.5"
              fill="#d4922e"
              filter="url(#route-glow)"
              className="route-head-inbound"
              style={{
                offsetPath: `path("${r.d}")`,
                animationDelay: `${i * 0.22}s`,
              }}
            />
          </g>
        ))}

        {/* ── Outbound routes: border port → US destination ────────── */}
        {outboundRoutes.map((r, i) => (
          <g key={`out-${r.id}`}>
            <path
              d={r.d}
              fill="none"
              stroke="url(#outbound-grad)"
              strokeWidth="2.8"
              strokeLinecap="round"
              pathLength={1}
              className="route-outbound"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
            <circle
              r="4.5"
              fill="#3a5fc0"
              filter="url(#route-glow)"
              className="route-head-outbound"
              style={{
                offsetPath: `path("${r.d}")`,
                animationDelay: `${i * 0.18}s`,
              }}
            />
          </g>
        ))}

        {/* ── MX origin cities ─────────────────────────────────────── */}
        <g>
          {G.mxOrigins.map((c) => (
            <CityMarker key={c.id} c={c} accent="#a86a18" haloOpacity={0.18} />
          ))}
        </g>

        {/* ── US destination cities ───────────────────────────────── */}
        <g>
          {G.usDestinations.map((c) => (
            <CityMarker key={c.id} c={c} accent="#142654" haloOpacity={0.16} />
          ))}
        </g>

        {/* ── Border port pins ─────────────────────────────────────── */}
        {G.ports.map((p, i) => {
          const style = portStyle(p.role);
          const isActive = active === p.id;
          return (
            <g
              key={p.id}
              onMouseEnter={() => setActive(p.id)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(p.id)}
              className="cursor-pointer transition-transform"
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                transform: isActive ? "translateY(-2px)" : undefined,
              }}
            >
              {/* Ambient pulse (always running, slow) */}
              <circle
                cx={p.x}
                cy={p.y}
                r={style.r}
                fill={style.fill}
                opacity="0.45"
                className={`port-pulse${p.role === "headquarters" ? " port-pulse-hq" : ""}`}
                style={{ animationDelay: `${i * 0.35}s` }}
              />
              {/* Clearance flash — fires when shipments arrive */}
              <circle
                cx={p.x}
                cy={p.y}
                r={style.r}
                fill="none"
                stroke={style.fill}
                strokeWidth="2"
                className="port-clear-flash"
                style={{ animationDelay: `${i * 0.06}s` }}
              />
              {/* Outer ring — thin, refined accent */}
              <circle
                cx={p.x}
                cy={p.y}
                r={style.ring}
                fill="none"
                stroke={style.fill}
                strokeOpacity={isActive ? 0.85 : 0.32}
                strokeWidth="0.9"
              />
              {/* Pin body with drop shadow — white separator + solid fill.
                  The inner white dot is reserved for the headquarters pin
                  so the visual hierarchy reads at a glance. */}
              <g filter="url(#pin-shadow)">
                <circle cx={p.x} cy={p.y} r={style.r + 2.5} fill="#fff" />
                <circle cx={p.x} cy={p.y} r={style.r} fill={style.fill} />
                {p.role === "headquarters" && (
                  <circle cx={p.x} cy={p.y} r={style.r * 0.4} fill="#fff" />
                )}
              </g>
              {/* Label — placed below the pin for any port flagged in
                  LABEL_BELOW (e.g. Calexico, which would otherwise crash
                  into San Diego's label). */}
              {(() => {
                const below = !!LABEL_BELOW[p.id];
                const nameY = below ? p.y + style.ring + 16 : p.y - style.ring - 6;
                const stateY = below ? p.y + style.ring + 28 : p.y - style.ring - 19;
                return (
                  <>
                    <text
                      x={p.x}
                      y={nameY}
                      textAnchor="middle"
                      fontFamily="var(--font-sans-body)"
                      fontSize={p.role === "headquarters" ? 13 : 11.5}
                      fontWeight={p.role === "headquarters" ? 700 : 600}
                      fill="#0b1830"
                    >
                      {p.name.split(" / ")[0]}
                    </text>
                    <text
                      x={p.x}
                      y={stateY}
                      textAnchor="middle"
                      fontFamily="var(--font-sans-body)"
                      fontSize="9"
                      letterSpacing="2"
                      fill={p.role === "headquarters" ? "#7a4a10" : "#142654"}
                      fillOpacity="0.85"
                      fontWeight="700"
                    >
                      {p.state}
                    </text>
                  </>
                );
              })()}
            </g>
          );
        })}
      </svg>

      {/* Active port detail card */}
      <div className="pointer-events-none absolute bottom-3 left-3 right-3 md:bottom-5 md:left-5 md:right-auto md:max-w-xs">
        <AnimatePresence mode="wait">
          {activePort && activeContent && (
            <motion.div
              key={activePort.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.22, 0.8, 0.32, 1] }}
              className="rounded-xl border border-line-soft bg-ivory/95 px-4 py-3 shadow-[0_8px_30px_rgba(20,38,84,0.12)] backdrop-blur-md md:px-5 md:py-4"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block h-2 w-2 rounded-full ring-4 ${
                    activePort.role === "headquarters"
                      ? "bg-amber ring-amber/30"
                      : activePort.role === "primary"
                        ? "bg-cobalt ring-cobalt/25"
                        : "bg-cobalt-soft ring-cobalt-soft/25"
                  }`}
                />
                <span className="eyebrow text-[10px] text-cobalt/70">
                  {activePort.role === "headquarters"
                    ? legend.hq
                    : activePort.role === "primary"
                      ? legend.primary
                      : legend.satellite}
                </span>
              </div>
              <h4 className="mt-1.5 font-display text-lg leading-tight text-cobalt-ink">
                {activePort.name}, {activePort.state}
              </h4>
              <p className="mt-1 text-[13px] leading-relaxed text-cobalt-ink/75">
                {activeContent.blurb[locale]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend — bottom-right, less obstructive of country labels */}
      <div className="absolute right-3 bottom-3 hidden flex-col gap-1.5 rounded-xl border border-line-soft bg-ivory/90 px-3.5 py-2.5 text-[11px] shadow-sm backdrop-blur md:flex md:right-5 md:bottom-5">
        <div className="eyebrow mb-1 text-[9px] text-cobalt/55">
          {locale === "es" ? "El recorrido" : "The journey"}
        </div>
        <LegendItem dotClass="bg-amber-deep" label={locale === "es" ? "Origen México" : "MX origin"} />
        <LegendItem dotClass="bg-cobalt" label={locale === "es" ? "Cruce fronterizo" : "Border port"} />
        <LegendItem dotClass="bg-cobalt-soft" label={locale === "es" ? "Destino EE.UU." : "U.S. destination"} />
      </div>
    </div>
  );
}

function CityMarker({
  c,
  accent,
  haloOpacity,
}: {
  c: GeoCity;
  accent: string;
  haloOpacity: number;
}) {
  return (
    <g>
      {/* Soft halo */}
      <circle cx={c.x} cy={c.y} r="6.5" fill={accent} fillOpacity={haloOpacity * 0.7} />
      {/* White separator */}
      <circle cx={c.x} cy={c.y} r="4" fill="#fff" />
      {/* Core dot */}
      <circle cx={c.x} cy={c.y} r="2.8" fill={accent} />
      {/* Lighter, finer label — reads as supporting info, not feature */}
      <text
        x={c.x + 10}
        y={c.y + 3.5}
        fontFamily="var(--font-sans-body)"
        fontSize="9.5"
        fontWeight="500"
        fill={accent}
        fillOpacity="0.6"
        letterSpacing="0.4"
      >
        {c.name}
      </text>
    </g>
  );
}

function LegendItem({ dotClass, label }: { dotClass: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-cobalt-ink/85">
      <span className={`inline-block h-2 w-2 rounded-full ${dotClass}`} />
      <span>{label}</span>
    </div>
  );
}
