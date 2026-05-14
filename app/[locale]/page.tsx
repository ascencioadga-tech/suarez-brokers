import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { content } from "@/lib/content";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Locations } from "@/components/Locations";
import { Heritage } from "@/components/Heritage";
import { Commodities } from "@/components/Commodities";
import { Stats } from "@/components/Stats";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SectionDivider } from "@/components/SectionDivider";

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = content[locale];

  return (
    <>
      <Nav locale={locale} t={t.nav} />
      <main className="flex-1">
        <Hero locale={locale} t={t.hero} />
        <Services t={t.services} />
        <SectionDivider />
        <Locations locale={locale} t={t.locations} />
        <Heritage t={t.heritage} />
        <Commodities t={t.commodities} />
        <Stats t={t.stats} />
        <Contact t={t.contact} />
      </main>
      <Footer t={t.footer} />
    </>
  );
}
