# WebBenteveo

Sitio web de Benteveo — agencia de IA y transformación tecnológica.

## Stack

- **Nuxt 4** + **Vue 3** (Composition API, `<script setup>`)
- **Tailwind CSS v4** (via `@tailwindcss/vite`, sin config file — todo en `main.css`)
- **pnpm** como gestor de paquetes
- Módulos: `@nuxt/fonts`, `@nuxt/icon` (material-symbols), `@nuxt/image`, `@nuxtjs/seo`

## Convenciones Vue

- `<template>` primero, luego `<script setup>`, luego `<style>` (solo si es necesario)
- **Nunca** `lang="ts"` en script. Composables en `.js`, no `.ts`
- Sin comentarios en el código
- UI en español, código en inglés
- Copy en tuteo (tú: "quieres", "cuéntanos", "déjanos"), nunca voseo ("querés", "contanos")

## Design system

Definido en `app/assets/css/main.css` bajo `@theme`:

| Token | Valor |
|---|---|
| `negro` | `#131313` |
| `negro-puro` | `#000000` |
| `amarillo` | `#FCB716` |
| `blanco` | `#F8F8F8` |
| `hueso` | `#EAEAEA` — el "blanco" real del Figma para texto sobre oscuro |
| `gris` | `#808080` |
| `shadow-amarilla` | `0 0 18px 0 rgba(252,183,22,0.33)` |
| Fuente | Inter (400/500/600/700) — global en body, no usar `font-inter` |

**`hueso` vs `blanco`**: el Figma usa `#EAEAEA` para todo el texto sobre fondo oscuro. `blanco` (`#F8F8F8`) queda para bordes, fondos y el tema light. Texto nuevo sobre oscuro → `text-hueso`.

**`<Icon>` y `size-*`**: el CSS de `@nuxt/icon` fija `.iconify` en `1em` fuera de las capas de Tailwind y le gana a `size-*`. Va con `!` (`size-6!`) o con la prop `size`. Sin eso el ícono mide 16px aunque diga `lg:size-6`.

**`line-height` global**: `main.css` tiene `* { line-height: 1.25 }` fuera de las capas y le gana a cualquier `leading-*` y al `/lh` de `text-*`. Si el interlineado importa (números gigantes), va con `!` (`leading-[0.75]!`).

**`.animate-marquee`** también está fuera de las capas: su shorthand `animation` pisa cualquier utility `animation-*`. Dirección, duración y pausa van por `style` inline o con `!`.

### Breakpoints

`--breakpoint-*: initial` borra la escala default de Tailwind antes de redefinir. Sin esa línea conviven las dos y `lg` significa dos cosas.

| Nombre | px |
|---|---|
| `iph` | 402 |
| `sm` | 480 |
| `tab` | 600 |
| `md` | 768 |
| `lg` | 1080 |
| `xl` | 1280 |
| `xxl` | 1440 |
| `mac` | `min-width: 1280px and max-height: 820px` |

## Escala tipográfica — medida del Figma

Los cuatro artboards del Figma (320 / 760 / 1080 / 1920) dan esta escala. **La progresión no es gradual**: mobile y tablet comparten casi todos los valores, y 1080 ya usa los de desktop. No inventar pasos intermedios.

| Elemento | 320 | 768 | 1080 | 1920 |
|---|---|---|---|---|
| H1 hero | 20 | 24 | 32* | 44* |
| H2 sección | 20 | 20 | 28 | 28 |
| Número gigante | 88 | 88 | 128 | 128 |
| Título de card | 16 | 16 | 20 | 20 |
| Texto de card | 14 | 14 | 16 | 16 |
| Botón | 14 | 14 | 16 | 16 |
| Alto de card servicios | 186 | 240 | 320 | 320 |

\* El Figma marca 40 en 1080 y 48 en 1920, pero a esos tamaños el título invade el círculo del hero. Bajados a 32/44 tras medirlo en el browser.

### Padding lateral de sección

Todas las secciones, header y footer comparten la misma escala. Si una queda distinta, se desalinea con el resto:

```
px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30
```

### Ancho de contenido

`max-w-362` (1448px) es el ancho de contenido del Figma a 1920, y el default de `DefaultSection`. La única excepción es la tarjeta de Contacto: `max-w-410` (1640px), pasado también por `inner="max-w-410!"` porque el `max-w-362` del Section la recortaba.

## Estructura de componentes

Nada suelto en la raíz de `app/components/`: todo vive en una carpeta y el nombre del tag lo arma Nuxt con `Carpeta + Archivo`.

```
app/components/
  default/      # Chrome del layout: Header, Footer, Section, Cursor.client
  ui/           # Primitivas sin lógica de negocio: ButtonPrimary, HeadingH1-H3,
                # CarouselStatic/Autoplay/Loop, FormField, Accordion
  shared/       # Piezas de negocio usadas por más de una página: Hero, Marcas,
                # Resultados, FormContacto, OpinionCard, ProyectoCard,
                # ServicioCard, PasosTimeline
  home/         # Secciones de /
  agencia/      # Secciones de /agencia-creativa
  transformacion/ # Secciones de /transformacion-tecnologica
  eventos/      # Secciones de /eventos
  rubro/        # Secciones de /transformacion-tecnologica/[nombre]
```

Dónde va un componente nuevo: si lo usa una sola página → carpeta de esa página. Si lo usan varias y tiene contenido de negocio → `shared/`. Si es una primitiva reusable sin contenido → `ui/`. Si es parte del layout → `default/`.

## Botón glass — NO TOCAR

`.glass-boton` en `main.css`. **Cerrado. No modificar salvo pedido explícito de Lio.**

El hover es un tramo amarillo que recorre el borde con glow, sobre el resto del anillo transparente, con el glass (`backdrop-filter`) siempre visible.

Portado del slider de "Quiénes somos" de `Motix/web` (`app/components/home/Somos.vue`, `.somos__slider-glow`), que hace lo mismo en violeta y en loop. Acá corre sólo en hover.

Claves de ese gradiente: el amarillo va **sólido en `0deg` y `360deg`** — es el mismo punto del anillo, así el tramo queda continuo en vez de partirse en dos líneas. Los desvanecidos usan `color-mix`, y los dos `drop-shadow` dan el glow. Animación `spin-border 1.6s linear infinite`.

**El fragmento se estira y se comprime al girar, y es irreparable con `conic-gradient`.** Medido: el botón es 262×46 (5.7:1) y el conic reparte el arco en *ángulo*, no en píxeles. Un mismo arco de 70° mide entre 33px y 240px según dónde esté (7x de variación); por cada 10° recorre 4.1px en las puntas y 67.2px en los lados. Ningún valor de gradiente ni easing lo arregla: es geometría.

Alternativas ya probadas y descartadas, **no volver a intentarlas**:

| Intento | Por qué se descartó |
|---|---|
| SVG + `stroke-dashoffset` | Sí da largo constante, pero mete markup en el componente. Rechazado |
| `offset-path: border-box` | Sí da largo constante, se vio peor. Rechazado |
| `z-index: -1` sin mask | El fondo translúcido deja pasar el cono: manchón adentro del botón |
| `::after` con fondo sólido | Tapa el `backdrop-filter`: se pierde el glass |
| Anillo amarillo completo | No se ve recorrido, queda estático |
| Borde amarillo sólido sin animación | No es lo pedido |

Detalles que rompen el efecto si se tocan: `inset` debe ser `0` (con `-1.33px` aparecen dos anillos: el del pseudo y el del botón); `border-radius` debe ser `inherit` (un valor fijo corta la curva en las esquinas); el amarillo no puede estar en `0deg` **y** `360deg` a la vez (es el mismo punto del anillo, se ven dos líneas).

## Smooth scroll

Lenis vía `useSmoothScroll()` (`app/composables/useSmoothScroll.js`), enganchado una sola vez en `layouts/default.vue`. Imports lazy dentro de `onMounted`, así que no toca SSR. Guard de `prefers-reduced-motion`: si está activo no arranca y queda scroll nativo.

Los anclas van por `scrollToEl(id, offset)` del mismo composable, no por `href="#"` nativo (Lenis lo ignora y salta seco). Overlays con scroll propio necesitan `data-lenis-prevent`.

## Constantes

Datos de contenido en `app/constants/`. **Sólo arrays que se recorren con `v-for`**: títulos, subtítulos, párrafos y labels que aparecen una sola vez van escritos en el template.
- `home.js` — `servicios`, `equipo`, `metrics`, `proyectos`
- `transformacion.js` — `opiniones`, `proceso`, `faqs`, `metrics`, etc.
- `agencia.js` — `heroWords` (typewriter), `frases`, `servicios`, `pasos`
- `seguridad.js` — `preguntasSeguridad`, `nivelesRiesgo`, `principiosSeguridad`, `normativas`
- `routes.js` — `ROUTE_NAMES` para rutas tipadas

## Páginas

| Ruta | Estado |
|---|---|
| `/` | **Lista y 1:1 con el Figma. Es la referencia del rediseño** |
| `/transformacion-tecnologica` | Rehecha con el design system de la home |
| `/agencia-creativa` | Rehecha con el design system de la home |
| `/agencia-creativa-light` | Variante en tema light para test con cliente |
| `/eventos` | Rehecha con el design system de la home |
| `/nosotros` | En armado: hero y equipo listos |
| `/kit-4-0` | KIT 4.0: hero, cómo funciona, calculadora + bancos y pop-up de calificación |
| `/cita-confirmada` | Post-agenda (noindex): hero con check, qué esperar (2 cards con número cortado) y 4 preguntas paso a paso. Día y hora salen de `?dia=&hora=` (`useFechaCita`); envío simulado |
| `/seguridad` | Hero, test de exposición de 8 preguntas con resultado + form de descarga, principios en capas y normativas europeas |

## Variables de entorno

| Variable | Descripción |
|---|---|
| `SITE_URL` | URL pública del sitio (default: `https://benteveo.com`) |
| `INDEXABLE` | `true` para permitir indexación por bots (default: bloqueado) |

Crear `.env` local (no commitear):
```
SITE_URL=http://localhost:3000
INDEXABLE=false
```

## Comandos

```bash
pnpm dev       # desarrollo
pnpm build     # build producción
pnpm generate  # SSG
```

## Documentación

`CLAUDE.md` tiene solo reglas. El detalle vive en `docs/` y se carga solo al tocar los archivos que cada doc declara en `paths:` (symlinks en `.claude/rules/`).

| Doc | Qué tiene | Se carga al tocar |
|---|---|---|
| `docs/componentes.md` | Componentes globales (`DefaultSection`, `UiButtonPrimary`, carruseles, `SharedLuces`…) y patrón de `slidesPerView` | `app/components/**` |
| `docs/home.md` | Home, referencia del rediseño: patrones para reusar, video del hero, pin de Proyectos, cursor | `app/components/**`, `app/pages/**` |
| `docs/agencia.md` | /agencia-creativa: mazo, servicios | `components/agencia/`, su página y constantes |
| `docs/transformacion.md` | /transformacion-tecnologica: hero, calculadora, industrias, proceso | `components/transformacion/`, su página y constantes |
| `docs/rubro.md` | Páginas de rubro: problemas, pasos, hero de círculos | `components/rubro/`, `[nombre].vue`, `rubros.js` |
| `docs/eventos.md` | /eventos: hero con video en las letras, showreel | `components/eventos/`, su página y constantes |
| `docs/nosotros.md` | /nosotros: hero, anillo del equipo, premios | `components/nosotros/`, su página y constantes |
| `docs/seguridad.md` | /seguridad: test, medidor, principios, normativas | `components/seguridad/`, su página, constantes y `useTestSeguridad` |
| `docs/kit.md` | /kit-4-0: calculadora y quiz | `components/kit/`, su página, constantes y `useCalculoKit` |
| `docs/deploy.md` | Videos en Vercel Blob (migración pendiente), prerender/caché en dev, sitemap | `nuxt.config`, `vercel.json`, `public/**`, archivos con URLs de video |
