import { Logo } from "./Logo";

type FooterT = {
  rights: string;
  established: string;
};

const services = [
  "Customs clearance",
  "Warehousing & 3PL",
  "Freight & transport",
  "Shipment tracking",
];

const crossings = [
  { name: "Nogales, AZ", tag: "HQ" },
  { name: "San Diego / Otay Mesa, CA" },
  { name: "Calexico, CA" },
  { name: "Santa Teresa, NM" },
  { name: "Laredo, TX" },
  { name: "Pharr / McAllen, TX" },
];

const credentials = ["CBP Licensed", "C-TPAT", "FDA Registered"];

export function Footer({ t }: { t: FooterT }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-cobalt-ink text-ivory">
      {/* Hairline brand accent at the top */}
      <div
        aria-hidden="true"
        className="h-px bg-gradient-to-r from-transparent via-amber/45 to-transparent"
      />

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-14 md:grid-cols-[1.45fr_1fr_1fr_1.05fr] md:gap-12">
          {/* Brand column — same Logo component as the header, no
              variant override, so the official PNG mark is identical
              in both places. A subtle white drop-shadow lifts the
              navy bridge against the deep cobalt-ink background. */}
          <div className="md:max-w-sm">
            <span
              className="inline-block"
              style={{
                filter:
                  "drop-shadow(0 0 10px rgba(255,255,255,0.35)) brightness(1.08)",
              }}
            >
              <Logo />
            </span>
            <p className="mt-7 max-w-xs text-[14px] leading-relaxed text-ivory/65">
              Family-run customs brokerage and U.S.–Mexico cross-border
              logistics since 1979. Your bridge between Mexico and the world.
            </p>
            <div className="mt-7 flex flex-wrap gap-1.5">
              {credentials.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-ivory/15 px-3 py-1 text-[10px] uppercase tracking-[0.20em] text-ivory/65"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Services nav */}
          <Column heading="Services">
            {services.map((s) => (
              <li key={s}>
                <a
                  href="#services"
                  className="transition-colors hover:text-amber-light"
                >
                  {s}
                </a>
              </li>
            ))}
          </Column>

          {/* Crossings nav */}
          <Column heading="Crossings">
            {crossings.map((c) => (
              <li key={c.name} className="flex items-baseline gap-2">
                <a
                  href="#locations"
                  className="transition-colors hover:text-amber-light"
                >
                  {c.name}
                </a>
                {c.tag && (
                  <span className="inline-flex items-center rounded-full border border-amber/40 bg-amber/10 px-1.5 text-[9px] font-medium uppercase tracking-[0.16em] text-amber-light">
                    {c.tag}
                  </span>
                )}
              </li>
            ))}
          </Column>

          {/* Contact column */}
          <Column heading="Contact">
            <li>
              <a
                href="tel:+15202814646"
                className="font-display text-[18px] leading-tight tracking-tight text-ivory transition-colors hover:text-amber-light"
              >
                +1 (520) 281-4646
              </a>
            </li>
            <li className="pt-1">
              <a
                href="mailto:drygoods@suarezbrokers.com"
                className="transition-colors hover:text-amber-light"
              >
                drygoods@suarezbrokers.com
              </a>
            </li>
            <li>
              <a
                href="mailto:produce@suarezbrokers.com"
                className="transition-colors hover:text-amber-light"
              >
                produce@suarezbrokers.com
              </a>
            </li>
            <li className="pt-3 text-ivory/55">
              Headquarters
              <br />
              Nogales, Arizona · USA
            </li>
          </Column>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-6 text-[12px] md:flex-row md:items-center md:px-10">
          <div className="text-ivory/55">
            © {year} Suarez Brokerage Company, Inc.{" "}
            <span className="text-ivory/40">{t.rights}</span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-[0.20em] text-ivory/45">
            <a href="#" className="transition-colors hover:text-amber-light">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-amber-light">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-amber-light">
              Accessibility
            </a>
            <span className="font-serif text-[13px] normal-case italic tracking-normal text-ivory/65">
              {t.established}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Column({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-5 text-[10.5px] font-semibold uppercase tracking-[0.24em] text-ivory/55">
        {heading}
      </h4>
      <ul className="space-y-2.5 text-[14px] text-ivory/85">{children}</ul>
    </div>
  );
}
