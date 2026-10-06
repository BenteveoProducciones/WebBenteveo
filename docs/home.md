---
paths:
  - "app/components/**"
  - "app/pages/**"
  - "app/constants/home.js"
---

# Home: referencia del rediseño

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

## Patrones para reusar

**Botón glass** (`variant="glass" size="glass"` en `UiButtonPrimary`): es el botón por defecto del diseño nuevo. El amarillo sólido quedó sólo para el CTA del header y el submit del form.

**Cards con imagen**: `border border-blanco/33 rounded-2xl overflow-hidden`, imagen `absolute inset-0 object-cover`, y encima `bg-linear-to-b from-black/25 to-black`. Sin `backdrop-blur`: borronea la foto.

**Números gigantes** (`01`, `02`, `03`): amarillos, pegados al borde inferior izquierdo y **cortados** por el borde de la card. Se logra con margin negativo (`-mb-4 md:-mb-6 lg:-mb-10 -ml-2 md:-ml-3 lg:-ml-4`), no con `leading`.

**Línea divisoria**: utility `linea-vertical`: degradé amarillo que se desvanece a `#131313` en las puntas. **Excepción**: la del footer es blanca sólida (`bg-white`), así está en el Figma.

**Logos de marcas**: los `.webp` de `public/img/marcas/` son blancos monocromo y desaparecen sobre fondo claro. `public/img/marcas/color/` y `reflejo.svg` quedaron sin uso desde que se eliminó `SharedMarcasTiles`.

## Video del hero

`marco` es un `div` **fixed** que arranca midiendo y posicionándose sobre un hueco invisible del grid, y crece a `100vw/100vh` con ScrollTrigger. Detalles que importan:

- Se desvanece con un `IntersectionObserver` cuando el hero sale de pantalla. Sin eso queda visible detrás de las otras secciones, que son transparentes.
- `html` lleva `background-color: negro-puro` para que no se vea el video en el rebote del overscroll de iOS.
- Todas las secciones que van después llevan `bg-negro` y `relative z-10` para tapar el video.

## Pin de Proyectos

La sección se pinnea y las cards entran desde abajo del viewport mientras el scroll avanza. Tres cosas que lo rompen:

1. **`overflow-hidden` en el `<section>`**: ScrollTrigger no puede aplicar `pinSpacing`. Por eso esta sección lleva `overflow-visible!`.
2. **`trigger` apuntando al componente `DefaultSection`**: GSAP necesita un elemento DOM. El `ref` va en un `<div>` interno y se usa `.closest('section')`.
3. **`inner="lg:h-full"`**: hace que el contenido ignore el `padding` de la sección y quede pegado al header.

El pin sólo corre desde 1080. Abajo de eso: 2 columnas con fade en `md`, acordeón en mobile.

El dot amarillo de la lista se posiciona por aritmética (`índice × alto + alto/2`), no midiendo el DOM: medirlo durante la transición del acordeón lo hacía saltar al fondo y volver.

## Cursor custom

`DefaultCursor` (`components/default/Cursor.client.vue`) convierte el puntero en una píldora glass con texto al pasar sobre cualquier elemento con `data-cursor-label="..."`. Lo usa `HomeProyectoCard`.

Dos trampas ya resueltas, no reintroducirlas:
- El centrado va por `transform` inline calculado en el rAF con el ancho actual. La clase `-translate-x-1/2` de Tailwind gana por especificidad y hace que la píldora crezca hacia un lado.
- Durante la salida el cursor tiene que quedarse en la rama estable del rAF (la condición incluye `glass-boton`), si no entra en el `scale` elástico y se estira justo antes de achicarse.

## Responsive

Verificado sin overflow horizontal en 320 / 402 / 480 / 768 / 1080 / 1280 / 1440 / 1920.

- Hover desactivado abajo de `md`: no aplica en touch y deja estados pegados.
- El hero se centra con `min-h-dvh` + `items-center` y padding vertical simétrico, no con `pt-*` fijo.
- El círculo del hero escala `lg:w-88 → xl:w-110 → xxl:w-125`, con `mac:w-96` aparte. A 476px fijos desbordaba 74px en 1080.

## Pendientes de la home

- **Gráfico de órbita** (`HomeEquipo`): el Figma sólo tiene un texto describiéndolo. Hoy es un gradiente diagonal con ese texto adentro.
- **Logos de marcas**: sólo 9 a color, y el Figma repite algunos. Los demás están en blanco monocromo y no sirven para los tiles.
- **CTAs a `#`**: "Ver todos los trabajos", "Conocer más de {proyecto}", "Contanos tu desafío", Nosotros y Blog del header y footer.
- **Form de contacto**: `submit` simulado con un `setTimeout`, falta el endpoint real.
