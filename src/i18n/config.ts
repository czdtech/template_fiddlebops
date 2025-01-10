import type { LanguageConfig } from "./types";
import { en } from "./translations/en";
import { zh } from "./translations/zh";

export const languages: LanguageConfig = {
  en: {
    name: "English",
    code: "en",
    locale: "en-US",
  },
  zh: {
    name: "中文",
    code: "zh",
    locale: "zh-CN",
  },
} as const;

export const defaultLang = "en" as const;

export const ui = {
  en,
  zh,
} as const;

export type Languages = keyof typeof languages;
export type UiKeys = keyof typeof en;
