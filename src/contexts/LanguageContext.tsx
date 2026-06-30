"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import {
  type Locale,
  type Translations,
  getTranslations,
  isRTL,
  defaultLocale,
} from "@/i18n";

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  try {
    const stored = localStorage.getItem("bs-locale");
    if (stored && (["en", "es", "pt", "de", "fr", "zh", "ar"] as string[]).includes(stored)) {
      return stored as Locale;
    }
  } catch {
    // localStorage not available
  }
  return defaultLocale;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRTL(locale) ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem("bs-locale", newLocale);
    } catch {
      // localStorage not available
    }
  }, []);

  const t = getTranslations(locale);

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale, isRTL: isRTL(locale) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      locale: defaultLocale,
      t: getTranslations(defaultLocale),
      setLocale: () => {},
      isRTL: false,
    };
  }
  return context;
}
