import type { Languages } from "./config";

// 翻译键类型
export type TranslationKeys = Record<string, string>;

// 检查结果类型
export interface CheckResult {
  errors: number;
  warnings: number;
  details: {
    missingKeys: Record<Languages, string[]>;
    emptyValues: Record<Languages, string[]>;
    paramErrors: Array<{
      lang: Languages;
      key: string;
      message: string;
    }>;
  };
}

// 参数检查结果类型
interface ParamCheckResult {
  missing: string[];
  unused: string[];
}

/**
 * 开发环境专用：检查翻译完整性
 * @param en - 英文翻译对象
 * @param zh - 中文翻译对象
 * @returns 检查结果
 */
export function checkTranslationCompleteness(
  en: TranslationKeys,
  zh: TranslationKeys
): CheckResult {
  if (import.meta.env.PROD) {
    return {
      errors: 0,
      warnings: 0,
      details: {
        missingKeys: { en: [], zh: [] },
        emptyValues: { en: [], zh: [] },
        paramErrors: [],
      },
    };
  }

  let errors = 0;
  let warnings = 0;
  const details: CheckResult["details"] = {
    missingKeys: { en: [], zh: [] },
    emptyValues: { en: [], zh: [] },
    paramErrors: [],
  };

  // 检查缺失的键
  details.missingKeys.zh = Object.keys(en).filter((key) => !(key in zh));
  details.missingKeys.en = Object.keys(zh).filter((key) => !(key in en));

  if (details.missingKeys.zh.length > 0) {
    console.warn("🔍 [i18n] 中文翻译缺失的键:", details.missingKeys.zh);
    warnings += details.missingKeys.zh.length;
  }

  if (details.missingKeys.en.length > 0) {
    console.warn("🔍 [i18n] 英文翻译缺失的键:", details.missingKeys.en);
    warnings += details.missingKeys.en.length;
  }

  // 检查空值
  Object.entries(en).forEach(([key, value]) => {
    if (value.trim() === "") {
      details.emptyValues.en.push(key);
      console.warn("⚠️ [i18n] 英文翻译键值为空:", key);
      warnings++;
    }
  });

  Object.entries(zh).forEach(([key, value]) => {
    if (value.trim() === "") {
      details.emptyValues.zh.push(key);
      console.warn("⚠️ [i18n] 中文翻译键值为空:", key);
      warnings++;
    }
  });

  return { errors, warnings, details };
}

/**
 * 检查翻译文本中的参数
 * @param text - 翻译文本
 * @returns 参数检查结果
 */
function checkParams(
  text: string,
  params?: Record<string, string | number>
): ParamCheckResult {
  const textParams = (text.match(/{(\w+)}/g) || []).map((p) => p.slice(1, -1));
  const providedParams = params ? Object.keys(params) : [];

  return {
    missing: textParams.filter((p) => !providedParams.includes(p)),
    unused: providedParams.filter((p) => !textParams.includes(p)),
  };
}

/**
 * 开发环境专用：检查翻译参数
 * @param key - 翻译键
 * @param text - 翻译文本
 * @param params - 可选的参数对象
 * @param manualParams - 可选的手动替换的参数列表
 */
export function checkTranslationParams(
  key: string,
  text: string,
  params?: Record<string, string | number>,
  manualParams?: string[]
): void {
  if (import.meta.env.PROD) return;

  const { missing, unused } = checkParams(text, params);

  // 过滤掉手动替换的参数
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

/**
 * 开发环境专用：检查翻译键是否存在
 * @param lang - 语言代码
 * @param key - 翻译键
 * @param translations - 翻译对象
 */
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
  if (typeof value !== "string") {
    throw new Error(`在 ${lang} 语言中的翻译键 "${key}" 的值不是字符串`);
  }
}

/**
 * 开发环境专用：检查翻译文本格式
 * @param text - 翻译文本
 * @returns 是否为有效的翻译文本
 */
export function isValidTranslationText(text: string): boolean {
  if (typeof text !== "string") return false;
  if (text.trim() === "") return false;

  // 检查参数格式是否正确
  const paramRegex = /{(\w+)}/g;
  const matches = text.match(paramRegex);
  if (!matches) return true;

  // 检查参数名是否重复
  const params = matches.map((m) => m.slice(1, -1));
  return params.length === new Set(params).size;
}
