/**
 * 资源预加载工具函数
 * @description 提供资源预加载、DNS预获取等性能优化工具函数
 */

// 资源类型
export const ResourceType = {
  SCRIPT: "script",
  STYLE: "style",
  IMAGE: "image",
  FONT: "font",
  AUDIO: "audio",
  VIDEO: "video",
  DOCUMENT: "document",
} as const;

export type ResourceType = (typeof ResourceType)[keyof typeof ResourceType];

// 跨域策略
export const CrossOrigin = {
  ANONYMOUS: "anonymous",
  USE_CREDENTIALS: "use-credentials",
} as const;

export type CrossOrigin = (typeof CrossOrigin)[keyof typeof CrossOrigin];

// 预加载选项接口
export interface PreloadOptions {
  href: string;
  as: ResourceType;
  type?: string;
  crossorigin?: CrossOrigin;
  media?: string;
}

// 字体配置接口
export interface FontConfig {
  url: string;
  type: string;
  crossorigin?: CrossOrigin;
}

/**
 * 验证URL格式
 * @param url 要验证的URL
 * @returns {boolean} 是否为有效URL
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
 * 创建预加载链接
 * @param options 预加载选项
 * @throws {Error} 如果URL无效或必需参数缺失
 * @returns {HTMLLinkElement} 预加载链接元素
 */
export function createPreloadLink(options: PreloadOptions): HTMLLinkElement {
  if (!options.href || !isValidUrl(options.href)) {
    throw new Error(`无效的URL: ${options.href}`);
  }

  if (!options.as) {
    throw new Error("必须指定资源类型(as)");
  }

  const link = document.createElement("link");
  link.rel = "preload";
  link.href = options.href;
  link.as = options.as;

  if (options.type) {
    link.type = options.type;
  }

  if (options.crossorigin) {
    link.crossOrigin = options.crossorigin;
  }

  if (options.media) {
    link.media = options.media;
  }

  return link;
}

/**
 * 预加载关键资源
 * @param resources 需要预加载的资源列表
 * @throws {Error} 如果资源列表为空或包含无效资源
 */
export function preloadCriticalResources(resources: PreloadOptions[]): void {
  if (typeof document === "undefined") return;

  if (!Array.isArray(resources) || resources.length === 0) {
    throw new Error("资源列表不能为空");
  }

  const head = document.head;
  const errors: string[] = [];

  resources.forEach((resource, index) => {
    try {
      const link = createPreloadLink(resource);
      head.appendChild(link);
    } catch (error) {
      errors.push(
        `资源 ${index + 1}: ${
          error instanceof Error ? error.message : "未知错误"
        }`
      );
    }
  });

  if (errors.length > 0) {
    console.error("预加载过程中出现错误:\n", errors.join("\n"));
  }
}

/**
 * 预加载图片
 * @param urls 图片URL列表
 * @throws {Error} 如果URL列表为空或包含无效URL
 */
export function preloadImages(urls: string[]): void {
  if (!Array.isArray(urls) || urls.length === 0) {
    throw new Error("URL列表不能为空");
  }

  const resources = urls.map((url) => ({
    href: url,
    as: ResourceType.IMAGE,
  }));

  preloadCriticalResources(resources);
}

/**
 * 预加载字体
 * @param fonts 字体配置列表
 * @throws {Error} 如果字体配置列表为空或包含无效配置
 */
export function preloadFonts(fonts: FontConfig[]): void {
  if (!Array.isArray(fonts) || fonts.length === 0) {
    throw new Error("字体配置列表不能为空");
  }

  const resources = fonts.map((font) => ({
    href: font.url,
    as: ResourceType.FONT,
    type: font.type,
    crossorigin: font.crossorigin || CrossOrigin.ANONYMOUS,
  }));

  preloadCriticalResources(resources);
}

/**
 * 预加载脚本
 * @param scripts 脚本URL列表
 * @throws {Error} 如果URL列表为空或包含无效URL
 */
export function preloadScripts(scripts: string[]): void {
  if (!Array.isArray(scripts) || scripts.length === 0) {
    throw new Error("URL列表不能为空");
  }

  const resources = scripts.map((url) => ({
    href: url,
    as: ResourceType.SCRIPT,
  }));

  preloadCriticalResources(resources);
}

/**
 * 预加载样式
 * @param styles 样式URL列表
 * @throws {Error} 如果URL列表为空或包含无效URL
 */
export function preloadStyles(styles: string[]): void {
  if (!Array.isArray(styles) || styles.length === 0) {
    throw new Error("URL列表不能为空");
  }

  const resources = styles.map((url) => ({
    href: url,
    as: ResourceType.STYLE,
  }));

  preloadCriticalResources(resources);
}

/**
 * 预加载下一页
 * @param url 下一页的URL
 * @throws {Error} 如果URL无效
 */
export function preloadNextPage(url: string): void {
  if (!url || !isValidUrl(url)) {
    throw new Error(`无效的URL: ${url}`);
  }

  preloadCriticalResources([
    {
      href: url,
      as: ResourceType.DOCUMENT,
    },
  ]);
}

/**
 * DNS预获取
 * @param domains 域名列表
 * @throws {Error} 如果域名列表为空或包含无效域名
 */
export function dnsPrefetch(domains: string[]): void {
  if (typeof document === "undefined") return;

  if (!Array.isArray(domains) || domains.length === 0) {
    throw new Error("域名列表不能为空");
  }

  const head = document.head;
  const errors: string[] = [];

  domains.forEach((domain, index) => {
    try {
      if (!isValidUrl(`https://${domain}`)) {
        throw new Error(`无效的域名: ${domain}`);
      }

      const link = document.createElement("link");
      link.rel = "dns-prefetch";
      link.href = domain;
      head.appendChild(link);
    } catch (error) {
      errors.push(
        `域名 ${index + 1}: ${
          error instanceof Error ? error.message : "未知错误"
        }`
      );
    }
  });

  if (errors.length > 0) {
    console.error("DNS预获取过程中出现错误:\n", errors.join("\n"));
  }
}
