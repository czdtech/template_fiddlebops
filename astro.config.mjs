// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://fiddlebops.com",
  integrations: [
    react(),
    tailwind({
      // 优化 Tailwind 构建
      applyBaseStyles: false,
    }),
    sitemap(),
    // 添加资源压缩
    compress({
      CSS: true,
      HTML: true,
      Image: true,
      JavaScript: true,
      SVG: true,
      Logger: 1,
    }),
  ],
  // 图片优化配置
  image: {
    // 启用远程图片优化
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.fiddlebops.com",
      },
    ],
    // 图片服务配置
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
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
          pure_funcs: ["console.log"],
          passes: 2,
        },
        mangle: true,
        format: {
          comments: false,
        },
      },
      // 配置分块策略
      rollupOptions: {
        output: {
          // 优化代码分割策略
          manualChunks: {
            // 第三方库分块
            "vendor-react": ["react", "react-dom"],
            // 功能模块分块
            game: ["/src/components/sections/GameEmbed.astro"],
            i18n: ["/src/i18n/utils.ts", "/src/i18n/config.ts"],
          },
          // 优化资源命名
          assetFileNames: (assetInfo) => {
            if (!assetInfo.name) return "assets/unknown/[hash][extname]";
            const ext = assetInfo.name.split(".").pop() || "";
            let extType = "other";

            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              extType = "img";
            } else if (/woff|woff2/.test(ext)) {
              extType = "fonts";
            }
            return `assets/${extType}/[name]-[hash][extname]`;
          },
          // 优化 chunk 命名
          chunkFileNames: "assets/js/[name]-[hash].js",
          // 优化入口文件命名
          entryFileNames: "assets/js/[name]-[hash].js",
        },
      },
      // 配置构建优化
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1000,
    },
    ssr: {
      // 外部化依赖以减小服务端包大小
      external: ["react", "react-dom"],
    },
    // 优化资源处理
    assetsInclude: ["**/*.woff2", "**/*.mp3", "**/*.svg"],
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
