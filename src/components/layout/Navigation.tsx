"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// Якорные секции для каждого лендинга
const beginnersSections = [
  { label: "Трасса", href: "#track" },
  { label: "Дистанции", href: "#distances" },
  { label: "Цифры", href: "#facts" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Звёзды", href: "#stars" },
  { label: "Фавориты", href: "#favorites" },
];

const racesSections = [
  { label: "Grand National", href: "#grand-national-preview" },
  { label: "Таймлайн", href: "#timeline" },
  { label: "Аналитика", href: "#analytics" },
  { label: "Карта", href: "#world-map" },
  { label: "Претенденты", href: "#contenders" },
  { label: "События", href: "#events" },
];

// Навигация — прозрачная наверху, якоря секций при скролле
export default function Navigation() {
  const pathname = usePathname();
  const isDark = pathname === "/races";
  const [scrolled, setScrolled] = useState(false);
  const sections = isDark ? racesSections : beginnersSections;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const offset = 80; // высота навигации
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? isDark
            ? "bg-dark-bg/95 backdrop-blur-xl border-b border-dark-border"
            : "bg-editorial-bg/95 backdrop-blur-xl border-b border-editorial-border"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Логотип */}
        <Link
          href="/"
          className={cn(
            "font-[family-name:var(--font-playfair)] text-xl tracking-tight transition-colors shrink-0",
            isDark ? "text-dark-gold" : "text-editorial-accent"
          )}
        >
          RaceHub
        </Link>

        {/* Якоря секций — появляются при скролле (только десктоп) */}
        <div
          className={cn(
            "hidden lg:flex items-center gap-1 transition-all duration-500 overflow-hidden",
            scrolled ? "opacity-100 max-w-[600px]" : "opacity-0 max-w-0"
          )}
        >
          {sections.map((s) => (
            <a
              key={s.href}
              href={s.href}
              onClick={(e) => handleAnchorClick(e, s.href)}
              className={cn(
                "px-3 py-1 text-xs tracking-wider whitespace-nowrap transition-colors",
                isDark
                  ? "text-dark-text-muted hover:text-dark-gold"
                  : "text-editorial-text-muted hover:text-editorial-accent"
              )}
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Переключатель страниц */}
        <div
          className={cn(
            "flex items-center gap-1 p-1 rounded-full border transition-all duration-500 shrink-0",
            scrolled
              ? isDark
                ? "border-dark-border bg-dark-surface"
                : "border-editorial-border bg-editorial-card-bg"
              : isDark
                ? "border-dark-gold/20 bg-dark-bg/50 backdrop-blur-md"
                : "border-editorial-accent/20 bg-editorial-bg/50 backdrop-blur-md"
          )}
        >
          <Link
            href="/beginners"
            className={cn(
              "px-5 py-1.5 rounded-full text-sm transition-all duration-300",
              pathname === "/beginners"
                ? isDark
                  ? "bg-dark-gold text-black font-medium"
                  : "bg-editorial-accent text-white font-medium"
                : isDark
                  ? "text-dark-text-muted hover:text-dark-text"
                  : "text-editorial-text-muted hover:text-editorial-text"
            )}
          >
            Для новичков
          </Link>
          <Link
            href="/races"
            className={cn(
              "px-5 py-1.5 rounded-full text-sm transition-all duration-300",
              pathname === "/races"
                ? isDark
                  ? "bg-dark-gold text-black font-medium"
                  : "bg-editorial-accent text-white font-medium"
                : isDark
                  ? "text-dark-text-muted hover:text-dark-text"
                  : "text-editorial-text-muted hover:text-editorial-text"
            )}
          >
            Скачки 2026
          </Link>
        </div>
      </div>
    </nav>
  );
}
