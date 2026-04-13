"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { heroVideos } from "@/lib/data";

// Кинематографичный hero — видео + тёмная тема + золото
export default function HeroDark() {
  const t = useTranslations("heroDark");
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Видео-фон */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/funfacts-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/90 via-dark-bg/70 to-dark-bg" />
      </div>

      <div className="relative z-10 text-center px-8 md:px-16 max-w-5xl mx-auto">
        {/* Золотая линия */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-px bg-dark-gold mx-auto mb-14"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-dark-gold text-xs tracking-[0.5em] uppercase mb-12"
        >
          {t("label")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl lg:text-9xl text-dark-text leading-[0.9] mb-12"
        >
          {t("title1")}
          <br />
          <span className="italic text-dark-gold">{t("title2")}</span>
          <br />
          {t("title3")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-dark-text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="h-px bg-dark-gold mx-auto mt-14"
        />
      </div>

      {/* Скролл-индикатор */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-px h-16 bg-gradient-to-b from-dark-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
