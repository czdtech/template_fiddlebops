import type { NonEmptyString } from "@/config/types";
import { VALID_FEATURE_ICONS, FAQ_CATEGORIES } from "@/config/constants";

// 特性相关类型定义
export type FeatureKey =
  | "features.gameplay.title"
  | "features.gameplay.description"
  | "features.music.title"
  | "features.music.description"
  | "features.feedback.title"
  | "features.feedback.description"
  | "features.difficulty.title"
  | "features.difficulty.description";

// FAQ 相关类型定义
export type FAQKey =
  | "faq.q1"
  | "faq.q2"
  | "faq.q3"
  | "faq.q4"
  | "faq.q5"
  | "faq.q6"
  | "faq.q7"
  | "faq.q8"
  | "faq.a1"
  | "faq.a2"
  | "faq.a3"
  | "faq.a4"
  | "faq.a5"
  | "faq.a6"
  | "faq.a7"
  | "faq.a8";

/**
 * 特性图标类型，基于预定义的图标常量
 */
export type FeatureIcon =
  (typeof VALID_FEATURE_ICONS)[keyof typeof VALID_FEATURE_ICONS];

/**
 * FAQ 类别类型
 */
export type FAQCategory = (typeof FAQ_CATEGORIES)[keyof typeof FAQ_CATEGORIES];

/**
 * 游戏特性数据结构
 * @interface Feature
 * @property {FeatureIcon} icon - 特性图标，必须是预定义的表情符号之一
 * @property {FeatureKey} title - 特性标题的国际化键
 * @property {FeatureKey} description - 特性描述的国际化键
 */
export interface Feature {
  readonly icon: FeatureIcon;
  readonly title: FeatureKey;
  readonly description: FeatureKey;
}

/**
 * FAQ 接口定义
 * @interface FAQ
 * @property {FAQKey} question - FAQ 问题的国际化键
 * @property {FAQKey} answer - FAQ 答案的国际化键
 * @property {FAQCategory} category - FAQ 类别
 */
export interface FAQ {
  readonly question: FAQKey;
  readonly answer: FAQKey;
  readonly category: FAQCategory;
}

// 社交链接接口定义
export interface SocialLink {
  readonly platform: NonEmptyString;
  readonly url: NonEmptyString;
  readonly icon: NonEmptyString;
  readonly label: NonEmptyString;
}

/**
 * 验证特性键是否有效
 * @param {unknown} key - 要验证的键
 * @returns {boolean} 是否是有效的特性键
 */
function isValidFeatureKey(key: unknown): key is FeatureKey {
  if (typeof key !== "string") return false;
  return (
    key.startsWith("features.") &&
    (key.endsWith(".title") || key.endsWith(".description"))
  );
}

/**
 * 验证特性数据是否有效
 * @param {unknown} feature - 要验证的特性数据
 * @returns {boolean} 是否是有效的特性数据
 * @throws {string} 详细的验证错误信息
 */
export function isValidFeature(feature: unknown): feature is Feature {
  if (!feature || typeof feature !== "object") {
    throw new Error("Feature must be an object");
  }

  const { icon, title, description } = feature as Feature;
  const validIcons = Object.values(VALID_FEATURE_ICONS);

  const errors: string[] = [];

  if (!validIcons.includes(icon as FeatureIcon)) {
    errors.push(
      `Invalid icon: ${icon}. Must be one of: ${validIcons.join(", ")}`
    );
  }

  if (!isValidFeatureKey(title)) {
    errors.push(`Invalid title key: ${title}`);
  }

  if (!isValidFeatureKey(description)) {
    errors.push(`Invalid description key: ${description}`);
  }

  if (errors.length > 0) {
    throw new Error(`Feature validation failed:\n${errors.join("\n")}`);
  }

  return true;
}

/**
 * 验证 FAQ 数据是否有效
 * @param {unknown} faq - 要验证的 FAQ 数据
 * @returns {boolean} 是否是有效的 FAQ 数据
 * @throws {Error} 验证失败时抛出错误
 */
export function isValidFAQ(faq: unknown): faq is FAQ {
  if (!faq || typeof faq !== "object") {
    throw new Error("FAQ must be an object");
  }

  const { question, answer, category } = faq as FAQ;
  const errors: string[] = [];

  if (typeof question !== "string" || !question.startsWith("faq.q")) {
    errors.push(`Invalid question key: ${question}`);
  }

  if (typeof answer !== "string" || !answer.startsWith("faq.a")) {
    errors.push(`Invalid answer key: ${answer}`);
  }

  const validCategories = Object.values(FAQ_CATEGORIES);
  if (!validCategories.includes(category as FAQCategory)) {
    errors.push(
      `Invalid category: ${category}. Must be one of: ${validCategories.join(
        ", "
      )}`
    );
  }

  if (errors.length > 0) {
    throw new Error(`FAQ validation failed:\n${errors.join("\n")}`);
  }

  return true;
}
