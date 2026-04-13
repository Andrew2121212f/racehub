import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import HeroDark from "@/components/races/HeroDark";
import SeasonIntro from "@/components/races/SeasonIntro";
import Countdown from "@/components/races/Countdown";
import StatsCounter from "@/components/races/StatsCounter";
import SeasonTimeline from "@/components/races/SeasonTimeline";
import WorldMap from "@/components/races/WorldMap";
import RaceCard from "@/components/races/RaceCard";
import PhotoDividerDark from "@/components/races/PhotoDividerDark";
import GrandNationalPreview from "@/components/races/GrandNationalPreview";
import HistoricalStats from "@/components/races/HistoricalStats";
import DerbyContenders from "@/components/races/DerbyContenders";
import { raceEvents } from "@/lib/data";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("metadata");
  return {
    title: t("racesTitle"),
    description: t("racesDescription"),
  };
}

// Лендинг 2: Скачки 2026 — Dark + Gold Premium
export default function RacesPage() {
  const t = useTranslations("raceEvents");
  const tp = useTranslations("photoDividerDark");

  return (
    <div className="dark-page min-h-screen">
      <Navigation />

      <HeroDark />
      <SeasonIntro />

      <PhotoDividerDark
        src="/aerial-optimized.jpg"
        alt="Ипподром с высоты"
        caption={tp("five")}
        height="50vh"
      />

      <Countdown />

      <div id="grand-national-preview">
        <GrandNationalPreview />
      </div>

      <StatsCounter />

      <PhotoDividerDark
        src="/rider-optimized.jpg"
        alt="Жокей с лошадью"
        caption={tp("history")}
        height="45vh"
      />

      <div id="timeline">
        <SeasonTimeline />
      </div>

      <div id="analytics">
        <HistoricalStats />
      </div>

      <div id="world-map">
        <WorldMap />
      </div>

      <div id="contenders">
        <DerbyContenders />
      </div>

      {/* Секция событий */}
      <section id="events" className="py-32 md:py-48 px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24 md:mb-32">
            <p className="text-dark-gold text-xs tracking-[0.5em] uppercase mb-8">
              {t("calendarLabel")}
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-7xl text-dark-text leading-tight mb-8">
              {t("title")}
            </h2>
            <p className="text-dark-text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          <div className="space-y-10 md:space-y-12">
            {raceEvents.map((event, i) => (
              <RaceCard key={event.id} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
