import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import HeroDark from "@/components/races/HeroDark";
import SeasonIntro from "@/components/races/SeasonIntro";
import Countdown from "@/components/races/Countdown";
import StatsCounter from "@/components/races/StatsCounter";
import SeasonTimeline from "@/components/races/SeasonTimeline";
import WorldMap from "@/components/races/WorldMap";
import RaceCard from "@/components/races/RaceCard";
import { raceEvents } from "@/lib/data";

// Лендинг 2: Популярные скачки 2026 — Dark + Gold Premium
export default function RacesPage() {
  return (
    <div className="dark-page min-h-screen">
      <Navigation />

      <HeroDark />
      <SeasonIntro />
      <Countdown />
      <StatsCounter />
      <SeasonTimeline />
      <WorldMap />

      {/* Секция событий */}
      <section id="events" className="py-32 md:py-48 px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24 md:mb-32">
            <p className="text-dark-gold text-xs tracking-[0.5em] uppercase mb-8">
              Календарь
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-7xl text-dark-text leading-tight mb-8">
              Главные скачки 2026
            </h2>
            <p className="text-dark-text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Здесь стартуют фавориты, рождаются новые звёзды и рушатся все прогнозы. Это список гонок, за которыми следит весь мир.
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
