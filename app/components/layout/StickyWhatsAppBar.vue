<template>
  <div class="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-bone px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
    <div class="flex items-center justify-between gap-3">
      <p class="font-serif text-2xl leading-none text-ink">{{ formatPrice(product.price) }}</p>
      <a
        :href="href"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex min-h-11 shrink-0 items-center justify-center bg-ink px-4 text-sm whitespace-nowrap text-bone"
      >
        Consultar por WhatsApp
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '#shared/catalog'
import { formatPrice } from '~/utils/price'

const props = defineProps<{
  product: Product
}>()

const { href } = useProductWhatsApp(() => props.product)
</script>
