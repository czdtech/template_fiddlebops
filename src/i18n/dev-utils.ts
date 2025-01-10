import type { Languages } from "./config";

type TranslationKeys = Record<string, string>;

/**
 * 开发环境专用：检查翻译完整性
 */
export function checkTranslationCompleteness(
  en: TranslationKeys,
  zh: TranslationKeys
): void {
  if (import.meta.env.PROD) return;

  const missingKeys = {
    zh: Object.keys(en).filter((key) => !(key in zh)),
    en: Object.keys(zh).filter((key) => !(key in en)),
  };

  if (missingKeys.zh.length > 0) {
    console.warn("🔍 [i18n] 中文翻译缺失的键:", missingKeys.zh);
  }

  if (missingKeys.en.length > 0) {
    console.warn("🔍 [i18n] 英文翻译缺失的键:", missingKeys.en);
  }

  // 检查值是否为空字符串
  Object.entries(en).forEach(([key, value]) => {
    if (value === "") {
      console.warn("⚠️ [i18n] 英文翻译键值为空:", key);
    }
  });

  Object.entries(zh).forEach(([key, value]) => {
    if (value === "") {
      console.warn("⚠️ [i18n] 中文翻译键值为空:", key);
    }
  });
}

/**
 * 开发环境专用：检查翻译参数
 */
export function checkTranslationParams(
  key: string,
  text: string,
  params?: Record<string, string | number>
): void {
  if (import.meta.env.PROD) return;

  if (params) {
    const textParams = (text.match(/{(\w+)}/g) || []) as string[];
    const providedParams = Object.keys(params).map((k) => `{${k}}`);

    // 检查是否有未提供的参数
    textParams.forEach((param) => {
      if (!providedParams.includes(param)) {
        console.warn(`⚠️ [i18n] 翻译键 "${key}" 缺少参数: ${param}`);
      }
    });

    // 检查是否有多余的参数
    providedParams.forEach((param) => {
      if (!textParams.includes(param)) {
        console.warn(`⚠️ [i18n] 翻译键 "${key}" 收到了未使用的参数: ${param}`);
      }
    });
  }
}

/**
 * 开发环境专用：检查翻译键是否存在
 */
export function checkTranslationKey(
  lang: Languages,
  key: string,
  translations: Record<Languages, TranslationKeys>
): void {
  if (import.meta.env.PROD) return;

  if (!translations[lang][key]) {
    console.warn(`🔍 [i18n] 在 ${lang} 语言中缺失翻译键: "${key}"`);
  }
}
