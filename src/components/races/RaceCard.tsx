"use client";

import { motion } from "framer-motion";
import type { RaceEvent } from "@/lib/data";

// Карточка события — dark тема, много пространства внутри
export default function RaceCard({
  event,
  index,
}: {
  event: RaceEvent;
  index: number;
}) {
  return (
    <motion.article
      id={event.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="gold-border group relative overflow-hidden"
    >
      {/* Фото с оверлеем */}
      <div className="aspect-[16/9] md:aspect-[21/9] relative overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent" />

        {/* Дата */}
        <div className="absolute top-8 right-8">
          <span className="text-dark-gold text-xs tracking-[0.4em] uppercase">
            {event.month}
          </span>
        </div>

        {/* Контент */}
        <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="flex-1 max-w-3xl">
              <p className="text-dark-gold text-xs tracking-[0.3em] uppercase mb-4">
                {event.date}
              </p>
              <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl lg:text-6xl text-dark-text mb-6 leading-tight">
                {event.name}
              </h3>
              <p className="text-dark-text-muted leading-relaxed text-base md:text-lg">
                {event.description}
              </p>
            </div>

            <a
              href="#"
              className="gold-shimmer shrink-0 text-black px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium"
            >
              Сделать ставку
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
