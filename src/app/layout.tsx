import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

// Serif для заголовков — журнальный, элегантный
const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

// Sans-serif для текста — чистый, современный
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RaceHub — Скачки 2026",
    template: "%s | RaceHub",
  },
  description: "Всё о скачках: гид для новичков и главные события сезона 2026. Grand National, Kentucky Derby, Prix de l'Arc de Triomphe.",
  keywords: ["скачки", "horse racing", "Grand National", "Kentucky Derby", "ставки", "2026"],
  openGraph: {
    title: "RaceHub — Скачки 2026",
    description: "Гид для новичков и главные события сезона 2026",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-[family-name:var(--font-inter)] grain">
        {children}
      </body>
    </html>
  );
}
