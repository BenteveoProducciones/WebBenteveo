---
paths:
  - "app/components/nosotros/**"
  - "app/pages/nosotros.vue"
  - "app/constants/nosotros.js"
---

# Página /nosotros (en armado)

Secciones en `app/components/nosotros/`, sólo las listas en `constants/nosotros.js` (`equipo`: nombre, rol y foto de las 16 personas; `paises`, `metricas`, `premios`, `sectores`). Los textos sueltos van en el template. Retratos B&N con fondo transparente en `public/img/nosotros/equipo/`, 600px de ancho.

**El hero no lleva las caras del equipo**: van en `NosotrosEquipo`, debajo.

`NosotrosEquipo`: anillo 3D de cards que gira solo, arrastrable con inercia; la de adelante se ilumina y muestra nombre y rol en una píldora glass. Nació como propuesta de hero y se eligió para esta sección. Título y subtítulo con el formato de H2 + subtítulo del resto de las páginas; sin `SharedLuces`. **El radio sale del ancho de la sección** (`0.5 ×`, con perspectiva `2 × radio`), no del tamaño de las cards: así la órbita ocupa casi todo el ancho sin agrandar las cards. Para que no queden separadas, la cantidad de cards (`huecos`) sale del perímetro (`2πr / (card × 1.12)`) y el equipo se repite en orden hasta llenarlo; se saltea el caso en que la misma persona quedaría pegada a sí misma en la unión. Las fotos son B&N y la del frente pasa a color (`grayscale` por frame según el coseno). `relative z-10 bg-negro` para tapar el hero `sticky` de la variante 4.

`NosotrosHero`: se eligió entre 10 propuestas en dos rondas (constelación, campo de trazos, columnas, convergencia, cilindro, piezas, red, iris, fusión); las otras se borraron. `sticky` + `recorrido` como `EventosHero`: disciplinas sueltas en tres profundidades, **todas en `hueso`** (se probó alternar amarillo y se descartó), con parallax según la capa. Posiciones en `PALABRAS` (% de la pantalla): la fila de arriba arranca en `y` 20–25% para no chocar con el header, y las cuatro de los costados (`lado`) sólo se ven desde `md`, porque en mobile el texto ocupa todo el ancho. Al scrollear viajan al centro y se funden en el título, que se enciende con un glow. Cada palabra son tres capas (parallax, viaje de scroll, flote) para que los tweens de `x`/`y` no se pisen. Las disciplinas son texto de relleno, falta validarlas.

`NosotrosPorQue` ("Por qué existimos", entre el hero y el equipo): se eligió entre 4 propuestas (editorial, manifiesto, foto a sangre, bento) la de foto a sangre, sumándole la línea 2011 → Hoy y las píldoras de países del bento. Foto a sangre sin efecto de apertura (se probó abrirla de card a pantalla completa con `clip-path` y se descartó), con parallax suave; texto encima y métricas en cards `glass bg-negro/50!` (apiladas a la derecha desde `lg`, fila de 3 abajo). La línea 2011 → Hoy y los contadores (`useConteo`) se reinician cada vez que la sección vuelve a entrar en pantalla, bajando o subiendo: la línea con `toggleActions: restart reset restart reset`, y los números vuelven a 0 cuando la lista sale del todo (`threshold: [0, 0.4]`). La foto `public/img/nosotros/por-que.webp` es placeholder de stock.

"Lo que ya hicimos" (después del equipo): `NosotrosHicimosLinea`. Se eligió entre 5 propuestas (paneles, línea de tiempo, editorial, bento, pestañas) la línea de tiempo, y después se pasó a **dos columnas desde `md`** (se probó una debajo de la otra, con la línea horizontal). Izquierda: premios en línea de tiempo vertical de 2014 a 2022, que se llena con el scroll y enciende cada punto; años grandes (`lg:text-5xl`) con premio y categoría debajo. Derecha: los 10 sectores (E-Commerce, Agroindustria, Real Estate y Turismo primero, el mismo orden de prioridad que el carrusel de Industrias) de a uno por fila, con `flex-1` para ocupar el mismo alto que la línea de tiempo (la grilla estira las dos columnas); abajo de `md` son tarjetas de 2/3 por fila con el ícono gigante cortado. Títulos "Premios" y "Sectores": `UiHeadingH3` `font-normal!` en pastilla `glass` centrada entre dos líneas que se desvanecen.

Después va `SharedEmpresas` con "Confían en nosotros" (sección aparte, con `SharedMarcas`), `HomeServicios` (las 3 capacidades de la home, sin cambios) y cierra `HomeContacto`.

## Responsive de /nosotros

Verificado sin overflow horizontal en 320 / 402 / 480 / 600 / 768 / 1080 / 1280 / 1440 / 1920, más pantallas bajas (320×568, 740×360, 1024×600, 1280×720).

- **Hero, pantallas bajas**: las palabras con `centro` (Video, Experiencias, Eventos) se ocultan abajo de `lg` con alto ≤ 640px, porque pisaban el título. Con alto ≤ 480px (celular apaisado) se ocultan todas, los botones van en fila y el bloque baja `pt-16` para no quedar bajo el header.
- **Hero, tamaño de las palabras**: fluido con `clamp` en `vw` (`TAMANOS`), sin saltos por breakpoint: se achican junto con el viewport, sobre todo las grandes (de 56px en 1920 a 20px en mobile). Desenfoque por capa en `DESENFOQUE`: 2px las grandes, nada las medianas y 1px las blancas (opacidad 0.8), para que no queden más nítidas que el resto.
- **Hero, flote trabado**: las tres capas de cada palabra llevan `will-change-transform`. Sin eso Chrome ajusta el texto al píxel entero y, como el flote es lento y corto (±6–14px en 3–4s), la palabra avanzaba de a saltos de 1px (medido). El costo no son las palabras: lo pesado del hero son los blur de `SharedLuces`, y en Chrome con GPU igual va a ~75fps.
- **Hero, `mac:`**: la lista de palabras arranca en `top-[7%]` para que la fila de arriba no choque con el header. El viaje al centro se calcula con `offsetTop` y el alto de la lista, no con el de la sección, así siguen convergiendo en el título.
- **Por qué existimos, mobile (< `md`)**: la foto termina `bottom-60` antes del pie y se funde a `negro`, así las métricas quedan sobre el fondo negro y no tapan la imagen. Cards apiladas, cada una en fila (número `text-4xl` a la izquierda, label a la derecha), con `glass` sin el `bg-negro/50!` (ese va sólo desde `lg`). Si cambia el alto de las cards, ajustar el `bottom-60`.
- **Premios, `tab` a `md` (600–767)**: año y premio en fila (año de ancho fijo, punto centrado en la fila). Apilados, la línea de tiempo ocupaba un tercio del ancho y el resto quedaba vacío. Desde `md` ya van en dos columnas y el año vuelve arriba del premio.
- **Sectores**: 3 por fila desde `tab`. Con 10 sectores la última queda sola en 600–767, centrada por el `justify-center`. Desde `md` pasan a filas.

**Pendiente**: "Ver trabajos" apunta a `#`.
