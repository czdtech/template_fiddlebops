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
      },
      cssCodeSplit: true,
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  },
});
