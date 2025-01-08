// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  // 开发环境下可以先注释掉 site 配置
  // site: "https://fiddlebops.com",
  integrations: [tailwind(), sitemap(), alpinejs()],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // 确保 Font Awesome 的 CSS 文件能被正确处理
          additionalData: `@import "@fortawesome/fontawesome-free/css/all.min.css";`,
        },
      },
    },
    resolve: {
      alias: {
        "@fortawesome": "/node_modules/@fortawesome",
      },
    },
  },
});
