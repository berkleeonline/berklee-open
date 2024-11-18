import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sass from 'sass';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  }
});
