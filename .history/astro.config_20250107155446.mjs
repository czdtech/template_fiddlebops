// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://localhost:3000',
  integrations: [
    tailwind(), 
    sitemap({
      // sitemap 的具体配置
      filter: (page) => !page.includes('admin'),  // 排除管理页面
      changefreq: 'weekly',
      lastmod: new Date(),
      priority: 0.7,
      serialize: (item) => {
        // 自定义 sitemap 条目
        return {
          ...item,
          // 添加额外的 sitemap 属性
          alternateRefs: item.url.includes('/blog') 
            ? [
                {
                  href: `${item.url.replace('/blog', '/blog/en')}`,
                  hreflang: 'en'
                }
              ]
            : []
        }
      }
    }), 
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@fortawesome/fontawesome-free/css/all.min.css";`,
        },
      },
    },
    resolve: {
      alias: {
        "@fortawesome": "/node_modules/@fortawesome",
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'game': ['./src/components/sections/GameEmbed.astro'],
            'ui': [
              './src/components/sections/Hero.astro',
              './src/components/sections/Features.astro',
              './src/components/sections/FAQ.astro'
            ]
          }
        }
      },
      assetsInlineLimit: 4096, // 4kb以下的资源内联
      cssCodeSplit: true,
      sourcemap: false,
    }
  },
});
