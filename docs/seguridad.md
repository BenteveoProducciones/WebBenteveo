---
paths:
  - "app/components/seguridad/**"
  - "app/pages/seguridad.vue"
  - "app/constants/seguridad.js"
  - "app/composables/useTestSeguridad.js"
---

# Página /seguridad

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
