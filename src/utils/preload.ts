interface PreloadOptions {
  href: string;
  as: "script" | "style" | "image" | "font" | "audio" | "video" | "document";
  type?: string;
  crossorigin?: "anonymous" | "use-credentials";
  media?: string;
}

/**
 * 创建预加载链接
 * @param options 预加载选项
 */
export function createPreloadLink(options: PreloadOptions): HTMLLinkElement {
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
 */
export function preloadCriticalResources(resources: PreloadOptions[]): void {
  if (typeof document === "undefined") return;

  const head = document.head;
  resources.forEach((resource) => {
    const link = createPreloadLink(resource);
    head.appendChild(link);
  });
}

/**
 * 预加载图片
 * @param urls 图片URL列表
 */
export function preloadImages(urls: string[]): void {
  urls.forEach((url) => {
    preloadCriticalResources([
      {
        href: url,
        as: "image",
      },
    ]);
  });
}

/**
 * 预加载字体
 * @param fonts 字体配置列表
 */
export function preloadFonts(
  fonts: Array<{
    url: string;
    type: string;
    crossorigin?: "anonymous" | "use-credentials";
  }>
): void {
  fonts.forEach((font) => {
    preloadCriticalResources([
      {
        href: font.url,
        as: "font",
        type: font.type,
        crossorigin: font.crossorigin || "anonymous",
      },
    ]);
  });
}

/**
 * 预加载脚本
 * @param scripts 脚本URL列表
 */
export function preloadScripts(scripts: string[]): void {
  scripts.forEach((url) => {
    preloadCriticalResources([
      {
        href: url,
        as: "script",
      },
    ]);
  });
}

/**
 * 预加载样式
 * @param styles 样式URL列表
 */
export function preloadStyles(styles: string[]): void {
  styles.forEach((url) => {
    preloadCriticalResources([
      {
        href: url,
        as: "style",
      },
    ]);
  });
}

/**
 * 预加载下一页资源
 * @param url 下一页URL
 */
export function preloadNextPage(url: string): void {
  if (typeof document === "undefined") return;

  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = url;
  document.head.appendChild(link);
}

/**
 * DNS预解析
 * @param domains 域名列表
 */
export function dnsPrefetch(domains: string[]): void {
  if (typeof document === "undefined") return;

  domains.forEach((domain) => {
    const link = document.createElement("link");
    link.rel = "dns-prefetch";
    link.href = domain;
    document.head.appendChild(link);
  });
}
