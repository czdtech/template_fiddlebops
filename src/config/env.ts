import { isValidUrl } from "./types";

// 环境变量类型定义
declare global {
  interface ImportMetaEnv {
    readonly SITE: string;
    readonly PUBLIC_GAME_URL: string;
    readonly PUBLIC_GAME_TIMEOUT: string;
    readonly PUBLIC_GAME_MIN_TIMEOUT: string;
    readonly PUBLIC_GAME_MAX_TIMEOUT: string;
  }
}

// 默认值配置
const DEFAULT_SITE_URL = "http://localhost:3000";
const DEFAULT_GAME_TIMEOUT = 10000;
const MIN_GAME_TIMEOUT = 5000;
const MAX_GAME_TIMEOUT = 30000;

// 环境变量验证函数
function validateGameTimeout(timeout: number): number {
  const minTimeout =
    Number(import.meta.env.PUBLIC_GAME_MIN_TIMEOUT) || MIN_GAME_TIMEOUT;
  const maxTimeout =
    Number(import.meta.env.PUBLIC_GAME_MAX_TIMEOUT) || MAX_GAME_TIMEOUT;

  if (isNaN(timeout) || timeout < minTimeout || timeout > maxTimeout) {
    console.warn(
      `Invalid game timeout: ${timeout}. Using default: ${DEFAULT_GAME_TIMEOUT}`
    );
    return DEFAULT_GAME_TIMEOUT;
  }
  return timeout;
}

function validateSiteUrl(url: string): string {
  if (!isValidUrl(url)) {
    console.warn(
      `Invalid site URL: ${url}. Using default: ${DEFAULT_SITE_URL}`
    );
    return DEFAULT_SITE_URL;
  }
  return url;
}

function validateGameUrl(url: string | undefined): string {
  if (!url || !isValidUrl(url)) {
    throw new Error(
      "PUBLIC_GAME_URL is required and must be a valid URL. " +
        "Please set it in your .env file."
    );
  }
  return url;
}

// 环境配置
export const env = {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  siteUrl: validateSiteUrl(import.meta.env.SITE),
  game: {
    url: validateGameUrl(import.meta.env.PUBLIC_GAME_URL),
    timeout: validateGameTimeout(Number(import.meta.env.PUBLIC_GAME_TIMEOUT)),
    minTimeout:
      Number(import.meta.env.PUBLIC_GAME_MIN_TIMEOUT) || MIN_GAME_TIMEOUT,
    maxTimeout:
      Number(import.meta.env.PUBLIC_GAME_MAX_TIMEOUT) || MAX_GAME_TIMEOUT,
  },
} as const;

// 类型导出
export type Env = typeof env;
export type GameConfig = typeof env.game;
