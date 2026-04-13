"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

// Footer с навигацией по секциям
export default function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const pathname = usePathname();
  const isDark = pathname.includes("/races");

  // Секции для навигации
  const beginnersSections = [
    { label: tn("what"), href: "#what" },
    { label: tn("distances"), href: "#distances" },
    { label: tn("calculator"), href: "#calculator" },
    { label: tn("stars"), href: "#stars" },
  ];

  const racesSections = [
    { label: tn("grandNational"), href: "#grand-national" },
    { label: tn("timeline"), href: "#timeline" },
    { label: tn("analytics"), href: "#analytics" },
    { label: tn("map"), href: "#world-map" },
    { label: tn("contenders"), href: "#contenders" },
  ];
  const sections = isDark ? racesSections : beginnersSections;

  return (
    <footer
      className={cn(
        "py-20 md:py-28 px-8 md:px-16 lg:px-24 border-t",
        isDark ? "bg-dark-bg border-dark-border" : "bg-editorial-bg border-editorial-border"
      )}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16">
          {/* Логотип + описание */}
          <div>
            <p className={cn(
              "font-[family-name:var(--font-playfair)] text-3xl mb-4",
              isDark ? "text-dark-gold" : "text-editorial-accent"
            )}>
              RaceHub
            </p>
            <p className={cn("text-sm leading-relaxed", isDark ? "text-dark-text-muted" : "text-editorial-text-muted")}>
              {t("description")}
            </p>
          </div>

          {/* Навигация по секциям */}
          <div>
            <p className={cn(
              "text-xs tracking-[0.3em] uppercase mb-5",
              isDark ? "text-dark-gold" : "text-editorial-accent"
            )}>
              {t("sections")}
            </p>
            <ul className="space-y-3">
              {sections.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className={cn(
                      "text-sm hover:underline underline-offset-4 transition-colors",
                      isDark ? "text-dark-text-muted hover:text-dark-text" : "text-editorial-text-muted hover:text-editorial-text"
                    )}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Страницы */}
          <div>
            <p className={cn(
              "text-xs tracking-[0.3em] uppercase mb-5",
              isDark ? "text-dark-gold" : "text-editorial-accent"
            )}>
              {t("landings")}
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/beginners"
                  className={cn(
                    "text-sm hover:underline underline-offset-4 transition-colors",
                    isDark ? "text-dark-text-muted hover:text-dark-text" : "text-editorial-text-muted hover:text-editorial-text"
                  )}
                >
                  {t("beginnersLink")}
                </Link>
              </li>
              <li>
                <Link
                  href="/races"
                  className={cn(
                    "text-sm hover:underline underline-offset-4 transition-colors",
                    isDark ? "text-dark-text-muted hover:text-dark-text" : "text-editorial-text-muted hover:text-editorial-text"
                  )}
                >
                  {t("racesLink")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Копирайт */}
        <div className={cn("pt-8 border-t", isDark ? "border-dark-border" : "border-editorial-border")}>
          <p className={cn("text-xs", isDark ? "text-dark-text-muted" : "text-editorial-text-muted")}>
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
