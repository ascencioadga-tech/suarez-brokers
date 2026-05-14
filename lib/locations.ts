// Six U.S.-Mexico ports of entry where Suarez Brokerage operates.
// Coordinates are approximate (placeholder — refine when client confirms).
// The viewBox space is 0..1000 (x) by 0..560 (y), roughly mapping the
// southern U.S. / northern MX border from San Diego in the west to
// Brownsville in the east.

export type Port = {
  id: string;
  city: string;
  state: "CA" | "AZ" | "NM" | "TX";
  // Position in the SVG viewBox (0..1000 × 0..560).
  x: number;
  y: number;
  // Marketing role: which crossing leads, which supports.
  role: "headquarters" | "primary" | "satellite";
  // Quick blurb shown on hover/active.
  blurb: { en: string; es: string };
};

export const ports: Port[] = [
  {
    id: "san-diego",
    city: "San Diego / Otay Mesa",
    state: "CA",
    x: 115,
    y: 295,
    role: "primary",
    blurb: {
      en: "West coast gateway — produce and perishables out of Baja California.",
      es: "Puerta del Pacífico — productos perecederos desde Baja California.",
    },
  },
  {
    id: "calexico",
    city: "Calexico",
    state: "CA",
    x: 215,
    y: 318,
    role: "satellite",
    blurb: {
      en: "Imperial Valley crossing — year-round produce and dry goods.",
      es: "Cruce del Valle Imperial — productos durante todo el año.",
    },
  },
  {
    id: "nogales",
    city: "Nogales",
    state: "AZ",
    x: 360,
    y: 372,
    role: "headquarters",
    blurb: {
      en: "Headquarters since 1979. The produce capital of the Southwest.",
      es: "Sede desde 1979. La capital de productos del Suroeste.",
    },
  },
  {
    id: "santa-teresa",
    city: "Santa Teresa",
    state: "NM",
    x: 510,
    y: 358,
    role: "satellite",
    blurb: {
      en: "New Mexico's industrial corridor — manufacturing and dry goods.",
      es: "Corredor industrial — manufactura y carga seca.",
    },
  },
  {
    id: "laredo",
    city: "Laredo",
    state: "TX",
    x: 680,
    y: 408,
    role: "primary",
    blurb: {
      en: "The busiest land port in the hemisphere. We clear it daily.",
      es: "El puerto terrestre más activo del hemisferio. Despachamos diario.",
    },
  },
  {
    id: "pharr",
    city: "Pharr / McAllen",
    state: "TX",
    x: 815,
    y: 482,
    role: "primary",
    blurb: {
      en: "Rio Grande Valley — produce, retail, and perishables for the East.",
      es: "Valle del Río Grande — productos y perecederos para el Este.",
    },
  },
];
