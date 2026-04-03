"use client";

import { motion } from "framer-motion";

const events = [
  { month: "АПР", name: "Grand National", location: "Ливерпуль", active: true },
  { month: "МАЙ", name: "Kentucky Derby", location: "Луисвилл" },
  { month: "МАЙ", name: "Preakness Stakes", location: "Балтимор" },
  { month: "ОКТ", name: "Prix de l'Arc", location: "Париж" },
  { month: "ОКТ", name: "Breeders' Cup", location: "США" },
];

// Горизонтальный таймлайн сезона
export default function SeasonTimeline() {
  return (
    <section className="py-32 md:py-48 px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-dark-gold text-xs tracking-[0.5em] uppercase mb-8">
            Расписание
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-dark-text leading-tight">
            Сезон 2026
          </h2>
        </motion.div>

        {/* Таймлайн */}
        <div className="relative overflow-x-auto pb-8">
          <div className="flex items-start gap-0 min-w-[700px] relative">
            {/* Горизонтальная линия */}
            <motion.div
              className="absolute top-8 left-0 right-0 h-px bg-dark-border"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              style={{ transformOrigin: "left" }}
            />

            {events.map((event, i) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                className="flex-1 relative px-3"
              >
                {/* Точка на линии */}
                <div className="flex justify-center mb-10">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      event.active
                        ? "bg-dark-gold border-dark-gold shadow-[0_0_20px_rgba(197,165,90,0.4)]"
                        : "bg-dark-bg border-dark-border"
                    }`}
                  />
                </div>

                {/* Контент */}
                <div className="text-center">
                  <span
                    className={`text-xs tracking-[0.3em] uppercase block mb-3 ${
                      event.active ? "text-dark-gold" : "text-dark-text-muted"
                    }`}
                  >
                    {event.month}
                  </span>
                  <p
                    className={`font-[family-name:var(--font-playfair)] text-lg md:text-xl mb-2 ${
                      event.active ? "text-dark-gold" : "text-dark-text"
                    }`}
                  >
                    {event.name}
                  </p>
                  <p className="text-dark-text-muted text-xs">{event.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
