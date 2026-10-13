<template>
  <div :aria-busy="loading">
    <ul v-if="loading" class="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
      <li v-for="index in skeletonCount" :key="index" aria-hidden="true">
        <div class="aspect-[4/5] animate-pulse bg-ink/5 motion-reduce:animate-none" />
        <div class="mt-3 h-5 w-2/3 animate-pulse bg-ink/5 motion-reduce:animate-none" />
        <div class="mt-2 h-4 w-1/2 animate-pulse bg-ink/5 motion-reduce:animate-none" />
        <div class="mt-3 h-11 animate-pulse bg-ink/5 motion-reduce:animate-none" />
      </li>
    </ul>
    <ul v-else class="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
      <li v-for="product in products" :key="product.sku">
        <ProductCard :product="product" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '#shared/catalog'

withDefaults(
  defineProps<{
    products: Product[]
    loading?: boolean
    skeletonCount?: number
  }>(),
  {
    loading: false,
    skeletonCount: 6,
  },
)
</script>
