import { ui, defaultLang, type Languages } from "../config";

export type { Languages };

// 语言相关类型
export type Language = "en" | "zh";
export type LanguageConfig = Record<
  Language,
  {
    name: string;
    code: Language;
    locale: string;
  }
>;

// UI 相关类型
export type UiType = (typeof ui)[typeof defaultLang];
export type UiKey = keyof UiType;

// 翻译相关类型
export type TranslationFunction = (
  key: UiKey,
  params?: Record<string, string | number>,
  manualParams?: string[]
) => string;

export type TranslationKeys = Record<string, string | number>;

// 检查结果类型
export interface CheckResult {
  errors: number;
  warnings: number;
  details: {
    missingKeys: Record<Language, string[]>;
    emptyValues: Record<Language, string[]>;
    paramErrors: Array<{
      lang: Language;
      key: string;
      message: string;
    }>;
  };
}
