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

// Золотые SVG-иконки
const icons = {
  trophy: (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M10 4h12v8c0 3.3-2.7 6-6 6s-6-2.7-6-6V4z" />
      <path d="M10 8H6c0 3 2 5 4 5M22 8h4c0 3-2 5-4 5" />
      <path d="M16 18v4M12 28h8M12 22h8" strokeLinecap="round" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="16" cy="16" r="12" />
      <ellipse cx="16" cy="16" rx="5" ry="12" />
      <path d="M4 16h24M6 10h20M6 22h20" />
    </svg>
  ),
  dollar: (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="16" cy="16" r="12" />
      <path d="M16 8v16M12 12c0-1.5 1.5-2.5 4-2.5s4 1 4 2.5-1.5 2.5-4 3-4 1.5-4 3 1.5 2.5 4 2.5 4-1 4-2.5" strokeLinecap="round" />
    </svg>
  ),
  horse: (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M6 26l2-8 4-2 2-4 4-2 4-1 4 1 2 4-2 4-4 2-2 4-2 2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="22" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
};

const stats = [
  { number: 5, suffix: "", label: "Главных\nсобытий", icon: icons.trophy },
  { number: 3, suffix: "", label: "Континента", icon: icons.globe },
  { number: 50, suffix: "M+", label: "Долларов\nпризовых", icon: icons.dollar },
  { number: 200, suffix: "+", label: "Лошадей\nна старте", icon: icons.horse },
];

// Статистика — золотые иконки + анимированные цифры
export default function StatsCounter() {
  return (
    <section className="py-32 md:py-40 px-8 md:px-16 lg:px-24 relative overflow-hidden">
      {/* Subtle фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-bg-alt/50 to-dark-bg" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center py-12 px-6 border-r border-dark-border last:border-r-0 md:[&:nth-child(2)]:border-r md:[&:nth-child(4)]:border-r-0 max-md:[&:nth-child(2)]:border-r-0 max-md:[&:nth-child(even)]:border-r-0 border-b md:border-b-0 max-md:[&:nth-child(3)]:border-b-0 max-md:[&:nth-child(4)]:border-b-0"
            >
              {/* Иконка */}
              <div className="text-dark-gold/40 flex justify-center mb-6">
                {stat.icon}
              </div>

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
