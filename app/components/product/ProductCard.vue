<template>
  <article class="flex h-full flex-col">
    <NuxtLink :to="`/producto/${product.sku}`" class="group block">
      <div class="aspect-[4/5] overflow-hidden border border-ink/10 bg-bone">
        <NuxtImg
          :src="image.src"
          :alt="image.alt"
          width="480"
          height="600"
          loading="lazy"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transform-none"
        />
      </div>
      <h2 class="mt-3 font-serif text-xl leading-tight text-ink">{{ product.name }}</h2>
      <p class="mt-2 text-sm text-ink">{{ formatPrice(product.price) }}</p>
    </NuxtLink>
    <a
      :href="href"
      target="_blank"
      rel="noopener noreferrer"
      class="mt-3 inline-flex min-h-11 w-full items-center justify-center border border-ink px-2 text-center text-xs tracking-wide text-ink transition-colors duration-200 hover:border-gold"
    >
      Consultar por WhatsApp
    </a>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '#shared/catalog'
import { formatPrice } from '~/utils/price'

const props = defineProps<{
  product: Product
}>()

const image = computed(
  () =>
    props.product.images[0] ?? {
      src: '/portada.jpg',
      alt: props.product.name,
      width: 800,
      height: 1000,
    },
)

const { href } = useProductWhatsApp(() => props.product)
</script>
