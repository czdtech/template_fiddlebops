import type { GameConfig, GameSelectors } from "./types";
import { isNonEmptyString, isValidUrl } from "./types";

// 游戏选择器配置
export const gameSelectors: GameSelectors = {
  wrapper: ".game-wrapper",
  iframe: ".game-frame",
  error: ".error-message",
  cover: ".game-cover",
  startButton: ".start-button",
} as const;

// 验证并转换字符串
const str = (value: string) => {
  if (!isNonEmptyString(value)) throw new Error(`Invalid string: ${value}`);
  return value;
};

// 验证并转换URL
const url = (value: string) => {
  if (!isValidUrl(value)) throw new Error(`Invalid URL: ${value}`);
  return value;
};

// 默认游戏配置
export const defaultGameConfig: GameConfig = {
  id: str("fiddlebops"),
  name: str("FiddleBops"),
  description: str("创新音乐节奏游戏"),
  url: url("https://silkycell.github.io/FiddleBops/"),
  previewImage: url("/images/FiddleBops.webp"),
  orientation: "landscape",
  aspectRatio: "16:9",
  controls: {
    mobile: [
      str("点击并拖动音乐元素"),
      str("双指缩放查看全局"),
      str("长按解锁新内容"),
    ],
    desktop: [
      str("鼠标拖放音乐元素"),
      str("滚轮缩放查看全局"),
      str("右键解锁新内容"),
    ],
  },
  loading: {
    message: str("游戏加载中..."),
    timeout: 30000, // 30 seconds
    maxRetries: 3,
  },
  error: {
    messages: {
      timeout: str("游戏加载超时，请检查网络连接"),
      notFound: str("游戏资源未找到"),
      generic: str("加载游戏时出现错误"),
    },
    retryInterval: 1000, // 1 second
  },
  seo: {
    title: str("FiddleBops - 创新音乐节奏游戏"),
    description: str(
      "通过简单直观的操作，体验音乐创作的乐趣。适合所有热爱音乐的玩家。"
    ),
    keywords: [str("音乐游戏"), str("节奏游戏"), str("音乐创作")],
  },
};
