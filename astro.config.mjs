// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://fiddlebops.com",
  integrations: [tailwind(), sitemap(), compress()],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  vite: {
    build: {
      // 启用代码分割
      cssCodeSplit: true,
      // 启用 CSS 压缩
      cssMinify: true,
      // 启用 JavaScript 压缩
      minify: "terser",
      // Terser 配置
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      // 配置分块策略
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            game: ["/src/components/sections/GameEmbed.astro"],
          },
        },
      },
    },
    ssr: {
      // 外部化依赖以减小服务端包大小
      external: ["react", "react-dom"],
    },
    // 配置资源处理
    assetsInclude: ["**/*.woff2", "**/*.mp3"],
  },
  // 输出配置
  output: "static",
  // 构建配置
  build: {
    // 启用增量构建
    inlineStylesheets: "auto",
    // 配置资源处理
    assets: "assets",
    // 配置输出目录结构
    format: "directory",
  },
});
