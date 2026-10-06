---
paths:
  - "app/components/eventos/**"
  - "app/pages/eventos.vue"
  - "app/constants/eventos.js"
---

# Landing /eventos

Rehecha con los patrones de la home y transformación. Secciones en `app/components/eventos/`, contenido en `constants/eventos.js`.

**Dos videos**: el corto (`hero-eventos.mp4`, poster `hero-eventos.jpg`) adentro de las letras del hero, y el showreel largo (`show-reel-eventos.mp4`) en `EventosProduccion`. URLs en `heroEventos` y `showreelEventos` de `constants/eventos.js`.

## Hero

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
