"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

// Параметры эллипса трека
const CX = 400;
const CY = 200;
const RX = 340;
const RY = 150;

// Компонент бегущей точки по эллипсу
function RunningDot() {
  const angle = useMotionValue(0);
  // Старт справа (0 рад) — от финишной линии, движение по часовой стрелке
  const cx = useTransform(angle, (a) => CX + RX * Math.cos(a));
  const cy = useTransform(angle, (a) => CY + RY * Math.sin(a));
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(angle, Math.PI * 2, {
      duration: 4,
      ease: "easeInOut",
      delay: 0.5,
      repeat: Infinity,
      repeatDelay: 1,
    });

    return () => controls.stop();
  }, [isInView, angle]);

  // Наблюдатель для запуска анимации при скролле
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.circle
      ref={ref}
      r="8"
      fill="var(--editorial-accent)"
      cx={cx}
      cy={cy}
      style={{ filter: "drop-shadow(0 0 6px var(--editorial-accent))" }}
    />
  );
}

// Анимированная SVG-схема ипподрома
export default function TrackDiagram() {
  const t = useTranslations("trackDiagram");

  return (
    <section className="py-32 md:py-48 px-8 md:px-16 lg:px-24 bg-editorial-bg-alt">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-editorial-accent text-xs tracking-[0.4em] uppercase mb-6">
            {t("label")}
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-editorial-text leading-tight">
            {t("title")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* SVG-схема трассы */}
          <svg viewBox="0 0 800 400" className="w-full" fill="none">
            {/* Трасса — овал */}
            <motion.ellipse
              cx={CX}
              cy={CY}
              rx={RX}
              ry={RY}
              stroke="var(--editorial-border)"
              strokeWidth="40"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Внутренняя линия */}
            <ellipse
              cx={CX}
              cy={CY}
              rx="300"
              ry="110"
              stroke="var(--editorial-border)"
              strokeWidth="1"
              strokeDasharray="6 6"
              opacity="0.5"
            />

            {/* Финишная линия */}
            <motion.line
              x1="740"
              y1="150"
              x2="740"
              y2="250"
              stroke="var(--editorial-accent)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 2 }}
            />

            {/* Бегущая лошадь — точка по эллипсу */}
            <RunningDot />
          </svg>

          {/* Метки */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {/* Старт/Финиш */}
            <div className="absolute right-[3%] top-1/2 -translate-y-1/2 text-right">
              <div className="bg-editorial-accent text-white px-4 py-2 text-xs tracking-wider uppercase">
                {t("startFinish")}
              </div>
            </div>

            {/* Первый поворот */}
            <div className="absolute right-[15%] top-[5%]">
              <span className="text-editorial-text-muted text-xs tracking-wider">
                {t("turn1")}
              </span>
            </div>

            {/* Дальняя прямая */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[5%]">
              <span className="text-editorial-text-muted text-xs tracking-wider">
                {t("backStraight")}
              </span>
            </div>

            {/* Второй поворот */}
            <div className="absolute left-[15%] top-[5%]">
              <span className="text-editorial-text-muted text-xs tracking-wider">
                {t("turn2")}
              </span>
            </div>

            {/* Финишная прямая */}
            <div className="absolute right-[15%] bottom-[5%]">
              <span className="text-editorial-accent text-xs tracking-wider font-medium">
                {t("homeStraight")}
              </span>
            </div>
          </div>
        </motion.div>

        <p className="text-center text-editorial-text-muted text-sm mt-12 max-w-lg mx-auto italic">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
