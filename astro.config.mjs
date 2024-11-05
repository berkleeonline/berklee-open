import { defineConfig } from 'astro/config';
import awsAmplify from 'astro-aws-amplify';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sass from 'sass';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: awsAmplify(),
  integrations: [
    tailwind(), react()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
});
