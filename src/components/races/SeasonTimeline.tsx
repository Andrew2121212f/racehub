"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const events = [
  {
    month: "АПР",
    name: "Grand National",
    location: "Ливерпуль, Англия",
    date: "11 апреля",
    description: "Самая известная стипль-чез гонка в мире. 4 мили, 30 барьеров.",
    active: true,
    image: "/races/grand-national.jpg",
  },
  {
    month: "МАЙ",
    name: "Kentucky Derby",
    location: "Луисвилл, США",
    date: "2 мая",
    description: "«Самые быстрые две минуты в спорте». Гонка трёхлеток на 2 км.",
    active: false,
    image: "/races/kentucky-derby.jpg",
  },
  {
    month: "МАЙ",
    name: "Preakness Stakes",
    location: "Балтимор, США",
    date: "16 мая",
    description: "Второй этап Тройной Короны. Стратегия решает всё.",
    active: false,
    image: "/races/preakness.jpg",
  },
  {
    month: "ОКТ",
    name: "Prix de l'Arc",
    location: "Париж, Франция",
    date: "4 октября",
    description: "Главная гонка Европы. Лучшие со всего мира на Лоншане.",
    active: false,
    image: "/races/prix-arc.jpg",
  },
  {
    month: "ОКТ",
    name: "Breeders' Cup",
    location: "Дель Мар, США",
    date: "30-31 октября",
    description: "Финальный аккорд сезона — чемпионат мира скачек.",
    active: false,
    image: "/races/breeders-cup.jpg",
  },
];

// Вертикальный таймлайн с фото, проявляющимися при скролле
export default function SeasonTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="py-32 md:py-48 px-8 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <p className="text-dark-gold text-xs tracking-[0.5em] uppercase mb-8">
            Расписание
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-dark-text leading-tight">
            Сезон 2026
          </h2>
        </motion.div>

        <div className="relative">
          {/* Фоновая линия */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-dark-border" />
          {/* Анимированная линия */}
          <motion.div
            className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 w-px bg-dark-gold origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-20 md:space-y-28">
            {events.map((event, i) => {
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={event.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 pl-20 md:pl-0"
                >
                  {/* Точка */}
                  <div className="absolute left-8 md:left-1/2 top-2 -translate-x-1/2 z-10">
                    <div
                      className={`w-4 h-4 rounded-full border-2 transition-all ${
                        event.active
                          ? "bg-dark-gold border-dark-gold shadow-[0_0_20px_rgba(197,165,90,0.5)]"
                          : "bg-dark-bg border-dark-gold-dim"
                      }`}
                    />
                  </div>

                  {/* Фото — проявляется при скролле */}
                  <motion.div
                    className={`overflow-hidden rounded-sm ${
                      isLeft
                        ? "md:order-1 md:pr-16"
                        : "md:order-2 md:col-start-2 md:pl-16"
                    }`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    <div className="aspect-[16/9] overflow-hidden gold-border">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </motion.div>

                  {/* Текст */}
                  <div
                    className={`flex flex-col justify-center ${
                      isLeft
                        ? "md:order-2 md:col-start-2 md:pl-16"
                        : "md:order-1 md:text-right md:pr-16"
                    }`}
                  >
                    <span
                      className={`text-xs tracking-[0.3em] uppercase block mb-2 ${
                        event.active ? "text-dark-gold" : "text-dark-text-muted"
                      }`}
                    >
                      {event.month} · {event.date}
                    </span>
                    <h3
                      className={`font-[family-name:var(--font-playfair)] text-2xl md:text-4xl mb-3 ${
                        event.active ? "text-dark-gold" : "text-dark-text"
                      }`}
                    >
                      {event.name}
                    </h3>
                    <p className="text-dark-text-muted text-sm mb-2">
                      {event.location}
                    </p>
                    <p className="text-dark-text-muted text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
