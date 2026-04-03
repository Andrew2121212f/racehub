import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Утилита для объединения Tailwind-классов
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Форматирование даты из unix timestamp
export function formatDate(unix: number): string {
  return new Date(unix * 1000).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
}

// Форматирование времени
export function formatTime(unix: number): string {
  return new Date(unix * 1000).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
