import defaultTheme from "tailwindcss/defaultTheme";
import { themeConfig } from "./src/config/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
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
        background: {
          DEFAULT: themeConfig.colors.background.DEFAULT,
          dark: themeConfig.colors.background.dark,
          light: themeConfig.colors.background.light,
        },
        text: {
          DEFAULT: themeConfig.colors.text.DEFAULT,
          primary: themeConfig.colors.text.primary,
          muted: themeConfig.colors.text.muted,
        },
        accent: {
          DEFAULT: themeConfig.colors.accent.DEFAULT,
          blue: themeConfig.colors.accent.blue,
          green: themeConfig.colors.accent.green,
          yellow: themeConfig.colors.accent.yellow,
          red: themeConfig.colors.accent.red,
        },
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        display: [
          themeConfig.typography.fontFamily.display,
          ...defaultTheme.fontFamily.sans,
        ],
      },
      fontSize: themeConfig.typography.fontSize,
      maxWidth: {
        container: themeConfig.spacing.container.maxWidth,
        "hero-content": "var(--hero-content-max-width)",
        "hero-description": "var(--hero-description-max-width)",
      },
      padding: {
        container: themeConfig.spacing.container.padding,
        section: themeConfig.spacing.section.padding,
      },
      boxShadow: themeConfig.shadows,
      borderRadius: {
        card: "var(--card-border-radius)",
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionProperty: {
        "colors-and-shadow":
          "background-color, border-color, color, fill, stroke, box-shadow",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
