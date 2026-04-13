"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// Stat bar — горизонтальная полоска
function StatBar({ value, delay }: { value: number; delay: number }) {
  return (
    <div className="relative h-1 bg-dark-border/30 rounded-full overflow-hidden flex-1">
      <motion.div
        className="absolute top-0 left-0 h-full rounded-full bg-dark-gold"
        initial={{ width: "0%" }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
      />
    </div>
  );
}

// Претенденты Kentucky Derby 2026
export default function DerbyContenders() {
  const t = useTranslations("derbyContenders");

  // Реальные контендеры Kentucky Derby 2026
  const contenders = [
    {
      name: "Commandment",
      trainer: "Brad Cox",
      jockey: "F. Prat",
      odds: "6/1",
      stats: { form: 95, speed: 85, class: 90 },
      lastRace: "Florida Derby (G1)",
      lastResult: t("commandmentResult"),
      streak: t("commandmentStreak"),
    },
    {
      name: "Renegade",
      trainer: "B. Baffert",
      jockey: "J. Velazquez",
      odds: "4/1",
      stats: { form: 90, speed: 90, class: 80 },
      lastRace: "Arkansas Derby (G1)",
      lastResult: t("renegadeResult"),
      streak: t("renegadeStreak"),
    },
    {
      name: "Further Ado",
      trainer: "Brad Cox",
      jockey: "I. Ortiz Jr",
      odds: "8/1",
      stats: { form: 88, speed: 80, class: 85 },
      lastRace: "Blue Grass Stakes (G1)",
      lastResult: t("furtherAdoResult"),
      streak: t("furtherAdoStreak"),
    },
    {
      name: "So Happy",
      trainer: "P. D'Amato",
      jockey: "U. Rispoli",
      odds: "12/1",
      stats: { form: 75, speed: 82, class: 70 },
      lastRace: "Santa Anita Derby (G1)",
      lastResult: t("soHappyResult"),
      streak: t("soHappyStreak"),
    },
  ];

  const prepRaces = [
    { race: "Florida Derby (G1)", winner: "Commandment", date: t("prepFloridaDate"), margin: t("prepFloridaMargin") },
    { race: "Blue Grass Stakes (G1)", winner: "Further Ado", date: t("prepBlueGrassDate"), margin: t("prepBlueGrassMargin") },
    { race: "Santa Anita Derby (G1)", winner: "So Happy", date: t("prepSantaAnitaDate"), margin: t("prepSantaAnitaMargin") },
    { race: "Arkansas Derby (G1)", winner: "Renegade", date: t("prepArkansasDate"), margin: t("prepArkansasMargin") },
  ];

  return (
    <section className="py-32 md:py-48 px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-dark-gold text-xs tracking-[0.5em] uppercase mb-8">
            {t("label")}
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-dark-text leading-tight mb-6">
            {t("title")}
          </h2>
          <p className="text-dark-text-muted text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Карточки контендеров */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {contenders.map((horse, i) => (
            <motion.div
              key={horse.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-dark-surface border border-dark-border hover:border-dark-gold/40 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-dark-gold/5 p-8"
            >
              {/* Имя + коэффициент */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-dark-text">
                  {horse.name}
                </h3>
                <span className="font-[family-name:var(--font-playfair)] text-2xl text-dark-gold font-medium">
                  {horse.odds}
                </span>
              </div>

              {/* Тренер + жокей */}
              <div className="flex gap-4 text-dark-text-muted text-xs tracking-wider mb-6">
                <span>{horse.trainer}</span>
                <span>·</span>
                <span>{horse.jockey}</span>
              </div>

              {/* Stat bars */}
              <div className="space-y-3 mb-6">
                {[
                  { label: t("formStat"), value: horse.stats.form },
                  { label: t("speedStat"), value: horse.stats.speed },
                  { label: t("classStat"), value: horse.stats.class },
                ].map((stat, j) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <span className="text-dark-text-muted text-[11px] w-16 shrink-0">{stat.label}</span>
                    <StatBar value={stat.value} delay={0.3 + i * 0.1 + j * 0.05} />
                    <span className="text-dark-gold text-[11px] w-6 text-right">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Последняя гонка + streak */}
              <div className="flex gap-3 mb-3">
                <span className="text-[10px] px-2 py-1 bg-dark-gold/10 text-dark-gold border border-dark-gold/20 tracking-wider uppercase">
                  {horse.lastRace}
                </span>
                <span className="text-[10px] px-2 py-1 bg-dark-surface text-dark-text-muted border border-dark-border tracking-wider uppercase">
                  {horse.lastResult}
                </span>
              </div>

              <p className="text-dark-text-muted text-sm italic">
                {horse.streak}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Таблица подготовительных гонок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-dark-gold text-xs tracking-[0.3em] uppercase mb-6">
            {t("prepRaces")}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-dark-gold/30">
                  <th className="text-left py-4 text-xs text-dark-text-muted tracking-[0.2em] uppercase">{t("race")}</th>
                  <th className="text-left py-4 text-xs text-dark-text-muted tracking-[0.2em] uppercase">{t("winner")}</th>
                  <th className="text-center py-4 text-xs text-dark-text-muted tracking-[0.2em] uppercase">{t("date")}</th>
                  <th className="text-right py-4 text-xs text-dark-text-muted tracking-[0.2em] uppercase">{t("margin")}</th>
                </tr>
              </thead>
              <tbody>
                {prepRaces.map((race, i) => (
                  <motion.tr
                    key={race.race}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="border-b border-dark-border/50 hover:bg-dark-surface-hover transition-colors"
                  >
                    <td className="py-4 text-dark-text text-sm">{race.race}</td>
                    <td className="py-4">
                      <span className="font-[family-name:var(--font-playfair)] text-dark-gold text-base">
                        {race.winner}
                      </span>
                    </td>
                    <td className="py-4 text-center text-dark-text-muted text-sm">{race.date}</td>
                    <td className="py-4 text-right text-dark-text-muted text-sm">{race.margin}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
