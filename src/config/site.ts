import type {
  SiteConfig,
  NonEmptyString,
  ValidUrl,
  EmailAddress,
} from "./types";
import { isNonEmptyString, isValidUrl, isValidEmail } from "./types";

// 类型转换函数
function toNonEmptyString(value: string): NonEmptyString {
  if (!isNonEmptyString(value)) {
    throw new Error(`Invalid string: ${value}`);
  }
  return value as NonEmptyString;
}

function toValidUrl(value: string): ValidUrl {
  if (!isValidUrl(value)) {
    throw new Error(`Invalid URL: ${value}`);
  }
  return value as ValidUrl;
}

function toEmailAddress(value: string): EmailAddress {
  if (!isValidEmail(value)) {
    throw new Error(`Invalid email: ${value}`);
  }
  return value as EmailAddress;
}

// 验证站点配置
function validateSiteConfig(config: SiteConfig): void {
  // 基本信息验证
  if (!config.name || !isNonEmptyString(config.name)) {
    throw new Error("Site name is required");
  }
  if (!config.url || !isValidUrl(config.url)) {
    throw new Error("Site URL must be valid");
  }
  if (!config.title || !isNonEmptyString(config.title)) {
    throw new Error("Site title is required");
  }
  if (!config.description || !isNonEmptyString(config.description)) {
    throw new Error("Site description is required");
  }
  if (
    !Array.isArray(config.keywords) ||
    !config.keywords.every(isNonEmptyString)
  ) {
    throw new Error("Keywords must be an array of non-empty strings");
  }
  if (typeof config.timeout !== "number" || config.timeout <= 0) {
    throw new Error("Timeout must be a positive number");
  }
  if (!config.ogImage || !isValidUrl(config.ogImage)) {
    throw new Error("OG image URL must be valid");
  }

  // 创建者信息验证
  if (!config.creator.name || !isNonEmptyString(config.creator.name)) {
    throw new Error("Creator name is required");
  }
  if (
    !config.creator.description ||
    !isNonEmptyString(config.creator.description)
  ) {
    throw new Error("Creator description is required");
  }
  if (!config.creator.email || !isValidEmail(config.creator.email)) {
    throw new Error("Creator email must be valid");
  }
  if (!config.creator.location || !isNonEmptyString(config.creator.location)) {
    throw new Error("Creator location is required");
  }

  // 社交链接验证
  if (!config.links.twitter || !isValidUrl(config.links.twitter)) {
    throw new Error("Twitter URL must be valid");
  }
  if (!config.links.github || !isValidUrl(config.links.github)) {
    throw new Error("GitHub URL must be valid");
  }
  if (!config.links.discord || !isValidUrl(config.links.discord)) {
    throw new Error("Discord URL must be valid");
  }

  // 游戏特性验证
  if (!Array.isArray(config.game.features)) {
    throw new Error("Features must be an array");
  }
  config.game.features.forEach((feature, index) => {
    if (!feature.title || !isNonEmptyString(feature.title)) {
      throw new Error(`Feature ${index} title is required`);
    }
    if (!feature.description || !isNonEmptyString(feature.description)) {
      throw new Error(`Feature ${index} description is required`);
    }
  });

  // FAQ验证
  if (!Array.isArray(config.game.faqs)) {
    throw new Error("FAQs must be an array");
  }
  config.game.faqs.forEach((faq, index) => {
    if (!faq.question || !isNonEmptyString(faq.question)) {
      throw new Error(`FAQ ${index} question is required`);
    }
    if (!faq.answer || !isNonEmptyString(faq.answer)) {
      throw new Error(`FAQ ${index} answer is required`);
    }
  });
}

// 站点配置
export const siteConfig: SiteConfig = {
  name: toNonEmptyString("FiddleBops"),
  url: toValidUrl("https://fiddlebops.com"),
  title: toNonEmptyString("FiddleBops - 创新音乐节奏游戏"),
  description: toNonEmptyString(
    "FiddleBops是一款创新的音乐节奏游戏，将音乐创作与游戏娱乐完美结合。通过简单直观的操作，体验音乐创作的乐趣，适合所有热爱音乐的玩家。"
  ),
  keywords: [
    "音乐游戏",
    "节奏游戏",
    "音乐创作",
    "教育游戏",
    "休闲游戏",
    "浏览器游戏",
    "FiddleBops",
  ].map(toNonEmptyString),
  timeout: 30000,
  ogImage: toValidUrl("/images/og-image.jpg"),
  creator: {
    name: toNonEmptyString("FiddleBops Team"),
    description: toNonEmptyString(
      "一个致力于创造创新音乐游戏体验的独立游戏开发团队"
    ),
    email: toEmailAddress("contact@fiddlebops.com"),
    location: toNonEmptyString("中国"),
  },
  links: {
    twitter: toValidUrl("https://twitter.com/fiddlebops"),
    github: toValidUrl("https://github.com/fiddlebops"),
    discord: toValidUrl("https://discord.gg/fiddlebops"),
  },
  game: {
    features: [
      {
        title: toNonEmptyString("直观的音乐创作"),
        description: toNonEmptyString("通过简单的点击和拖拽，创作你的专属音乐"),
      },
      {
        title: toNonEmptyString("丰富的音乐元素"),
        description: toNonEmptyString(
          "包含多种乐器和音效，让你的创作更加丰富多彩"
        ),
      },
      {
        title: toNonEmptyString("实时反馈"),
        description: toNonEmptyString("所有操作都能获得即时的视觉和听觉反馈"),
      },
      {
        title: toNonEmptyString("社区分享"),
        description: toNonEmptyString("与其他玩家分享你的创作，互相学习和交流"),
      },
    ],
    faqs: [
      {
        question: toNonEmptyString("如何开始游戏？"),
        answer: toNonEmptyString(
          "只需要打开浏览器访问我们的网站，无需下载安装，即可开始游戏。"
        ),
      },
      {
        question: toNonEmptyString("需要音乐基础吗？"),
        answer: toNonEmptyString(
          "不需要！我们的游戏设计适合所有人，无论是音乐初学者还是专业音乐人都能找到乐趣。"
        ),
      },
      {
        question: toNonEmptyString("支持哪些设备？"),
        answer: toNonEmptyString("支持所有主流浏览器，包括电脑、平板和手机。"),
      },
      {
        question: toNonEmptyString("如何保存我的创作？"),
        answer: toNonEmptyString(
          "游戏会自动保存你的创作，你也可以随时导出分享。"
        ),
      },
    ],
  },
};

// 验证站点配置
validateSiteConfig(siteConfig);

// 环境配置
const env = {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  siteUrl: import.meta.env.SITE
    ? toValidUrl(import.meta.env.SITE)
    : toValidUrl("http://localhost:3000"),
} as const;

// 导出只读配置
export const config: Readonly<{
  site: Readonly<SiteConfig>;
  env: Readonly<typeof env>;
}> = {
  site: siteConfig,
  env,
} as const;
