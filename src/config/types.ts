export interface SiteConfig {
  name: string;
  url: string;
  title: string;
  description: string;
  keywords: string[];
  timeout: number;
  ogImage: string;
  creator: {
    name: string;
    description: string;
    email: string;
    location: string;
  };
  links: {
    twitter: string;
    github: string;
    discord: string;
  };
  game: {
    features: Array<{
      title: string;
      description: string;
    }>;
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  };
}

// 环境变量类型
export interface EnvConfig {
  isDev: boolean;
  isProd: boolean;
  siteUrl: string;
}

// 导航项类型
export interface NavItem {
  text: string;
  href: string;
  external?: boolean;
}

// 游戏配置接口
export interface GameConfig {
  id: string;
  name: string;
  description: string;
  url: string;
  previewImage: string;
  orientation: "landscape" | "portrait";
  aspectRatio: string;
  controls: {
    mobile: string[];
    desktop: string[];
  };
  loading: {
    message: string;
    timeout: number;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
