"use client";

import { motion } from "framer-motion";

// Точки событий на карте
const locations = [
  { name: "Grand National", city: "Ливерпуль", x: 47, y: 28, id: "grand-national" },
  { name: "Kentucky Derby", city: "Луисвилл", x: 22, y: 35, id: "kentucky-derby" },
  { name: "Preakness Stakes", city: "Балтимор", x: 25, y: 34, id: "preakness" },
  { name: "Prix de l'Arc", city: "Париж", x: 49, y: 30, id: "arc" },
  { name: "Breeders' Cup", city: "США", x: 18, y: 38, id: "breeders-cup" },
];

// Карта мира с точками событий
export default function WorldMap() {
  return (
    <section className="py-32 md:py-48 px-8 md:px-16 lg:px-24 bg-dark-bg-alt">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-dark-gold text-xs tracking-[0.5em] uppercase mb-8">
            География
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-dark-text leading-tight">
            Скачки по всему миру
          </h2>
        </motion.div>

        {/* Карта */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-[2/1] max-w-5xl mx-auto"
        >
          {/* Упрощённая SVG-карта мира */}
          <svg viewBox="0 0 100 50" className="w-full h-full" fill="none">
            {/* Контуры континентов — упрощённые */}
            {/* Северная Америка */}
            <path
              d="M 10 15 Q 15 10 22 12 L 28 15 Q 30 20 28 28 L 25 35 Q 22 40 18 38 L 12 32 Q 8 25 10 15"
              fill="var(--dark-surface)"
              stroke="var(--dark-border)"
              strokeWidth="0.3"
            />
            {/* Южная Америка */}
            <path
              d="M 22 40 Q 25 38 27 42 L 28 48 Q 26 52 24 50 L 22 45 Q 20 42 22 40"
              fill="var(--dark-surface)"
              stroke="var(--dark-border)"
              strokeWidth="0.3"
            />
            {/* Европа */}
            <path
              d="M 44 12 Q 48 10 52 12 L 55 15 Q 54 20 52 22 L 48 25 Q 45 22 44 18 Z"
              fill="var(--dark-surface)"
              stroke="var(--dark-border)"
              strokeWidth="0.3"
            />
            {/* Африка */}
            <path
              d="M 46 26 Q 50 24 54 26 L 56 32 Q 55 40 52 44 L 48 42 Q 44 36 46 26"
              fill="var(--dark-surface)"
              stroke="var(--dark-border)"
              strokeWidth="0.3"
            />
            {/* Азия */}
            <path
              d="M 55 10 Q 65 8 78 12 L 82 18 Q 80 25 75 28 L 65 30 Q 58 28 55 22 Z"
              fill="var(--dark-surface)"
              stroke="var(--dark-border)"
              strokeWidth="0.3"
            />
            {/* Австралия */}
            <path
              d="M 78 36 Q 82 34 86 36 L 88 40 Q 86 44 82 44 L 78 42 Z"
              fill="var(--dark-surface)"
              stroke="var(--dark-border)"
              strokeWidth="0.3"
            />

            {/* Линии между точками */}
            {locations.slice(0, -1).map((loc, i) => {
              const next = locations[i + 1];
              return (
                <motion.line
                  key={`line-${i}`}
                  x1={loc.x}
                  y1={loc.y}
                  x2={next.x}
                  y2={next.y}
                  stroke="var(--dark-gold-dim)"
                  strokeWidth="0.15"
                  strokeDasharray="0.5 0.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}
                />
              );
            })}

            {/* Точки событий */}
            {locations.map((loc, i) => (
              <g key={loc.id}>
                {/* Пульсирующий круг */}
                <motion.circle
                  cx={loc.x}
                  cy={loc.y}
                  r="1.5"
                  fill="var(--dark-gold)"
                  opacity="0.3"
                  initial={{ r: 0.5 }}
                  whileInView={{ r: [0.5, 2, 0.5] }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                />
                {/* Основная точка */}
                <motion.circle
                  cx={loc.x}
                  cy={loc.y}
                  r="0.8"
                  fill="var(--dark-gold)"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.15 }}
                />
              </g>
            ))}
          </svg>

          {/* Лейблы поверх карты */}
          {locations.map((loc, i) => (
            <motion.div
              key={`label-${loc.id}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.15 }}
              className="absolute transform -translate-x-1/2"
              style={{ left: `${loc.x}%`, top: `${loc.y + 5}%` }}
            >
              <p className="text-dark-gold text-[10px] md:text-xs font-medium whitespace-nowrap">
                {loc.name}
              </p>
              <p className="text-dark-text-muted text-[8px] md:text-[10px] whitespace-nowrap">
                {loc.city}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
