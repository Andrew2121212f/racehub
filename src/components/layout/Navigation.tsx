"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Навигация-переключатель: адаптируется визуально к текущей странице
export default function Navigation() {
  const pathname = usePathname();
  const isDark = pathname === "/races";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isDark
          ? "bg-dark-bg/80 backdrop-blur-xl border-b border-dark-border"
          : "bg-editorial-bg/80 backdrop-blur-xl border-b border-editorial-border"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Логотип */}
        <Link
          href="/"
          className={cn(
            "font-[family-name:var(--font-playfair)] text-xl tracking-tight",
            isDark ? "text-dark-gold" : "text-editorial-accent"
          )}
        >
          RaceHub
        </Link>

        {/* Переключатель страниц */}
        <div className="flex items-center gap-1 p-1 rounded-full border"
          style={{
            borderColor: isDark ? "var(--dark-border)" : "var(--editorial-border)",
            background: isDark ? "var(--dark-surface)" : "var(--editorial-card-bg)",
          }}
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
