"use client";

import { motion } from "framer-motion";

// Объяснение коэффициентов — щедрые отступы
export default function OddsExplainer() {
  return (
    <section className="py-32 md:py-48 px-8 md:px-16 lg:px-24 bg-editorial-bg-alt">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-20">
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-editorial-accent text-xs tracking-[0.4em] uppercase mb-6">
              Основы
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-editorial-text leading-tight">
              Как читать
              <br />
              <span className="italic">коэффициенты</span>
            </h2>
          </motion.div>

          <motion.div
            className="md:col-span-6 md:col-start-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-editorial-text-muted text-lg md:text-xl leading-relaxed mb-14">
              Коэффициент показывает, сколько можно выиграть при победе. Чем выше коэффициент — тем выше возможный выигрыш, но и вероятность победы обычно ниже.
            </p>

            {/* Пример */}
            <div className="bg-editorial-card-bg border border-editorial-border p-10 md:p-14">
              <p className="text-editorial-text-muted text-xs uppercase tracking-[0.3em] mb-10">
                Пример расчёта
              </p>

              <div className="flex items-baseline gap-6 mb-6">
                <span className="font-[family-name:var(--font-playfair)] text-7xl md:text-8xl text-editorial-accent">
                  2.5
                </span>
                <span className="text-editorial-text-muted text-xl">
                  × 100 MAD
                </span>
              </div>

              <div className="editorial-divider mb-8" />

              <div className="flex items-baseline gap-4">
                <span className="text-editorial-text-muted text-sm">Потенциальный выигрыш</span>
                <span className="font-[family-name:var(--font-playfair)] text-4xl text-editorial-text">
                  250 MAD
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
