"use client";

import { motion } from "framer-motion";

// Секция "Что такое скачки" — editorial, много воздуха
export default function WhatAreRaces() {
  return (
    <section className="py-32 md:py-48 px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Асимметричная сетка */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-2" />

          <motion.div
            className="md:col-span-10 lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-editorial-text mb-10 leading-tight">
              Что такое скачки
            </h2>

            <div className="editorial-divider mb-10" />

            <div className="space-y-8 text-editorial-text-muted text-lg md:text-xl leading-relaxed">
              <p>
                В большинстве гонок участвуют 8–12 лошадей. Все они стартуют одновременно из специальных ворот и бегут по одной трассе.
              </p>
              <p>
                Побеждает тот скакун, который первым пересекает финишную линию. Обычно один заезд длится от 1 до 3 минут, поэтому результат становится известен очень быстро.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Элементы скачек */}
        <motion.div
          className="mt-32 md:mt-40 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { label: "Стартовые ворота", num: "01" },
            { label: "Круговая трасса", num: "02" },
            { label: "Поворот", num: "03" },
            { label: "Финишная прямая", num: "04" },
          ].map((item) => (
            <div key={item.num} className="group">
              <span className="font-[family-name:var(--font-playfair)] text-6xl md:text-7xl text-editorial-border group-hover:text-editorial-accent transition-colors duration-300">
                {item.num}
              </span>
              <p className="mt-4 text-editorial-text font-medium text-lg">{item.label}</p>
            </div>
          ))}
        </motion.div>

        <p className="mt-16 text-editorial-text-muted text-base italic max-w-lg ml-auto text-right">
          Именно на последних метрах дистанции часто происходит решающий рывок.
        </p>
      </div>
    </section>
  );
}
