import defaultTheme from "tailwindcss/defaultTheme";
import { themeConfig } from "./src/config/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: themeConfig.colors.primary.DEFAULT,
          rgb: themeConfig.colors.primary.rgb,
          lighter: themeConfig.colors.primary.lighter,
          darker: themeConfig.colors.primary.darker,
          "darker-rgb": themeConfig.colors.primary["darker-rgb"],
        },
        secondary: themeConfig.colors.secondary,
        background: themeConfig.colors.background,
        text: themeConfig.colors.text,
        accent: themeConfig.colors.accent,
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        display: ["Bangers", ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        container: themeConfig.spacing.container.maxWidth,
      },
      padding: {
        container: themeConfig.spacing.container.padding,
        section: themeConfig.spacing.section.padding,
      },
      boxShadow: themeConfig.shadows,
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
