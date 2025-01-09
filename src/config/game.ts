import type { GameConfig } from "./types";

// 默认游戏配置
export const defaultGameConfig: GameConfig = {
  id: "fiddlebops",
  name: "FiddleBops",
  description: "创新音乐节奏游戏",
  url: "https://silkycell.github.io/FiddleBops/",
  previewImage: "/images/FiddleBops.webp",
  orientation: "landscape",
  aspectRatio: "16/9",
  controls: {
    mobile: ["点击并拖动音乐元素", "双指缩放查看全局", "长按解锁新内容"],
    desktop: ["鼠标拖放音乐元素", "滚轮缩放查看全局", "右键解锁新内容"],
  },
  loading: {
    message: "游戏加载中...",
    timeout: 10000,
  },
  seo: {
    title: "FiddleBops - 创新音乐节奏游戏",
    description:
      "通过简单直观的操作，体验音乐创作的乐趣。适合所有热爱音乐的玩家。",
    keywords: ["音乐游戏", "节奏游戏", "音乐创作"],
  },
};
