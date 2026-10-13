<template>
  <section class="relative flex min-h-[calc(100svh-8.75rem)] flex-col justify-end md:min-h-[calc(100svh-4.5rem)]">
    <NuxtImg
      src="/portada.jpg"
      alt="Collares, aretes y pulseras de oro y perlas de Aure sobre fondo beige"
      width="1280"
      height="562"
      preload
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="relative border-t border-ink/10 bg-bone px-5 py-8 md:px-10">
      <p class="text-xs tracking-[0.22em] text-warm uppercase">Monterrey</p>
      <h1 class="mt-3 max-w-xl font-serif text-4xl leading-tight md:text-6xl">
        Joyería hecha a mano
      </h1>
      <p class="mt-4 max-w-md text-sm leading-relaxed text-warm">
        Oro, plata y perla en series cortas. Mira el catálogo y aparta tu pieza por WhatsApp.
      </p>
      <div class="mt-6 flex flex-col gap-3 sm:flex-row">
        <NuxtLink
          to="/catalogo"
          class="inline-flex min-h-11 items-center justify-center border border-ink bg-ink px-5 text-sm tracking-wide text-bone transition-colors duration-200 hover:bg-bone hover:text-ink"
        >
          Ver colección
        </NuxtLink>
        <a
          :href="generalWhatsAppHref"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex min-h-11 items-center justify-center border border-ink/20 px-5 text-sm tracking-wide text-ink transition-colors duration-200 hover:border-gold"
        >
          Escríbenos por WhatsApp
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { generalWhatsAppHref } from '~/utils/whatsapp'
</script>
