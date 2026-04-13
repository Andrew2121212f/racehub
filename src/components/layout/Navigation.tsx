"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { routing } from "@/i18n/routing";

// Языковые лейблы
const localeLabels: Record<string, string> = {
  ru: "RU",
  en: "EN",
  fr: "FR",
  de: "DE",
  es: "ES",
};

export default function Navigation() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");
  const isDark = pathname.includes("/races");

  // Якорные секции
  const beginnersSections = [
    { label: t("what"), href: "#what" },
    { label: t("track"), href: "#track" },
    { label: t("distances"), href: "#distances" },
    { label: t("facts"), href: "#facts" },
    { label: t("calculator"), href: "#calculator" },
    { label: t("stars"), href: "#stars" },
    { label: t("favorites"), href: "#favorites" },
  ];

  const racesSections = [
    { label: t("grandNational"), href: "#grand-national-preview" },
    { label: t("timeline"), href: "#timeline" },
    { label: t("analytics"), href: "#analytics" },
    { label: t("map"), href: "#world-map" },
    { label: t("contenders"), href: "#contenders" },
    { label: t("events"), href: "#events" },
  ];

  const sections = isDark ? racesSections : beginnersSections;
  const otherPage = isDark
    ? { label: t("beginners"), href: `/${locale === routing.defaultLocale ? "" : locale + "/"}beginners` }
    : { label: t("races"), href: `/${locale === routing.defaultLocale ? "" : locale + "/"}races` };

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Активная секция
  useEffect(() => {
    const ids = sections.map((s) => s.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  const handleAnchorClick = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  // Получить путь для другого языка
  const getLocalePath = (targetLocale: string) => {
    // Извлекаем путь без текущего locale prefix
    const segments = pathname.split("/").filter(Boolean);
    const isCurrentLocalePrefix = routing.locales.includes(segments[0] as typeof routing.locales[number]);
    const pathWithoutLocale = isCurrentLocalePrefix ? "/" + segments.slice(1).join("/") : pathname;

    if (targetLocale === routing.defaultLocale) return pathWithoutLocale || "/";
    return `/${targetLocale}${pathWithoutLocale}`;
  };

  return (
    <>
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
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between gap-4">
          {/* Логотип */}
          <Link
            href={isDark ? `/${locale === routing.defaultLocale ? "" : locale + "/"}races` : `/${locale === routing.defaultLocale ? "" : locale + "/"}beginners`}
            className={cn(
              "font-[family-name:var(--font-playfair)] text-xl tracking-tight shrink-0",
              isDark ? "text-dark-gold" : "text-editorial-accent"
            )}
          >
            RaceHub
          </Link>

          {/* Якорное меню — десктоп */}
          <div className="hidden lg:flex items-center gap-1">
            {sections.map((s) => {
              const isActive = activeSection === s.href.replace("#", "");
              return (
                <a
                  key={s.href}
                  href={s.href}
                  onClick={(e) => handleAnchorClick(e, s.href)}
                  className={cn(
                    "relative px-3 py-1.5 text-xs tracking-wider whitespace-nowrap transition-colors",
                    isActive
                      ? isDark ? "text-dark-gold" : "text-editorial-accent"
                      : isDark ? "text-dark-text-muted hover:text-dark-text" : "text-editorial-text-muted hover:text-editorial-text"
                  )}
                >
                  {s.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className={cn("absolute bottom-0 left-3 right-3 h-[2px]", isDark ? "bg-dark-gold" : "bg-editorial-accent")}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Ссылка на другой лендинг */}
            <Link
              href={otherPage.href}
              className={cn(
                "text-xs tracking-wider px-3 py-1.5 rounded-full border transition-colors",
                isDark
                  ? "border-dark-gold/30 text-dark-gold hover:bg-dark-gold/10"
                  : "border-editorial-accent/30 text-editorial-accent hover:bg-editorial-accent/5"
              )}
            >
              {otherPage.label} →
            </Link>

            {/* Переключатель языков */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={cn(
                  "text-xs tracking-wider px-3 py-1.5 rounded-full border transition-colors",
                  isDark
                    ? "border-dark-border text-dark-text-muted hover:text-dark-gold hover:border-dark-gold/30"
                    : "border-editorial-border text-editorial-text-muted hover:text-editorial-accent hover:border-editorial-accent/30"
                )}
              >
                {localeLabels[locale] || locale.toUpperCase()}
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className={cn(
                      "absolute top-full right-0 mt-2 py-1 rounded-sm border shadow-xl min-w-[60px]",
                      isDark ? "bg-dark-surface border-dark-border" : "bg-editorial-card-bg border-editorial-border"
                    )}
                  >
                    {routing.locales.map((loc) => (
                      <Link
                        key={loc}
                        href={getLocalePath(loc)}
                        onClick={() => setLangOpen(false)}
                        className={cn(
                          "block px-4 py-1.5 text-xs transition-colors",
                          loc === locale
                            ? isDark ? "text-dark-gold" : "text-editorial-accent"
                            : isDark ? "text-dark-text-muted hover:text-dark-text" : "text-editorial-text-muted hover:text-editorial-text"
                        )}
                      >
                        {localeLabels[loc]}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Бургер — мобильный */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <motion.span animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className={cn("block w-5 h-[1.5px]", isDark ? "bg-dark-gold" : "bg-editorial-accent")} />
            <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className={cn("block w-5 h-[1.5px]", isDark ? "bg-dark-gold" : "bg-editorial-accent")} />
            <motion.span animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className={cn("block w-5 h-[1.5px]", isDark ? "bg-dark-gold" : "bg-editorial-accent")} />
          </button>
        </div>
      </nav>

      {/* Мобильное меню */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "fixed top-16 left-0 right-0 z-40 border-b py-6 px-6 lg:hidden",
              isDark ? "bg-dark-bg/98 backdrop-blur-xl border-dark-border" : "bg-editorial-bg/98 backdrop-blur-xl border-editorial-border"
            )}
          >
            <div className="space-y-1">
              {sections.map((s) => {
                const isActive = activeSection === s.href.replace("#", "");
                return (
                  <a key={s.href} href={s.href} onClick={(e) => handleAnchorClick(e, s.href)}
                    className={cn("block py-3 px-4 text-sm rounded transition-colors",
                      isActive ? isDark ? "text-dark-gold bg-dark-gold/10" : "text-editorial-accent bg-editorial-accent/5"
                        : isDark ? "text-dark-text-muted" : "text-editorial-text-muted"
                    )}
                  >
                    {s.label}
                  </a>
                );
              })}

              <div className={cn("mt-4 pt-4 border-t flex items-center justify-between", isDark ? "border-dark-border" : "border-editorial-border")}>
                <Link href={otherPage.href} onClick={() => setMobileOpen(false)}
                  className={cn("text-sm", isDark ? "text-dark-gold" : "text-editorial-accent")}
                >
                  {otherPage.label} →
                </Link>

                {/* Языки — мобильный */}
                <div className="flex gap-2">
                  {routing.locales.map((loc) => (
                    <Link key={loc} href={getLocalePath(loc)} onClick={() => setMobileOpen(false)}
                      className={cn("text-xs px-2 py-1 rounded",
                        loc === locale
                          ? isDark ? "text-dark-gold bg-dark-gold/10" : "text-editorial-accent bg-editorial-accent/5"
                          : isDark ? "text-dark-text-muted" : "text-editorial-text-muted"
                      )}
                    >
                      {localeLabels[loc]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
