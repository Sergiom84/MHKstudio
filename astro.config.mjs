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

// Translations are served but noindexed (see src/layouts/Layout.astro), so
// they stay out of the sitemap too.
const translatedPath = /^\/(en|de|ru|it|fr)(\/|$)/;

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
      filter: (page) => {
        const { pathname } = new URL(page);
        return !nonIndexablePaths.has(pathname) && !translatedPath.test(pathname);
      },
    }),
  ],
});
