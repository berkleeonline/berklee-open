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
  },
  vite: {
    define: {
      'import.meta.env.CONTENTFUL_SPACE_ID': JSON.stringify(process.env.CONTENTFUL_SPACE_ID),
      'import.meta.env.CONTENTFUL_PREVIEW_TOKEN': JSON.stringify(process.env.CONTENTFUL_PREVIEW_TOKEN),
      'import.meta.env.CONTENTFUL_DELIVERY_TOKEN': JSON.stringify(process.env.CONTENTFUL_DELIVERY_TOKEN),
      'import.meta.env.DEV': process.env.NODE_ENV !== 'production',
    },
  },
});
