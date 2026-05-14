import Image from "next/image";

type Variant = "default" | "light";

export function Logo({
  variant = "default",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  if (variant === "light") {
    // Footer / dark-surface variant. We recreate the bridge mark inline
    // in SVG (in ivory) and pair it with the "Suarez" wordmark in the
    // exact brand red, plus the "Brokerage Company, Inc" subtitle in
    // light text. Brand DNA preserved without needing a filter trick.
    return (
      <div className={`flex items-center gap-3.5 ${className}`}>
        <BridgeMark className="h-10 w-auto shrink-0 text-ivory md:h-11" />
        <div className="flex flex-col leading-none">
          <span
            className="font-display text-[24px] font-semibold tracking-tight md:text-[26px]"
            style={{ color: "var(--color-suarez-red)" }}
          >
            Suarez
          </span>
          <span className="mt-1 text-[9px] uppercase tracking-[0.26em] text-ivory/65">
            Brokerage Company, Inc
          </span>
        </div>
      </div>
    );
  }

  // Default — official logo on light surfaces.
  return (
    <Image
      src="/suarez-logo.png"
      alt="Suarez Brokerage Company"
      width={1414}
      height={452}
      priority
      className={`h-9 w-auto md:h-10 ${className}`}
    />
  );
}

// Stylized stone-bridge mark — approximates the flag-topped multi-arch
// bridge from the official logo. Stroked in currentColor so the parent
// can theme it (ivory on dark, navy on light).
function BridgeMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 44"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {/* Flag pole and triangular pennant at the peak */}
      <line x1="32" y1="14" x2="32" y2="4" />
      <path d="M32 4 L40 6 L32 9" fill="currentColor" stroke="none" />
      {/* Top fortification platform sitting on the bridge crown */}
      <line x1="27" y1="14" x2="37" y2="14" />
      <line x1="29" y1="14" x2="29" y2="17" />
      <line x1="35" y1="14" x2="35" y2="17" />
      {/* The big arch — a smooth curve from base-left up over to base-right */}
      <path d="M6 36 Q32 12 58 36" />
      {/* Inner secondary arch — gives the bridge depth */}
      <path d="M14 36 Q32 22 50 36" strokeWidth="1.4" strokeOpacity="0.55" />
      {/* Bridge base / waterline */}
      <line x1="2" y1="36" x2="62" y2="36" />
      <line x1="6" y1="40" x2="58" y2="40" strokeWidth="1.4" strokeOpacity="0.45" />
    </svg>
  );
}
