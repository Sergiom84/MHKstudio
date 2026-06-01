# MHK Studio

Sitio web de MHK Studio, desarrollado con Astro y desplegado en Cloudflare Pages.

## Estructura

```text
/
|-- public/
|-- src/
|   |-- components/
|   |-- data/
|   |-- i18n/
|   |-- layouts/
|   |-- pages/
|   `-- styles/
|-- astro.config.mjs
|-- package.json
`-- wrangler.toml
```

## Comandos

Todos los comandos se ejecutan desde la raiz del proyecto:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run deploy:cloudflare` | Build and deploy to Cloudflare Pages           |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
