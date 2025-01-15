import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sass from 'sass';
import favicons from "astro-favicons";

import favicons from 'astro-favicons';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), favicons()],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
  vite: {
    ssr: {
      noExternal: ['react-list-player'], 
    },
  },
});