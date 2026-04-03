"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Общий футер — много воздуха
export default function Footer() {
  const pathname = usePathname();
  const isDark = pathname === "/races";

  return (
    <footer
      className={cn(
        "py-24 md:py-32 px-8 md:px-16 lg:px-24 border-t",
        isDark
          ? "bg-dark-bg border-dark-border"
          : "bg-editorial-bg border-editorial-border"
      )}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        <div>
          <p
            className={cn(
              "font-[family-name:var(--font-playfair)] text-3xl mb-3",
              isDark ? "text-dark-gold" : "text-editorial-accent"
            )}
          >
            RaceHub
          </p>
          <p className={cn("text-sm", isDark ? "text-dark-text-muted" : "text-editorial-text-muted")}>
            Всё о скачках: от основ до главных событий сезона
          </p>
        </div>
        <p className={cn("text-xs", isDark ? "text-dark-text-muted" : "text-editorial-text-muted")}>
          &copy; 2026 RaceHub. Информационный ресурс.
        </p>
      </div>
    </footer>
  );
}
