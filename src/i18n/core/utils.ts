import { ui, defaultLang, type Languages } from "../config";
import type {
  TranslationKeys,
  UiType,
  UiKey,
  TranslationFunction,
  Language,
} from "../core/types";

export type { TranslationKeys, UiType, UiKey, TranslationFunction, Language };

// 基础工具函数
export function getLangFromUrl(url: URL): Languages {
  const [, lang] = url.pathname.split("/");
  if (lang && lang in ui) return lang as Languages;
  return defaultLang;
}

export function useTranslations(lang: Languages): TranslationFunction {
  return function t(
    key: UiKey,
    params?: Record<string, string | number>,
    manualParams?: string[]
  ): string {
    const text = (ui[lang][key] ?? ui[defaultLang][key]) as string;

    if (import.meta.env.DEV) {
      checkTranslationKey(lang, key, ui);
      checkTranslationParams(key, text, params, manualParams);
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
  return function translatePath(
    path: string,
    targetLang: Languages = lang
  ): string {
    return targetLang === defaultLang ? path : `/${targetLang}${path}`;
  };
}

export function getBrowserLanguage(): Languages {
  if (typeof navigator === "undefined") return defaultLang;
  const browserLang = navigator.language.split("-")[0] || defaultLang;
  return browserLang in ui ? (browserLang as Languages) : defaultLang;
}

export function isValidLanguage(lang: string): lang is Languages {
  return lang in ui;
}

// 开发环境工具函数
function checkParams(
  text: string,
  params?: Record<string, string | number>
): { missing: string[]; unused: string[] } {
  const textParams = (text.match(/{(\w+)}/g) || []).map((p) => p.slice(1, -1));
  const providedParams = params ? Object.keys(params) : [];

  return {
    missing: textParams.filter((p) => !providedParams.includes(p)),
    unused: providedParams.filter((p) => !textParams.includes(p)),
  };
}

export function checkTranslationParams(
  key: string,
  text: string,
  params?: Record<string, string | number>,
  manualParams?: string[]
): void {
  if (import.meta.env.PROD) return;

  const { missing, unused } = checkParams(text, params);
  const actualMissing = manualParams
    ? missing.filter((param) => !manualParams.includes(param))
    : missing;

  if (actualMissing.length > 0) {
    throw new Error(
      `翻译键 "${key}" 缺少参数: ${actualMissing
        .map((p) => `{${p}}`)
        .join(", ")}`
    );
  }

  if (unused.length > 0) {
    throw new Error(
      `翻译键 "${key}" 收到了未使用的参数: ${unused
        .map((p) => `{${p}}`)
        .join(", ")}`
    );
  }
}

export function checkTranslationKey(
  lang: Languages,
  key: string,
  translations: Record<Languages, TranslationKeys>
): void {
  if (import.meta.env.PROD) return;

  if (!translations[lang][key]) {
    throw new Error(`在 ${lang} 语言中缺失翻译键: "${key}"`);
  }

  const value = translations[lang][key];
  if (typeof value !== "string" && typeof value !== "number") {
    throw new Error(`在 ${lang} 语言中的翻译键 "${key}" 的值不是字符串或数字`);
  }
}

export function isValidTranslationText(text: string): boolean {
  if (typeof text !== "string") return false;
  if (text.trim() === "") return false;

  const paramRegex = /{(\w+)}/g;
  const matches = text.match(paramRegex);
  if (!matches) return true;

  const params = matches.map((m) => m.slice(1, -1));
  return params.length === new Set(params).size;
}
