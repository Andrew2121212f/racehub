"use client";

import { motion } from "framer-motion";

// Данные для сравнительной таблицы
const horseStats = [
  {
    name: "Iroko",
    country: "🇫🇷",
    wins: 7,
    winRate: "58%",
    bestDist: "Длинная",
    odds: 4.2,
    style: "Стабильный",
    form: "████░",
  },
  {
    name: "Commandment",
    country: "🇺🇸",
    wins: 5,
    winRate: "63%",
    bestDist: "Спринт",
    odds: 3.1,
    style: "Агрессивный",
    form: "█████",
  },
  {
    name: "Barnes",
    country: "🇺🇸",
    wins: 6,
    winRate: "55%",
    bestDist: "Средняя",
    odds: 5.0,
    style: "Надёжный",
    form: "███░░",
  },
  {
    name: "Minnie Hauk",
    country: "🇫🇷",
    wins: 4,
    winRate: "67%",
    bestDist: "Средняя",
    odds: 2.8,
    style: "Классический",
    form: "████░",
  },
  {
    name: "Senor Buscador",
    country: "🇺🇸",
    wins: 9,
    winRate: "45%",
    bestDist: "Длинная",
    odds: 7.5,
    style: "Ветеран",
    form: "██░░░",
  },
];

// Таблица сравнения лошадей — editorial стиль
export default function HorseComparison() {
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
            Сравнение
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-editorial-text leading-tight mb-6">
            Кто ваш фаворит?
          </h2>
          <p className="text-editorial-text-muted text-lg max-w-xl">
            Сравните ключевые показатели пяти звёзд сезона, чтобы сделать осознанный выбор.
          </p>
        </motion.div>

        {/* Таблица — скролл на мобильном */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b-2 border-editorial-accent">
                <th className="text-left py-5 pr-6 text-xs text-editorial-text-muted tracking-[0.2em] uppercase">
                  Лошадь
                </th>
                <th className="text-center py-5 px-4 text-xs text-editorial-text-muted tracking-[0.2em] uppercase">
                  Побед
                </th>
                <th className="text-center py-5 px-4 text-xs text-editorial-text-muted tracking-[0.2em] uppercase">
                  Win %
                </th>
                <th className="text-center py-5 px-4 text-xs text-editorial-text-muted tracking-[0.2em] uppercase">
                  Дистанция
                </th>
                <th className="text-center py-5 px-4 text-xs text-editorial-text-muted tracking-[0.2em] uppercase">
                  Коэфф.
                </th>
                <th className="text-center py-5 px-4 text-xs text-editorial-text-muted tracking-[0.2em] uppercase">
                  Стиль
                </th>
                <th className="text-center py-5 pl-4 text-xs text-editorial-text-muted tracking-[0.2em] uppercase">
                  Форма
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
                    <span className="text-editorial-text font-medium">{horse.winRate}</span>
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
      </div>
    </section>
  );
}
