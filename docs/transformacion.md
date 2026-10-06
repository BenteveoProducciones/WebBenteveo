---
paths:
  - "app/components/transformacion/**"
  - "app/pages/transformacion-tecnologica/index.vue"
  - "app/constants/transformacion.js"
---

# Landing /transformacion-tecnologica

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

## Hero

El video (`public/video/hero-transformacion.mp4`) trae texto propio ("RESOLVEMOS TUS DESAFÍOS", "EL CAMBIO COMIENZA…", "AHORA") centrado en la franja media-baja, y cierra con el logo sobre blanco. Por eso el hero no le pone overlay, título ni botones encima, y ya no usa `SharedHeroVideo`. Se eligió entre 5 propuestas; también se probó el "cine" (video de borde a borde con barra de texto abajo, todo en `100dvh`) y se descartó.

- **`sticky top-0` + `recorrido`, como `EventosHero`, no pin**: con pin el video se iba para arriba junto con la página; con sticky la sección siguiente (`relative z-10 bg-negro`) sube tapándolo, como en el resto de las páginas. Por eso el componente tiene **dos raíces** (section + `recorrido`): envueltas en un div, el sticky queda atado a ese div y deja de tapar. Cuando queda cubierto se pone `invisible` y pausa el video.
- **Desde `lg`**: `recorrido` mide `150vh` y el ScrollTrigger va con `start: 0` y `end` = alto de `recorrido`, sin `trigger`. El video arranca como card a escala ≤ 0.5 debajo del titular (la escala sale del espacio libre bajo el titular, así la card entra entera en 1080×720) y crece a `100vw/100dvh` mientras el titular se va con `autoAlpha`. Después queda quieto a pantalla completa (`.to({}, { duration: 0.6 })`) hasta que termina `recorrido` y lo empieza a tapar la sección siguiente. Con `1.1` se sentía de más.
- El alto del titular se mide con `offsetTop + offsetHeight`, no con `getBoundingClientRect`: en un refresh con la página scrolleada el titular ya está corrido por el tween.
- **Abajo de `lg`**: sin animación y `recorrido` en 0. Titular, botones y el video `aspect-video` entero, centrados en `min-h-dvh` (con `object-cover` a pantalla completa en vertical se cortaría la frase). Sigue siendo sticky, salvo con alto ≤ 560px, donde no entra en pantalla.
- **Sin botón de sonido**: el video no tiene audio.

## Calculadora de Dolor

`Calculadora.vue`, separada de la sección. Portada de `benteveo_seccion_dolor_calculadora.html` en la lógica; el diseño se rehizo entero.

**Son tres pasos, no un formulario.** Barra de progreso arriba, una pregunta por pantalla, `<Transition name="paso" mode="out-in">` entre ellas. El orden importa: primero personas, después horas, y recién al final el resultado. El sueldo no se pregunta (`SUELDO_PROMEDIO` era el input más incómodo y hundía el completado); hoy la cuenta es directa por `COSTO_HORA = 15000`.

Fórmula: `horasMes = personas × horas × 4.3`, `costo = horasMes × COSTO_HORA`, `fte = max(1, round(horasMes / 160))` entero, nunca "3,8 personas".

Rangos medidos contra lo que es creíble: personas 1 a 10, horas 1 a 25 con default 5 (1 hora por día). El slider de horas pregunta **cuántas de su semana se van en esas tareas**, no la jornada: con el copy anterior "8 horas" se leía como part-time. `referenciaHoras` traduce el valor a horas por día debajo del título.

`useContador` anima horas y costo con rAF y ease-out en 700ms, respetando `prefers-reduced-motion`. Está declarado antes de su uso porque el `watch` no dispara en el primer render.

El select de rubro es custom (botón + `<ul role="listbox">`), no `<select>` nativo: se abre **hacia arriba** (`bottom-full`) porque vive al pie de la tarjeta, lleva `data-lenis-prevent` y cierra con click afuera o Escape. Sin rubro no deja enviar, porque el mail que se promete es "las 3 tareas de tu rubro".

**Altura fija para que no salte entre pasos**: `min-h-[35rem] md:min-h-[28rem] lg:min-h-[33rem]`, medido contra el paso 3 que es el más alto. Cada paso es `flex-1 flex flex-col justify-between`, **no `h-full`**: `<Transition>` no crea wrapper, el hijo es el flex item directo y `h-full` contra un padre con sólo `min-h` colapsa a cero.

El error del email se limpia con un `watch` sobre el ref, no con `@update:model-value` en el `UiFormField` (ese evento ya lo consume el `v-model` y el handler lo pisaría).

Envío simulado, sin endpoint, igual que `SharedFormContacto`.

## Pastilla en PasosTimeline

`SharedPasosTimeline` acepta `pill` opcional en cada item y la renderiza debajo del número. En las filas pares (`i % 2`) va `md:self-end` para acompañar el texto alineado a la derecha. La home y las otras páginas no la pasan, así que no cambian.

## Resultados

`TransformacionResultados` copia el formato de métricas de `HomeEmpresas`: número gigante amarillo con contador que arranca por `IntersectionObserver`, `linea-vertical` entre columnas, label debajo.

Dos diferencias por los datos: los números van un escalón más chicos (`7xl → 7rem`, no `8xl → 8rem`) porque "+80%" tiene más caracteres que "+40", y el label va en `text-sm/base` porque son frases largas, no dos palabras.

Las columnas llevan `md:items-start` + `md:self-start`: sin eso cada una se centra sola y los números quedan desalineados entre sí cuando los labels ocupan distinta cantidad de líneas.

## Industrias

**Sin pin de GSAP**: antes la sección se pinneaba y la pista se movía en `x` con el scroll vertical, y trababa el scroll. Hoy es un solo carrusel en todos los tamaños, con `embla-carousel-vue` directo (no `UiCarouselLoop`): `align: 'start'`, `containScroll: 'trimSnaps'`, `dragFree: true` (inercia al soltar, sin enganchar a cada card) y `duration: 30`. Sin loop.

La línea de abajo es la barra de scroll: ocupa todo el ancho, `h-1`, y el tramo amarillo mide lo visible (`rootNode.clientWidth / containerNode.scrollWidth`) y se mueve con `scrollProgress()`. Clickearla o arrastrarla (pointer capture) hace `scrollTo` al snap más cercano a esa posición.

Cards altas (`h-40 md:h-52 lg:h-80 xxl:h-96`) con la foto del rubro de fondo, tomada de `hero_*.webp` de `public/img/transformacion/rubros/` (las mismas que usa el hero de cada página de rubro, ya optimizadas).

El overlay es `from-transparent from-55% to-black/70`, no el `from-black/25 to-black` de las cards de la home: ese está pensado para cards con texto largo encima y acá, con una sola línea abajo, oscurecía toda la foto. **No subir el brillo de la imagen**, el ajuste va en el overlay.

## Proceso

Tiempos del pin (desde `lg`), ajustados a ojo:

- El encendido letra por letra del título va aparte del pin: `start: 'top 45%'` (cuando la frase entra al viewport; con `top bottom` más de la mitad pasaba fuera de pantalla) hasta 30vh adentro del pin.
- El pin dura `2.6 × innerHeight`. Las cards entran en `0.1`, la frase se va con `scale: 0.9` + `autoAlpha: 0` en `0.3` para que las cards no pasen por encima, el botón en `1.05`, y la pausa final es de `0.05` para que la sección se suelte apenas llega la última card.

## Medios

El círculo con la foto que sigue al cursor en hover mide `size-44 xl:size-52 xxl:size-56`. Se centra con su `offsetWidth`, así que cambiar el tamaño no lo descentra; los `sizes` de la imagen van a la par.

## Beneficios

Las cuatro en una fila desde `lg` (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`). `BeneficioCard` copia el formato de `HomeServicioCard` (imagen, número gigante cortado, título y texto con el mismo espaciado) pero es un `<article>` sin link, sin `data-cursor-label` y **sin el botón "+"**: no van a ningún lado.

## Pendientes

- **Sección Medios**: los 5 medios, títulos y links de `constants/transformacion.js` son inventados, y las imágenes de `public/img/transformacion/medios/` son copias de las de pasos.
- **Imágenes de Beneficios** (`public/img/transformacion/beneficios/`): también copias, faltan las reales.
- **Email de la calculadora**: sin endpoint. `COSTO_HORA = 15000` está sin validar con el cliente.
- **CTAs a `#contacto`**: apuntan al form de la propia página, pero "Solicitar auditoría" y "Agendar una llamada" del hero no tienen destino.
