"use client";

import { createContext, useContext } from "react";
import { tx, type TranslationKey } from "@/lib/translations";

interface LanguageContextValue {
  lang: "en";
  setLang: (lang: "en") => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: (key) => tx(key, "en"),
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return (
    <LanguageContext.Provider
      value={{ lang: "en", setLang: () => {}, t: (key) => tx(key, "en") }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
