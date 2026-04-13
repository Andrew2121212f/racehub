"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// Горизонтальный bar для характеристики
function StatBar({ value, delay }: { value: number; delay: number }) {
  return (
    <div className="relative h-1.5 bg-editorial-border/40 rounded-full overflow-hidden flex-1">
      <motion.div
        className="absolute top-0 left-0 h-full rounded-full bg-editorial-accent"
        initial={{ width: "0%" }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
      />
    </div>
  );
}

// Таблица сравнения лошадей + визуальные характеристики
export default function HorseComparison() {
  const t = useTranslations("comparison");

  const horseStats = [
    {
      name: "Iroko",
      country: "\u{1F1EB}\u{1F1F7}",
      wins: 7,
      winRate: 58,
      bestDist: t("distLong"),
      odds: 4.2,
      style: t("styleStable"),
      form: "\u2588\u2588\u2588\u2588\u2591",
      speed: 65,
      endurance: 85,
      consistency: 80,
    },
    {
      name: "Commandment",
      country: "\u{1F1FA}\u{1F1F8}",
      wins: 5,
      winRate: 63,
      bestDist: t("distSprint"),
      odds: 3.1,
      style: t("styleAggressive"),
      form: "\u2588\u2588\u2588\u2588\u2588",
      speed: 95,
      endurance: 50,
      consistency: 70,
    },
    {
      name: "Barnes",
      country: "\u{1F1FA}\u{1F1F8}",
      wins: 6,
      winRate: 55,
      bestDist: t("distMiddle"),
      odds: 5.0,
      style: t("styleReliable"),
      form: "\u2588\u2588\u2588\u2591\u2591",
      speed: 70,
      endurance: 75,
      consistency: 85,
    },
    {
      name: "Minnie Hauk",
      country: "\u{1F1EB}\u{1F1F7}",
      wins: 4,
      winRate: 67,
      bestDist: t("distMiddle"),
      odds: 2.8,
      style: t("styleClassic"),
      form: "\u2588\u2588\u2588\u2588\u2591",
      speed: 80,
      endurance: 70,
      consistency: 90,
    },
    {
      name: "Senor Buscador",
      country: "\u{1F1FA}\u{1F1F8}",
      wins: 9,
      winRate: 45,
      bestDist: t("distLong"),
      odds: 7.5,
      style: t("styleVeteran"),
      form: "\u2588\u2588\u2591\u2591\u2591",
      speed: 60,
      endurance: 90,
      consistency: 55,
    },
  ];

  const statLabels = [
    { key: "speed" as const, label: t("speed") },
    { key: "endurance" as const, label: t("endurance") },
    { key: "consistency" as const, label: t("consistency") },
  ];
  return (
    <section className="py-32 md:py-48 px-8 md:px-16 lg:px-24 bg-editorial-bg-alt">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-editorial-accent text-xs tracking-[0.4em] uppercase mb-6">
            {t("label")}
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-editorial-text leading-tight mb-6">
            {t("title")}
          </h2>
          <p className="text-editorial-text-muted text-lg max-w-xl">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Таблица — скролл на мобильном */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-x-auto mb-20"
        >
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b-2 border-editorial-accent">
                <th className="text-left py-5 pr-6 text-xs text-editorial-text-muted tracking-[0.2em] uppercase">
                  {t("horse")}
                </th>
                <th className="text-center py-5 px-4 text-xs text-editorial-text-muted tracking-[0.2em] uppercase">
                  {t("wins")}
                </th>
                <th className="text-center py-5 px-4 text-xs text-editorial-text-muted tracking-[0.2em] uppercase">
                  {t("winRate")}
                </th>
                <th className="text-center py-5 px-4 text-xs text-editorial-text-muted tracking-[0.2em] uppercase">
                  {t("distance")}
                </th>
                <th className="text-center py-5 px-4 text-xs text-editorial-text-muted tracking-[0.2em] uppercase">
                  {t("odds")}
                </th>
                <th className="text-center py-5 px-4 text-xs text-editorial-text-muted tracking-[0.2em] uppercase">
                  {t("style")}
                </th>
                <th className="text-center py-5 pl-4 text-xs text-editorial-text-muted tracking-[0.2em] uppercase">
                  {t("form")}
                </th>
              </tr>
            </thead>
            <tbody>
              {horseStats.map((horse, i) => (
                <motion.tr
                  key={horse.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="border-b border-editorial-border hover:bg-editorial-card-bg transition-colors"
                >
                  <td className="py-6 pr-6">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{horse.country}</span>
                      <span className="font-[family-name:var(--font-playfair)] text-xl text-editorial-text">
                        {horse.name}
                      </span>
                    </div>
                  </td>
                  <td className="text-center py-6 px-4">
                    <span className="font-[family-name:var(--font-playfair)] text-2xl text-editorial-text">
                      {horse.wins}
                    </span>
                  </td>
                  <td className="text-center py-6 px-4">
                    <span className="text-editorial-text font-medium">{horse.winRate}%</span>
                  </td>
                  <td className="text-center py-6 px-4">
                    <span className="text-editorial-text-muted text-sm">{horse.bestDist}</span>
                  </td>
                  <td className="text-center py-6 px-4">
                    <span className="font-[family-name:var(--font-playfair)] text-xl text-editorial-accent">
                      {horse.odds.toFixed(1)}
                    </span>
                  </td>
                  <td className="text-center py-6 px-4">
                    <span className="text-editorial-text-muted text-sm">{horse.style}</span>
                  </td>
                  <td className="text-center py-6 pl-4">
                    <span className="font-mono text-sm tracking-wider text-editorial-accent">
                      {horse.form}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Визуальные характеристики — bar charts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-editorial-accent text-xs tracking-[0.4em] uppercase mb-10">
            {t("visualComparison")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {statLabels.map((stat) => (
              <div key={stat.key} className="bg-editorial-bg p-8 border border-editorial-border">
                <h4 className="font-[family-name:var(--font-playfair)] text-lg text-editorial-text mb-6">
                  {stat.label}
                </h4>
                <div className="space-y-4">
                  {horseStats.map((horse, i) => (
                    <div key={horse.name} className="flex items-center gap-4">
                      <span className="text-editorial-text-muted text-xs w-24 shrink-0 truncate">
                        {horse.name}
                      </span>
                      <StatBar
                        value={horse[stat.key]}
                        delay={0.1 + i * 0.08}
                      />
                      <span className="text-editorial-accent text-xs font-medium w-8 text-right">
                        {horse[stat.key]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
