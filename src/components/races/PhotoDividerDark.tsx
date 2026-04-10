"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface PhotoDividerDarkProps {
  src: string;
  alt: string;
  caption?: string;
  height?: string;
}

// Фото-разделитель для dark+gold темы
export default function PhotoDividerDark({
  src,
  alt,
  caption,
  height = "60vh",
}: PhotoDividerDarkProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <motion.section
      ref={ref}
      className="relative overflow-hidden"
      style={{ height }}
    >
      {/* Фото с параллаксом */}
      <motion.div
        className="absolute inset-0 w-full"
        style={{ y, scale, height: "120%", top: "-10%" }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Тёмный оверлей */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/40 via-black/20 to-dark-bg/70" />

      {/* Золотая боковая линия */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-dark-gold/40" />

      {/* Подпись */}
      {caption && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-8 md:p-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="w-12 h-[1px] bg-dark-gold/60 mb-4" />
            <p className="text-dark-gold/80 text-sm md:text-base tracking-[0.2em] uppercase font-medium">
              {caption}
            </p>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}
