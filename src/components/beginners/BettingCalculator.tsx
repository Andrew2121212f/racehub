"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Интерактивный калькулятор ставок
export default function BettingCalculator() {
  const [amount, setAmount] = useState(100);
  const [odds, setOdds] = useState(2.5);

  const winnings = amount * odds;
  const profit = winnings - amount;

  // Предустановленные коэффициенты
  const presetOdds = [
    { label: "Фаворит", value: 1.5, risk: "Низкий" },
    { label: "Средний", value: 2.5, risk: "Средний" },
    { label: "Аутсайдер", value: 5.0, risk: "Высокий" },
    { label: "Тёмная лошадка", value: 10.0, risk: "Очень высокий" },
  ];

  return (
    <section className="py-32 md:py-48 px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Левая часть — описание */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-editorial-accent text-xs tracking-[0.4em] uppercase mb-6">
              Попробуйте сами
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-editorial-text leading-tight mb-8">
              Калькулятор
              <br />
              <span className="italic">ставок</span>
            </h2>
            <div className="editorial-divider mb-8" />
            <p className="text-editorial-text-muted text-lg leading-relaxed">
              Передвигайте ползунки, чтобы увидеть, как меняется потенциальный выигрыш в зависимости от суммы ставки и коэффициента.
            </p>
          </motion.div>

          {/* Правая часть — калькулятор */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="bg-editorial-card-bg border border-editorial-border p-10 md:p-14">
              {/* Сумма ставки */}
              <div className="mb-12">
                <div className="flex justify-between items-baseline mb-4">
                  <label className="text-editorial-text-muted text-xs tracking-[0.3em] uppercase">
                    Сумма ставки
                  </label>
                  <span className="font-[family-name:var(--font-playfair)] text-3xl text-editorial-text">
                    {amount} MAD
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={1000}
                  step={10}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-1 bg-editorial-border rounded-full appearance-none cursor-pointer accent-editorial-accent"
                />
                <div className="flex justify-between text-xs text-editorial-text-muted mt-2">
                  <span>10</span>
                  <span>1000 MAD</span>
                </div>
              </div>

              {/* Коэффициент — пресеты */}
              <div className="mb-12">
                <label className="text-editorial-text-muted text-xs tracking-[0.3em] uppercase block mb-6">
                  Коэффициент
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {presetOdds.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => setOdds(preset.value)}
                      className={`p-4 border text-left transition-all duration-200 ${
                        odds === preset.value
                          ? "border-editorial-accent bg-editorial-accent/5"
                          : "border-editorial-border hover:border-editorial-accent/40"
                      }`}
                    >
                      <span className="font-[family-name:var(--font-playfair)] text-2xl text-editorial-text block">
                        {preset.value.toFixed(1)}
                      </span>
                      <span className="text-editorial-text-muted text-xs mt-1 block">
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Результат */}
              <div className="border-t border-editorial-border pt-10">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-editorial-text-muted text-xs uppercase tracking-wider mb-2">
                      Выигрыш
                    </p>
                    <motion.p
                      key={winnings}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-editorial-accent"
                    >
                      {winnings.toFixed(0)} <span className="text-xl">MAD</span>
                    </motion.p>
                  </div>
                  <div>
                    <p className="text-editorial-text-muted text-xs uppercase tracking-wider mb-2">
                      Чистая прибыль
                    </p>
                    <motion.p
                      key={profit}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-editorial-text"
                    >
                      +{profit.toFixed(0)} <span className="text-xl">MAD</span>
                    </motion.p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
