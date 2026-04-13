"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Horse } from "@/lib/data";

// Карточка лошади — крупное фото с параллаксом + текст
export default function HorseCard({
  horse,
  index,
  reversed,
}: {
  horse: Horse;
  index: number;
  reversed?: boolean;
}) {
  const t = useTranslations("starsSection");
  const th = useTranslations("horses");

  // Маппинг id → ключ перевода
  const horseKey = horse.id === "minnie-hauk" ? "minnieHauk" : horse.id === "senor-buscador" ? "senorBuscador" : horse.id;

  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Параллакс для фото — медленнее скролла
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center py-20 md:py-28 border-b border-editorial-border last:border-0"
    >
      {/* Фото с параллаксом */}
      <div className={`md:col-span-6 ${reversed ? "md:col-start-7 md:order-2" : ""}`}>
        <div className="aspect-[3/2] overflow-hidden relative group">
          {/* Параллакс-контейнер */}
          <motion.div
            className="absolute inset-0 w-full"
            style={{
              y: imageY,
              scale: imageScale,
              height: "116%",
              top: "-8%",
            }}
          >
            <img
              src={horse.image}
              alt={horse.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

          {/* Лёгкий градиент снизу для глубины */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          {/* Страна — бейдж на фото */}
          <div className="absolute top-4 left-4 bg-editorial-accent/90 text-white px-3 py-1.5 text-xs tracking-[0.2em] uppercase z-10">
            {th(`${horseKey}.country`)}
          </div>
        </div>
      </div>

      {/* Текст */}
      <div className={`md:col-span-5 ${reversed ? "md:col-start-1 md:order-1" : "md:col-start-8"}`}>
        <h3 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-editorial-text mb-6">
          {horse.name}
        </h3>

        <div className="editorial-divider mb-8" />

        <p className="text-editorial-text-muted text-lg leading-relaxed mb-5">
          {th(`${horseKey}.description`)}
        </p>

        <p className="text-editorial-text leading-relaxed mb-10 text-sm">
          {th(`${horseKey}.why`)}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <a
            href="#"
            className="inline-block bg-editorial-accent text-white px-8 py-4 text-sm tracking-[0.2em] uppercase hover:bg-editorial-accent-light transition-colors duration-300"
          >
            {t("betButton")}
          </a>
          <Link
            href={horse.eventLink}
            className="text-editorial-accent text-sm hover:underline underline-offset-4"
          >
            {horse.event} →
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
