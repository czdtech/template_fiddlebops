import { ui, defaultLang, type Languages } from "./config";
import { checkTranslationKey, checkTranslationParams } from "./dev-utils";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang && lang in ui) return lang as Languages;
  return defaultLang;
}

type UiType = (typeof ui)[typeof defaultLang];
type UiKey = keyof UiType;

export function useTranslations(lang: Languages) {
  return function t(
    key: UiKey,
    params?: Record<string, string | number>
  ): string {
    const text = (ui[lang][key] ?? ui[defaultLang][key]) as string;

    // 开发环境检查
    if (import.meta.env.DEV) {
      checkTranslationKey(lang, key, ui);
      checkTranslationParams(key, text, params);
    }

    if (params) {
      return Object.entries(params).reduce(
        (acc, [k, v]) => acc.replace(new RegExp(`{${k}}`, "g"), String(v)),
        text
      );
    }

    return text;
  };
}

export function useTranslatedPath(lang: Languages) {
  return function translatePath(path: string, targetLang: Languages = lang) {
    return targetLang === defaultLang ? path : `/${targetLang}${path}`;
  };
}
