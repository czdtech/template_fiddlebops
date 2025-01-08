import type { SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  name: "FiddleBops",
  url: "https://fiddlebops.com",
  title: "FiddleBops - 创新音乐节奏游戏",
  description:
    "FiddleBops是一款创新的音乐节奏游戏，将音乐创作与游戏娱乐完美结合。通过简单直观的操作，体验音乐创作的乐趣，适合所有热爱音乐的玩家。",
  keywords: [
    "音乐游戏",
    "节奏游戏",
    "音乐创作",
    "教育游戏",
    "休闲游戏",
    "浏览器游戏",
    "FiddleBops",
  ],
  timeout: 30000,
  ogImage: "/images/og-image.jpg",
  creator: {
    name: "FiddleBops Team",
    description: "一个致力于创造创新音乐游戏体验的独立游戏开发团队",
    email: "contact@fiddlebops.com",
    location: "中国",
  },
  links: {
    twitter: "https://twitter.com/fiddlebops",
    github: "https://github.com/fiddlebops",
    discord: "https://discord.gg/fiddlebops",
  },
  game: {
    features: [
      {
        title: "直观的音乐创作",
        description: "通过简单的点击和拖拽，创作你的专属音乐",
      },
      {
        title: "丰富的音乐元素",
        description: "包含多种乐器和音效，让你的创作更加丰富多彩",
      },
      {
        title: "实时反馈",
        description: "所有操作都能获得即时的视觉和听觉反馈",
      },
      {
        title: "社区分享",
        description: "与其他玩家分享你的创作，互相学习和交流",
      },
    ],
    faqs: [
      {
        question: "如何开始游戏？",
        answer: "只需要打开浏览器访问我们的网站，无需下载安装，即可开始游戏。",
      },
      {
        question: "需要音乐基础吗？",
        answer:
          "不需要！我们的游戏设计适合所有人，无论是音乐初学者还是专业音乐人都能找到乐趣。",
      },
      {
        question: "支持哪些设备？",
        answer: "支持所有主流浏览器，包括电脑、平板和手机。",
      },
      {
        question: "如何保存我的创作？",
        answer: "游戏会自动保存你的创作，你也可以随时导出分享。",
      },
    ],
  },
} as const;

export const config = {
  site: siteConfig,
  env: {
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
    siteUrl: import.meta.env.SITE || "http://localhost:3000",
  },
} as const;
