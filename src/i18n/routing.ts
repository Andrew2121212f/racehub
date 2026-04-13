import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "en", "fr", "de", "es"],
  defaultLocale: "ru",
  localePrefix: "as-needed",
});
