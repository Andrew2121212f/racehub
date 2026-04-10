"use client";

import { motion } from "framer-motion";

// Реальные данные Grand National 2026
const favorites = [
  { name: "I Am Maximus", jockey: "P. Townend", trainer: "W. Mullins", odds: 7, note: "2x чемпион" },
  { name: "Grangeclare West", jockey: "P. Mullins", trainer: "W. Mullins", odds: 9, note: "2-е место 2025" },
  { name: "Panic Attack", jockey: "H. Skelton", trainer: "D. Skelton", odds: 10, note: "" },
  { name: "Jagwar", jockey: "J. O'Neill Jr", trainer: "O. Greenall", odds: 11, note: "JP McManus" },
  { name: "Johnnywho", jockey: "M. O'Sullivan", trainer: "W. Mullins", odds: 12, note: "JP McManus" },
  { name: "Iroko", jockey: "J. O'Neill Jr", trainer: "O. Greenall", odds: 14, note: "4-е место 2025" },
];

const keyFacts = [
  { value: "34", label: "Участника" },
  { value: "30", label: "Барьеров" },
  { value: "7.2", label: "км дистанция" },
  { value: "£1M", label: "Призовой фонд" },
];

// Ширина odds bar — обратная вероятность (чем ниже odds, тем длиннее бар)
function oddsToWidth(odds: number): number {
  return Math.round((1 / odds) * 100 * 7);
}

// Анонс Grand National — тёмная секция с фоновым фото, odds bars, facts
export default function GrandNationalPreview() {
  return (
    <section className="relative py-32 md:py-48 px-8 md:px-16 lg:px-24 overflow-hidden">
      {/* Фоновое фото */}
      <div className="absolute inset-0">
        <img
          src="/races/grand-national.jpg"
          alt="Grand National"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/95 to-dark-bg/80" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <p className="text-dark-gold text-xs tracking-[0.5em] uppercase">
              Ближайшее событие · 11 апреля 2026
            </p>
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-dark-text leading-tight mb-4">
            Grand National Festival
          </h2>
          <p className="text-dark-text-muted text-lg max-w-2xl">
            Aintree, Ливерпуль · 16:00 BST · Willie Mullins выставляет 9 лошадей (26% поля).
            I Am Maximus пытается стать первым конём с тремя победами подряд.
          </p>
        </motion.div>

        {/* Двухколоночный layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Левая — Odds bars */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-dark-gold text-xs tracking-[0.3em] uppercase mb-8">
              Топ фавориты · коэффициенты
            </p>

            <div className="space-y-5">
              {favorites.map((horse, i) => (
                <motion.div
                  key={horse.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-[family-name:var(--font-playfair)] text-dark-text text-lg group-hover:text-dark-gold transition-colors">
                        {horse.name}
                      </span>
                      {horse.note && (
                        <span className="text-dark-gold/50 text-[10px] tracking-wider uppercase">
                          {horse.note}
                        </span>
                      )}
                    </div>
                    <span className="font-[family-name:var(--font-playfair)] text-dark-gold text-xl font-medium">
                      {horse.odds}/1
                    </span>
                  </div>

                  {/* Animated odds bar */}
                  <div className="relative h-1.5 bg-dark-border/30 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-dark-gold to-dark-gold-light"
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${oddsToWidth(horse.odds)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                    />
                  </div>

                  <div className="flex gap-4 mt-1.5 text-dark-text-muted text-[10px] tracking-wider">
                    <span>{horse.jockey}</span>
                    <span>·</span>
                    <span>{horse.trainer}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Правая — Key facts в кружках */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-between"
          >
            <div>
              <p className="text-dark-gold text-xs tracking-[0.3em] uppercase mb-8">
                Ключевые цифры
              </p>

              <div className="grid grid-cols-2 gap-6">
                {keyFacts.map((fact, i) => (
                  <motion.div
                    key={fact.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                    className="relative p-6 border border-dark-border hover:border-dark-gold/40 transition-colors text-center group"
                  >
                    <div className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-dark-gold mb-2">
                      {fact.value}
                    </div>
                    <p className="text-dark-text-muted text-xs tracking-wider uppercase">
                      {fact.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Инсайт */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-8 p-6 bg-dark-gold/5 border-l-2 border-dark-gold"
            >
              <p className="text-dark-text text-sm leading-relaxed">
                <span className="text-dark-gold font-medium">Инсайт:</span> 23 из 34 участников тренируются в Ирландии.
                Фаворит побеждает в Grand National лишь в 17% случаев — это одна из самых непредсказуемых гонок в мире.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
