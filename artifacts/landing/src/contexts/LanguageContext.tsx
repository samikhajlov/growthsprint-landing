import { useState, useEffect, ReactNode } from "react";
import { Lang, translations, Translations } from "@/i18n";
import { LanguageContext } from "./languageContextDef";

const STORAGE_KEY = "gs_lang";

const COUNTRY_TO_LANG: Record<string, Lang> = {
  JP: "ja",
  US: "en", GB: "en", AU: "en", CA: "en", NZ: "en",
  IE: "en", SG: "en", IN: "en", PH: "en", NG: "en",
  ZA: "en", KE: "en", GH: "en", MY: "en",
  CN: "zh", TW: "zh", HK: "zh", MO: "zh",
  RU: "ru", BY: "ru", KZ: "ru", UA: "ru",
  AM: "ru", AZ: "ru", GE: "ru", UZ: "ru",
};

const VALID_LANGS = new Set<Lang>(["ja", "en", "zh", "ru"]);

function getSavedLang(): Lang | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY) as Lang;
    if (VALID_LANGS.has(v)) return v;
  } catch {}
  return null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getSavedLang() ?? "ja");
  const [detecting, setDetecting] = useState(!getSavedLang());

  useEffect(() => {
    if (getSavedLang()) {
      setDetecting(false);
      return;
    }
    const controller = new AbortController();
    fetch("https://ipapi.co/json/", { signal: controller.signal })
      .then((r) => r.json())
      .then((data: { country_code?: string }) => {
        const detected = data.country_code
          ? COUNTRY_TO_LANG[data.country_code]
          : undefined;
        if (detected) setLangState(detected);
      })
      .catch(() => {})
      .finally(() => setDetecting(false));
    return () => controller.abort();
  }, []);

  function setLang(l: Lang) {
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
    setLangState(l);
  }

  const t = translations[lang] as unknown as Translations;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t, detecting }}>
      {children}
    </LanguageContext.Provider>
  );
}
