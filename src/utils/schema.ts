/**
 * Schema.org 结构化数据生成工具
 * @description 提供游戏、面包屑、FAQ和组织等结构化数据的生成和验证功能
 */

import type { SiteConfig } from "../config/types";

// Schema 类型
export const SchemaType = {
  VIDEO_GAME: "VideoGame",
  OFFER: "Offer",
  AGGREGATE_RATING: "AggregateRating",
  ORGANIZATION: "Organization",
  PERSON: "Person",
  REVIEW: "Review",
  RATING: "Rating",
  THING: "Thing",
  BREADCRUMB_LIST: "BreadcrumbList",
  LIST_ITEM: "ListItem",
  FAQ_PAGE: "FAQPage",
  QUESTION: "Question",
  ANSWER: "Answer",
} as const;

export type SchemaType = (typeof SchemaType)[keyof typeof SchemaType];

// 游戏平台
export const GamePlatform = {
  WEB_BROWSER: "Web Browser",
  PC: "PC",
  MOBILE: "Mobile",
  TABLET: "Tablet",
} as const;

export type GamePlatform = (typeof GamePlatform)[keyof typeof GamePlatform];

// 操作系统
export const OperatingSystem = {
  WINDOWS: "Windows",
  MACOS: "macOS",
  LINUX: "Linux",
  ANDROID: "Android",
  IOS: "iOS",
} as const;

export type OperatingSystem =
  (typeof OperatingSystem)[keyof typeof OperatingSystem];

// 游戏类型
export const GameGenre = {
  MUSIC: "Music",
  RHYTHM: "Rhythm",
  CASUAL: "Casual",
  EDUCATIONAL: "Educational",
  BROWSER_GAME: "Browser Game",
} as const;

export type GameGenre = (typeof GameGenre)[keyof typeof GameGenre];

// Schema 接口定义
export interface SchemaOrgGame {
  "@context": "https://schema.org";
  "@type": typeof SchemaType.VIDEO_GAME;
  name: string;
  description: string;
  url: string;
  image: string;
  genre: GameGenre[];
  gamePlatform: GamePlatform[];
  applicationCategory: "Game";
  operatingSystem: OperatingSystem[];
  offers: {
    "@type": typeof SchemaType.OFFER;
    price: string;
    priceCurrency: string;
    availability: string;
    url: string;
  };
  aggregateRating?: {
    "@type": typeof SchemaType.AGGREGATE_RATING;
    ratingValue: string;
    ratingCount: string;
    bestRating: string;
    worstRating: string;
  };
  author: {
    "@type": typeof SchemaType.ORGANIZATION;
    name: string;
    description: string;
    email: string;
    location: string;
  };
  publisher: {
    "@type": typeof SchemaType.ORGANIZATION;
    name: string;
    url: string;
  };
  gameItem: Array<{
    "@type": typeof SchemaType.THING;
    name: string;
    description: string;
  }>;
  review?: {
    "@type": typeof SchemaType.REVIEW;
    reviewRating: {
      "@type": typeof SchemaType.RATING;
      ratingValue: string;
      bestRating: string;
      worstRating: string;
    };
    author: {
      "@type": typeof SchemaType.PERSON;
      name: string;
    };
    reviewBody: string;
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * 验证 URL 格式
 * @param url 要验证的 URL
 * @returns {boolean} 是否为有效 URL
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 验证评分值
 * @param value 评分值
 * @param min 最小值
 * @param max 最大值
 * @returns {boolean} 是否为有效评分
 */
function isValidRating(value: string, min: string, max: string): boolean {
  const rating = parseFloat(value);
  const minRating = parseFloat(min);
  const maxRating = parseFloat(max);
  return (
    !isNaN(rating) &&
    !isNaN(minRating) &&
    !isNaN(maxRating) &&
    rating >= minRating &&
    rating <= maxRating
  );
}

/**
 * 验证游戏 Schema
 * @param schema 游戏 Schema 数据
 * @throws {Error} 如果数据无效
 */
function validateGameSchema(schema: SchemaOrgGame): void {
  if (!schema.name || !schema.description) {
    throw new Error("游戏名称和描述不能为空");
  }

  if (!isValidUrl(schema.url)) {
    throw new Error(`无效的游戏 URL: ${schema.url}`);
  }

  if (!isValidUrl(schema.image)) {
    throw new Error(`无效的图片 URL: ${schema.image}`);
  }

  if (schema.aggregateRating) {
    const { ratingValue, bestRating, worstRating } = schema.aggregateRating;
    if (!isValidRating(ratingValue, worstRating, bestRating)) {
      throw new Error("无效的评分值");
    }
  }

  if (!schema.author.email.includes("@")) {
    throw new Error("无效的作者邮箱地址");
  }

  if (!isValidUrl(schema.publisher.url)) {
    throw new Error(`无效的发布者 URL: ${schema.publisher.url}`);
  }
}

// 处理相对路径
function resolveUrl(base: string, path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const baseUrl = new URL(base);
  return new URL(path, baseUrl).toString();
}

/**
 * 生成游戏 Schema
 * @param site 站点配置
 * @param canonicalURL 规范 URL
 * @throws {Error} 如果生成的 Schema 无效
 * @returns {SchemaOrgGame} 游戏 Schema 数据
 */
export function generateGameSchema(
  site: SiteConfig,
  canonicalURL: URL
): SchemaOrgGame {
  const schema: SchemaOrgGame = {
    "@context": "https://schema.org",
    "@type": SchemaType.VIDEO_GAME,
    name: site.name,
    description: site.description,
    url: canonicalURL.toString(),
    image: resolveUrl(canonicalURL.toString(), site.ogImage),
    genre: [
      GameGenre.MUSIC,
      GameGenre.RHYTHM,
      GameGenre.CASUAL,
      GameGenre.EDUCATIONAL,
      GameGenre.BROWSER_GAME,
    ],
    gamePlatform: [
      GamePlatform.WEB_BROWSER,
      GamePlatform.PC,
      GamePlatform.MOBILE,
      GamePlatform.TABLET,
    ],
    applicationCategory: "Game",
    operatingSystem: [
      OperatingSystem.WINDOWS,
      OperatingSystem.MACOS,
      OperatingSystem.LINUX,
      OperatingSystem.ANDROID,
      OperatingSystem.IOS,
    ],
    offers: {
      "@type": SchemaType.OFFER,
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: canonicalURL.toString(),
    },
    aggregateRating: {
      "@type": SchemaType.AGGREGATE_RATING,
      ratingValue: "4.8",
      ratingCount: "1000",
      bestRating: "5",
      worstRating: "1",
    },
    author: {
      "@type": SchemaType.ORGANIZATION,
      name: site.creator.name,
      description: site.creator.description,
      email: site.creator.email,
      location: site.creator.location,
    },
    publisher: {
      "@type": SchemaType.ORGANIZATION,
      name: site.name,
      url: site.url,
    },
    gameItem: [
      {
        "@type": SchemaType.THING,
        name: "基础乐器",
        description: "包含多种基础乐器供玩家选择",
      },
      {
        "@type": SchemaType.THING,
        name: "进阶乐器",
        description: "解锁后可使用的高级乐器",
      },
    ],
    review: {
      "@type": SchemaType.REVIEW,
      reviewRating: {
        "@type": SchemaType.RATING,
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
      author: {
        "@type": SchemaType.PERSON,
        name: "音乐教育专家",
      },
      reviewBody: "一款优秀的音乐教育游戏，寓教于乐，非常适合音乐启蒙。",
    },
  };

  try {
    validateGameSchema(schema);
    return schema;
  } catch (error) {
    console.error(
      "生成游戏 Schema 失败:",
      error instanceof Error ? error.message : "未知错误"
    );
    throw error;
  }
}

/**
 * 生成面包屑 Schema
 * @param items 面包屑项目列表
 * @throws {Error} 如果项目列表为空或包含无效 URL
 * @returns {object} 面包屑 Schema 数据
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("面包屑项目列表不能为空");
  }

  const invalidUrls = items.filter((item) => !isValidUrl(item.url));
  if (invalidUrls.length > 0) {
    throw new Error(
      `检测到无效的 URL: ${invalidUrls.map((item) => item.url).join(", ")}`
    );
  }

  return {
    "@context": "https://schema.org",
    "@type": SchemaType.BREADCRUMB_LIST,
    itemListElement: items.map((item, index) => ({
      "@type": SchemaType.LIST_ITEM,
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * 生成 FAQ Schema
 * @param items FAQ 项目列表
 * @throws {Error} 如果项目列表为空或内容无效
 * @returns {object} FAQ Schema 数据
 */
export function generateFAQSchema(items: FAQItem[]) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("FAQ 项目列表不能为空");
  }

  const invalidItems = items.filter(
    (item) => !item.question.trim() || !item.answer.trim()
  );
  if (invalidItems.length > 0) {
    throw new Error("FAQ 项目的问题和答案不能为空");
  }

  return {
    "@context": "https://schema.org",
    "@type": SchemaType.FAQ_PAGE,
    mainEntity: items.map((item) => ({
      "@type": SchemaType.QUESTION,
      name: item.question,
      acceptedAnswer: {
        "@type": SchemaType.ANSWER,
        text: item.answer,
      },
    })),
  };
}

/**
 * 生成组织 Schema
 * @param site 站点配置
 * @throws {Error} 如果站点配置无效
 * @returns {object} 组织 Schema 数据
 */
export function generateOrganizationSchema(site: SiteConfig) {
  if (!site.creator.name || !site.creator.description) {
    throw new Error("组织名称和描述不能为空");
  }

  if (!site.creator.email.includes("@")) {
    throw new Error("无效的组织邮箱地址");
  }

  return {
    "@context": "https://schema.org",
    "@type": SchemaType.ORGANIZATION,
    name: site.creator.name,
    description: site.creator.description,
    email: site.creator.email,
    location: site.creator.location,
    url: site.url,
  };
}
