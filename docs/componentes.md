---
paths:
  - "app/components/**"
---

# Componentes globales y carruseles

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

## Carrusel — patrón de slidesPerView

Para consistencia entre carruseles, el patrón base es:

```js
{ base: 1.2, sm: 1.5, tab: 2.2, md: 2.5, lg: 3, xl: 3, xxl: 3 }
```

Ajustar `lg`/`xl`/`xxl` según cuántas columnas tiene el diseño (2 para videos, 3 para cards).
