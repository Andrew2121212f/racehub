"use client";

import { motion } from "framer-motion";

const facts = [
  {
    number: "70",
    unit: "км/ч",
    label: "Максимальная скорость",
    description: "Средняя скорость скаковой лошади на спринте. Это быстрее, чем допустимая скорость в городе.",
  },
  {
    number: "500",
    unit: "кг",
    label: "Вес скакуна",
    description: "Средний вес чистокровной скаковой лошади. При этом жокей весит всего 50-55 кг.",
  },
  {
    number: "300+",
    unit: "лет",
    label: "История скачек",
    description: "Скачки как организованный спорт существуют с XVIII века. Первый Derby состоялся в 1780 году.",
  },
  {
    number: "$35M",
    unit: "",
    label: "Рекорд приза",
    description: "Saudi Cup — самая дорогая скачка в мире с призовым фондом в $35 миллионов.",
  },
];

// Инфографика — крупные цифры + факты
export default function FunFacts() {
  return (
    <section className="py-32 md:py-48 px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <p className="text-editorial-accent text-xs tracking-[0.4em] uppercase mb-6">
            Интересные факты
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-editorial-text leading-tight">
            Скачки в цифрах
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-editorial-border">
          {facts.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-editorial-bg p-12 md:p-16 group hover:bg-editorial-card-bg transition-colors duration-300"
            >
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-[family-name:var(--font-playfair)] text-6xl md:text-7xl text-editorial-accent">
                  {fact.number}
                </span>
                {fact.unit && (
                  <span className="text-editorial-text-muted text-xl">
                    {fact.unit}
                  </span>
                )}
              </div>
              <p className="text-editorial-text font-medium text-lg mb-3">
                {fact.label}
              </p>
              <p className="text-editorial-text-muted text-sm leading-relaxed">
                {fact.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
