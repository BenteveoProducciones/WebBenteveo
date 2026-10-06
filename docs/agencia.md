---
paths:
  - "app/components/agencia/**"
  - "app/pages/agencia-creativa*.vue"
  - "app/constants/agencia.js"
---

# Landing /agencia-creativa

Rehecha con los patrones de la home. Secciones en `app/components/agencia/`, contenido en `constants/agencia.js`. Verificada sin overflow en los 8 anchos de referencia.

| Sección | Qué es |
|---|---|
| `AgenciaHero` | Video a pantalla completa `sticky top-0`, como `TransformacionHero`: la sección siguiente sube tapándolo. Se oculta al quedar cubierto con el mismo `cubierto` de `SharedHeroVideo`. Título en `heroAgencia`, typewriter con `heroFrases` y tiempos `ESPERA`/`TIPEO`/`BORRADO` |
| `AgenciaFrases` | "¿Te suena alguna de estas frases?" como mazo de cartas con los `comentarios`. Ver "Mazo" abajo |
| `AgenciaServicios` | 5 cards con foto que se expanden: hover desde `lg`, acordeón por click abajo. Ver "Servicios" abajo |
| `HomeProyectos` | El de la home con props `title`/`accent`/`cta`/`ctaTo` |
| `HomeContacto` | El global, con copy propio |

## Mazo

Se eligió entre 5 propuestas (globos flotando, chat, frases tachadas, cinta en marquee); las otras se borraron.

- Cada carta nueva **cae desde arriba sobre la pila** (`ARRIBA`) en vez de aparecer al descartar la de arriba. Para que avance 1→2→3→4, las anteriores quedan debajo de la activa: `orden` arranca en `[0, 3, 2, 1]` y la siguiente sale siempre del fondo.
- El fundido dura 0.15s y no toda la caída: con la carta semitransparente se leía el texto de la de abajo.
- El autoplay (`INTERVALO`, 3.5s) es el mismo tween de la barra de progreso. Se pausa fuera de pantalla y se reinicia con las flechas, el click o el swipe (a la derecha retrocede, lo demás avanza).
- **El z-index inicial va por clases (`CAPAS`), no por `:style`**: Vue reescribe todas las claves de un `:style` objeto en cada render, y cuando cambiaba el contador le pisaba el z-index a GSAP.
- Cards `glass bg-negro/90!`: el glass claro se aclaraba a gris al apilarse y el autor dejaba de leerse.

## Servicios

Cards separadas con el formato de `HomeServicioCard`: borde `blanco/33`, foto con overlay y número gigante cortado por el borde, en contorno si está cerrada y amarillo si está abierta (como `EventosNecesidades`).

- El overlay es `from-black/85 via-black/30 to-black/90` y no el de la home, porque acá el texto va arriba y el número abajo: las dos puntas necesitan oscuro.
- Desde `lg` la abierta es `flex-[1.6]`, y recién en `xl` pasa a `flex-[2.2]`. Con 2.2 en 1080 las cerradas quedaban de 98px y los títulos no entraban.
- El texto ocupa todo el ancho y aparece con `delay-500`, cuando la card ya casi terminó de abrirse, para que no se lo vea reacomodarse.
- Abajo de `lg` es acordeón vertical: cerradas `h-16 md:h-20`, abierta `h-72`, y el número sólo se ve en la abierta.

**Pendientes:**
- CTA "Ver todos los trabajos" → `#`.
