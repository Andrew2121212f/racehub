import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import HeroEditorial from "@/components/beginners/HeroEditorial";
import WhatAreRaces from "@/components/beginners/WhatAreRaces";
import TrackDiagram from "@/components/beginners/TrackDiagram";
import DistanceSection from "@/components/beginners/DistanceSection";
import StepsGuide from "@/components/beginners/StepsGuide";
import BettingCalculator from "@/components/beginners/BettingCalculator";
import FunFacts from "@/components/beginners/FunFacts";
import HorseComparison from "@/components/beginners/HorseComparison";
import HorseCard from "@/components/beginners/HorseCard";
import PhotoDivider from "@/components/beginners/PhotoDivider";
import { horses } from "@/lib/data";

export const metadata: Metadata = {
  title: "Скачки для новичков",
  description: "Полный гид по скачкам: как устроены гонки, дистанции, калькулятор ставок и звёзды сезона 2026.",
};

// Лендинг 1: Скачки для новичков — Editorial стиль
export default function BeginnersPage() {
  return (
    <div className="editorial-page min-h-screen">
      <Navigation />

      <HeroEditorial />
      <WhatAreRaces />

      <PhotoDivider
        src="/aerial-optimized.jpg"
        alt="Вид на ипподром с высоты — лошади на трассе"
        caption="Современный ипподром — арена для сотен тысяч зрителей"
      />

      <div id="track">
        <TrackDiagram />
      </div>

      <div id="distances">
        <DistanceSection />
      </div>

      <div id="facts">
        <FunFacts videoSrc="/funfacts-bg.mp4" />
      </div>

      <div id="calculator">
        <BettingCalculator />
      </div>

      <PhotoDivider
        src="/rider-optimized.jpg"
        alt="Жокей тренируется с лошадью"
        caption="Каждый заезд — это буря эмоций и стратегии"
        height="55vh"
      />

      <section id="stars" className="py-32 md:py-48 px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-editorial-accent text-xs tracking-[0.4em] uppercase mb-6">
            Подробнее о фаворитах
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-editorial-text mb-6 leading-tight">
            Звёзды скачек 2026
          </h2>
          <p className="text-editorial-text-muted text-lg md:text-xl max-w-2xl mb-20 md:mb-28">
            Узнайте больше о каждом скакуне — его стиль, история и почему на него стоит обратить внимание.
          </p>

          <div>
            {horses.map((horse, i) => (
              <HorseCard
                key={horse.id}
                horse={horse}
                index={i}
                reversed={i % 2 !== 0}
              />
            ))}
          </div>
        </div>
      </section>

      <div id="favorites">
        <HorseComparison />
      </div>

      <PhotoDivider
        src="/equestrian-optimized.jpg"
        alt="Наездница на лошади"
        caption="Готовы начать своё путешествие в мир скачек?"
        height="50vh"
      />

      <StepsGuide />

      <Footer />
    </div>
  );
}
