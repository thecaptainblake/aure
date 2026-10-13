<template>
  <div>
    <div class="flex flex-wrap items-end justify-between gap-4">
      <h1 class="font-serif text-4xl">Catálogo</h1>
      <NuxtLink to="/admin/productos/nuevo" class="inline-flex min-h-11 items-center bg-ink px-5 text-sm text-bone">
        Nueva pieza
      </NuxtLink>
    </div>

    <p v-if="error" role="alert" class="mt-6 text-sm">No se pudo cargar el catálogo.</p>
    <p v-else-if="pending" class="mt-6 text-sm text-warm">Cargando piezas</p>
    <p v-else-if="!products?.length" class="mt-6 text-sm text-warm">Todavía no hay piezas.</p>

    <ul v-else class="mt-8 divide-y divide-ink/10 border-y border-ink/10">
      <li v-for="(product, index) in products" :key="product.id" class="flex flex-wrap items-center gap-3 py-4">
        <div class="min-w-0 flex-1">
          <p class="font-serif text-2xl">{{ product.name }}</p>
          <p class="text-sm text-warm">{{ product.sku }} · {{ product.category.name }} · stock {{ product.stock }}</p>
          <p class="text-sm">{{ product.isVisible && product.stock > 0 ? 'Visible en la tienda' : 'Oculta en la tienda' }}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            class="inline-flex min-h-11 items-center border border-ink/20 px-3 text-sm disabled:opacity-40"
            :disabled="index === 0 || moving"
            :aria-label="`Subir ${product.name}`"
            @click="handleMove(product.sku, 'up')"
          >
            Subir
          </button>
          <button
            type="button"
            class="inline-flex min-h-11 items-center border border-ink/20 px-3 text-sm disabled:opacity-40"
            :disabled="index === products.length - 1 || moving"
            :aria-label="`Bajar ${product.name}`"
            @click="handleMove(product.sku, 'down')"
          >
            Bajar
          </button>
          <NuxtLink
            :to="`/admin/productos/${product.sku}`"
            class="inline-flex min-h-11 items-center border border-ink px-3 text-sm"
          >
            Editar
          </NuxtLink>
          <button
            type="button"
            class="inline-flex min-h-11 items-center border border-ink/20 px-3 text-sm"
            @click="handleDelete(product.sku)"
          >
            {{ pendingDelete === product.sku ? 'Confirmar' : 'Eliminar' }}
          </button>
        </div>
      </li>
    </ul>
    <p v-if="actionError" role="alert" class="mt-4 text-sm">{{ actionError }}</p>
  </div>
</template>

<script setup lang="ts">
import type { AdminProduct } from '#shared/catalog'
import { fetchErrorMessage } from '~/utils/fetchError'

definePageMeta({ layout: 'admin' })

const requestFetch = useRequestFetch()
const pendingDelete = ref('')
const moving = ref(false)
const actionError = ref('')

const { data: products, pending, error, refresh } = await useAsyncData('admin-products', () =>
  requestFetch<AdminProduct[]>('/api/admin/products'),
)

const handleMove = async (sku: string, direction: 'up' | 'down') => {
  moving.value = true
  actionError.value = ''
  try {
    products.value = await $fetch<AdminProduct[]>('/api/admin/product-order', {
      method: 'PATCH',
      body: { sku, direction },
    })
  } catch (moveError) {
    actionError.value = fetchErrorMessage(moveError, 'No se pudo cambiar el orden')
  } finally {
    moving.value = false
  }
}

const handleDelete = async (sku: string) => {
  if (pendingDelete.value !== sku) {
    pendingDelete.value = sku
    return
  }
  actionError.value = ''
  try {
    await $fetch(`/api/admin/products/${sku}`, { method: 'DELETE' })
    pendingDelete.value = ''
    await refresh()
  } catch (deleteError) {
    actionError.value = fetchErrorMessage(deleteError, 'No se pudo eliminar')
  }
}
</script>
