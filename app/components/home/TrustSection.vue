<template>
  <section class="mx-auto max-w-page px-4 py-22 md:px-6" aria-labelledby="confianza-titulo">
    <h2 id="confianza-titulo" class="font-serif text-4xl">Con calma y con respaldo</h2>
    <ul class="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
      <li v-for="item in items" :key="item.title" class="flex gap-4">
        <span class="flex h-11 w-11 shrink-0 items-center justify-center border border-gold text-ink" aria-hidden="true">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5">
            <path :d="item.icon" />
          </svg>
        </span>
        <div>
          <h3 class="font-serif text-2xl">{{ item.title }}</h3>
          <p class="mt-1 text-sm leading-relaxed text-warm">{{ item.text }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const items = [
  {
    title: 'Hecho a mano',
    text: 'Piezas armadas en Monterrey, en series cortas.',
    icon: 'M8 13c.5-3 2-5 4-5s3.5 2 4 5M7 17h10M9 17v2M15 17v2M12 4v4',
  },
  {
    title: 'Materiales certificados',
    text: 'Oro, plata y perla con respaldo de origen.',
    icon: 'M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z',
  },
  {
    title: 'Envíos',
    text: 'A todo México. El costo se confirma por WhatsApp.',
    icon: 'M3 7h11v8H3zM14 10h4l3 3v2h-7zM7 18a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM17 18a1.5 1.5 0 110-3 1.5 1.5 0 010 3z',
  },
  {
    title: 'Garantía',
    text: 'Cubrimos defectos de fabricación de la pieza.',
    icon: 'M12 3l2.2 4.6L19 8.2l-3.5 3.4.8 4.9L12 14.8 7.7 16.5l.8-4.9L5 8.2l4.8-.6L12 3z',
  },
  {
    title: 'Devoluciones',
    text: 'Cambios según la pieza. Escríbenos antes de usarla.',
    icon: 'M4 12a8 8 0 101.2-4.2M4 4v4h4',
  },
]
</script>
