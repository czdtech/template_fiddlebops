import { en } from "./translations/en";
import { zh } from "./translations/zh";
import { checkTranslationCompleteness } from "./dev-utils";

export const languages = {
  en: "English",
  zh: "中文",
} as const;

export const defaultLang = "en";

export const ui = {
  en,
  zh,
} as const;

export type Languages = keyof typeof languages;
export type UiKeys = keyof typeof en;

// 在开发环境中检查翻译完整性
if (import.meta.env.DEV) {
  checkTranslationCompleteness(en, zh);
}
