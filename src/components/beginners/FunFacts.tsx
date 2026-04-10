"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Хук для анимированного счётчика
function useAnimatedCounter(target: number, duration = 2, isInView = false) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, target, {
      duration,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [isInView, target, duration, count]);

  return rounded;
}

// Компонент одного счётчика
function AnimatedNumber({ value, isInView }: { value: number; isInView: boolean }) {
  const count = useAnimatedCounter(value, 2.5, isInView);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const unsubscribe = count.on("change", (v) => {
      setDisplay(String(v));
    });
    return unsubscribe;
  }, [count]);

  return <>{display}</>;
}

// SVG-иконки для каждого факта
const icons = {
  speed: (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Спидометр */}
      <path d="M16 28C9.37 28 4 22.63 4 16S9.37 4 16 4s12 5.37 12 12" strokeLinecap="round" />
      <path d="M16 16l6-8" strokeLinecap="round" strokeWidth="2" />
      <circle cx="16" cy="16" r="2" fill="currentColor" />
    </svg>
  ),
  weight: (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Весы */}
      <path d="M16 4v24M8 8l8-4 8 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 18c0-2.2 1.8-4 4-4h0c2.2 0 4 1.8 4 4v2H4v-2zM20 18c0-2.2 1.8-4 4-4h0c2.2 0 4 1.8 4 4v2H20v-2z" />
    </svg>
  ),
  history: (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Часы/история */}
      <circle cx="16" cy="16" r="12" />
      <path d="M16 8v8l5 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  prize: (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Трофей */}
      <path d="M10 4h12v8c0 3.3-2.7 6-6 6s-6-2.7-6-6V4z" />
      <path d="M10 8H6c0 3 2 5 4 5M22 8h4c0 3-2 5-4 5" />
      <path d="M16 18v4M12 28h8M12 22h8" strokeLinecap="round" />
    </svg>
  ),
};

const facts = [
  {
    number: 70,
    prefix: "",
    suffix: "",
    unit: "км/ч",
    label: "Максимальная скорость",
    description: "Средняя скорость скаковой лошади на спринте. Это быстрее, чем допустимая скорость в городе.",
    icon: icons.speed,
  },
  {
    number: 500,
    prefix: "",
    suffix: "",
    unit: "кг",
    label: "Вес скакуна",
    description: "Средний вес чистокровной скаковой лошади. При этом жокей весит всего 50-55 кг.",
    icon: icons.weight,
  },
  {
    number: 300,
    prefix: "",
    suffix: "+",
    unit: "лет",
    label: "История скачек",
    description: "Скачки как организованный спорт существуют с XVIII века. Первый Derby состоялся в 1780 году.",
    icon: icons.history,
  },
  {
    number: 35,
    prefix: "$",
    suffix: "M",
    unit: "",
    label: "Рекорд приза",
    description: "Saudi Cup — самая дорогая скачка в мире с призовым фондом в $35 миллионов.",
    icon: icons.prize,
  },
];

// Инфографика — анимированные цифры + иконки + опциональный видео-фон
export default function FunFacts({ videoSrc }: { videoSrc?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 px-8 md:px-16 lg:px-24 overflow-hidden">
      {/* Видео-фон (если передан) */}
      {videoSrc && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-editorial-bg/85" />
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
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
              {/* Иконка */}
              <div className="text-editorial-accent/40 group-hover:text-editorial-accent transition-colors duration-300 mb-6">
                {fact.icon}
              </div>

              {/* Анимированная цифра */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-[family-name:var(--font-playfair)] text-6xl md:text-7xl text-editorial-accent">
                  {fact.prefix}
                  <AnimatedNumber value={fact.number} isInView={isInView} />
                  {fact.suffix}
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
