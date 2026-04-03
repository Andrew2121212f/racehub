"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Horse } from "@/lib/data";

// Карточка лошади — горизонтальная, много воздуха
export default function HorseCard({
  horse,
  index,
  reversed,
}: {
  horse: Horse;
  index: number;
  reversed?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center py-20 md:py-28 border-b border-editorial-border last:border-0"
    >
      {/* Фото */}
      <div className={`md:col-span-5 ${reversed ? "md:col-start-8 md:order-2" : ""}`}>
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={horse.image}
            alt={horse.name}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>

      {/* Текст */}
      <div className={`md:col-span-6 ${reversed ? "md:col-start-1 md:order-1" : "md:col-start-7"}`}>
        <span className="text-editorial-text-muted text-xs tracking-[0.3em] uppercase">
          {horse.country}
        </span>

        <h3 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-editorial-text mt-3 mb-6">
          {horse.name}
        </h3>

        <div className="editorial-divider mb-8" />

        <p className="text-editorial-text-muted text-lg leading-relaxed mb-5">
          {horse.description}
        </p>

        <p className="text-editorial-text leading-relaxed mb-10 text-sm">
          {horse.why}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <a
            href="#"
            className="inline-block bg-editorial-accent text-white px-8 py-4 text-sm tracking-[0.2em] uppercase hover:bg-editorial-accent-light transition-colors duration-300"
          >
            Сделать ставку
          </a>
          <Link
            href={horse.eventLink}
            className="text-editorial-accent text-sm hover:underline underline-offset-4"
          >
            {horse.event} →
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
