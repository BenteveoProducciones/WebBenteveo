<template>
  <div class="w-full flex flex-col bg-negro border border-blanco/33 rounded-2xl lg:rounded-3xl overflow-hidden">
    <div class="flex flex-col gap-4 border-b border-blanco/20 px-4 iph:px-5 md:px-6 lg:px-8 py-4 lg:py-5">
      <UiHeadingH3 class="text-amarillo text-base">Conoce el costo mensual de no automatizar</UiHeadingH3>
      <div class="flex items-center gap-2">
        <span v-for="n in 3" :key="n" class="h-1 flex-1 rounded-full overflow-hidden bg-blanco/18">
          <span class="block h-full bg-amarillo origin-left transition-transform duration-500 ease-out"
            :style="{ transform: `scaleX(${paso >= n ? 1 : 0})` }" />
        </span>
      </div>
    </div>

    <div class="md:min-h-112 lg:min-h-132 flex flex-col px-4 iph:px-5 md:px-6 lg:px-8 py-6 lg:py-8">
      <Transition name="paso" mode="out-in">
        <div v-if="paso === 1" key="1" class="flex-1 flex flex-col justify-between gap-7 md:gap-8">
          <div class="flex flex-col gap-3">
            <p class="text-hueso text-lg md:text-xl lg:text-2xl font-semibold leading-[1.3]">
              ¿Cuántas personas de tu equipo hacen tareas repetitivas?
            </p>
            <p class="text-hueso text-sm lg:text-base font-light leading-normal">
              Las que copian datos de un lado a otro, responden siempre lo mismo o arman reportes a mano.
            </p>
          </div>

          <div class="flex flex-col gap-5">
            <p class="flex items-baseline gap-2 text-amarillo text-5xl iph:text-6xl lg:text-7xl font-bold leading-none tabular-nums">
              {{ personas }}
              <span class="text-hueso text-lg iph:text-xl lg:text-2xl font-light">{{ personas === 1 ? 'persona' : 'personas' }}</span>
            </p>
            <label for="calc-personas" class="sr-only">Personas que hacen tareas repetitivas</label>
            <input id="calc-personas" v-model.number="personas" type="range" min="1" max="10" step="1" class="rango">
          </div>

          <div class="flex justify-end">
            <UiButtonPrimary class="w-full sm:w-max" @click="paso = 2">Siguiente</UiButtonPrimary>
          </div>
        </div>

        <div v-else-if="paso === 2" key="2" class="flex-1 flex flex-col justify-between gap-7 md:gap-8">
          <div class="flex flex-col gap-3">
            <p class="text-hueso text-lg md:text-xl lg:text-2xl font-semibold leading-[1.3]">
              De su semana laboral, ¿cuántas horas se le van en esas tareas?
            </p>
            <p class="text-hueso text-sm lg:text-base font-light leading-normal">{{ referenciaHoras }}</p>
          </div>

          <div class="flex flex-col gap-5">
            <p class="flex items-baseline gap-2 text-amarillo text-5xl iph:text-6xl lg:text-7xl font-bold leading-none tabular-nums">
              {{ horas }}
              <span class="text-hueso text-lg iph:text-xl lg:text-2xl font-light">{{ horas === 1 ? 'hora' : 'horas' }}</span>
            </p>
            <label for="calc-horas" class="sr-only">Horas por semana que le dedica cada una</label>
            <input id="calc-horas" v-model.number="horas" type="range" min="1" max="25" step="1" class="rango">
          </div>

          <div class="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
            <button type="button" class="w-max self-center sm:self-auto flex items-center gap-1 text-hueso text-sm lg:text-base font-light cursor-pointer transition-colors duration-200 lg:hover:text-amarillo"
              @click="paso = 1">
              <Icon name="material-symbols:arrow-back-rounded" size="20" class="shrink-0" />
              Volver
            </button>
            <UiButtonPrimary class="w-full sm:w-max gap-2" @click="paso = 3">
              Ver cuánto me cuesta
              <Icon name="material-symbols:arrow-forward-rounded" size="20" class="shrink-0" />
            </UiButtonPrimary>
          </div>
        </div>

        <div v-else key="3" class="flex-1 flex flex-col justify-between gap-6">
          <div class="flex flex-col gap-5">
            <div class="flex flex-col gap-1">
              <p class="text-hueso text-sm lg:text-base font-light">Tu equipo pierde</p>
              <p class="flex flex-wrap items-baseline gap-x-2 text-amarillo text-4xl iph:text-[2.75rem] md:text-5xl xl:text-6xl font-bold leading-none tabular-nums">
                {{ numero.format(horasAnimadas) }}
                <span class="text-hueso text-base iph:text-lg md:text-xl lg:text-2xl font-light">horas al mes</span>
              </p>
            </div>

            <div class="flex flex-col gap-1 bg-amarillo text-negro rounded-xl px-4 py-4 lg:px-5 lg:py-5">
              <p class="text-sm lg:text-base font-medium">A {{ costoHoraTexto }} la hora, eso te cuesta</p>
              <p class="text-2xl iph:text-[1.75rem] sm:text-[2rem] lg:text-3xl xl:text-4xl font-bold leading-tight tabular-nums">
                {{ moneda.format(costoAnimado) }}<span class="text-sm lg:text-lg font-medium"> por mes</span>
              </p>
              <p class="text-sm lg:text-base font-medium">
                En un año: {{ moneda.format(costoMensual * 12) }}
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-4 border-t border-blanco/20 pt-5">
            <p v-if="enviado" role="status" class="flex items-start gap-2 text-hueso text-sm lg:text-base">
              <Icon name="material-symbols:check-circle-outline-rounded" size="24" class="shrink-0 text-amarillo" />
              Listo. Te mandamos a {{ correo }} las 3 tareas de {{ rubroLabel }} que más conviene automatizar.
            </p>

            <form v-else @submit.prevent="enviar" class="flex flex-col gap-3">
              <p class="text-hueso text-sm lg:text-base font-light leading-[1.4]">
                Te mandamos las 3 tareas de tu rubro que deberías empezar a automatizar.
              </p>

              <div class="flex flex-col sm:flex-row gap-2">
                <div ref="selectRef" class="relative sm:flex-1 sm:min-w-0">
                  <button type="button" :aria-expanded="abierto" aria-haspopup="listbox"
                    class="w-full h-12 flex items-center justify-between gap-2 bg-blanco/18 rounded-lg text-sm lg:text-base font-light text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-amarillo transition-shadow pl-4 pr-3"
                    :class="rubro ? 'text-hueso' : 'text-gris'" @click="abierto = !abierto">
                    <span class="truncate">{{ rubroLabel }}</span>
                    <Icon name="material-symbols:keyboard-arrow-down-rounded" size="20"
                      class="shrink-0 text-amarillo transition-transform duration-200" :class="abierto ? 'rotate-180' : ''" />
                  </button>

                  <Transition name="opciones">
                    <ul v-if="abierto" role="listbox"
                      class="w-full max-h-60 flex flex-col absolute left-0 bottom-full z-20 overflow-y-auto bg-negro border border-blanco/33 rounded-lg shadow-[0_-8px_32px_rgba(0,0,0,0.6)] mb-2 p-1"
                      data-lenis-prevent>
                      <li v-for="ind in industrias" :key="ind.slug">
                        <button type="button" role="option" :aria-selected="rubro === ind.slug"
                          class="w-full flex items-center gap-2 rounded-md text-sm lg:text-base text-left font-light cursor-pointer transition-colors duration-150 lg:hover:bg-blanco/18 py-2.5 px-3"
                          :class="rubro === ind.slug ? 'text-amarillo' : 'text-hueso'"
                          @click="elegirRubro(ind.slug)">
                          <Icon :name="ind.icon" size="20" class="shrink-0 text-amarillo" />
                          {{ ind.label }}
                        </button>
                      </li>
                    </ul>
                  </Transition>
                </div>

                <label for="calc-correo" class="sr-only">Tu correo</label>
                <UiFormField id="calc-correo" v-model="correo" type="email" placeholder="nombre@tuempresa.com"
                  autocomplete="email" :error="error" class="sm:flex-1 sm:min-w-0" />
              </div>

              <div class="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                <button type="button"
                  class="w-max self-center sm:self-auto flex items-center gap-1 text-hueso text-sm lg:text-base font-light cursor-pointer transition-colors duration-200 lg:hover:text-amarillo"
                  @click="paso = 2">
                  <Icon name="material-symbols:arrow-back-rounded" size="20" class="shrink-0" />
                  Cambiar los números
                </button>
                <UiButtonPrimary type="submit" class="w-full sm:w-max">Enviármelas</UiButtonPrimary>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { industrias } from '~/constants/transformacion'

const HORAS_MES = 160
const SEMANAS_MES = 4.3
const DURACION = 700

const paso = ref(1)

const personas = ref(4)
const horas = ref(5)
const COSTO_HORA = 15000

const moneda = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
const numero = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 })

const referenciaHoras = computed(() => {
  if (horas.value <= 3) return 'Menos de media hora por día. Es el piso de casi cualquier equipo.'
  if (horas.value <= 7) return 'Alrededor de una hora por día, lo más habitual.'
  if (horas.value <= 14) return 'Cerca de dos horas por día: un día entero de trabajo por semana.'
  if (horas.value <= 22) return 'Más de medio día por semana en tareas que no suman.'
  return 'Casi toda la semana en trabajo que una herramienta haría sola.'
})

const horasMes = computed(() => Math.round(personas.value * horas.value * SEMANAS_MES))
const costoHoraTexto = moneda.format(COSTO_HORA)
const costoMensual = computed(() => horasMes.value * COSTO_HORA)
const fte = computed(() => Math.max(1, Math.round(horasMes.value / HORAS_MES)))

function useContador(fuente) {
  const mostrado = ref(fuente.value)
  let raf = null

  watch(fuente, (destino, desde) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      mostrado.value = destino
      return
    }
    if (raf) cancelAnimationFrame(raf)
    const inicio = performance.now()
    const salida = desde ?? mostrado.value
    const tick = (ahora) => {
      const t = Math.min((ahora - inicio) / DURACION, 1)
      const eased = 1 - Math.pow(1 - t, 4)
      mostrado.value = Math.round(salida + (destino - salida) * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
  })

  onBeforeUnmount(() => { if (raf) cancelAnimationFrame(raf) })
  return mostrado
}

const horasAnimadas = useContador(horasMes)
const costoAnimado = useContador(costoMensual)

const correo = ref('')
const rubro = ref('')
const error = ref(null)
const enviado = ref(false)

const abierto = ref(false)
const selectRef = ref(null)

const rubroLabel = computed(() => industrias.find((i) => i.slug === rubro.value)?.label ?? 'Elige tu rubro')

const elegirRubro = (slug) => {
  rubro.value = slug
  abierto.value = false
}

const alClickAfuera = (e) => {
  if (selectRef.value && !selectRef.value.contains(e.target)) abierto.value = false
}

const alEscape = (e) => {
  if (e.key === 'Escape') abierto.value = false
}

onMounted(() => {
  document.addEventListener('click', alClickAfuera)
  document.addEventListener('keydown', alEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', alClickAfuera)
  document.removeEventListener('keydown', alEscape)
})

watch([correo, rubro], () => { error.value = null })

const enviar = () => {
  if (!rubro.value) {
    error.value = 'Elige tu rubro para que el envío sea útil.'
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value)) {
    error.value = 'Ingresa un email válido para recibirlas.'
    return
  }
  enviado.value = true
}
</script>

<style scoped>
.rango {
  width: 100%;
  height: 6px;
  appearance: none;
  background: var(--color-gris);
  border-radius: 999px;
  outline: none;
  cursor: pointer;
}

.rango::-webkit-slider-thumb {
  appearance: none;
  width: 26px;
  height: 26px;
  background: var(--color-amarillo);
  border: 3px solid var(--color-negro);
  border-radius: 50%;
  box-shadow: var(--shadow-amarilla);
  cursor: grab;
  transition: transform 0.15s ease-out;
}

.rango::-moz-range-thumb {
  width: 26px;
  height: 26px;
  background: var(--color-amarillo);
  border: 3px solid var(--color-negro);
  border-radius: 50%;
  box-shadow: var(--shadow-amarilla);
  cursor: grab;
}

.rango:active::-webkit-slider-thumb {
  transform: scale(1.15);
}

.rango:focus-visible::-webkit-slider-thumb {
  outline: 2px solid var(--color-blanco);
  outline-offset: 2px;
}

.rango:focus-visible::-moz-range-thumb {
  outline: 2px solid var(--color-blanco);
  outline-offset: 2px;
}

.paso-enter-active {
  transition: opacity 0.35s ease-out, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.paso-leave-active {
  transition: opacity 0.2s ease-in, transform 0.2s ease-in;
}

.paso-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.paso-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.opciones-enter-active {
  transition: opacity 0.18s ease-out, transform 0.18s cubic-bezier(0.22, 1, 0.36, 1);
}

.opciones-leave-active {
  transition: opacity 0.12s ease-in, transform 0.12s ease-in;
}

.opciones-enter-from,
.opciones-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

@media (prefers-reduced-motion: reduce) {
  .paso-enter-active,
  .paso-leave-active,
  .opciones-enter-active,
  .opciones-leave-active {
    transition: none;
  }
}
</style>
