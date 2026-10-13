<template>
  <ProductDetail v-if="product" :key="product.sku" :product="product" />
</template>

<script setup lang="ts">
import type { Product } from '#shared/catalog'
import { productSchema } from '~/utils/schema'

const route = useRoute()
const sku = computed(() => (typeof route.params.sku === 'string' ? route.params.sku : ''))

const { data: products } = await useAsyncData('catalog', () => $fetch<Product[]>('/api/products'))

const product = computed(() => products.value?.find((item) => item.sku === sku.value))

const showMissing = () => {
  if (!products.value || product.value) return
  throw createError({
    statusCode: 404,
    statusMessage: 'Producto no encontrado',
    fatal: true,
  })
}

showMissing()
watch(product, showMissing)

const description = computed(() => {
  const item = product.value
  if (!item) return 'Pieza de joyería Aure Monterrey. Consulta disponibilidad y precio por WhatsApp.'
  return `${item.name}. ${item.description} Consulta por WhatsApp.`
})

usePageSeo({
  title: () => product.value?.name ?? 'Producto',
  description,
  path: () => `/producto/${sku.value}`,
  image: () => product.value?.images[0]?.src,
  jsonLd: () => (product.value ? productSchema(product.value) : undefined),
})
</script>
