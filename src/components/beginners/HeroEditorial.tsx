"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { heroVideos } from "@/lib/data";

// Hero-секция: видео-фон + журнальная типографика + много воздуха
export default function HeroEditorial() {
  const t = useTranslations("hero");
  return (
    <section className="min-h-screen flex items-end pb-32 md:pb-40 px-8 md:px-16 lg:px-24 pt-32 relative overflow-hidden">
      {/* Видео-фон */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/funfacts-bg.mp4" type="video/mp4" />
        </video>
        {/* Градиент поверх видео */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--editorial-bg)] via-[var(--editorial-bg)]/80 to-[var(--editorial-bg)]/30" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Лейбл */}
          <p className="text-editorial-accent text-xs tracking-[0.4em] uppercase mb-8 font-medium">
            {t("label")}
          </p>

          {/* Главный заголовок */}
          <h1 className="font-[family-name:var(--font-playfair)] text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-editorial-text mb-12">
            {t("title1")}
            <span className="italic text-editorial-accent">{" "}{t("titleFor")}</span>
            <br />
            {t("title2")}
          </h1>

          {/* Подзаголовок */}
          <p className="text-editorial-text-muted text-lg md:text-xl max-w-lg leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Разделительная линия */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="h-0.5 bg-editorial-accent mt-16"
        />
      </div>
    </section>
  );
}
