// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:3000',
  integrations: [
    tailwind(), 
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
