import { ui, defaultLang, type Languages } from "./config";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as Languages;
  return defaultLang;
}

type UiType = (typeof ui)[typeof defaultLang];
type UiKey = keyof UiType;

export function useTranslations(lang: Languages) {
  return function t(
    key: UiKey,
    params?: Record<string, string | number>
  ): string {
    let text = (ui[lang][key] ?? ui[defaultLang][key]) as string;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(new RegExp(`{${k}}`, "g"), String(v));
      });
    }
    return text;
  };
}

export function useTranslatedPath(lang: Languages) {
  return function translatePath(path: string, targetLang: Languages = lang) {
    return targetLang === defaultLang ? path : `/${targetLang}${path}`;
  };
}
