<template>
  <div>
    <h1 class="font-serif text-4xl">Nueva pieza</h1>
    <p v-if="pendingCategories" class="mt-6 text-sm text-warm">Cargando categorías</p>
    <p v-else-if="!categories?.length" class="mt-6 text-sm">
      Primero crea una categoría en
      <NuxtLink to="/admin/categorias" class="underline">Categorías</NuxtLink>.
    </p>
    <div v-else class="mt-8">
      <AdminProductForm
        :categories="categories"
        :pending="pending"
        :error="errorMessage"
        @save="handleSave"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AdminCategory, AdminProduct, ProductInput } from '#shared/catalog'
import { fetchErrorMessage } from '~/utils/fetchError'

definePageMeta({ layout: 'admin' })

const requestFetch = useRequestFetch()
const pending = ref(false)
const errorMessage = ref('')

const { data: categories, pending: pendingCategories } = await useAsyncData('admin-categories', () =>
  requestFetch<AdminCategory[]>('/api/admin/categories'),
)

const handleSave = async (payload: ProductInput) => {
  pending.value = true
  errorMessage.value = ''
  try {
    const product = await $fetch<AdminProduct>('/api/admin/products', {
      method: 'POST',
      body: payload,
    })
    await navigateTo(`/admin/productos/${product.sku}`)
  } catch (error) {
    errorMessage.value = fetchErrorMessage(error, 'No se pudo crear la pieza')
  } finally {
    pending.value = false
  }
}
</script>
