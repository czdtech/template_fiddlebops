// 通用工具类型
type NonEmptyString = string & { readonly brand: unique symbol };
type ValidUrl = string & { readonly brand: unique symbol };
type EmailAddress = string & { readonly brand: unique symbol };

// 验证工具函数
export const isNonEmptyString = (value: string): value is NonEmptyString =>
  value.length > 0;
export const isValidUrl = (value: string): value is ValidUrl => {
  // 如果是相对路径，直接返回 true
  if (value.startsWith("/")) return true;

  // 否则验证是否为有效的完整 URL
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};
export const isValidEmail = (value: string): value is EmailAddress =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/**
 * 站点配置接口
 * @see src/config/site.ts - 配置实现
 * @see src/utils/schema.ts - 配置验证
 */
export interface SiteConfig {
  /** 站点名称 */
  name: NonEmptyString;
  /** 站点URL */
  url: ValidUrl;
  /** 站点标题 */
  title: NonEmptyString;
  /** 站点描述 */
  description: NonEmptyString;
  /** SEO关键词 */
  keywords: NonEmptyString[];
  /** 超时设置（毫秒） */
  timeout: number;
  /** Open Graph图片URL */
  ogImage: ValidUrl;
  /** 创建者信息 */
  creator: {
    /** 创建者名称 */
    name: NonEmptyString;
    /** 创建者描述 */
    description: NonEmptyString;
    /** 创建者邮箱 */
    email: EmailAddress;
    /** 创建者位置 */
    location: NonEmptyString;
  };
  /** 社交链接 */
  links: {
    /** Twitter链接 */
    twitter: ValidUrl;
    /** GitHub链接 */
    github: ValidUrl;
    /** Discord链接 */
    discord: ValidUrl;
  };
  /** 游戏相关配置 */
  game: {
    /** 游戏特性列表 */
    features: Array<{
      /** 特性标题 */
      title: NonEmptyString;
      /** 特性描述 */
      description: NonEmptyString;
    }>;
    /** FAQ列表 */
    faqs: Array<{
      /** 问题 */
      question: NonEmptyString;
      /** 答案 */
      answer: NonEmptyString;
    }>;
  };
}

/**
 * 导航项接口
 * @see src/config/navigation.ts - 配置实现
 */
export interface NavItem {
  /** 导航文本 */
  text: NonEmptyString;
  /** 导航链接 */
  href: ValidUrl;
  /** 是否为外部链接 */
  external?: boolean;
}

// 游戏方向类型
export type GameOrientation = "landscape" | "portrait";

/**
 * 游戏配置接口
 * @see src/config/game.ts - 配置实现
 * @see src/components/ui/GameControls.astro - 组件使用
 */
export interface GameConfig {
  /** 游戏ID */
  id: NonEmptyString;
  /** 游戏名称 */
  name: NonEmptyString;
  /** 游戏描述 */
  description: NonEmptyString;
  /** 游戏URL */
  url: ValidUrl;
  /** 预览图片URL */
  previewImage: ValidUrl;
  /** 游戏方向 */
  orientation: GameOrientation;
  /** 宽高比 */
  aspectRatio: `${number}:${number}`;
  /** 控制配置 */
  controls: {
    /** 移动端控制键 */
    mobile: NonEmptyString[];
    /** 桌面端控制键 */
    desktop: NonEmptyString[];
  };
  /** 加载配置 */
  loading: {
    /** 加载提示信息 */
    message: NonEmptyString;
    /** 加载超时时间（毫秒） */
    timeout: number;
    /** 最大重试次数 */
    maxRetries: number;
  };
  /** 错误处理配置 */
  error: {
    /** 错误消息 */
    messages: {
      /** 超时错误 */
      timeout: NonEmptyString;
      /** 资源未找到 */
      notFound: NonEmptyString;
      /** 通用错误 */
      generic: NonEmptyString;
    };
    /** 重试间隔（毫秒） */
    retryInterval: number;
  };
  /** SEO配置 */
  seo: {
    /** SEO标题 */
    title: NonEmptyString;
    /** SEO描述 */
    description: NonEmptyString;
    /** SEO关键词 */
    keywords: NonEmptyString[];
  };
}

// 游戏选择器类型
export type GameSelectors = {
  wrapper: string;
  iframe: string;
  error: string;
  cover: string;
  startButton: string;
};
