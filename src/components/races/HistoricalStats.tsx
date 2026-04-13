"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

// Анимированный ring chart (круговая диаграмма)
function AnimatedRing({ percentage, delay = 0, favoritesLabel }: { percentage: number; delay?: number; favoritesLabel: string }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40">
      {/* Фоновый круг */}
      <circle
        cx="50" cy="50" r={radius}
        fill="none" stroke="var(--dark-border)" strokeWidth="4"
      />
      {/* Прогресс */}
      <motion.circle
        cx="50" cy="50" r={radius}
        fill="none" stroke="var(--dark-gold)" strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay, ease: "easeOut" }}
        transform="rotate(-90 50 50)"
      />
      {/* Текст по центру */}
      <text x="50" y="45" textAnchor="middle" className="fill-dark-gold text-lg font-bold" style={{ fontSize: "18px" }}>
        {percentage}%
      </text>
      <text x="50" y="60" textAnchor="middle" className="fill-dark-text-muted" style={{ fontSize: "7px" }}>
        {favoritesLabel}
      </text>
    </svg>
  );
}

// Исторические паттерны — 4 карточки с визуализацией
export default function HistoricalStats() {
  const t = useTranslations("historicalStats");

  // Реальные победители Grand National
  const recentWinners = [
    { year: "2025", name: "I Am Maximus", odds: "5/1", jockey: "P. Townend" },
    { year: "2024", name: "I Am Maximus", odds: "7/1", jockey: "P. Townend" },
    { year: "2023", name: "Corach Rambler", odds: "15/2", jockey: "D. Egan" },
    { year: "2022", name: "Noble Yeats", odds: "50/1", jockey: "S. Waley-Cohen" },
    { year: "2021", name: "Minella Times", odds: "11/1", jockey: "R. Blackmore" },
  ];

  // Профиль идеального победителя Grand National
  const winnerProfile = [
    { label: t("age"), check: true, detail: t("ageDetail") },
    { label: t("weightUnder"), check: true, detail: t("weightDetail") },
    { label: t("irishTrainer"), check: true, detail: t("irishTrainerDetail") },
    { label: t("fenceExperience"), check: true, detail: t("fenceExperienceDetail") },
    { label: t("goodForm"), check: false, detail: t("goodFormDetail") },
  ];

  return (
    <section className="py-32 md:py-48 px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-dark-gold text-xs tracking-[0.5em] uppercase mb-8">
            {t("label")}
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-dark-text leading-tight mb-6">
            {t("title")}
          </h2>
          <p className="text-dark-text-muted text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Карточка 1: Процент побед фаворита */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 md:p-10 bg-dark-surface border border-dark-border hover:border-dark-gold/30 transition-colors"
          >
            <p className="text-dark-gold text-xs tracking-[0.3em] uppercase mb-6">
              {t("favoritesRare")}
            </p>
            <div className="flex items-center gap-8">
              <AnimatedRing percentage={17} delay={0.3} favoritesLabel={t("favoritesOf")} />
              <div>
                <p className="font-[family-name:var(--font-playfair)] text-5xl text-dark-text mb-2">
                  12<span className="text-dark-text-muted text-2xl">/71</span>
                </p>
                <p className="text-dark-text-muted text-sm leading-relaxed">
                  {t("favoritesText")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Карточка 2: Последние победители */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 md:p-10 bg-dark-surface border border-dark-border hover:border-dark-gold/30 transition-colors"
          >
            <p className="text-dark-gold text-xs tracking-[0.3em] uppercase mb-6">
              {t("recentWinners")}
            </p>
            <div className="space-y-3">
              {recentWinners.map((w, i) => (
                <motion.div
                  key={w.year}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-4 py-2 border-b border-dark-border/50 last:border-0"
                >
                  <span className="text-dark-gold font-[family-name:var(--font-playfair)] text-lg w-14">
                    {w.year}
                  </span>
                  <span className="text-dark-text font-medium flex-1">
                    {w.name}
                  </span>
                  <span className="text-dark-gold text-sm font-medium w-12 text-right">
                    {w.odds}
                  </span>
                  <span className="text-dark-text-muted text-xs w-24 text-right hidden sm:block">
                    {w.jockey}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Карточка 3: Профиль победителя */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-8 md:p-10 bg-dark-surface border border-dark-border hover:border-dark-gold/30 transition-colors"
          >
            <p className="text-dark-gold text-xs tracking-[0.3em] uppercase mb-6">
              {t("winnerProfile")}
            </p>
            <div className="space-y-4">
              {winnerProfile.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className={`w-5 h-5 rounded-sm border flex items-center justify-center shrink-0 mt-0.5 ${
                    item.check
                      ? "border-dark-gold bg-dark-gold/10 text-dark-gold"
                      : "border-dark-border text-dark-text-muted"
                  }`}>
                    {item.check ? "✓" : "○"}
                  </div>
                  <div>
                    <p className="text-dark-text text-sm font-medium">{item.label}</p>
                    <p className="text-dark-text-muted text-xs">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Карточка 4: Статистический инсайт */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-8 md:p-10 bg-dark-surface border border-dark-border hover:border-dark-gold/30 transition-colors"
          >
            <p className="text-dark-gold text-xs tracking-[0.3em] uppercase mb-6">
              {t("weightVsWins")}
            </p>

            {/* Визуальная шкала весов */}
            <div className="space-y-4 mb-6">
              {[
                { weight: "< 10st", wins: 45, label: t("weightUnder10") },
                { weight: "10–11st", wins: 35, label: t("weight10to11") },
                { weight: "> 11st", wins: 20, label: t("weightOver11") },
              ].map((row, i) => (
                <div key={row.weight}>
                  <div className="flex justify-between mb-1">
                    <span className="text-dark-text-muted text-xs">{row.label}</span>
                    <span className="text-dark-gold text-xs">{row.wins}%</span>
                  </div>
                  <div className="h-2 bg-dark-border/30 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-dark-gold to-dark-gold-light"
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${row.wins}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.6 + i * 0.15 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-dark-text-muted text-xs leading-relaxed border-t border-dark-border pt-4">
              {t("lightHorses")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
