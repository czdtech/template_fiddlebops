import { en } from "./translations/en";
import { zh } from "./translations/zh";
import {
  checkTranslationCompleteness,
  checkTranslationParams,
} from "./dev-utils";

console.log("🔍 开始检查翻译完整性...\n");

// 检查翻译完整性
checkTranslationCompleteness(en, zh);

// 检查所有翻译中的参数
Object.entries(en).forEach(([key, value]) => {
  if (value.includes("{")) {
    checkTranslationParams(key, value);
  }
});

Object.entries(zh).forEach(([key, value]) => {
  if (value.includes("{")) {
    checkTranslationParams(key, value);
  }
});

console.log("\n✅ 翻译检查完成");
