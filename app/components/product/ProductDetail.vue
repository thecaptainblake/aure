<template>
  <article class="mx-auto grid max-w-page gap-8 px-4 py-8 md:grid-cols-2 md:px-6 md:py-16">
    <ProductGallery :title="product.name" :images="product.images" />

    <div>
      <nav aria-label="Ruta">
        <ol class="flex flex-wrap items-center gap-2 text-sm text-warm">
          <li>
            <NuxtLink to="/" class="inline-flex min-h-11 items-center text-ink">Inicio</NuxtLink>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <NuxtLink to="/catalogo" class="inline-flex min-h-11 items-center text-ink">Catálogo</NuxtLink>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <NuxtLink
              :to="`/catalogo/${product.category.slug}`"
              class="inline-flex min-h-11 items-center text-ink"
            >
              {{ product.category.name }}
            </NuxtLink>
          </li>
        </ol>
      </nav>

      <p class="text-sm text-warm">{{ product.category.name }}</p>
      <h1 class="mt-2 font-serif text-4xl md:text-5xl">{{ product.name }}</h1>
      <p class="mt-4 text-lg text-ink">{{ formatPrice(product.price) }}</p>
      <p class="mt-4 max-w-prose text-sm leading-relaxed text-ink">{{ product.description }}</p>

      <a
        :href="href"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-8 hidden min-h-11 items-center justify-center bg-ink px-5 text-sm text-bone md:inline-flex"
      >
        Consultar por WhatsApp
      </a>
    </div>

    <StickyWhatsAppBar :product="product" />
  </article>
</template>

<script setup lang="ts">
import type { Product } from '#shared/catalog'
import { formatPrice } from '~/utils/price'

const props = defineProps<{
  product: Product
}>()

const { href } = useProductWhatsApp(() => props.product)
</script>
