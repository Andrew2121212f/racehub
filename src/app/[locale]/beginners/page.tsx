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
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("metadata");
  return {
    title: t("beginnersTitle"),
    description: t("beginnersDescription"),
  };
}

// Лендинг 1: Скачки для новичков — Editorial стиль
export default function BeginnersPage() {
  const t = useTranslations("starsSection");
  const tp = useTranslations("photoDivider");

  return (
    <div className="editorial-page min-h-screen">
      <Navigation />

      <HeroEditorial />
      <div id="what">
        <WhatAreRaces />
      </div>

      <PhotoDivider
        src="/aerial-optimized.jpg"
        alt="Вид на ипподром с высоты — лошади на трассе"
        caption={tp("hippodrome")}
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
        caption={tp("emotion")}
        height="55vh"
      />

      <section id="stars" className="py-32 md:py-48 px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-editorial-accent text-xs tracking-[0.4em] uppercase mb-6">
            {t("label")}
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-editorial-text mb-6 leading-tight">
            {t("title")}
          </h2>
          <p className="text-editorial-text-muted text-lg md:text-xl max-w-2xl mb-20 md:mb-28">
            {t("subtitle")}
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
        caption={tp("journey")}
        height="50vh"
      />

      <StepsGuide />

      <Footer />
    </div>
  );
}
