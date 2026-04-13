"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// Максимум для шкалы
const MAX_METERS = 3000;

// Секция дистанций — визуальная шкала + много воздуха
export default function DistanceSection() {
  const t = useTranslations("distances");

  const distances = [
    { title: t("sprintTitle"), meters: t("sprintMeters"), metersNum: 1200, time: t("sprintTime"), description: t("sprintDesc"), color: "var(--editorial-accent)" },
    { title: t("middleTitle"), meters: t("middleMeters"), metersNum: 1800, time: t("middleTime"), description: t("middleDesc"), color: "var(--editorial-accent)" },
    { title: t("longTitle"), meters: t("longMeters"), metersNum: 2400, time: t("longTime"), description: t("longDesc"), color: "var(--editorial-accent)" },
  ];
  return (
    <section className="py-32 md:py-48 px-8 md:px-16 lg:px-24 bg-editorial-bg-alt">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-editorial-accent text-xs tracking-[0.4em] uppercase mb-6">
            {t("label")}
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-editorial-text mb-20 md:mb-28 leading-tight">
            {t("title")}
          </h2>
        </motion.div>

        <div className="space-y-0">
          {distances.map((dist, i) => (
            <motion.div
              key={dist.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 py-16 md:py-20 border-b border-editorial-border last:border-0"
            >
              {/* Метры */}
              <div className="md:col-span-3">
                <span className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl text-editorial-text">
                  {dist.meters}
                </span>
                <p className="text-editorial-text-muted text-sm mt-2">{dist.time}</p>
              </div>

              {/* Название + шкала */}
              <div className="md:col-span-3">
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-editorial-text mb-4">
                  {dist.title}
                </h3>
                {/* Визуальная шкала дистанции */}
                <div className="relative h-2 bg-editorial-border/50 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{ backgroundColor: dist.color }}
                    initial={{ width: "0%" }}
                    whileInView={{ width: `${(dist.metersNum / MAX_METERS) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Описание */}
              <div className="md:col-span-6">
                <p className="text-editorial-text-muted text-lg leading-relaxed">
                  {dist.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
