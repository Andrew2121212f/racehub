import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "RaceHub — Скачки 2026",
    template: "%s | RaceHub",
  },
  description: "Всё о скачках: гид для новичков и главные события сезона 2026.",
  keywords: ["скачки", "horse racing", "Grand National", "Kentucky Derby", "2026"],
  openGraph: {
    title: "RaceHub — Скачки 2026",
    description: "Гид для новичков и главные события сезона 2026",
    type: "website",
    locale: "ru_RU",
  },
};

// Root layout — минимальный, всё в [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
