"use client";

import { motion } from "framer-motion";

const distances = [
  {
    title: "Спринт",
    meters: "~1200 м",
    time: "~1 минута",
    description:
      "Это самые быстрые гонки. Лошади сразу набирают максимальную скорость, и гонка заканчивается примерно за минуту. Такие заезды любят зрители, потому что они очень динамичные.",
  },
  {
    title: "Средняя дистанция",
    meters: "1600–2000 м",
    time: "~2 минуты",
    description:
      "Самый популярный тип гонок. Здесь важны не только скорость, но и правильное распределение сил. Многие известные турниры проходят именно на таких дистанциях.",
  },
  {
    title: "Длинная дистанция",
    meters: "2400+ м",
    time: "~3 минуты",
    description:
      "Это настоящий тест выносливости. Жокей должен грамотно распределить силы лошади, чтобы она смогла ускориться на финише.",
  },
];

// Секция дистанций — много воздуха между строками
export default function DistanceSection() {
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
            Типы гонок
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-editorial-text mb-20 md:mb-28 leading-tight">
            Три основных дистанции
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

              {/* Название */}
              <div className="md:col-span-3">
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-editorial-text">
                  {dist.title}
                </h3>
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
