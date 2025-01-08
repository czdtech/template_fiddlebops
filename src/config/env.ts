export const env = {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  siteUrl: import.meta.env.SITE || "http://localhost:3000",
  game: {
    url: import.meta.env.PUBLIC_GAME_URL as string,
    timeout: Number(import.meta.env.PUBLIC_GAME_TIMEOUT) || 10000,
  },
} as const;

// 类型检查
if (!env.game.url) {
  throw new Error("PUBLIC_GAME_URL is required");
}

// 环境变量类型定义
declare global {
  interface ImportMetaEnv {
    readonly SITE: string;
    readonly PUBLIC_GAME_URL: string;
    readonly PUBLIC_GAME_TIMEOUT: string;
  }
}
