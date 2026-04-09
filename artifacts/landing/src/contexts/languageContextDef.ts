import { createContext } from "react";
import type { Lang, Translations } from "@/i18n";

export interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
  detecting: boolean;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);
