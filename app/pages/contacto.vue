<template>
  <article class="mx-auto max-w-2xl px-4 py-16 md:px-6">
    <p class="text-xs tracking-[0.22em] text-warm uppercase">Monterrey</p>
    <h1 class="mt-3 font-serif text-4xl md:text-5xl">Contacto</h1>
    <p class="mt-6 max-w-prose text-sm leading-relaxed text-ink">
      Cuéntanos qué pieza viste, tu talla o la ciudad de envío. Respondemos por WhatsApp.
    </p>
    <div class="mt-8 flex flex-col gap-3 sm:flex-row">
      <a
        :href="generalWhatsAppHref"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex min-h-11 items-center justify-center bg-ink px-5 text-sm text-bone"
      >
        Escríbenos por WhatsApp
      </a>
      <a
        :href="instagramUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex min-h-11 items-center justify-center border border-ink/20 px-5 text-sm text-ink"
      >
        Instagram
      </a>
    </div>
    <p class="mt-8 text-sm text-warm">81 1977 5806</p>
  </article>
</template>

<script setup lang="ts">
import { instagramUrl } from '~~/data/site'
import { generalWhatsAppHref } from '~/utils/whatsapp'

usePageSeo({
  title: 'Contacto',
  description:
    'Contacta a Aure Monterrey por WhatsApp para disponibilidad, talla y envíos de joyería hecha a mano.',
  path: '/contacto',
})
</script>
