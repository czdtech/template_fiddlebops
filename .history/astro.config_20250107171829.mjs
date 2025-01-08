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
    resolve: {
      alias: {
        "@fortawesome": "@fortawesome",
      },
    },
    build: {
      rollupOptions: {
        input: {
          'fontawesome': '@fortawesome/fontawesome-free/css/all.min.css'
        }
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
