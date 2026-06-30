"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { type Locale, locales } from "@/i18n";

const LANGUAGE_FLAGS: Record<Locale, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
  pt: "🇧🇷",
  de: "🇩🇪",
  fr: "🇫🇷",
  zh: "🇨🇳",
  ar: "🇸🇦",
};

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-border-subtle px-3 py-2 text-sm text-text-secondary transition-colors hover:border-primary/30 hover:text-text-primary"
        aria-label="Select language"
      >
        <span>{LANGUAGE_FLAGS[locale]}</span>
        <span className="hidden sm:inline">{t.languages[locale]}</span>
        <svg
          className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1 w-44 overflow-hidden rounded-lg border border-border bg-surface-elevated shadow-xl">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleSelect(loc)}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                locale === loc
                  ? "bg-primary/10 text-primary"
                  : "text-text-secondary hover:bg-surface hover:text-text-primary"
              }`}
            >
              <span>{LANGUAGE_FLAGS[loc]}</span>
              <span>{t.languages[loc]}</span>
              {locale === loc && (
                <svg className="ml-auto h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
