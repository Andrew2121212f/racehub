"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface PhotoDividerProps {
  // URL изображения
  src: string;
  alt: string;
  // Необязательный текст-оверлей
  caption?: string;
  // Высота секции (по умолчанию 70vh)
  height?: string;
}

// Полноширинный фото-разделитель с параллакс-эффектом
export default function PhotoDivider({
  src,
  alt,
  caption,
  height = "70vh",
}: PhotoDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Параллакс: изображение движется медленнее скролла
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <motion.section
      ref={ref}
      className="relative overflow-hidden"
      style={{ height }}
    >
      {/* Фоновое изображение с параллаксом */}
      <motion.div
        className="absolute inset-0 w-full"
        style={{
          y,
          scale,
          height: "120%",
          top: "-10%",
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Тёмный оверлей — сильнее внизу для читабельности текста */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60" />

      {/* Боковой декоративный акцент */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-editorial-accent/60" />

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
            <div className="w-12 h-[2px] bg-white/50 mb-4" />
            <p className="text-white text-sm md:text-base tracking-[0.2em] uppercase font-medium drop-shadow-lg">
              {caption}
            </p>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}
