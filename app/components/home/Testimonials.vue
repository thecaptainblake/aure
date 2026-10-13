<template>
  <section class="mx-auto max-w-page px-4 py-22 md:px-6" aria-labelledby="testimonios-titulo">
    <h2 id="testimonios-titulo" class="font-serif text-4xl">Testimonios</h2>
    <ul class="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] md:grid md:grid-cols-3 md:overflow-visible [&::-webkit-scrollbar]:hidden">
      <li
        v-for="item in testimonials"
        :key="item.id"
        class="w-[82%] shrink-0 snap-start border border-ink/10 p-5 md:w-auto"
      >
        <blockquote class="font-serif text-2xl leading-snug text-ink">
          “{{ item.quote }}”
        </blockquote>
        <footer class="mt-6 flex items-center gap-3">
          <NuxtImg
            :src="item.photo.src"
            :alt="item.photo.alt"
            width="96"
            height="96"
            loading="lazy"
            class="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <p class="text-sm text-ink">{{ item.name }}</p>
            <p class="text-sm text-warm">{{ item.place }}</p>
          </div>
        </footer>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { testimonials } from '~~/data/testimonials'
</script>
