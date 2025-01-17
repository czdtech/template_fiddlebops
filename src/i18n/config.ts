import type { Language, LanguageConfig } from "./core/types";
import { en } from "./translations/en";
import { zh } from "./translations/zh";

// 验证函数
function isValidLanguageCode(code: string): code is Language {
  return ["en", "zh"].includes(code);
}

function isValidLocale(locale: string): boolean {
  try {
    Intl.getCanonicalLocales(locale);
    return true;
  } catch {
    return false;
  }
}

function validateLanguageConfig(config: LanguageConfig): void {
  Object.entries(config).forEach(([key, value]) => {
    // 验证语言代码
    if (!isValidLanguageCode(key)) {
      throw new Error(`Invalid language code: ${key}`);
    }
    if (!isValidLanguageCode(value.code)) {
      throw new Error(`Invalid language code in config: ${value.code}`);
    }

    // 验证语言名称
    if (!value.name || typeof value.name !== "string") {
      throw new Error(`Invalid language name for ${key}`);
    }

    // 验证区域设置
    if (!value.locale || !isValidLocale(value.locale)) {
      throw new Error(`Invalid locale for ${key}: ${value.locale}`);
    }

    // 验证代码匹配
    if (key !== value.code) {
      throw new Error(`Language code mismatch: ${key} !== ${value.code}`);
    }
  });
}

// 语言配置
export const languages: Readonly<LanguageConfig> = {
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

// 验证语言配置
validateLanguageConfig(languages);

// 默认语言
export const defaultLang: Language = "en" as const;

// 验证默认语言
if (!isValidLanguageCode(defaultLang)) {
  throw new Error(`Invalid default language: ${defaultLang}`);
}

// UI 翻译
export const ui = {
  en,
  zh,
} as const;

// 导出类型
export type Languages = keyof typeof languages;

// 验证翻译键一致性
const enKeys = Object.keys(en).sort();
const zhKeys = Object.keys(zh).sort();

if (
  enKeys.length !== zhKeys.length ||
  !enKeys.every((key, i) => key === zhKeys[i])
) {
  throw new Error("Translation keys mismatch between languages");
}
