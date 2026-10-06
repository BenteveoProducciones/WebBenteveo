---
paths:
  - "app/components/rubro/**"
  - "app/pages/transformacion-tecnologica/*nombre*"
  - "app/constants/rubros.js"
---

# Páginas de rubro /transformacion-tecnologica/[nombre]

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

## Cards de Problemas

Se eligió entre 5 propuestas (cards 2×2, pestañas, "Hoy vs. Con Benteveo", chat); las otras se borraron.

- **El hover va en el `<li>`, que no gira, y no en la card que rota.** Si el hover está en el elemento que gira, a 90° la card se angosta, el puntero queda afuera y el giro se revierte: tiembla o no termina.
- Hover sólo con `pointerType === 'mouse'`; el click sólo gira en dispositivos sin hover (o con teclado, `e.detail === 0`). Si el click también girara en desktop, la card quedaba dada vuelta al sacar el mouse.
- Las dos caras van apiladas en la misma celda de grid (`[grid-area:1/1]`), no con `absolute`: la card toma el alto de la cara más larga y el texto nunca se corta.
- Las caras llevan `pb-20 lg:pb-24 xl:pb-28` para reservar el lugar del número cortado.
- **Abajo de `lg` (mobile y tablet) es un carrusel con scroll-snap nativo** (sin Embla): cards de `82%` (`55%` desde `tab`, `42%` desde `md`) con la siguiente asomando, y el `ul` sangra hasta el borde de la pantalla con margen negativo igual al padding de la sección. Desde `lg` pasan a las 4 en fila; en 768 se probó 2×2 y quedaban demasiado altas. Lleva `py-6 -my-6` porque `overflow-x-auto` también recorta en vertical, y al girar en 3D la card crece y su glow se cortaba.

## Pasos

Se eligió entre 5 propuestas (ventana con barras de progreso, miniaturas, zig-zag, carrusel centrado); las otras se borraron.

- **Las imágenes son capturas de UI 2:1 (1375×690) con contenido de borde a borde**: van siempre a `aspect-[1375/690]`, nunca en cajas cuadradas o verticales que las recorten.
- **Sticky, no pin de GSAP**: `recorrido` mide `100dvh + (n-1) × TRAMO + PAUSA` (en vh) y adentro va un `h-dvh sticky top-0` con título y cards. Por eso la sección lleva `overflow-visible!`: con el `overflow-hidden` de `DefaultSection` el sticky no se engancha.
- Las cards están apiladas en la misma celda (`[grid-area:1/1]`). Cada una entra desde abajo con `translateY` según su tramo del scroll (ease-out cúbico) y queda corrida `i rem` para que asomen las de atrás. Las tapadas se achican 4% por cada card encima, se oscurecen y su encabezado se desvanece: si no, en mobile asomaba medio texto cortado.
- `PAUSA` (20vh) deja la última card quieta un rato antes de soltar la sección.
- **Desde `lg` el título va en una columna a la izquierda** y la card se calcula con `min((100dvh - 17rem) × 2, 100% - 23rem)`: le deja al texto al menos 20rem y hace que la card entera entre en pantallas bajas. Se probó el título arriba en desktop y en una MacBook Air (1468×677) la imagen quedaba de ~500–600px de ancho. Abajo de `md` el título va arriba y la card ocupa el 100% del ancho.
- **En tablet (`md` a `lg`, 768–1079) el título y el subtítulo quedan fuera del sticky**: van antes de `recorrido` y se scrollean normal, y lo fijo es sólo el apilado de cards, arrancando arriba (`justify-start`) y con tope `max((100dvh - 16rem) × 2, 24rem)`. El sticky va con `top-28` y alto `100dvh - 7rem` en vez de `pt-28`: con el padding, antes de engancharse quedaba un hueco de 7rem entre el subtítulo y la card. En tablets apaisadas (~975×590) con el título adentro del sticky la card no entraba y lo tapaba; limitarla por alto con el título adentro la dejaba chiquita, esconder el subtítulo no convenció y sacar el apilado tampoco. El título está duplicado en el markup (`hidden md:max-lg:flex` afuera, `md:max-lg:hidden` adentro) para no mover el DOM con JS.

## Hero de rubro

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
