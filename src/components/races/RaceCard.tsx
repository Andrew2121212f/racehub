"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import type { RaceEvent } from "@/lib/data";

// Карточка события — dark тема, параллакс, чередующийся layout
export default function RaceCard({
  event,
  index,
}: {
  event: RaceEvent;
  index: number;
}) {
  const t = useTranslations("raceEvents");
  const td = useTranslations("raceEventsData");

  const eventKey = event.id === "breeders-cup" ? "breedersCup" : event.id === "kentucky-derby" ? "kentuckyDerby" : event.id === "grand-national" ? "grandNational" : event.id;

  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const reversed = index % 2 !== 0;

  return (
    <motion.article
      ref={cardRef}
      id={event.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="grid grid-cols-1 md:grid-cols-12 gap-0 gold-border group"
    >
      {/* Фото с параллаксом */}
      <div
        className={`md:col-span-7 relative overflow-hidden aspect-[16/9] md:aspect-auto md:min-h-[400px] ${
          reversed ? "md:col-start-6 md:order-2" : ""
        }`}
      >
        <motion.div
          className="absolute inset-0 w-full"
          style={{ y: imageY, scale: imageScale, height: "116%", top: "-8%" }}
        >
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/40 via-transparent to-dark-bg/40" />

        {/* Бейдж месяца */}
        <div className="absolute top-6 left-6 bg-dark-gold text-black px-3 py-1.5 text-xs tracking-[0.3em] uppercase font-medium">
          {td(`${eventKey}.month`)}
        </div>
      </div>

      {/* Контент */}
      <div
        className={`md:col-span-5 p-10 md:p-14 flex flex-col justify-center bg-dark-bg-alt ${
          reversed ? "md:col-start-1 md:order-1" : ""
        }`}
      >
        <p className="text-dark-gold text-xs tracking-[0.3em] uppercase mb-4">
          {td(`${eventKey}.date`)}
        </p>
        <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl text-dark-text mb-6 leading-tight">
          {event.name}
        </h3>
        <div className="w-10 h-px bg-dark-gold mb-6" />
        <p className="text-dark-text-muted leading-relaxed text-base mb-10">
          {td(`${eventKey}.description`)}
        </p>
        <a
          href="#"
          className="gold-shimmer self-start text-black px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium"
        >
          {t("betButton")}
        </a>
      </div>
    </motion.article>
  );
}
