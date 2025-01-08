// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import path from 'path';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:3000',
  integrations: [
    tailwind(), 
  ],
  vite: {
    resolve: {
      alias: {
        "@fortawesome": path.resolve(__dirname, 'node_modules/@fortawesome'),
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
