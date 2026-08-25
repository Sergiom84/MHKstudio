// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const nonIndexablePaths = new Set([
  '/aviso-legal',
  '/condiciones-generales',
  '/politica-de-cookies',
  '/politica-de-privacidad',
  '/gracias',
  '/en/thank-you',
  '/de/danke',
  '/ru/spasibo',
  '/it/grazie',
  '/fr/merci',
]);

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://mhkstudio.design',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sitemap({
      filter: (page) => !nonIndexablePaths.has(new URL(page).pathname),
    }),
  ],
});
