// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:3000',
  integrations: [
    tailwind(), 
  ],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    resolve: {
      alias: {
        "@fortawesome": resolve(__dirname, 'node_modules/@fortawesome'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['@fortawesome/fontawesome-free'],
          }
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
