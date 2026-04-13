"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// Секция "Что такое скачки" — editorial, много воздуха, pull-quote
export default function WhatAreRaces() {
  const t = useTranslations("whatAreRaces");
  return (
    <section className="py-32 md:py-48 px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Асимметричная сетка */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-2" />

          <motion.div
            className="md:col-span-10 lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-editorial-text mb-10 leading-tight">
              {t("title")}
            </h2>

            <div className="editorial-divider mb-10" />

            <div className="space-y-8 text-editorial-text-muted text-lg md:text-xl leading-relaxed">
              <p>
                {t("p1")}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Pull-quote — крупная цитата, визуальный акцент */}
        <motion.blockquote
          className="my-24 md:my-32 relative pl-8 md:pl-12 border-l-4 border-editorial-accent max-w-3xl mx-auto"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <svg
            viewBox="0 0 24 24"
            className="absolute -top-6 -left-3 w-10 h-10 text-editorial-accent/20"
            fill="currentColor"
          >
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>
          <p className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-editorial-text leading-snug">
            {t("quote")}
          </p>
        </motion.blockquote>

        {/* Элементы скачек */}
        <motion.div
          className="mt-24 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { label: t("gates"), num: "01", desc: t("gatesDesc") },
            { label: t("circuit"), num: "02", desc: t("circuitDesc") },
            { label: t("turn"), num: "03", desc: t("turnDesc") },
            { label: t("finish"), num: "04", desc: t("finishDesc") },
          ].map((item) => (
            <div key={item.num} className="group">
              <span className="font-[family-name:var(--font-playfair)] text-6xl md:text-7xl text-editorial-border group-hover:text-editorial-accent transition-colors duration-300">
                {item.num}
              </span>
              <p className="mt-4 text-editorial-text font-medium text-lg">{item.label}</p>
              <p className="mt-2 text-editorial-text-muted text-sm">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
