import type { Locale } from "./i18n";

type Dict = {
  nav: { services: string; locations: string; heritage: string; commodities: string; contact: string; quote: string; login: string };
  hero: {
    eyebrow: string;
    headline: string;
    headlineItalic: string;
    intro: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    rotating: string[];
    mapCaption: string;
  };
  services: {
    eyebrow: string;
    heading: string;
    sub: string;
    items: { title: string; stat?: string; body: string; bullets: string[] }[];
  };
  locations: {
    eyebrow: string;
    heading: string;
    sub: string;
    legend: { hq: string; primary: string; satellite: string };
    liveLabel: string;
    ctaLead: string;
    ctaLabel: string;
  };
  heritage: {
    eyebrow: string;
    heading: string;
    body: string;
    pull: string;
    milestones: { year: string; label: string }[];
  };
  commodities: {
    eyebrow: string;
    heading: string;
    sub: string;
    dry: { title: string; body: string; tags: string[] };
    produce: { title: string; body: string; tags: string[] };
    clientsLead: string;
  };
  stats: {
    eyebrow: string;
    heading: string;
    items: { value: string; label: string }[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    sub: string;
    fields: { name: string; company: string; email: string; phone: string; commodity: string; message: string };
    submit: string;
    dryEmail: string;
    produceEmail: string;
    phone: string;
    hq: string;
  };
  footer: { rights: string; established: string };
};

export const content: Record<Locale, Dict> = {
  en: {
    nav: {
      services: "Services",
      locations: "Crossings",
      heritage: "Heritage",
      commodities: "Commodities",
      contact: "Contact",
      quote: "Request a quote",
      login: "Staff login",
    },
    hero: {
      eyebrow: "Customs brokerage · Est. 1979",
      headline: "Your bridge between",
      headlineItalic: "Mexico and the world.",
      intro:
        "Six border crossings. Three warehouses. Forty-six years of family-run customs expertise — and the technology to move your shipments faster than the competition.",
      primaryCta: { label: "Request a quote", href: "#contact" },
      secondaryCta: { label: "See our crossings", href: "#locations" },
      rotating: [
        "Cleared in Nogales since 1979.",
        "Six ports. One family.",
        "Dry goods, produce, perishables.",
        "Twelve family members. Six licensed brokers.",
      ],
      mapCaption: "From Mexico, through our six ports of entry, across the U.S.",
    },
    services: {
      eyebrow: "What we move",
      heading: "End-to-end customs and logistics, from manifest to delivery.",
      sub:
        "We are licensed CBP brokers and full-service logistics partners. One contact, one accountable team — from the moment your shipment leaves Mexico to the moment it arrives at your distribution center.",
      items: [
        {
          title: "Customs clearance",
          stat: "200+ entries / week",
          body:
            "CBP import and export filings, ACE manifests, PGA requirements, and bonded entry — handled by licensed brokers in-house.",
          bullets: ["Importer of Record", "FDA / USDA / FSIS", "Bonded warehousing", "Drawback & remote filing"],
        },
        {
          title: "Warehousing & 3PL",
          stat: "3 facilities · cold + dry",
          body:
            "Three facilities at the border with cold-chain capacity, cross-docking, and pick-and-pack for retail-ready shipments.",
          bullets: ["Refrigerated storage", "Cross-docking", "Inventory portal", "Pick & pack"],
        },
        {
          title: "Freight & transport",
          stat: "Allied Freight · 48 states",
          body:
            "U.S. trucking through our Allied Freight network — temperature-controlled, asset-light, with real-time tracking on every load.",
          bullets: ["Reefer & dry van", "LTL & FTL", "Drayage", "Border to door"],
        },
        {
          title: "Shipment tracking",
          stat: "Real time · 24/7",
          body:
            "A single portal that shows every entry, every manifest, every cleared load — visible to you and your customers in real time.",
          bullets: ["Live status", "Document portal", "Customer access", "API hand-off"],
        },
      ],
    },
    locations: {
      eyebrow: "Six crossings",
      heading: "We clear cargo at every major U.S.–Mexico port of entry.",
      sub:
        "Headquartered in Nogales, with offices and licensed brokers stationed across California, Arizona, New Mexico, and Texas — so your shipment never waits on a flight or a phone call.",
      legend: { hq: "Headquarters", primary: "Primary office", satellite: "Satellite office" },
      liveLabel: "Live",
      ctaLead: "Six crossings. One contact. Zero junior account managers.",
      ctaLabel: "Move your next shipment with us",
    },
    heritage: {
      eyebrow: "Since 1979",
      heading: "Three generations. One name on every entry.",
      body:
        "Suarez Brokerage was founded in Nogales in 1979 by Antonio Suarez. Today, twelve members of the family still run the business — and six of them hold an active U.S. customs broker license. Our clients have never met a junior account manager: every shipment is handled by someone whose last name is on the door.",
      pull:
        "“We don't outsource accountability. If your name is on the manifest, so is ours.”",
      milestones: [
        { year: "1979", label: "Founded in Nogales, AZ" },
        { year: "1988", label: "First refrigerated warehouse opens" },
        { year: "2002", label: "Allied Freight launches — full transport service" },
        { year: "2015", label: "Sixth port of entry: Pharr, TX" },
        { year: "2021", label: "Live tracking portal goes online" },
        { year: "Today", label: "12 family members. 6 licensed brokers." },
      ],
    },
    commodities: {
      eyebrow: "Commodities",
      heading: "Two specialized desks. One brokerage.",
      sub:
        "Dry goods and fresh produce are not the same business — they need different paperwork, different timelines, and different temperature protocols. So we run them as two specialized desks under one roof.",
      dry: {
        title: "Dry goods",
        body:
          "Industrial, retail, automotive parts, packaged consumer goods. Anything that doesn't need a reefer — moved with the same speed and care.",
        tags: ["Manufacturing", "Retail", "Automotive", "Packaged goods", "Industrial"],
      },
      produce: {
        title: "Fresh produce",
        body:
          "Tomatoes, peppers, grapes, berries, melons, asparagus, citrus. Year-round, cold-chain, FDA-cleared, and on the truck before the loading dock opens for the day.",
        tags: ["Tomatoes", "Berries", "Grapes", "Melons", "Citrus", "Asparagus", "Peppers"],
      },
      clientsLead: "Trusted on both sides of the border",
    },
    stats: {
      eyebrow: "By the numbers",
      heading: "Built quietly, over decades.",
      items: [
        { value: "46", label: "Years in business" },
        { value: "6", label: "Border crossings" },
        { value: "3", label: "Warehouses" },
        { value: "6", label: "Licensed brokers" },
        { value: "12", label: "Family operators" },
        { value: "24/7", label: "Customs coverage" },
      ],
    },
    contact: {
      eyebrow: "Request a quote",
      heading: "Tell us what's crossing. We'll quote you within one business day.",
      sub:
        "Whether it's a one-time shipment or a year-round program, you'll talk to a licensed broker — not a sales rep.",
      fields: {
        name: "Your name",
        company: "Company",
        email: "Email",
        phone: "Phone",
        commodity: "Commodity",
        message: "Tell us about your shipment",
      },
      submit: "Send to a broker",
      dryEmail: "drygoods@suarezbrokers.com",
      produceEmail: "produce@suarezbrokers.com",
      phone: "+1 (520) 281-4646",
      hq: "Nogales, Arizona · Headquarters",
    },
    footer: { rights: "All rights reserved.", established: "Family-run since 1979" },
  },
  es: {
    nav: {
      services: "Servicios",
      locations: "Cruces",
      heritage: "Historia",
      commodities: "Mercancías",
      contact: "Contacto",
      quote: "Solicitar cotización",
      login: "Acceso de personal",
    },
    hero: {
      eyebrow: "Agencia aduanal · Desde 1979",
      headline: "Tu puente entre",
      headlineItalic: "México y el mundo.",
      intro:
        "Seis cruces fronterizos. Tres almacenes. Cuarenta y seis años de experiencia aduanal familiar — y la tecnología para mover tus embarques más rápido que la competencia.",
      primaryCta: { label: "Solicitar cotización", href: "#contact" },
      secondaryCta: { label: "Ver nuestros cruces", href: "#locations" },
      rotating: [
        "Despachando en Nogales desde 1979.",
        "Seis puertos. Una familia.",
        "Carga seca, productos, perecederos.",
        "Doce miembros. Seis agentes licenciados.",
      ],
      mapCaption: "Desde México, por nuestros seis cruces, hacia los EE.UU.",
    },
    services: {
      eyebrow: "Lo que movemos",
      heading: "Aduana y logística de extremo a extremo, del manifiesto a la entrega.",
      sub:
        "Somos agentes aduanales licenciados por CBP y socios logísticos integrales. Un contacto, un equipo responsable — desde que tu embarque sale de México hasta que llega a tu centro de distribución.",
      items: [
        {
          title: "Despacho aduanal",
          stat: "200+ pedimentos / semana",
          body:
            "Importación y exportación CBP, manifiestos ACE, requisitos PGA y entrada bajo fianza — todo manejado por agentes licenciados en casa.",
          bullets: ["Importador de Récord", "FDA / USDA / FSIS", "Almacén fiscal", "Drawback y remote filing"],
        },
        {
          title: "Almacén y 3PL",
          stat: "3 instalaciones · frío + seco",
          body:
            "Tres instalaciones en la frontera con cadena de frío, cross-docking y pick-and-pack para embarques retail-ready.",
          bullets: ["Refrigeración", "Cross-docking", "Portal de inventario", "Pick & pack"],
        },
        {
          title: "Fletes y transporte",
          stat: "Allied Freight · 48 estados",
          body:
            "Transporte en EE.UU. a través de nuestra red Allied Freight — temperatura controlada, asset-light, con rastreo en tiempo real.",
          bullets: ["Reefer y caja seca", "LTL y FTL", "Drayage", "Frontera a puerta"],
        },
        {
          title: "Rastreo de embarques",
          stat: "Tiempo real · 24/7",
          body:
            "Un solo portal que muestra cada pedimento, cada manifiesto, cada carga despachada — visible para ti y tus clientes en tiempo real.",
          bullets: ["Estatus en vivo", "Portal de documentos", "Acceso al cliente", "API"],
        },
      ],
    },
    locations: {
      eyebrow: "Seis cruces",
      heading: "Despachamos en cada puerto principal de la frontera EE.UU.–México.",
      sub:
        "Sede en Nogales, con oficinas y agentes licenciados ubicados en California, Arizona, Nuevo México y Texas — para que tu embarque nunca espere por un vuelo o una llamada.",
      legend: { hq: "Sede", primary: "Oficina principal", satellite: "Oficina satélite" },
      liveLabel: "En vivo",
      ctaLead: "Seis cruces. Un contacto. Cero ejecutivos junior.",
      ctaLabel: "Mueve tu próximo embarque con nosotros",
    },
    heritage: {
      eyebrow: "Desde 1979",
      heading: "Tres generaciones. Un solo apellido en cada pedimento.",
      body:
        "Suarez Brokerage fue fundada en Nogales en 1979 por Antonio Suarez. Hoy, doce miembros de la familia siguen al frente del negocio — y seis de ellos tienen licencia activa de agente aduanal. Nuestros clientes nunca tratan con un ejecutivo junior: cada embarque lo maneja alguien cuyo apellido está en la puerta.",
      pull:
        "“No subcontratamos la responsabilidad. Si tu nombre está en el manifiesto, el nuestro también.”",
      milestones: [
        { year: "1979", label: "Fundada en Nogales, AZ" },
        { year: "1988", label: "Primer almacén refrigerado" },
        { year: "2002", label: "Nace Allied Freight — transporte integral" },
        { year: "2015", label: "Sexto puerto: Pharr, TX" },
        { year: "2021", label: "Portal de rastreo en línea" },
        { year: "Hoy", label: "12 miembros. 6 agentes licenciados." },
      ],
    },
    commodities: {
      eyebrow: "Mercancías",
      heading: "Dos mesas especializadas. Una sola agencia.",
      sub:
        "La carga seca y los productos frescos no son el mismo negocio — requieren distinto papeleo, distintos tiempos y distintos protocolos de temperatura. Por eso operamos dos mesas especializadas bajo un mismo techo.",
      dry: {
        title: "Carga seca",
        body:
          "Industrial, retail, autopartes, productos de consumo empaquetados. Todo lo que no necesita refrigeración — con la misma velocidad y cuidado.",
        tags: ["Manufactura", "Retail", "Automotriz", "Empaquetados", "Industrial"],
      },
      produce: {
        title: "Productos frescos",
        body:
          "Tomate, chile, uva, berries, melón, espárrago, cítricos. Todo el año, cadena de frío, autorizado por FDA, y en el camión antes de que abra el andén.",
        tags: ["Tomate", "Berries", "Uva", "Melón", "Cítricos", "Espárrago", "Chile"],
      },
      clientsLead: "De confianza a ambos lados de la frontera",
    },
    stats: {
      eyebrow: "En cifras",
      heading: "Construido en silencio, a lo largo de décadas.",
      items: [
        { value: "46", label: "Años en el negocio" },
        { value: "6", label: "Cruces fronterizos" },
        { value: "3", label: "Almacenes" },
        { value: "6", label: "Agentes licenciados" },
        { value: "12", label: "Operadores familiares" },
        { value: "24/7", label: "Cobertura aduanal" },
      ],
    },
    contact: {
      eyebrow: "Solicitar cotización",
      heading: "Cuéntanos qué cruza. Cotizamos dentro de un día hábil.",
      sub:
        "Sea un embarque único o un programa anual, hablarás con un agente licenciado — no con un vendedor.",
      fields: {
        name: "Tu nombre",
        company: "Empresa",
        email: "Correo",
        phone: "Teléfono",
        commodity: "Mercancía",
        message: "Cuéntanos sobre tu embarque",
      },
      submit: "Enviar a un agente",
      dryEmail: "drygoods@suarezbrokers.com",
      produceEmail: "produce@suarezbrokers.com",
      phone: "+1 (520) 281-4646",
      hq: "Nogales, Arizona · Sede",
    },
    footer: { rights: "Todos los derechos reservados.", established: "Empresa familiar desde 1979" },
  },
};
