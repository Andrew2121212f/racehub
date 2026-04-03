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
  title: "RaceHub — Скачки 2026",
  description: "Всё о скачках: гид для новичков и главные события сезона 2026",
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
