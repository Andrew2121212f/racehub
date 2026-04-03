"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Анимированный счётчик
function AnimatedNumber({ target, duration = 2 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

const stats = [
  { number: 5, suffix: "", label: "Главных\nсобытий" },
  { number: 3, suffix: "", label: "Континента" },
  { number: 50, suffix: "M+", label: "Долларов\nпризовых" },
  { number: 200, suffix: "+", label: "Лошадей\nна старте" },
];

// Статистика — крупные анимированные цифры
export default function StatsCounter() {
  return (
    <section className="py-32 md:py-40 px-8 md:px-16 lg:px-24 border-y border-dark-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl text-dark-gold mb-4">
                <AnimatedNumber target={stat.number} />
                <span>{stat.suffix}</span>
              </div>
              <p className="text-dark-text-muted text-sm tracking-wider uppercase whitespace-pre-line leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
