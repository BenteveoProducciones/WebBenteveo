---
paths:
  - "app/components/kit/**"
  - "app/pages/kit-4-0.vue"
  - "app/constants/kit.js"
  - "app/composables/useCalculoKit.js"
---

# Página /kit-4-0

Se llega desde `TransformacionKit` (`ROUTE_NAMES.kit`). La página es `pages/kit-4-0.vue` y sus secciones en `app/components/kit/`, listas en `constants/kit.js` (`pasosKit`, `preguntasKit`, `bancos`).

| Sección | Qué es |
|---|---|
| `KitHero` | Centrado (bandera, título, bajada) sobre una grilla de puntos que se enciende en amarillo alrededor del cursor. `sticky top-0` como los otros heros: las secciones siguientes llevan `relative z-10` y lo tapan, y se pone `invisible` cuando queda cubierto. Con alto ≤ 560px deja de ser sticky: el hero no entra en pantalla y la sección siguiente tapaba el botón. Lleva el botón glass que abre el pop-up |
| `KitFunciona` | Bento: el paso 1 grande con "50%" y los pasos 2 y 3 apilados. Grilla `lg:grid-cols-[1.1fr_1fr]` |
| `KitCalculadora` | Misma grilla que `Funciona` para que las columnas coincidan: calculadora **sin recuadro** a la izquierda, card de bancos a la derecha. Botón glass a la derecha y el disclaimer debajo de la línea |
| `KitCta` | CTA final: tarjeta amarilla centrada como `HomeContacto` pero **sin form ni eyebrow**: título, bajada y abajo el botón "Empezar a transformar mi empresa" para agendar la reunión. Lleva `id="contacto"` |
| `KitQuiz` | Pop-up de 3 preguntas (avanza sola al elegir) y resultado positivo. Frena Lenis y el scroll mientras está abierto. El botón glass "Quiero evaluar mi empresa" lo cierra y baja a `#contacto` con `scrollToEl` |

Cálculo en `useCalculoKit` (50% del monto, slider de ARS 4M a 50M, default 20M, montos animados). Logos de Santander y Galicia en `public/img/kit/`, bajados de Wikimedia: reemplazar por los oficiales si están.

## Responsive de /kit-4-0

Verificado sin overflow horizontal en 320 / 402 / 480 / 600 / 768 / 1080 / 1280 / 1440 / 1920 y en 740×360, incluido el pop-up (scrollea adentro en pantallas bajas).

- Barra KIT/Tu empresa: el ancho es `max(12rem, 18% + progreso)`. Sin el piso, con el monto mínimo en 320 se cortaba "Tu empresa".
- Cajas de resultado con `justify-between`: en 1080 "Aporte estimado de tu empresa" ocupa dos líneas y los montos quedaban desalineados.
- Botón de la calculadora: abajo de `iph` va sin flecha (`hidden!`, el `!` por el CSS de `@nuxt/icon`) y con `px-4`, si no se parte en dos líneas.

**Pendiente**: el botón de `KitCta` apunta a `#`, falta el link del calendario para agendar.
