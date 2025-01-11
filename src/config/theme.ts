// 主题配置类型定义
type RGB = `${number}, ${number}, ${number}`;
type HexColor = `#${string}`;
type RGBAColor = `rgba(${RGB}, ${number})`;
type ThemeColor = HexColor | RGBAColor;

interface ColorConfig {
  DEFAULT: ThemeColor;
  rgb?: RGB;
  lighter?: ThemeColor;
  darker?: ThemeColor;
  "darker-rgb"?: RGB;
}

interface ThemeColors {
  primary: ColorConfig;
  secondary: ThemeColor;
  background: {
    DEFAULT: ThemeColor;
    dark: ThemeColor;
    light: ThemeColor;
  };
  text: {
    DEFAULT: ThemeColor;
    primary: ThemeColor;
    muted: ThemeColor;
  };
  accent: {
    DEFAULT: ThemeColor;
    blue: ThemeColor;
    green: ThemeColor;
    yellow: ThemeColor;
    red: ThemeColor;
  };
  card: {
    DEFAULT: RGBAColor;
    hover: RGBAColor;
  };
}

interface ThemeConfig {
  colors: ThemeColors;
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
  };
  spacing: {
    container: {
      padding: string;
      maxWidth: string;
    };
    section: {
      padding: string;
    };
  };
  animation: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    timing: {
      bounce: string;
      smooth: string;
    };
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  typography: {
    fontFamily: {
      display: string;
      body: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      "2xl": string;
      "3xl": string;
      "4xl": string;
      "5xl": string;
    };
  };
}

// 验证函数
function isValidHexColor(color: string): color is HexColor {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

function isValidRGBA(color: string): color is RGBAColor {
  return /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(?:0|1|0?\.\d+)\s*\)$/.test(
    color
  );
}

function isValidThemeColor(color: string): color is ThemeColor {
  return isValidHexColor(color) || isValidRGBA(color);
}

function isValidSpacing(value: string): boolean {
  return /^\d+(?:px|rem|em)$/.test(value);
}

function validateThemeConfig(config: ThemeConfig): void {
  // 验证颜色配置
  const validateColors = (colors: ThemeColors) => {
    // 验证主色调
    if (!isValidThemeColor(colors.primary.DEFAULT)) {
      throw new Error("Invalid primary color");
    }
    if (colors.primary.lighter && !isValidThemeColor(colors.primary.lighter)) {
      throw new Error("Invalid primary lighter color");
    }
    if (colors.primary.darker && !isValidThemeColor(colors.primary.darker)) {
      throw new Error("Invalid primary darker color");
    }

    // 验证次要色调
    if (!isValidThemeColor(colors.secondary)) {
      throw new Error("Invalid secondary color");
    }

    // 验证背景色
    if (!isValidThemeColor(colors.background.DEFAULT)) {
      throw new Error("Invalid background color");
    }
    if (!isValidThemeColor(colors.background.dark)) {
      throw new Error("Invalid dark background color");
    }
    if (!isValidThemeColor(colors.background.light)) {
      throw new Error("Invalid light background color");
    }

    // 验证文本颜色
    if (!isValidThemeColor(colors.text.DEFAULT)) {
      throw new Error("Invalid text color");
    }
    if (!isValidThemeColor(colors.text.primary)) {
      throw new Error("Invalid primary text color");
    }
    if (!isValidThemeColor(colors.text.muted)) {
      throw new Error("Invalid muted text color");
    }

    // 验证强调色
    if (!isValidThemeColor(colors.accent.DEFAULT)) {
      throw new Error("Invalid accent color");
    }
    if (!isValidThemeColor(colors.accent.blue)) {
      throw new Error("Invalid blue accent color");
    }
    if (!isValidThemeColor(colors.accent.green)) {
      throw new Error("Invalid green accent color");
    }
    if (!isValidThemeColor(colors.accent.yellow)) {
      throw new Error("Invalid yellow accent color");
    }
    if (!isValidThemeColor(colors.accent.red)) {
      throw new Error("Invalid red accent color");
    }

    // 验证卡片颜色
    if (!isValidRGBA(colors.card.DEFAULT)) {
      throw new Error("Invalid card color");
    }
    if (!isValidRGBA(colors.card.hover)) {
      throw new Error("Invalid card hover color");
    }
  };

  validateColors(config.colors);

  // 验证断点配置
  Object.values(config.breakpoints).forEach((value) => {
    if (!/^\d+px$/.test(value)) {
      throw new Error(`Invalid breakpoint value: ${value}`);
    }
  });

  // 验证间距配置
  if (!isValidSpacing(config.spacing.container.padding)) {
    throw new Error("Invalid container padding");
  }
  if (!isValidSpacing(config.spacing.container.maxWidth)) {
    throw new Error("Invalid container max width");
  }
  if (!isValidSpacing(config.spacing.section.padding)) {
    throw new Error("Invalid section padding");
  }

  // 验证动画配置
  Object.values(config.animation.duration).forEach((value) => {
    if (!/^\d+ms$/.test(value)) {
      throw new Error(`Invalid animation duration: ${value}`);
    }
  });
}

// 主题配置
export const themeConfig: ThemeConfig = {
  colors: {
    primary: {
      DEFAULT: "#6366f1",
      rgb: "99, 102, 241",
      lighter: "#818cf8",
      darker: "#4f46e5",
      "darker-rgb": "79, 70, 229",
    },
    secondary: "#10b981",
    background: {
      DEFAULT: "#0a0a0a",
      dark: "#0a0a0a",
      light: "#1a1a1a",
    },
    text: {
      DEFAULT: "#ffffff",
      primary: "#ffffff",
      muted: "#a3a3a3",
    },
    accent: {
      DEFAULT: "#3b82f6",
      blue: "#60a5fa",
      green: "#34d399",
      yellow: "#fbbf24",
      red: "#ef4444",
    },
    card: {
      DEFAULT: "rgba(26, 26, 26, 0.8)",
      hover: "rgba(26, 26, 26, 0.9)",
    },
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  spacing: {
    container: {
      padding: "1rem",
      maxWidth: "1280px",
    },
    section: {
      padding: "4rem",
    },
  },
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
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
  },
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
// 验证主题配置
validateThemeConfig(themeConfig);

// 导出只读配置
export const theme: Readonly<typeof themeConfig> = themeConfig;
