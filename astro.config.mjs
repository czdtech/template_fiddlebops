// @ts-check
import { defineConfig } from "astro/config";
import path from "path";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import compress from "astro-compress";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@i18n': path.resolve(__dirname, './src/i18n/core')
      }
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'src/pages/404.astro')
        },
        output: {
          manualChunks: {
            "vendor-react": ["react", "react-dom"],
            game: [path.resolve(__dirname, "src/components/sections/GameEmbed.astro")],
            i18n: [
              // 更新为正确的路径
              path.resolve(__dirname, "src/i18n/core/utils.ts"),
              path.resolve(__dirname, "src/i18n/config.ts")
            ],
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
      }
    }
  }
});
