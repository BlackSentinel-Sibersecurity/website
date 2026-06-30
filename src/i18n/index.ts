import en from "./en";
import es from "./es";
import pt from "./pt";
import de from "./de";
import fr from "./fr";
import zh from "./zh";
import ar from "./ar";

export const locales = ["en", "es", "pt", "de", "fr", "zh", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const isRTL = (locale: Locale): boolean => locale === "ar";

type DeepStringify<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? DeepStringify<U>[]
    : T extends object
      ? { -readonly [K in keyof T]: DeepStringify<T[K]> }
      : T;

export type Translations = DeepStringify<typeof en>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const translations: Record<Locale, any> = {
  en,
  es,
  pt,
  de,
  fr,
  zh,
  ar,
};

export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations[defaultLocale];
}

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && locales.includes(first as Locale)) {
    return first as Locale;
  }
  return defaultLocale;
}

export function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && locales.includes(first as Locale)) {
    return "/" + segments.slice(1).join("/");
  }
  return pathname;
}
