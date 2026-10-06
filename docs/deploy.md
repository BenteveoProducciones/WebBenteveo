---
paths:
  - "nuxt.config.*"
  - "vercel.json"
  - "public/**"
  - "app/constants/agencia.js"
  - "app/constants/eventos.js"
  - "app/components/home/Hero.vue"
---

# Deploy, videos y caché

## Videos (Vercel Blob)

Los 4 videos pesados (hero home, hero agencia, hero eventos y showreel) se sirven desde Vercel Blob, con URLs escritas a mano en `components/home/Hero.vue`, `constants/agencia.js` y `constants/eventos.js`. `hero-transformacion.mp4` es el único que va en `public/video/`.

**Migración pendiente (2026-10-06)**: siguen apuntando al store `q7epkagsjeo0w9l9`, que está en la cuenta de Motix, y su tráfico se lo cobran a Motix aunque el repo y el proyecto de Vercel ya se transfirieron. Lara crea el Blob en la cuenta de Benteveo y sube los videos de `~/Desktop/Benteveo-videos` (los heros de agencia y eventos ya van recomprimidos a 720p con CRF 28; los otros dos son los originales). Cuando mande las URLs: reemplazarlas en esos 3 archivos, deployar, verificar que los videos carguen y recién ahí borrar el store viejo.

El hero de la home lleva `poster="/img/posters/hero-home.webp"` (el primer frame del video): sin poster, el fondo quedaba vacío mientras cargaba el video y eso empeoraba el LCP.

### Dev: prerender y caché

`routeRules` aplica `prerender` y `swr` **sólo con `NODE_ENV === 'production'`**. En dev estaban congelando el HTML: se editaba un componente y el browser seguía recibiendo la versión vieja, con warnings de hydration mismatch que parecían bugs del markup y no lo eran.

Si aparecen mismatches igual, el sospechoso es `.output` (un build viejo) o `.nuxt/cache`. Borrarlos y reiniciar.

## Sitemap

los rubros salen de `constants/rubros.js` en `nuxt.config.ts`, filtrando los que no tienen `problemas` (páginas vacías). `'/transformacion-tecnologica/*/_payload.json'` lleva el mismo `swr` que los rubros: sin esa regla el payload daba 404 al navegar entre rubros.
