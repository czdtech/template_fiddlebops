import type {
  GameConfig,
  GameSelectors,
  GameOrientation,
  NonEmptyString,
  ValidUrl,
} from "./types";
import { isNonEmptyString, isValidUrl } from "./types";

// 游戏选择器配置
export const gameSelectors: Readonly<GameSelectors> = {
  wrapper: ".game-wrapper",
  iframe: ".game-frame",
  error: ".error-message",
  cover: ".game-cover",
  startButton: ".start-button",
} as const;

// 游戏方向配置
export const gameOrientations: Record<GameOrientation, GameOrientation> = {
  landscape: "landscape",
  portrait: "portrait",
} as const;

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

// 游戏配置验证函数
function validateGameConfig(config: GameConfig): void {
  // 基本信息验证
  if (!config.id || !isNonEmptyString(config.id))
    throw new Error("Game ID is required");
  if (!config.name || !isNonEmptyString(config.name))
    throw new Error("Game name is required");
  if (!config.description || !isNonEmptyString(config.description))
    throw new Error("Game description is required");
  if (!config.url || !isValidUrl(config.url))
    throw new Error("Game URL must be valid");
  if (!config.previewImage || !isValidUrl(config.previewImage))
    throw new Error("Preview image URL must be valid");

  // 方向和宽高比验证
  if (!Object.keys(gameOrientations).includes(config.orientation)) {
    throw new Error("Invalid game orientation");
  }
  if (!/^\d+:\d+$/.test(config.aspectRatio)) {
    throw new Error("Invalid aspect ratio format");
  }

  // 控制键验证
  if (
    !Array.isArray(config.controls?.mobile) ||
    !config.controls.mobile.every(isNonEmptyString)
  ) {
    throw new Error("Mobile controls must be an array of non-empty strings");
  }
  if (
    !Array.isArray(config.controls?.desktop) ||
    !config.controls.desktop.every(isNonEmptyString)
  ) {
    throw new Error("Desktop controls must be an array of non-empty strings");
  }

  // 加载配置验证
  if (!config.loading?.message || !isNonEmptyString(config.loading.message)) {
    throw new Error("Loading message is required");
  }
  if (
    typeof config.loading?.timeout !== "number" ||
    config.loading.timeout <= 0
  ) {
    throw new Error("Loading timeout must be a positive number");
  }
  if (
    typeof config.loading?.maxRetries !== "number" ||
    config.loading.maxRetries <= 0
  ) {
    throw new Error("Max retries must be a positive number");
  }

  // 错误消息验证
  if (
    !config.error?.messages?.timeout ||
    !isNonEmptyString(config.error.messages.timeout)
  ) {
    throw new Error("Timeout message is required");
  }
  if (
    !config.error?.messages?.notFound ||
    !isNonEmptyString(config.error.messages.notFound)
  ) {
    throw new Error("Not found message is required");
  }
  if (
    !config.error?.messages?.generic ||
    !isNonEmptyString(config.error.messages.generic)
  ) {
    throw new Error("Generic error message is required");
  }
  if (
    typeof config.error?.retryInterval !== "number" ||
    config.error.retryInterval <= 0
  ) {
    throw new Error("Retry interval must be a positive number");
  }

  // SEO配置验证
  if (!config.seo?.title || !isNonEmptyString(config.seo.title)) {
    throw new Error("SEO title is required");
  }
  if (!config.seo?.description || !isNonEmptyString(config.seo.description)) {
    throw new Error("SEO description is required");
  }
  if (
    !Array.isArray(config.seo?.keywords) ||
    !config.seo.keywords.every(isNonEmptyString)
  ) {
    throw new Error("SEO keywords must be an array of non-empty strings");
  }
}

// 默认游戏配置
const gameConfig: GameConfig = {
  id: toNonEmptyString("fiddlebops"),
  name: toNonEmptyString("FiddleBops"),
  description: toNonEmptyString("创新音乐节奏游戏"),
  url: toValidUrl("https://silkycell.github.io/FiddleBops/"),
  previewImage: toValidUrl("/images/FiddleBops.webp"),
  orientation: "landscape",
  aspectRatio: "16:9",
  controls: {
    mobile: [
      toNonEmptyString("点击并拖动音乐元素"),
      toNonEmptyString("双指缩放查看全局"),
      toNonEmptyString("长按解锁新内容"),
    ],
    desktop: [
      toNonEmptyString("鼠标拖放音乐元素"),
      toNonEmptyString("滚轮缩放查看全局"),
      toNonEmptyString("右键解锁新内容"),
    ],
  },
  loading: {
    message: toNonEmptyString("游戏加载中..."),
    timeout: 30000, // 30 seconds
    maxRetries: 3,
  },
  error: {
    messages: {
      timeout: toNonEmptyString("游戏加载超时，请检查网络连接"),
      notFound: toNonEmptyString("游戏资源未找到"),
      generic: toNonEmptyString("加载游戏时出现错误"),
    },
    retryInterval: 1000, // 1 second
  },
  seo: {
    title: toNonEmptyString("FiddleBops - 创新音乐节奏游戏"),
    description: toNonEmptyString(
      "通过简单直观的操作，体验音乐创作的乐趣。适合所有热爱音乐的玩家。"
    ),
    keywords: [
      toNonEmptyString("音乐游戏"),
      toNonEmptyString("节奏游戏"),
      toNonEmptyString("音乐创作"),
    ],
  },
};

// 验证并导出游戏配置
validateGameConfig(gameConfig);
export const defaultGameConfig: Readonly<GameConfig> = gameConfig;
