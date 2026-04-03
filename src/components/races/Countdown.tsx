"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Ближайшее событие — Grand National, апрель 2026
const TARGET_DATE = new Date("2026-04-11T14:00:00Z");

function getTimeLeft() {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

// Обратный отсчёт до ближайшего события
export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const blocks = [
    { value: time.days, label: "Дней" },
    { value: time.hours, label: "Часов" },
    { value: time.minutes, label: "Минут" },
    { value: time.seconds, label: "Секунд" },
  ];

  return (
    <section className="py-32 md:py-48 px-8 md:px-16 lg:px-24 bg-dark-bg-alt">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-dark-gold text-xs tracking-[0.5em] uppercase mb-8">
            Ближайшее событие
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-dark-text leading-tight mb-4">
            Grand National Festival
          </h2>
          <p className="text-dark-text-muted text-lg mb-16">
            Aintree, Ливерпуль — Апрель 2026
          </p>
        </motion.div>

        {/* Блоки отсчёта */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 md:gap-8"
        >
          {blocks.map((block) => (
            <div key={block.label} className="gold-border p-6 md:p-10 min-w-[80px] md:min-w-[140px]">
              <motion.span
                key={block.value}
                initial={{ y: -5, opacity: 0.5 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-dark-gold block"
              >
                {String(block.value).padStart(2, "0")}
              </motion.span>
              <span className="text-dark-text-muted text-xs tracking-[0.2em] uppercase mt-3 block">
                {block.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.a
          href="#grand-national"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="gold-shimmer inline-block text-black px-10 py-4 text-sm tracking-[0.2em] uppercase font-medium mt-16"
        >
          Сделать ставку
        </motion.a>
      </div>
    </section>
  );
}
