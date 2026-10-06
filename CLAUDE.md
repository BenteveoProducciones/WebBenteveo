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

## Componentes globales reutilizables

| Componente | Uso |
|---|---|
| `DefaultSection` | Wrapper de sección: fondo full-width + contenido `max-w` centrado. Props: `bg`, `id`, `class` para gap/padding |
| `SharedHeroVideo` | Hero del diseño nuevo: video a pantalla completa `sticky` con las pestañas glass abajo. Props `video`, `poster`, `eyebrow`, `sonido` (botón glass de mute arriba a la derecha). Título por slot default, botones por `#actions`. Hoy no lo usa ninguna página: `TransformacionHero` dejó de envolverlo |
| `UiHeadingH1` / `UiHeadingH2` / `UiHeadingH3` | Tipografía de títulos |
| `UiButtonPrimary` | Botón principal. Variantes: `glass` (la del diseño nuevo, usar con `size="glass"`), `glass-dark` (mismo glass en negro, para fondos amarillos), `solid`, `light`, `dark`, `outline` |
| `DefaultCursor` | Cursor custom. Se expande a píldora con texto sobre elementos con `data-cursor-label` |
| `UiCarouselStatic` | Carrusel con drag, flechas en desktop, props `slidesPerView` (por breakpoint), `gap` y `buttonPosition`. El wrapper interno tiene `px-4 md:px-0` para padding lateral en mobile. **`buttonPosition` y `slidesPerView` se calibran juntos**: si las cards llenan el ancho exacto, la flecha cae sobre el contenido |
| `UiCarouselAutoplay` | Carrusel con autoplay (prop `interval`), arranca al entrar al viewport, snap y drag. Slot `#dots` con `{ total, current, goTo, playing }` para navegación custom |
| `UiAccordion` | Accordion animado con `grid-rows` transition. Prop `question`, contenido via slot |
| `UiFormField` | Input genérico con `v-model`, `id`, `type`, `placeholder`, `error`, `autocomplete`. Muestra error debajo si se pasa |
| `SharedLuces` | Las 5 manchas amarillas difuminadas con `mix-blend-screen` que flotan con GSAP (se cortan con `prefers-reduced-motion`). Lo que va en el slot se compone adentro del mismo grupo antes del blend. Expone `root`. Lo usan `HomeHero` y `EventosHero` |
| `SharedEmpresas` | Sección "Empresas que confiaron": título (prop `title`) + `SharedMarcas` + slot. La usan home (con métricas en el slot), /transformacion-tecnologica y /eventos |
| `SharedMarcas` | Marquee de los 24 logos blancos monocromo, sin tiles. Lo usa `SharedEmpresas` |
| `SharedHeroPuntos` | Hero centrado sobre la grilla de puntos que se enciende alrededor del cursor, `sticky` + `invisible` al quedar cubierto. Prop `ancho`, slot `#background`. Lo usan `KitHero`, `SeguridadHero` y `app/error.vue` (la 404). La entrada de los hijos es CSS con `animation-delay` por `nth-child` (hasta 4 hijos), no GSAP: así el texto pinta sin esperar al JS y el LCP baja ~1s en mobile |

**Sitemap**: los rubros salen de `constants/rubros.js` en `nuxt.config.ts`, filtrando los que no tienen `problemas` (páginas vacías). `'/transformacion-tecnologica/*/_payload.json'` lleva el mismo `swr` que los rubros: sin esa regla el payload daba 404 al navegar entre rubros.

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

## Home — referencia del rediseño

Figma: `Frontend Freelance`, artboards `240:1161` (1920), `240:2` (1080), `240:298` (760), `240:584` (320).

**Toda página nueva se maqueta copiando estos patrones.** La home ya está verificada 1:1 contra los cuatro artboards.

Secciones en orden, todas en `app/components/home/`, contenido en `constants/home.js`:

| Sección | Qué tiene | Notas |
|---|---|---|
| `HomeHero` | Título + 2 botones glass + círculo con video que se expande a pantalla completa al scrollear | El video es `fixed`; ver "Video del hero" abajo |
| `HomeServicios` | 3 cards con número gigante, imagen y botón "+" que en hover se expande a píldora | 1 col mobile → 3 desde `md` |
| `HomeEquipo` | Texto con primera frase en amarillo + bloque de gradiente diagonal | El gradiente es placeholder: falta el gráfico de órbita real |
| `HomeEmpresas` | Marquee infinito de logos + 3 métricas con líneas divisorias | Líneas sólo desde `md` |
| `HomeProyectos` | Lista + cards apiladas con pin de scroll | Ver "Pin de Proyectos" abajo |
| `HomeContacto` | Tarjeta amarilla `rounded-48` con formulario glass | `max-w-410`, no el 362 del resto |

### Patrones para reusar

**Botón glass** (`variant="glass" size="glass"` en `UiButtonPrimary`): es el botón por defecto del diseño nuevo. El amarillo sólido quedó sólo para el CTA del header y el submit del form.

**Cards con imagen**: `border border-blanco/33 rounded-2xl overflow-hidden`, imagen `absolute inset-0 object-cover`, y encima `bg-linear-to-b from-black/25 to-black`. Sin `backdrop-blur`: borronea la foto.

**Números gigantes** (`01`, `02`, `03`): amarillos, pegados al borde inferior izquierdo y **cortados** por el borde de la card. Se logra con margin negativo (`-mb-4 md:-mb-6 lg:-mb-10 -ml-2 md:-ml-3 lg:-ml-4`), no con `leading`.

**Línea divisoria**: utility `linea-vertical`: degradé amarillo que se desvanece a `#131313` en las puntas. **Excepción**: la del footer es blanca sólida (`bg-white`), así está en el Figma.

**Logos de marcas**: los `.webp` de `public/img/marcas/` son blancos monocromo y desaparecen sobre fondo claro. `public/img/marcas/color/` y `reflejo.svg` quedaron sin uso desde que se eliminó `SharedMarcasTiles`.

### Video del hero

`marco` es un `div` **fixed** que arranca midiendo y posicionándose sobre un hueco invisible del grid, y crece a `100vw/100vh` con ScrollTrigger. Detalles que importan:

- Se desvanece con un `IntersectionObserver` cuando el hero sale de pantalla. Sin eso queda visible detrás de las otras secciones, que son transparentes.
- `html` lleva `background-color: negro-puro` para que no se vea el video en el rebote del overscroll de iOS.
- Todas las secciones que van después llevan `bg-negro` y `relative z-10` para tapar el video.

### Pin de Proyectos

La sección se pinnea y las cards entran desde abajo del viewport mientras el scroll avanza. Tres cosas que lo rompen:

1. **`overflow-hidden` en el `<section>`**: ScrollTrigger no puede aplicar `pinSpacing`. Por eso esta sección lleva `overflow-visible!`.
2. **`trigger` apuntando al componente `DefaultSection`**: GSAP necesita un elemento DOM. El `ref` va en un `<div>` interno y se usa `.closest('section')`.
3. **`inner="lg:h-full"`**: hace que el contenido ignore el `padding` de la sección y quede pegado al header.

El pin sólo corre desde 1080. Abajo de eso: 2 columnas con fade en `md`, acordeón en mobile.

El dot amarillo de la lista se posiciona por aritmética (`índice × alto + alto/2`), no midiendo el DOM: medirlo durante la transición del acordeón lo hacía saltar al fondo y volver.

### Cursor custom

`DefaultCursor` (`components/default/Cursor.client.vue`) convierte el puntero en una píldora glass con texto al pasar sobre cualquier elemento con `data-cursor-label="..."`. Lo usa `HomeProyectoCard`.

Dos trampas ya resueltas, no reintroducirlas:
- El centrado va por `transform` inline calculado en el rAF con el ancho actual. La clase `-translate-x-1/2` de Tailwind gana por especificidad y hace que la píldora crezca hacia un lado.
- Durante la salida el cursor tiene que quedarse en la rama estable del rAF (la condición incluye `glass-boton`), si no entra en el `scale` elástico y se estira justo antes de achicarse.

### Responsive

Verificado sin overflow horizontal en 320 / 402 / 480 / 768 / 1080 / 1280 / 1440 / 1920.

- Hover desactivado abajo de `md`: no aplica en touch y deja estados pegados.
- El hero se centra con `min-h-dvh` + `items-center` y padding vertical simétrico, no con `pt-*` fijo.
- El círculo del hero escala `lg:w-88 → xl:w-110 → xxl:w-125`, con `mac:w-96` aparte. A 476px fijos desbordaba 74px en 1080.

### Pendientes de la home

- **Gráfico de órbita** (`HomeEquipo`): el Figma sólo tiene un texto describiéndolo. Hoy es un gradiente diagonal con ese texto adentro.
- **Logos de marcas**: sólo 9 a color, y el Figma repite algunos. Los demás están en blanco monocromo y no sirven para los tiles.
- **CTAs a `#`**: "Ver todos los trabajos", "Conocer más de {proyecto}", "Contanos tu desafío", Nosotros y Blog del header y footer.
- **Form de contacto**: `submit` simulado con un `setTimeout`, falta el endpoint real.

## Landing /agencia-creativa

Rehecha con los patrones de la home. Secciones en `app/components/agencia/`, contenido en `constants/agencia.js`. Verificada sin overflow en los 8 anchos de referencia.

| Sección | Qué es |
|---|---|
| `AgenciaHero` | Video a pantalla completa `sticky top-0`, como `TransformacionHero`: la sección siguiente sube tapándolo. Se oculta al quedar cubierto con el mismo `cubierto` de `SharedHeroVideo`. Título en `heroAgencia`, typewriter con `heroFrases` y tiempos `ESPERA`/`TIPEO`/`BORRADO` |
| `AgenciaFrases` | "¿Te suena alguna de estas frases?" como mazo de cartas con los `comentarios`. Ver "Mazo" abajo |
| `AgenciaServicios` | 5 cards con foto que se expanden: hover desde `lg`, acordeón por click abajo. Ver "Servicios" abajo |
| `HomeProyectos` | El de la home con props `title`/`accent`/`cta`/`ctaTo` |
| `HomeContacto` | El global, con copy propio |

### Mazo

Se eligió entre 5 propuestas (globos flotando, chat, frases tachadas, cinta en marquee); las otras se borraron.

- Cada carta nueva **cae desde arriba sobre la pila** (`ARRIBA`) en vez de aparecer al descartar la de arriba. Para que avance 1→2→3→4, las anteriores quedan debajo de la activa: `orden` arranca en `[0, 3, 2, 1]` y la siguiente sale siempre del fondo.
- El fundido dura 0.15s y no toda la caída: con la carta semitransparente se leía el texto de la de abajo.
- El autoplay (`INTERVALO`, 3.5s) es el mismo tween de la barra de progreso. Se pausa fuera de pantalla y se reinicia con las flechas, el click o el swipe (a la derecha retrocede, lo demás avanza).
- **El z-index inicial va por clases (`CAPAS`), no por `:style`**: Vue reescribe todas las claves de un `:style` objeto en cada render, y cuando cambiaba el contador le pisaba el z-index a GSAP.
- Cards `glass bg-negro/90!`: el glass claro se aclaraba a gris al apilarse y el autor dejaba de leerse.

### Servicios

Cards separadas con el formato de `HomeServicioCard`: borde `blanco/33`, foto con overlay y número gigante cortado por el borde, en contorno si está cerrada y amarillo si está abierta (como `EventosNecesidades`).

- El overlay es `from-black/85 via-black/30 to-black/90` y no el de la home, porque acá el texto va arriba y el número abajo: las dos puntas necesitan oscuro.
- Desde `lg` la abierta es `flex-[1.6]`, y recién en `xl` pasa a `flex-[2.2]`. Con 2.2 en 1080 las cerradas quedaban de 98px y los títulos no entraban.
- El texto ocupa todo el ancho y aparece con `delay-500`, cuando la card ya casi terminó de abrirse, para que no se lo vea reacomodarse.
- Abajo de `lg` es acordeón vertical: cerradas `h-16 md:h-20`, abierta `h-72`, y el número sólo se ve en la abierta.

**Pendientes:**
- CTA "Ver todos los trabajos" → `#`.

## Carrusel — patrón de slidesPerView

Para consistencia entre carruseles, el patrón base es:

```js
{ base: 1.2, sm: 1.5, tab: 2.2, md: 2.5, lg: 3, xl: 3, xxl: 3 }
```

Ajustar `lg`/`xl`/`xxl` según cuántas columnas tiene el diseño (2 para videos, 3 para cards).

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


## Landing /transformacion-tecnologica

Rehecha siguiendo los patrones de la home: `DefaultSection bg="bg-negro"` con `relative z-10`, la escala de padding lateral compartida, botones glass, cards con imagen y número gigante cortado, y `text-hueso` + `font-light` para el texto sobre oscuro.

Secciones en orden, en `app/components/transformacion/`. Contenido en `constants/transformacion.js`.

| Sección | Qué es |
|---|---|
| `TransformacionHero` | Titular y botones arriba, el video como card debajo que al scrollear se expande a pantalla completa. Ver "Hero" abajo |
| `SharedEmpresas` | `SharedMarcas` (logos blancos), "Ya se transformaron con nosotros" |
| `TransformacionDolor` + `Calculadora` | Dos columnas: texto y lista de tareas a la izquierda, calculadora a la derecha. Reemplazó a `HorasPerdidas` |
| `TransformacionBeneficios` + `BeneficioCard` | Las cuatro cosas, 4 en fila desde `lg`. Reemplazó a las cards apiladas rotadas |
| `TransformacionIndustrias` | Carrusel Embla de rubros con foto de fondo y línea de progreso arrastrable |
| `TransformacionResultados` | Métricas con número gigante y línea vertical, como `HomeEmpresas`. Reemplazó al uso de `SharedResultados` |
| `TransformacionOpiniones` | Dos `UiCarouselStatic`: testimonios y videos. Desde `lg` las flechas van afuera de las cards, en el padding lateral (`-2.875rem` en `lg`, `-3.5rem` desde `xl`): con `-1.25rem` la flecha de 40px pisaba la última card. En `md` quedan encima de la card que asoma, como en WebTEX |
| `TransformacionMedios` + `MedioCard` | Carrusel de notas de prensa. **Contenido e imágenes son placeholder** |
| `TransformacionProceso` | Pin desde `lg`: título amarillo centrado, las 3 cards glass suben escalonadas y después el botón. Ver "Proceso" abajo |
| `TransformacionSeguridad` | Texto a la izquierda, acordeón de pilares a la derecha. Grilla con `items-start`: con `items-center` la columna izquierda se recentraba al abrir cada acordeón |
| `TransformacionFaqs` | 10 preguntas |
| `HomeContacto` | El global, con el copy de cierre de esta página |

### Hero

El video (`public/video/hero-transformacion.mp4`) trae texto propio ("RESOLVEMOS TUS DESAFÍOS", "EL CAMBIO COMIENZA…", "AHORA") centrado en la franja media-baja, y cierra con el logo sobre blanco. Por eso el hero no le pone overlay, título ni botones encima, y ya no usa `SharedHeroVideo`. Se eligió entre 5 propuestas; también se probó el "cine" (video de borde a borde con barra de texto abajo, todo en `100dvh`) y se descartó.

- **`sticky top-0` + `recorrido`, como `EventosHero`, no pin**: con pin el video se iba para arriba junto con la página; con sticky la sección siguiente (`relative z-10 bg-negro`) sube tapándolo, como en el resto de las páginas. Por eso el componente tiene **dos raíces** (section + `recorrido`): envueltas en un div, el sticky queda atado a ese div y deja de tapar. Cuando queda cubierto se pone `invisible` y pausa el video.
- **Desde `lg`**: `recorrido` mide `150vh` y el ScrollTrigger va con `start: 0` y `end` = alto de `recorrido`, sin `trigger`. El video arranca como card a escala ≤ 0.5 debajo del titular (la escala sale del espacio libre bajo el titular, así la card entra entera en 1080×720) y crece a `100vw/100dvh` mientras el titular se va con `autoAlpha`. Después queda quieto a pantalla completa (`.to({}, { duration: 0.6 })`) hasta que termina `recorrido` y lo empieza a tapar la sección siguiente. Con `1.1` se sentía de más.
- El alto del titular se mide con `offsetTop + offsetHeight`, no con `getBoundingClientRect`: en un refresh con la página scrolleada el titular ya está corrido por el tween.
- **Abajo de `lg`**: sin animación y `recorrido` en 0. Titular, botones y el video `aspect-video` entero, centrados en `min-h-dvh` (con `object-cover` a pantalla completa en vertical se cortaría la frase). Sigue siendo sticky, salvo con alto ≤ 560px, donde no entra en pantalla.
- **Sin botón de sonido**: el video no tiene audio.

### Calculadora de Dolor

`Calculadora.vue`, separada de la sección. Portada de `benteveo_seccion_dolor_calculadora.html` en la lógica; el diseño se rehizo entero.

**Son tres pasos, no un formulario.** Barra de progreso arriba, una pregunta por pantalla, `<Transition name="paso" mode="out-in">` entre ellas. El orden importa: primero personas, después horas, y recién al final el resultado. El sueldo no se pregunta (`SUELDO_PROMEDIO` era el input más incómodo y hundía el completado); hoy la cuenta es directa por `COSTO_HORA = 15000`.

Fórmula: `horasMes = personas × horas × 4.3`, `costo = horasMes × COSTO_HORA`, `fte = max(1, round(horasMes / 160))` entero, nunca "3,8 personas".

Rangos medidos contra lo que es creíble: personas 1 a 10, horas 1 a 25 con default 5 (1 hora por día). El slider de horas pregunta **cuántas de su semana se van en esas tareas**, no la jornada: con el copy anterior "8 horas" se leía como part-time. `referenciaHoras` traduce el valor a horas por día debajo del título.

`useContador` anima horas y costo con rAF y ease-out en 700ms, respetando `prefers-reduced-motion`. Está declarado antes de su uso porque el `watch` no dispara en el primer render.

El select de rubro es custom (botón + `<ul role="listbox">`), no `<select>` nativo: se abre **hacia arriba** (`bottom-full`) porque vive al pie de la tarjeta, lleva `data-lenis-prevent` y cierra con click afuera o Escape. Sin rubro no deja enviar, porque el mail que se promete es "las 3 tareas de tu rubro".

**Altura fija para que no salte entre pasos**: `min-h-[35rem] md:min-h-[28rem] lg:min-h-[33rem]`, medido contra el paso 3 que es el más alto. Cada paso es `flex-1 flex flex-col justify-between`, **no `h-full`**: `<Transition>` no crea wrapper, el hijo es el flex item directo y `h-full` contra un padre con sólo `min-h` colapsa a cero.

El error del email se limpia con un `watch` sobre el ref, no con `@update:model-value` en el `UiFormField` (ese evento ya lo consume el `v-model` y el handler lo pisaría).

Envío simulado, sin endpoint, igual que `SharedFormContacto`.

### Pastilla en PasosTimeline

`SharedPasosTimeline` acepta `pill` opcional en cada item y la renderiza debajo del número. En las filas pares (`i % 2`) va `md:self-end` para acompañar el texto alineado a la derecha. La home y las otras páginas no la pasan, así que no cambian.

### Resultados

`TransformacionResultados` copia el formato de métricas de `HomeEmpresas`: número gigante amarillo con contador que arranca por `IntersectionObserver`, `linea-vertical` entre columnas, label debajo.

Dos diferencias por los datos: los números van un escalón más chicos (`7xl → 7rem`, no `8xl → 8rem`) porque "+80%" tiene más caracteres que "+40", y el label va en `text-sm/base` porque son frases largas, no dos palabras.

Las columnas llevan `md:items-start` + `md:self-start`: sin eso cada una se centra sola y los números quedan desalineados entre sí cuando los labels ocupan distinta cantidad de líneas.

### Industrias

**Sin pin de GSAP**: antes la sección se pinneaba y la pista se movía en `x` con el scroll vertical, y trababa el scroll. Hoy es un solo carrusel en todos los tamaños, con `embla-carousel-vue` directo (no `UiCarouselLoop`): `align: 'start'`, `containScroll: 'trimSnaps'`, `dragFree: true` (inercia al soltar, sin enganchar a cada card) y `duration: 30`. Sin loop.

La línea de abajo es la barra de scroll: ocupa todo el ancho, `h-1`, y el tramo amarillo mide lo visible (`rootNode.clientWidth / containerNode.scrollWidth`) y se mueve con `scrollProgress()`. Clickearla o arrastrarla (pointer capture) hace `scrollTo` al snap más cercano a esa posición.

Cards altas (`h-40 md:h-52 lg:h-80 xxl:h-96`) con la foto del rubro de fondo, tomada de `hero_*.webp` de `public/img/transformacion/rubros/` (las mismas que usa el hero de cada página de rubro, ya optimizadas).

El overlay es `from-transparent from-55% to-black/70`, no el `from-black/25 to-black` de las cards de la home: ese está pensado para cards con texto largo encima y acá, con una sola línea abajo, oscurecía toda la foto. **No subir el brillo de la imagen**, el ajuste va en el overlay.

### Proceso

Tiempos del pin (desde `lg`), ajustados a ojo:

- El encendido letra por letra del título va aparte del pin: `start: 'top 45%'` (cuando la frase entra al viewport; con `top bottom` más de la mitad pasaba fuera de pantalla) hasta 30vh adentro del pin.
- El pin dura `2.6 × innerHeight`. Las cards entran en `0.1`, la frase se va con `scale: 0.9` + `autoAlpha: 0` en `0.3` para que las cards no pasen por encima, el botón en `1.05`, y la pausa final es de `0.05` para que la sección se suelte apenas llega la última card.

### Medios

El círculo con la foto que sigue al cursor en hover mide `size-44 xl:size-52 xxl:size-56`. Se centra con su `offsetWidth`, así que cambiar el tamaño no lo descentra; los `sizes` de la imagen van a la par.

### Beneficios

Las cuatro en una fila desde `lg` (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`). `BeneficioCard` copia el formato de `HomeServicioCard` (imagen, número gigante cortado, título y texto con el mismo espaciado) pero es un `<article>` sin link, sin `data-cursor-label` y **sin el botón "+"**: no van a ningún lado.

### Pendientes

- **Sección Medios**: los 5 medios, títulos y links de `constants/transformacion.js` son inventados, y las imágenes de `public/img/transformacion/medios/` son copias de las de pasos.
- **Imágenes de Beneficios** (`public/img/transformacion/beneficios/`): también copias, faltan las reales.
- **Email de la calculadora**: sin endpoint. `COSTO_HORA = 15000` está sin validar con el cliente.
- **CTAs a `#contacto`**: apuntan al form de la propia página, pero "Solicitar auditoría" y "Agendar una llamada" del hero no tienen destino.

### Dev: prerender y caché

`routeRules` aplica `prerender` y `swr` **sólo con `NODE_ENV === 'production'`**. En dev estaban congelando el HTML: se editaba un componente y el browser seguía recibiendo la versión vieja, con warnings de hydration mismatch que parecían bugs del markup y no lo eran.

Si aparecen mismatches igual, el sospechoso es `.output` (un build viejo) o `.nuxt/cache`. Borrarlos y reiniciar.


## Páginas de rubro /transformacion-tecnologica/[nombre]

Rehechas con el design system de transformación. Secciones en `app/components/rubro/`, contenido por rubro en `constants/rubros.js` (la clave es el slug de la URL).

| Sección | Qué es |
|---|---|
| `RubroHero` | Texto a la izquierda y tres círculos de fotos superpuestos a la derecha, con `SharedLuces` de fondo. Sólo usa `h1` y `subtitulo` del rubro (y `circulos` cuando exista): **nada del contenido de Problemas u otras secciones**. Botones en `RubroHeroAcciones`. Ver "Hero de rubro" abajo |
| `RubroProblemas` | 4 cards que giran en 3D: frente con la pregunta ("Desafío"), dorso amarillo con la solución. Número gigante cortado como `HomeServicioCard`. Ver "Cards de Problemas" abajo |
| `RubroPasos` | Cards apiladas con la sección frenada: título y card 1 quedan fijos y las demás suben tapando a la anterior. Ver "Pasos" abajo |
| `RubroAutomatizaciones` | Carrusel de cards con borde, separado de Pasos |
| `TransformacionResultados` | Con prop `texto` para nombrar el rubro |
| `TransformacionOpiniones` | La de transformación entera. Lleva `id="opiniones"` para el CTA del hero |
| `TransformacionProceso` + `HomeContacto` | Los de transformación |

`SharedHero` y `SharedResultados` (diseño viejo) se borraron: sólo los usaban los rubros.

### Cards de Problemas

Se eligió entre 5 propuestas (cards 2×2, pestañas, "Hoy vs. Con Benteveo", chat); las otras se borraron.

- **El hover va en el `<li>`, que no gira, y no en la card que rota.** Si el hover está en el elemento que gira, a 90° la card se angosta, el puntero queda afuera y el giro se revierte: tiembla o no termina.
- Hover sólo con `pointerType === 'mouse'`; el click sólo gira en dispositivos sin hover (o con teclado, `e.detail === 0`). Si el click también girara en desktop, la card quedaba dada vuelta al sacar el mouse.
- Las dos caras van apiladas en la misma celda de grid (`[grid-area:1/1]`), no con `absolute`: la card toma el alto de la cara más larga y el texto nunca se corta.
- Las caras llevan `pb-20 lg:pb-24 xl:pb-28` para reservar el lugar del número cortado.
- **Abajo de `lg` (mobile y tablet) es un carrusel con scroll-snap nativo** (sin Embla): cards de `82%` (`55%` desde `tab`, `42%` desde `md`) con la siguiente asomando, y el `ul` sangra hasta el borde de la pantalla con margen negativo igual al padding de la sección. Desde `lg` pasan a las 4 en fila; en 768 se probó 2×2 y quedaban demasiado altas. Lleva `py-6 -my-6` porque `overflow-x-auto` también recorta en vertical, y al girar en 3D la card crece y su glow se cortaba.

### Pasos

Se eligió entre 5 propuestas (ventana con barras de progreso, miniaturas, zig-zag, carrusel centrado); las otras se borraron.

- **Las imágenes son capturas de UI 2:1 (1375×690) con contenido de borde a borde**: van siempre a `aspect-[1375/690]`, nunca en cajas cuadradas o verticales que las recorten.
- **Sticky, no pin de GSAP**: `recorrido` mide `100dvh + (n-1) × TRAMO + PAUSA` (en vh) y adentro va un `h-dvh sticky top-0` con título y cards. Por eso la sección lleva `overflow-visible!`: con el `overflow-hidden` de `DefaultSection` el sticky no se engancha.
- Las cards están apiladas en la misma celda (`[grid-area:1/1]`). Cada una entra desde abajo con `translateY` según su tramo del scroll (ease-out cúbico) y queda corrida `i rem` para que asomen las de atrás. Las tapadas se achican 4% por cada card encima, se oscurecen y su encabezado se desvanece: si no, en mobile asomaba medio texto cortado.
- `PAUSA` (20vh) deja la última card quieta un rato antes de soltar la sección.
- **Desde `lg` el título va en una columna a la izquierda** y la card se calcula con `min((100dvh - 17rem) × 2, 100% - 23rem)`: le deja al texto al menos 20rem y hace que la card entera entre en pantallas bajas. Se probó el título arriba en desktop y en una MacBook Air (1468×677) la imagen quedaba de ~500–600px de ancho. Abajo de `md` el título va arriba y la card ocupa el 100% del ancho.
- **En tablet (`md` a `lg`, 768–1079) el título y el subtítulo quedan fuera del sticky**: van antes de `recorrido` y se scrollean normal, y lo fijo es sólo el apilado de cards, arrancando arriba (`justify-start`) y con tope `max((100dvh - 16rem) × 2, 24rem)`. El sticky va con `top-28` y alto `100dvh - 7rem` en vez de `pt-28`: con el padding, antes de engancharse quedaba un hueco de 7rem entre el subtítulo y la card. En tablets apaisadas (~975×590) con el título adentro del sticky la card no entraba y lo tapaba; limitarla por alto con el título adentro la dejaba chiquita, esconder el subtítulo no convenció y sacar el apilado tampoco. El título está duplicado en el markup (`hidden md:max-lg:flex` afuera, `md:max-lg:hidden` adentro) para no mover el DOM con JS.

### Hero de rubro

Se eligió entre varias rondas de propuestas; las demás se borraron.

- **Tres círculos** (arriba a la derecha, al medio más grande y corrido a la izquierda, abajo) superpuestos a medias, **una imagen fija cada uno** (se probó rotar 3 por círculo y se descartó). Tamaños y posiciones en `POSICIONES`.
- **Abajo de `lg` (320–1079) los tamaños son porcentaje del ancho de la columna con tope** (`w-[min(46%,10rem)]`, `min(72%,18rem)`, `min(54%,12rem)`) y los dos chicos se anclan con `left` respecto del grande (`left-[min(54%,15rem)]` arriba, con `top-[12%]`, y `left-[min(46%,14rem)]` abajo), no al borde derecho: como el grande tiene tope, en 1000 anclados a la derecha quedaban separados. Con tamaños fijos se amontonaban en 768 (columna de ~336px) y se separaban de 320 a 767 (caja de hasta 480px); sin tope, en 1000 el de abajo tapaba medio grande. Abajo de `md` la caja es un poco más alta que ancha (`aspect-[10/11]`, `max-w-104`, el chico de arriba en `top-0`) para que los dos chicos queden separados, y los tamaños van en porcentaje puro, sin tope: con alto fijo y ancho variable, en 320–400 los dos chicos quedaban uno encima del otro. Así la composición es idéntica en todo el rango y sólo cambia de escala.
- **Imágenes placeholder**: tres `hero_*.webp` (`PLACEHOLDERS`). Cuando estén las reales, cargarlas en `constants/rubros.js` como `circulos: [arriba, medio, abajo]`: el componente las toma antes que los placeholders.
- El H1 es `UiHeadingH1`, la misma escala que el resto de las páginas.
- Las fotos `hero_*.webp` vienen oscurecidas de origen: llevan `brightness-[1.6] contrast-[1.08]`.
- Fondo: `SharedLuces` (las de la home) detrás de todo.
- **Responsive**: dos columnas desde `md` (no `lg`); en 768 vertical, apilado, quedaba mucho vacío. Abajo de `md`, apilado con el grupo de círculos en `h-80 sm:h-96`, para que el hero entre en una pantalla de 320×800. Los tamaños de `lg` para arriba no cambian.
- **Las posiciones de los círculos van en % del ancho del grupo**: si el grupo es ancho y los círculos chicos, se separan. Por eso en `mac:` (notebooks bajas, círculos más chicos) el grupo se angosta a `max-w-108`; sin eso, en 1280–1440 × ≤820 el de arriba no llegaba a pisar al del medio. En `lg` y `mac:` los dos chicos van más a la derecha (`right-[4%]` y `right-[8%]`) y `xl:` vuelve a los valores de base: se pisan ~45px (arriba) y ~73px (abajo).
- El texto va dentro del `max-w-362` con la escala de padding: coincide con el header en todos los anchos.
- Entrada en CSS (`@keyframes` en el `<style scoped>`), no GSAP: los círculos aparecen escalonados con zoom y el texto sube escalonado. Con GSAP el contenido se pintaba en el HTML del server, se ocultaba al hidratar y recién después se animaba (parpadeo). Los círculos arrancan en `opacity: 0.01` y no en 0: son el LCP, y Chrome no cuenta como pintado un elemento en opacidad 0 (con 0 el LCP subía de 3.2s a 4.2s en mobile).
- Detalles de movimiento: cada círculo flota en loop con su propio ritmo (`FLOTE`), sigue al mouse con parallax según `PROFUNDIDAD` (el de abajo, que va adelante, se mueve más) y la foto hace zoom en hover desde `md`. **Cada círculo son dos capas**: la externa lleva la posición y el parallax (`x`/`y` con `quickTo`), la interna la flotación. En una sola capa los dos tweens de `y` se pisaban. Todo se corta con `prefers-reduced-motion`.

## Landing /eventos

Rehecha con los patrones de la home y transformación. Secciones en `app/components/eventos/`, contenido en `constants/eventos.js`.

**Dos videos**: el corto (`hero-eventos.mp4`, poster `hero-eventos.jpg`) adentro de las letras del hero, y el showreel largo (`show-reel-eventos.mp4`) en `EventosProduccion`. URLs en `heroEventos` y `showreelEventos` de `constants/eventos.js`.

### Hero

`EventosHero`: "EVENTOS" gigante (`18vw`, una línea) con el video corto adentro de las letras, y abajo el eyebrow en amarillo. **Sin pin: `sticky top-0` como `TransformacionHero`**, seguido de `recorrido`, un div transparente de `180vh`. Mientras se scrollea ese div el hero queda quieto y la palabra escala x70 con origen en el palo de la T hasta que el video llena la pantalla, y entran el H1 y los CTAs. Datos en `heroEventos` de `constants/eventos.js`.

Se eligió entre 5 propuestas (titular editorial, cinta de festival, visor de cámara, reflector); las otras se borraron.

Cuatro capas con **el mismo markup letra por letra** (`inline-block leading-none`), así quedan alineadas entre sí:

1. `capa`: fondo negro + texto blanco con `mix-blend-multiply`. El blanco deja ver el video, el negro lo tapa.
2. `trazo`: copia con el filtro SVG `#contorno-eventos` (`feMorphology` dilate − la silueta original, relleno amarillo): deja sólo el borde exterior, de 1.5 / 2 / 2.5px según el ancho (`grosor`). **No usar `-webkit-text-stroke`**: Inter es variable y sus glifos tienen contornos superpuestos, así que el stroke dibuja un rulo adentro de la V y la N. No puede ir dentro de `capa` porque el multiply lo mezcla con el video. Escala junto con `capa` y se desvanece al principio del zoom, porque a x70 se vuelve una franja gruesa.
3. `SharedLuces` (las de la home) con `opacity-50`: en un solo alto de pantalla entran las 5 manchas y saturaban. En su slot va `tapa`, la palabra en negro: dentro del grupo tapa las manchas y, como negro en `screen` no cambia nada, **las luces iluminan sólo el fondo y no el video de las letras**. `tapa` escala con `capa`, y las luces se ocultan junto con `capa` al final del pin.
4. Copia invisible que sólo sirve de ancla para el eyebrow (`top-[86%]` + padding). El eyebrow no puede posicionarse con `calc` sobre `50%` y `vw`: no coincidía con la base de las letras.

**`leading-none` en cada letra es obligatorio**: `main.css` tiene `* { line-height: 1.25 }`, que se aplica a los `inline-block` hijos y desplaza la caja de la palabra. Sin eso el eyebrow cae encima de las letras. Si una capa lleva texto corrido en vez de letra por letra, cambia el kerning y el contorno queda corrido.

**Por qué sticky y no pin**: con `pin` + `pinSpacing`, al terminar el pin el hero se iba para arriba junto con la página y la sección siguiente no se sentía subir. Con `sticky` la siguiente (`relative z-10 bg-negro`) sube tapando el H1, como en la home y transformación. El componente tiene **dos raíces** (section + `recorrido`) a propósito: si se envuelven en un div, el sticky queda atado a ese div y deja de tapar.

Recorrido: el zoom ocupa ~137vh, el estado final (H1 + CTAs) queda quieto ~43vh (`.to({}, { duration: 0.45 })`) y después la sección siguiente lo tapa durante 100vh. El ScrollTrigger va con `start: 0` y `end` = alto de `recorrido`, sin `trigger`: medir un elemento sticky da mal el inicio si se refresca con la página scrolleada. Cuando queda cubierto (`scrollY >= recorrido + alto del hero`) se pone `invisible` y pausa el video.

El texto final usa `autoAlpha` (no sólo `opacity`) para que los botones invisibles no se clickeen durante el pin.

| Sección | Qué es |
|---|---|
| `EventosHero` | Ver "Hero" arriba |
| `SharedEmpresas` | Marquee de logos blancos (`SharedMarcas`) con `title` propio |
| `EventosProduccion` | Dos columnas como `HomeEquipo`: texto + botón, y el showreel en card. En miniatura corre muted en loop (play/pause por `IntersectionObserver`); el click en la card abre un pop-up (`Teleport` a body, `z-70` sobre el header) con otro `<video>` desde el principio, con sonido y controles, y el botón glass de cerrar arriba a la derecha. Cierra con el botón, Escape o click afuera; mientras está abierto frena Lenis y el scroll, y pausa la miniatura. Al abrir y cerrar se dispara un `pointermove` sintético para que el cursor custom suelte la píldora "Ver showreel" sin esperar a que se mueva el mouse. H2 todo en `hueso`, sin tramo amarillo |
| `EventosNecesidades` | Las 6 necesidades en grilla 1/2/3 columnas, filas con borde superior como las listas de `TransformacionDolor`. Reemplazó a los "pedidos" rotados con borde punteado |
| `HomeProyectos` | El de la home, sin cambios |
| `HomeContacto` | El global, con copy de eventos |

## Página /nosotros (en armado)

Secciones en `app/components/nosotros/`, sólo las listas en `constants/nosotros.js` (`equipo`: nombre, rol y foto de las 16 personas; `paises`, `metricas`, `premios`, `sectores`). Los textos sueltos van en el template. Retratos B&N con fondo transparente en `public/img/nosotros/equipo/`, 600px de ancho.

**El hero no lleva las caras del equipo**: van en `NosotrosEquipo`, debajo.

`NosotrosEquipo`: anillo 3D de cards que gira solo, arrastrable con inercia; la de adelante se ilumina y muestra nombre y rol en una píldora glass. Nació como propuesta de hero y se eligió para esta sección. Título y subtítulo con el formato de H2 + subtítulo del resto de las páginas; sin `SharedLuces`. **El radio sale del ancho de la sección** (`0.5 ×`, con perspectiva `2 × radio`), no del tamaño de las cards: así la órbita ocupa casi todo el ancho sin agrandar las cards. Para que no queden separadas, la cantidad de cards (`huecos`) sale del perímetro (`2πr / (card × 1.12)`) y el equipo se repite en orden hasta llenarlo; se saltea el caso en que la misma persona quedaría pegada a sí misma en la unión. Las fotos son B&N y la del frente pasa a color (`grayscale` por frame según el coseno). `relative z-10 bg-negro` para tapar el hero `sticky` de la variante 4.

`NosotrosHero`: se eligió entre 10 propuestas en dos rondas (constelación, campo de trazos, columnas, convergencia, cilindro, piezas, red, iris, fusión); las otras se borraron. `sticky` + `recorrido` como `EventosHero`: disciplinas sueltas en tres profundidades, **todas en `hueso`** (se probó alternar amarillo y se descartó), con parallax según la capa. Posiciones en `PALABRAS` (% de la pantalla): la fila de arriba arranca en `y` 20–25% para no chocar con el header, y las cuatro de los costados (`lado`) sólo se ven desde `md`, porque en mobile el texto ocupa todo el ancho. Al scrollear viajan al centro y se funden en el título, que se enciende con un glow. Cada palabra son tres capas (parallax, viaje de scroll, flote) para que los tweens de `x`/`y` no se pisen. Las disciplinas son texto de relleno, falta validarlas.

`NosotrosPorQue` ("Por qué existimos", entre el hero y el equipo): se eligió entre 4 propuestas (editorial, manifiesto, foto a sangre, bento) la de foto a sangre, sumándole la línea 2011 → Hoy y las píldoras de países del bento. Foto a sangre sin efecto de apertura (se probó abrirla de card a pantalla completa con `clip-path` y se descartó), con parallax suave; texto encima y métricas en cards `glass bg-negro/50!` (apiladas a la derecha desde `lg`, fila de 3 abajo). La línea 2011 → Hoy y los contadores (`useConteo`) se reinician cada vez que la sección vuelve a entrar en pantalla, bajando o subiendo: la línea con `toggleActions: restart reset restart reset`, y los números vuelven a 0 cuando la lista sale del todo (`threshold: [0, 0.4]`). La foto `public/img/nosotros/por-que.webp` es placeholder de stock.

"Lo que ya hicimos" (después del equipo): `NosotrosHicimosLinea`. Se eligió entre 5 propuestas (paneles, línea de tiempo, editorial, bento, pestañas) la línea de tiempo, y después se pasó a **dos columnas desde `md`** (se probó una debajo de la otra, con la línea horizontal). Izquierda: premios en línea de tiempo vertical de 2014 a 2022, que se llena con el scroll y enciende cada punto; años grandes (`lg:text-5xl`) con premio y categoría debajo. Derecha: los 10 sectores (E-Commerce, Agroindustria, Real Estate y Turismo primero, el mismo orden de prioridad que el carrusel de Industrias) de a uno por fila, con `flex-1` para ocupar el mismo alto que la línea de tiempo (la grilla estira las dos columnas); abajo de `md` son tarjetas de 2/3 por fila con el ícono gigante cortado. Títulos "Premios" y "Sectores": `UiHeadingH3` `font-normal!` en pastilla `glass` centrada entre dos líneas que se desvanecen.

Después va `SharedEmpresas` con "Confían en nosotros" (sección aparte, con `SharedMarcas`), `HomeServicios` (las 3 capacidades de la home, sin cambios) y cierra `HomeContacto`.

### Responsive de /nosotros

Verificado sin overflow horizontal en 320 / 402 / 480 / 600 / 768 / 1080 / 1280 / 1440 / 1920, más pantallas bajas (320×568, 740×360, 1024×600, 1280×720).

- **Hero, pantallas bajas**: las palabras con `centro` (Video, Experiencias, Eventos) se ocultan abajo de `lg` con alto ≤ 640px, porque pisaban el título. Con alto ≤ 480px (celular apaisado) se ocultan todas, los botones van en fila y el bloque baja `pt-16` para no quedar bajo el header.
- **Hero, tamaño de las palabras**: fluido con `clamp` en `vw` (`TAMANOS`), sin saltos por breakpoint: se achican junto con el viewport, sobre todo las grandes (de 56px en 1920 a 20px en mobile). Desenfoque por capa en `DESENFOQUE`: 2px las grandes, nada las medianas y 1px las blancas (opacidad 0.8), para que no queden más nítidas que el resto.
- **Hero, flote trabado**: las tres capas de cada palabra llevan `will-change-transform`. Sin eso Chrome ajusta el texto al píxel entero y, como el flote es lento y corto (±6–14px en 3–4s), la palabra avanzaba de a saltos de 1px (medido). El costo no son las palabras: lo pesado del hero son los blur de `SharedLuces`, y en Chrome con GPU igual va a ~75fps.
- **Hero, `mac:`**: la lista de palabras arranca en `top-[7%]` para que la fila de arriba no choque con el header. El viaje al centro se calcula con `offsetTop` y el alto de la lista, no con el de la sección, así siguen convergiendo en el título.
- **Por qué existimos, mobile (< `md`)**: la foto termina `bottom-60` antes del pie y se funde a `negro`, así las métricas quedan sobre el fondo negro y no tapan la imagen. Cards apiladas, cada una en fila (número `text-4xl` a la izquierda, label a la derecha), con `glass` sin el `bg-negro/50!` (ese va sólo desde `lg`). Si cambia el alto de las cards, ajustar el `bottom-60`.
- **Premios, `tab` a `md` (600–767)**: año y premio en fila (año de ancho fijo, punto centrado en la fila). Apilados, la línea de tiempo ocupaba un tercio del ancho y el resto quedaba vacío. Desde `md` ya van en dos columnas y el año vuelve arriba del premio.
- **Sectores**: 3 por fila desde `tab`. Con 10 sectores la última queda sola en 600–767, centrada por el `justify-center`. Desde `md` pasan a filas.

**Pendiente**: "Ver trabajos" apunta a `#`.

## Página /seguridad

Se llega desde `TransformacionSeguridad` ("Conoce más aquí", `ROUTE_NAMES.seguridad`). Secciones en `app/components/seguridad/`, listas en `constants/seguridad.js`. Cada sección se eligió entre 3 propuestas; las otras se borraron.

| Sección | Qué es |
|---|---|
| `SeguridadHero` | Centrado sobre la grilla de puntos de `KitHero`, que se enciende en amarillo alrededor del cursor (máscara radial que sigue al `pointermove`, sólo mouse), pastilla "Entorno 100% anónimo" en glass amarillo (`bg-amarillo/10` + borde `amarillo/35`, no `glass`: con el borde blanco parecía un botón) y botón glass que baja a `#test-seguridad`. `sticky top-0` + `invisible` al quedar cubierto, como `KitHero` |
| `SeguridadTest` | Una pregunta por pantalla: número gigante amarillo con `/8` chico al lado (en la base) y el tema debajo; opciones en filas con botón glass-boton. Barra de progreso en la línea superior. Avanza sola al elegir |
| `SeguridadResultado` | Card de dos columnas (`[1fr_1.6fr]`, la grilla del test): medidor + nivel + texto a la izquierda, `SeguridadFormDiagnostico` a la derecha |
| `SeguridadPrincipios` | Anillos concéntricos alrededor de "Tus datos" (SVG) a la izquierda, cada principio es una capa. Desde `lg` el H2 y la bajada van sobre la columna derecha, arriba de la lista-acordeón. **Abajo de `lg` no hay lista**: el acordeón con los anillos no entraba en un alto de pantalla. Va una sola card con el principio activo (sólo se renderiza el activo, con fundido `principio`, y el alto se adapta a cada texto: se probó apilar las 5 para que no salte y reservaba demasiado espacio vacío) y contador + flechas glass arriba; en mobile debajo de los anillos, que ocupan todo el ancho (`max-w-96`), en tablet al lado. "Tus datos" sólo desde `lg`: más chico se salía del círculo. El anillo activo se dibuja en amarillo como un timer (`stroke-dashoffset` animado por CSS, `INTERVALO` 6s, arranca en el número). Los números de los anillos van en columna arriba (se probó en diagonal y se descartó); para agrandarlos (r=9) los anillos van cada 21 unidades (`RADIOS`, el de afuera se pasa del viewBox con `overflow-visible`) y el círculo central baja a r=22 y al completarse (`animationend`) pasa al siguiente. Se pausa fuera de pantalla (`animation-play-state`). Click en un anillo o en un ítem salta a ese principio y reinicia el timer desde ahí (`vuelta` en la `key` del anillo), sin cortar el avance. Sin selección por hover: con el timer siempre corriendo, pasar el mouse por la lista lo reiniciaba |
| `SeguridadNormativas` | H2 corto centrado + la frase como párrafo, y 4 cards glass con emblema UE de fondo (`SeguridadEstrellas`), número gigante cortado y pastilla glass "Aplicada" abajo a la derecha |

**Test**: lógica en `useTestSeguridad` (puntaje por opción, `nivel` por `hasta` en `nivelesRiesgo`). **Las preguntas 2 a 8, los puntajes y los textos de los niveles los redactamos nosotros**: falta validarlos con el cliente.

**Medidor sin porcentaje**: se descartó el "% de exposición" (un test de 8 preguntas no sostiene una cifra). Son 3 tramos de arco (`TRAMOS`, geometría en el componente) que se encienden hasta el nivel, **todos del color del nivel** (crítico: los 3 en rojo; moderado: 2 en amarillo), con glow en el del nivel. Al centro, ícono + nombre + bajada del nivel. Se remonta por `:key="indiceNivel"` para repetir la animación.

**Form**: nombre, web con prefijo `https://`, correo corporativo y checkbox custom (input `sr-only` + caja amarilla al marcar). Botón amarillo sólido "Descargar diagnóstico y guía". Envío simulado, sin endpoint; "política de privacidad" apunta a `#`.

**Normativas**: no hay logos oficiales; el emblema es `SeguridadEstrellas` (12 estrellas en SVG). El título "Normativa europea en cada proyecto" es propuesta nuestra.

## Página /kit-4-0

Se llega desde `TransformacionKit` (`ROUTE_NAMES.kit`). La página es `pages/kit-4-0.vue` y sus secciones en `app/components/kit/`, listas en `constants/kit.js` (`pasosKit`, `preguntasKit`, `bancos`).

| Sección | Qué es |
|---|---|
| `KitHero` | Centrado (bandera, título, bajada) sobre una grilla de puntos que se enciende en amarillo alrededor del cursor. `sticky top-0` como los otros heros: las secciones siguientes llevan `relative z-10` y lo tapan, y se pone `invisible` cuando queda cubierto. Con alto ≤ 560px deja de ser sticky: el hero no entra en pantalla y la sección siguiente tapaba el botón. Lleva el botón glass que abre el pop-up |
| `KitFunciona` | Bento: el paso 1 grande con "50%" y los pasos 2 y 3 apilados. Grilla `lg:grid-cols-[1.1fr_1fr]` |
| `KitCalculadora` | Misma grilla que `Funciona` para que las columnas coincidan: calculadora **sin recuadro** a la izquierda, card de bancos a la derecha. Botón glass a la derecha y el disclaimer debajo de la línea |
| `KitCta` | CTA final: tarjeta amarilla centrada como `HomeContacto` pero **sin form ni eyebrow**: título, bajada y abajo el botón "Empezar a transformar mi empresa" para agendar la reunión. Lleva `id="contacto"` |
| `KitQuiz` | Pop-up de 3 preguntas (avanza sola al elegir) y resultado positivo. Frena Lenis y el scroll mientras está abierto. El botón glass "Quiero evaluar mi empresa" lo cierra y baja a `#contacto` con `scrollToEl` |

Cálculo en `useCalculoKit` (50% del monto, slider de ARS 4M a 50M, default 20M, montos animados). Logos de Santander y Galicia en `public/img/kit/`, bajados de Wikimedia: reemplazar por los oficiales si están.

### Responsive de /kit-4-0

Verificado sin overflow horizontal en 320 / 402 / 480 / 600 / 768 / 1080 / 1280 / 1440 / 1920 y en 740×360, incluido el pop-up (scrollea adentro en pantallas bajas).

- Barra KIT/Tu empresa: el ancho es `max(12rem, 18% + progreso)`. Sin el piso, con el monto mínimo en 320 se cortaba "Tu empresa".
- Cajas de resultado con `justify-between`: en 1080 "Aporte estimado de tu empresa" ocupa dos líneas y los montos quedaban desalineados.
- Botón de la calculadora: abajo de `iph` va sin flecha (`hidden!`, el `!` por el CSS de `@nuxt/icon`) y con `px-4`, si no se parte en dos líneas.

**Pendiente**: el botón de `KitCta` apunta a `#`, falta el link del calendario para agendar.
