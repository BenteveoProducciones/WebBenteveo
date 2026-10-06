<template>
  <section ref="root" class="w-full relative">
    <SharedLuces class="z-1" />

    <div
      class="w-full min-h-dvh flex justify-center items-center relative z-1 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-28 md:py-32 lg:py-36">
      <div
        class="w-full max-w-362 flex flex-col items-center gap-6 md:gap-8 lg:flex-row lg:justify-between lg:items-center lg:gap-8 xl:gap-12">
        <div
          class="w-full lg:flex-1 lg:min-w-0 lg:max-w-186 flex flex-col items-center gap-5 lg:items-start lg:gap-8 xl:gap-12">
          <div class="w-full flex flex-col items-center gap-4 lg:items-start">
            <UiHeadingH1 class="text-center lg:text-left text-amarillo text-balance">
              Ideas para conectar.<br>Estrategia para crecer.<br>Tecnología para transformar.
            </UiHeadingH1>

            <p class="w-full lg:max-w-137 text-center lg:text-left text-hueso text-sm md:text-base lg:text-xl font-light">
              Integramos creatividad, producción y transformación tecnológica mediante IA para resolver desafíos de
              marca y mejorar procesos de negocio.
            </p>
          </div>

          <div class="flex flex-col items-center gap-3 md:flex-row md:gap-6">
            <UiButtonPrimary to="#contacto" variant="glass" size="glass" class="pl-6 pr-4"
              @click.prevent="irA('contacto')">
              Hablemos
              <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6" />
            </UiButtonPrimary>

            <UiButtonPrimary to="#servicios" variant="glass" size="glass" class="pl-4 pr-6"
              @click.prevent="irA('servicios')">
              <Icon name="material-symbols:search-rounded" class="size-4 lg:size-6" />
              Conoce como trabajamos
            </UiButtonPrimary>
          </div>
        </div>

        <div ref="hueco"
          class="w-full max-w-90 aspect-square sm:max-w-100 md:w-110 md:h-110 md:max-w-none lg:w-92 lg:h-92 xl:w-120 xl:h-120 xxl:w-lg xxxl:w-xl xxl:h-128 xxxl:h-144 mac:w-96 mac:h-96 shrink-0" />
      </div>
    </div>

    <div ref="marco" class="fixed z-2 bg-negro overflow-hidden pointer-events-none transition-opacity duration-300"
      :class="[visible ? 'opacity-100' : 'opacity-0', !ubicado && 'invisible']">
      <video ref="video" src="https://q7epkagsjeo0w9l9.public.blob.vercel-storage.com/video/home/Benteveo-Agencia-Publicitaria.mp4" poster="/img/posters/hero-home.webp" preload="metadata"
        class="w-dvw h-dvh absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 object-cover" autoplay
        loop muted playsinline />
    </div>

    <div ref="disparador" class="w-full h-[160vh]" aria-hidden="true" />
  </section>
</template>

<script setup>
import { scrollToEl } from '~/composables/useSmoothScroll'
import { useGsapContext } from '~/composables/useGsapContext'

const root = useTemplateRef('root')
const hueco = useTemplateRef('hueco')
const marco = useTemplateRef('marco')
const video = useTemplateRef('video')
const disparador = useTemplateRef('disparador')

const visible = ref(true)
const ubicado = ref(false)

let observer = null

function irA(id) {
  scrollToEl(id, -100)
}

onMounted(() => {
  video.value?.play().catch(() => { })

  if (!root.value) return

  observer = new IntersectionObserver(([entrada]) => {
    visible.value = entrada.isIntersecting
  }, { threshold: 0 })

  observer.observe(root.value)
})

onBeforeUnmount(() => observer?.disconnect())

useGsapContext(root, (ctx, gsap) => {
  if (!marco.value || !hueco.value || !disparador.value) return

  const inicio = () => {
    const caja = hueco.value.getBoundingClientRect()
    return {
      width: caja.width,
      height: caja.height,
      top: caja.top + (window.scrollY || 0),
      left: caja.left,
      borderRadius: '50%'
    }
  }

  const medidaVideo = () => {
    const caja = hueco.value.getBoundingClientRect()
    const lado = Math.max(caja.width, caja.height)
    return { width: lado, height: lado }
  }

  gsap.set(marco.value, inicio())
  gsap.set(video.value, medidaVideo())
  ubicado.value = true

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  ctx.add(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: root.value,
        start: 'top top',
        end: () => `+=${window.innerHeight * 0.6}`,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onRefresh: () => {
          gsap.set(marco.value, inicio())
          gsap.set(video.value, medidaVideo())
        }
      }
    })
      .fromTo(
        marco.value,
        inicio,
        {
          width: () => Math.max(window.innerWidth, window.innerHeight),
          height: () => Math.max(window.innerWidth, window.innerHeight),
          top: () => (window.innerHeight - Math.max(window.innerWidth, window.innerHeight)) / 2,
          left: () => (window.innerWidth - Math.max(window.innerWidth, window.innerHeight)) / 2,
          borderRadius: '50%',
          ease: 'power1.out',
          duration: 0.7
        },
        0
      )
      .to(
        marco.value,
        {
          width: () => window.innerWidth,
          height: () => window.innerHeight,
          top: 0,
          left: 0,
          borderRadius: '0%',
          ease: 'power2.inOut',
          duration: 0.3
        },
        0.7
      )
      .fromTo(
        video.value,
        medidaVideo,
        {
          width: () => Math.max(window.innerWidth, window.innerHeight),
          height: () => Math.max(window.innerWidth, window.innerHeight),
          ease: 'power1.out',
          duration: 0.7
        },
        0
      )
      .to(
        video.value,
        {
          width: () => window.innerWidth,
          height: () => window.innerHeight,
          ease: 'power2.inOut',
          duration: 0.3
        },
        0.7
      )
  })
})
</script>
