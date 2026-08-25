# Inventario de migración SEO de WordPress

Fuente: exportación WXR `mhkstudio.WordPress.2026-08-25.xml`, analizada el 25 de agosto de 2026. El XML se mantiene fuera del repositorio porque contiene datos administrativos.

## Contenido publicado recuperado

- 21 páginas.
- 5 entradas de proyecto de prueba.
- 141 adjuntos.
- 6 categorías y 5 etiquetas.

Las páginas principales, legales y las 11 landings españolas de ciudad tienen equivalente en la web Astro. `/personalizar-cookies` y `/proyectos` ya redirigen a sus equivalentes actuales.

## Rutas heredadas a redirigir

Las cinco entradas publicadas utilizaban permalinks fechados bajo `/2025/05/21/proyecto-de-prueba-N/`. Tanto estas rutas como sus variantes sin fecha redirigen a `/servicios`, el destino superviviente más cercano. Los archivos de categoría, etiqueta y fecha contenían exclusivamente estos proyectos de prueba y también redirigen a `/servicios`; el archivo de autor redirige a `/sobre-nosotros`.

Las reglas ejecutables están en `public/_redirects`. El inventario sanitizado está en `docs/wordpress-legacy-routes.json` y `npm run audit:seo` comprueba cada ruta contra las reglas reales, incluido su destino y código `301`.

## Medios

El WXR contiene las direcciones de 141 adjuntos, pero no sus binarios. Siete archivos con el mismo nombre ya existían en `public/images`; sus antiguas URLs de mayo de 2025 redirigen al recurso migrado. El WordPress permanece privado y responde `403` al intentar descargar los otros adjuntos sin sesión, por lo que no se han creado redirecciones hacia destinos inaccesibles ni se han inventado equivalencias.

Otros 127 adjuntos aparecen en el WXR mediante `/?attachment_id=N`. Una regla genérica por consulta podría afectar a la portada; sólo deben añadirse reglas específicas de Cloudflare si Search Console o los backlinks demuestran que alguna de esas URLs conserva tráfico o autoridad.

Para conservar las 134 URLs de archivos restantes bajo `/wp-content/uploads/`, se necesita la exportación independiente **Herramientas > Exportar archivos multimedia**, que WordPress.com entrega como archivo TAR organizado por año y mes. Hasta disponer de ese TAR, las páginas y recursos utilizados por la web actual no dependen de esos adjuntos.
