import type { Languages } from "./config";
import type { TranslationKeys } from "./dev-utils";
import { en } from "./translations/en";
import { zh } from "./translations/zh";
import {
  checkTranslationCompleteness,
  checkTranslationParams,
  checkTranslationKey,
} from "./dev-utils";

// 检查环境
if (import.meta.env.PROD) {
  console.warn("⚠️ 翻译检查工具仅应在开发环境中使用");
  process.exit(0);
}

// 定义翻译映射
const translations: Record<Languages, TranslationKeys> = {
  en,
  zh,
} as const;

// 错误计数器
let errorCount = 0;
let warningCount = 0;

console.log("🔍 开始检查翻译完整性...\n");

try {
  // 检查翻译完整性
  const completenessErrors = checkTranslationCompleteness(en, zh);
  errorCount += completenessErrors.errors;
  warningCount += completenessErrors.warnings;

  // 检查翻译参数
  Object.entries(translations).forEach(([lang, langTranslations]) => {
    Object.entries(langTranslations).forEach(([key, value]) => {
      try {
        // 检查翻译键是否存在
        checkTranslationKey(lang as Languages, key, translations);

        // 检查参数格式
        if (typeof value === "string" && value.includes("{")) {
          checkTranslationParams(key, value);
        }
      } catch (e: unknown) {
        const error = e as Error;
        console.error(`❌ [${lang}] ${error.message}`);
        errorCount++;
      }
    });
  });

  // 输出检查结果
  console.log("\n📊 检查结果统计:");
  console.log(`- 错误: ${errorCount}`);
  console.log(`- 警告: ${warningCount}`);

  if (errorCount > 0) {
    console.error("\n❌ 翻译检查失败，请修复上述错误");
    process.exit(1);
  } else if (warningCount > 0) {
    console.warn("\n⚠️ 翻译检查完成，但存在警告需要关注");
    process.exit(0);
  } else {
    console.log("\n✅ 翻译检查通过");
    process.exit(0);
  }
} catch (e: unknown) {
  const error = e as Error;
  console.error("\n❌ 翻译检查过程中发生错误:", error.message);
  process.exit(1);
}
