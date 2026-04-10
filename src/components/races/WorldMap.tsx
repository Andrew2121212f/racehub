"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// События на карте — координаты в % от изображения карты
const locations = [
  {
    name: "Grand National",
    city: "Ливерпуль, Англия",
    date: "Апрель 2026",
    prize: "£1M",
    distance: "7,2 км",
    horses: "40",
    x: 48,
    y: 24,
    id: "grand-national",
    image: "/races/grand-national.jpg",
  },
  {
    name: "Kentucky Derby",
    city: "Луисвилл, США",
    date: "Май 2026",
    prize: "$3M",
    distance: "2 км",
    horses: "20",
    x: 22,
    y: 37,
    id: "kentucky-derby",
    image: "/races/kentucky-derby.jpg",
  },
  {
    name: "Preakness Stakes",
    city: "Балтимор, США",
    date: "Май 2026",
    prize: "$1.5M",
    distance: "1,9 км",
    horses: "14",
    x: 25,
    y: 35,
    id: "preakness",
    image: "/races/preakness.jpg",
  },
  {
    name: "Prix de l'Arc",
    city: "Париж, Франция",
    date: "Октябрь 2026",
    prize: "€5M",
    distance: "2,4 км",
    horses: "20",
    x: 50,
    y: 27,
    id: "arc",
    image: "/races/prix-arc.jpg",
  },
  {
    name: "Breeders' Cup",
    city: "Дель Мар, США",
    date: "Октябрь 2026",
    prize: "$31M",
    distance: "Разные",
    horses: "200+",
    x: 13,
    y: 39,
    id: "breeders-cup",
    image: "/races/breeders-cup.jpg",
  },
];

// Карта мира с реальным фоном + интерактивные точки
export default function WorldMap() {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);
  const activeEvent = locations.find((l) => l.id === hoveredEvent);

  return (
    <section className="py-32 md:py-48 px-8 md:px-16 lg:px-24 bg-dark-bg-alt">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-dark-gold text-xs tracking-[0.5em] uppercase mb-8">
            География
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-dark-text leading-tight">
            Скачки по всему миру
          </h2>
        </motion.div>

        {/* Карта — десктоп */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden md:block"
        >
          {/* Реальная карта мира как фон */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
            <img
              src="/races-world-map.jpg"
              alt="Карта мира"
              className="w-full h-full object-cover opacity-50"
            />

            {/* Золотой оверлей */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-gold/5 via-transparent to-dark-gold/5 mix-blend-overlay" />

            {/* Точки событий */}
            {locations.map((loc, i) => (
              <motion.div
                key={loc.id}
                className="absolute z-20 cursor-pointer group"
                style={{
                  left: `${loc.x}%`,
                  top: `${loc.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.15, type: "spring" }}
                onMouseEnter={() => setHoveredEvent(loc.id)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                {/* Пульсирующий ореол */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-dark-gold/20"
                  animate={{
                    scale: [1, 2.5, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  style={{ width: 24, height: 24, margin: -4 }}
                />
                {/* Точка — крупная, яркая */}
                <div
                  className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                    hoveredEvent === loc.id
                      ? "bg-dark-gold border-white scale-150 shadow-[0_0_30px_rgba(197,165,90,0.8)]"
                      : "bg-dark-gold border-dark-gold shadow-[0_0_12px_rgba(197,165,90,0.4)]"
                  }`}
                />
              </motion.div>
            ))}

            {/* Постоянные лейблы */}
            {locations.map((loc, i) => (
              <motion.div
                key={`label-${loc.id}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0 + i * 0.15 }}
                className="absolute z-10 pointer-events-none"
                style={{
                  left: `${loc.x}%`,
                  top: `${loc.y + 4}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <p className="text-dark-gold text-xs md:text-sm font-medium whitespace-nowrap text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {loc.name}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Инфо-карточка при hover — привязана к позиции точки */}
          <AnimatePresence>
            {activeEvent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-30 bg-dark-surface border border-dark-gold/30 overflow-hidden rounded-sm shadow-2xl shadow-black/50 w-[300px]"
                style={{
                  left: `${Math.min(activeEvent.x + 3, 68)}%`,
                  top: `${Math.max(activeEvent.y - 10, 5)}%`,
                }}
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={activeEvent.image}
                    alt={activeEvent.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-dark-gold text-sm font-medium mb-1">
                    {activeEvent.name}
                  </p>
                  <p className="text-dark-text-muted text-xs mb-3">
                    {activeEvent.city} · {activeEvent.date}
                  </p>
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-dark-border">
                    <div>
                      <p className="text-dark-gold text-sm font-medium">{activeEvent.prize}</p>
                      <p className="text-dark-text-muted text-[10px]">Призовые</p>
                    </div>
                    <div>
                      <p className="text-dark-text text-sm font-medium">{activeEvent.distance}</p>
                      <p className="text-dark-text-muted text-[10px]">Дистанция</p>
                    </div>
                    <div>
                      <p className="text-dark-text text-sm font-medium">{activeEvent.horses}</p>
                      <p className="text-dark-text-muted text-[10px]">Лошадей</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Мобильный — карточки */}
        <div className="md:hidden space-y-4 mt-8">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-4 border border-dark-border hover:border-dark-gold/40 transition-colors overflow-hidden"
            >
              <img
                src={loc.image}
                alt={loc.name}
                className="w-16 h-16 object-cover rounded-sm shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-dark-text font-medium text-sm">{loc.name}</p>
                <p className="text-dark-text-muted text-xs">{loc.city}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-dark-gold text-xs font-medium">{loc.prize}</p>
                <p className="text-dark-text-muted text-[10px]">{loc.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
