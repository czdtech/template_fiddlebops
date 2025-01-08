export const navigation = [
  {
    text: "首页",
    href: "/",
  },
  {
    text: "游戏",
    href: "#play-fiddlebops",
  },
  {
    text: "特色",
    href: "#features",
  },
  {
    text: "常见问题",
    href: "#faq",
  },
] as const;

// 验证导航配置
navigation.forEach((item) => {
  if (!item.text || !item.href) {
    throw new Error(`Invalid navigation item: ${JSON.stringify(item)}`);
  }
});
