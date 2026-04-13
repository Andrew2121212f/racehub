"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// Вступление — щедрые отступы, много воздуха
export default function SeasonIntro() {
  const t = useTranslations("seasonIntro");
  return (
    <section className="py-32 md:py-48 px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
          {/* Левая колонка */}
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-dark-text-muted text-lg md:text-xl leading-relaxed mb-10">
              {t("p1")}
            </p>
            <p className="text-dark-text-muted text-lg md:text-xl leading-relaxed">
              {t("p2")}
            </p>
          </motion.div>

          {/* Правая колонка — CTA */}
          <motion.div
            className="md:col-span-4 md:col-start-9 flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="border-l-2 border-dark-gold pl-10">
              <p className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-dark-text mb-4 italic">
                {t("readyTitle")}
              </p>
              <p className="text-dark-text-muted text-base leading-relaxed mb-10">
                {t("readyLine1")}
                <br />
                {t("readyLine2")}
                <br />
                {t("readyLine3")}
              </p>
              <a
                href="#events"
                className="gold-shimmer inline-block text-black px-10 py-4 text-sm tracking-[0.2em] uppercase font-medium"
              >
                {t("viewEvents")}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
