"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// Пошаговый гид — крупные номера, много пространства
export default function StepsGuide() {
  const t = useTranslations("steps");

  const steps = [
    { num: "01", title: t("step1Title"), description: t("step1Desc") },
    { num: "02", title: t("step2Title"), description: t("step2Desc") },
    { num: "03", title: t("step3Title"), description: t("step3Desc") },
  ];
  return (
    <section className="py-32 md:py-48 px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-24 md:mb-36"
        >
          <p className="text-editorial-accent text-xs tracking-[0.4em] uppercase mb-6">
            {t("label")}
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-editorial-text leading-tight">
            {t("title")}
          </h2>
        </motion.div>

        <div className="space-y-28 md:space-y-40">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start"
            >
              {/* Крупный номер */}
              <div className="md:col-span-4 lg:col-span-3">
                <span className="step-number font-[family-name:var(--font-playfair)]">
                  {step.num}
                </span>
              </div>

              {/* Контент */}
              <div className="md:col-span-8 lg:col-span-6 md:pt-10">
                <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-editorial-text mb-6">
                  {step.title}
                </h3>
                <div className="editorial-divider mb-8" />
                <p className="text-editorial-text-muted text-lg md:text-xl leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
