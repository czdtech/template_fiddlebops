import type { NavItem, NonEmptyString, ValidUrl } from "./types";
import { isNonEmptyString, isValidUrl } from "./types";

// 类型转换函数
function toNavItem(item: {
  text: string;
  href: string;
  external?: boolean;
}): NavItem {
  if (!isNonEmptyString(item.text)) {
    throw new Error(`Invalid navigation text: ${item.text}`);
  }
  if (!isValidUrl(item.href)) {
    throw new Error(`Invalid navigation href: ${item.href}`);
  }
  return {
    text: item.text as NonEmptyString,
    href: item.href as ValidUrl,
    external: item.external ?? false,
  };
}

// 验证导航配置
function validateNavigation(items: NavItem[]): void {
  items.forEach((item) => {
    if (!item.text || !item.href) {
      throw new Error(
        `Missing required fields in navigation item: ${JSON.stringify(item)}`
      );
    }
    if (item.external && !item.href.startsWith("http")) {
      throw new Error(`External link must start with http: ${item.href}`);
    }
    if (
      !item.external &&
      !item.href.startsWith("/") &&
      !item.href.startsWith("#")
    ) {
      throw new Error(`Internal link must start with / or #: ${item.href}`);
    }
  });
}

// 导航配置
export const navigation: NavItem[] = [
  toNavItem({
    text: "首页",
    href: "/",
  }),
  toNavItem({
    text: "游戏",
    href: "#play-fiddlebops",
  }),
  toNavItem({
    text: "特色",
    href: "#features",
  }),
  toNavItem({
    text: "常见问题",
    href: "#faq",
  }),
];

// 验证并导出导航配置
validateNavigation(navigation);
export const defaultNavigation: Readonly<typeof navigation> = navigation;
