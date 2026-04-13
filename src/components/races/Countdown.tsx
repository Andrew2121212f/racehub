"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    passed: false,
  };
}

// Обратный отсчёт до ближайшего события
export default function Countdown() {
  const t = useTranslations("countdown");

  // Все события сезона — автоматически переключается на следующее
  const EVENTS = [
    { name: "Grand National Festival", location: t("grandNationalLocation"), date: new Date("2026-04-11T15:00:00+01:00"), id: "grand-national" },
    { name: "Kentucky Derby", location: t("kentuckyDerbyLocation"), date: new Date("2026-05-02T18:57:00-04:00"), id: "kentucky-derby" },
    { name: "Preakness Stakes", location: t("preaknessLocation"), date: new Date("2026-05-16T18:45:00-04:00"), id: "preakness" },
    { name: "Prix de l'Arc de Triomphe", location: t("arcLocation"), date: new Date("2026-10-04T16:05:00+02:00"), id: "arc" },
    { name: "Breeders' Cup Classic", location: t("breedersCupLocation"), date: new Date("2026-10-31T17:40:00-04:00"), id: "breeders-cup" },
  ];

  function getNextEvent() {
    const now = new Date();
    return EVENTS.find((e) => e.date.getTime() > now.getTime()) || EVENTS[EVENTS.length - 1];
  }

  const [event, setEvent] = useState(getNextEvent);
  const [time, setTime] = useState(() => getTimeLeft(event.date));

  useEffect(() => {
    const timer = setInterval(() => {
      const nextEvent = getNextEvent();
      if (nextEvent.id !== event.id) setEvent(nextEvent);
      setTime(getTimeLeft(nextEvent.date));
    }, 1000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event.id]);

  const blocks = [
    { value: time.days, label: t("days") },
    { value: time.hours, label: t("hours") },
    { value: time.minutes, label: t("minutes") },
    { value: time.seconds, label: t("seconds") },
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
            {t("label")}
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-dark-text leading-tight mb-4">
            {event.name}
          </h2>
          <p className="text-dark-text-muted text-lg mb-16">
            {event.location}
          </p>
        </motion.div>

        {time.passed ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-[family-name:var(--font-playfair)] text-3xl text-dark-gold"
          >
            {t("started")}
          </motion.p>
        ) : (
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
        )}

        <motion.a
          href={`#${event.id}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="gold-shimmer inline-block text-black px-10 py-4 text-sm tracking-[0.2em] uppercase font-medium mt-16"
        >
          {t("details")}
        </motion.a>
      </div>
    </section>
  );
}
