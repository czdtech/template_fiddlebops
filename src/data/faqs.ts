import type { FAQ, FAQKey } from "./types";
import { isValidFAQ } from "./types";
import { FAQ_CATEGORIES } from "@/config/constants";

/**
 * FAQ 数据
 * 包含游戏常见问题及其答案
 * @remarks
 * - 问题和答案使用国际化键
 * - 键必须在 translations 文件中定义
 * - 问题键格式: faq.qN
 * - 答案键格式: faq.aN
 */
const faqsData = [
  {
    question: "faq.q1" as FAQKey,
    answer: "faq.a1" as FAQKey,
    category: FAQ_CATEGORIES.GAMEPLAY,
  },
  {
    question: "faq.q2" as FAQKey,
    answer: "faq.a2" as FAQKey,
    category: FAQ_CATEGORIES.GAMEPLAY,
  },
  {
    question: "faq.q3" as FAQKey,
    answer: "faq.a3" as FAQKey,
    category: FAQ_CATEGORIES.TECHNICAL,
  },
  {
    question: "faq.q4" as FAQKey,
    answer: "faq.a4" as FAQKey,
    category: FAQ_CATEGORIES.TECHNICAL,
  },
  {
    question: "faq.q5" as FAQKey,
    answer: "faq.a5" as FAQKey,
    category: FAQ_CATEGORIES.GENERAL,
  },
  {
    question: "faq.q6" as FAQKey,
    answer: "faq.a6" as FAQKey,
    category: FAQ_CATEGORIES.GENERAL,
  },
  {
    question: "faq.q7" as FAQKey,
    answer: "faq.a7" as FAQKey,
    category: FAQ_CATEGORIES.GAMEPLAY,
  },
  {
    question: "faq.q8" as FAQKey,
    answer: "faq.a8" as FAQKey,
    category: FAQ_CATEGORIES.TECHNICAL,
  },
] as const;

// 验证 FAQ 数据
try {
  faqsData.forEach((faq, index) => {
    try {
      isValidFAQ(faq);
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(
          `FAQ validation failed at index ${index}:\n${err.message}`
        );
      }
      throw err;
    }
  });
} catch (err: unknown) {
  if (err instanceof Error) {
    console.error("FAQs validation error:", err.message);
  }
  throw err;
}

/**
 * 导出 FAQ 数据
 * @constant
 * @type {readonly FAQ[]}
 */
export const faqs: readonly FAQ[] = faqsData;

/**
 * 按类别获取 FAQ
 * @param {(typeof FAQ_CATEGORIES)[keyof typeof FAQ_CATEGORIES]} category - FAQ 类别
 * @returns {readonly FAQ[]} 指定类别的 FAQ 列表
 */
export function getFAQsByCategory(
  category: (typeof FAQ_CATEGORIES)[keyof typeof FAQ_CATEGORIES]
): readonly FAQ[] {
  return faqsData.filter((faq) => faq.category === category);
}
