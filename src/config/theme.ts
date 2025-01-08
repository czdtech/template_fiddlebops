export const themeConfig = {
  colors: {
    primary: {
      DEFAULT: "#6366f1",
      rgb: "99, 102, 241",
      lighter: "#818cf8",
      darker: "#4f46e5",
      "darker-rgb": "79, 70, 229",
    },
    secondary: "#10b981", // 绿色作为次要色调
    background: {
      DEFAULT: "#0a0a0a", // 默认背景色
      dark: "#0a0a0a", // 深色背景
      light: "#1a1a1a", // 稍浅的背景，用于卡片等元素
    },
    text: {
      DEFAULT: "#ffffff", // 默认文本颜色
      primary: "#ffffff", // 主要文本颜色
      muted: "#a3a3a3", // 次要文本颜色
    },
    accent: {
      DEFAULT: "#3b82f6", // 默认强调色
      blue: "#60a5fa", // 强调色 - 蓝色
      green: "#34d399", // 强调色 - 绿色
      yellow: "#fbbf24", // 强调色 - 黄色
      red: "#ef4444", // 强调色 - 红色
    },
    card: {
      DEFAULT: "rgba(26, 26, 26, 0.8)", // 默认卡片背景色
      hover: "rgba(26, 26, 26, 0.9)", // 卡片悬停背景色
    },
  },

  // 响应式断点配置
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // 间距配置
  spacing: {
    container: {
      padding: "1rem",
      maxWidth: "1280px",
    },
    section: {
      padding: "4rem 0",
    },
  },

  // 动画配置
  animation: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
    timing: {
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },

  // 阴影配置
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
  },

  // 字体配置
  typography: {
    fontFamily: {
      display: "Bangers",
      body: "Inter",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
  },
} as const;
