<template>
  <div>
    <p v-if="loadError" role="alert" class="text-sm">No se encontró la pieza.</p>
    <template v-else-if="product && categories">
      <h1 class="font-serif text-4xl">{{ product.name }}</h1>
      <div class="mt-8">
        <AdminProductForm
          :categories="categories"
          :product="product"
          :pending="pending"
          :error="errorMessage"
          @save="handleSave"
        />
      </div>

      <section class="mt-12 max-w-xl" aria-labelledby="galeria-titulo">
        <h2 id="galeria-titulo" class="font-serif text-3xl">Galería</h2>
        <p class="mt-2 text-sm text-warm">Hasta 5 fotos. JPG, PNG o WebP, de 8 MB como máximo.</p>

        <form class="mt-6 grid gap-3" @submit.prevent="handleUpload">
          <div>
            <label class="text-sm" for="image-file">Foto</label>
            <input
              id="image-file"
              ref="fileInput"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              class="mt-1 block w-full text-sm"
              @change="handleFile"
            />
          </div>
          <div>
            <label class="text-sm" for="image-alt">Texto alternativo</label>
            <input
              id="image-alt"
              v-model="alt"
              maxlength="200"
              required
              class="mt-1 h-11 w-full border border-ink/15 bg-bone px-3 text-sm"
            />
          </div>
          <button
            type="submit"
            class="inline-flex min-h-11 w-fit items-center bg-ink px-5 text-sm text-bone disabled:opacity-50"
            :disabled="uploading || product.images.length >= 5"
          >
            Subir foto
          </button>
        </form>

        <ul class="mt-8 grid gap-4">
          <li v-for="(image, index) in product.images" :key="image.id" class="flex gap-3 border border-ink/10 p-3">
            <img :src="image.src" :alt="image.alt" class="h-24 w-20 object-cover" width="80" height="96" />
            <div class="min-w-0 flex-1">
              <p class="text-sm">{{ image.alt }}</p>
              <div class="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  class="inline-flex min-h-11 items-center border border-ink/20 px-3 text-sm disabled:opacity-40"
                  :disabled="index === 0"
                  :aria-label="`Subir foto ${index + 1}`"
                  @click="handleMoveImage(image.id, 'up')"
                >
                  Subir
                </button>
                <button
                  type="button"
                  class="inline-flex min-h-11 items-center border border-ink/20 px-3 text-sm disabled:opacity-40"
                  :disabled="index === product.images.length - 1"
                  :aria-label="`Bajar foto ${index + 1}`"
                  @click="handleMoveImage(image.id, 'down')"
                >
                  Bajar
                </button>
                <button
                  type="button"
                  class="inline-flex min-h-11 items-center border border-ink/20 px-3 text-sm"
                  @click="handleDeleteImage(image.id)"
                >
                  {{ pendingImage === image.id ? 'Confirmar' : 'Quitar' }}
                </button>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { AdminCategory, AdminProduct, ProductInput } from '#shared/catalog'
import { fetchErrorMessage } from '~/utils/fetchError'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const requestFetch = useRequestFetch()
const sku = computed(() => (typeof route.params.sku === 'string' ? route.params.sku : ''))
const pending = ref(false)
const uploading = ref(false)
const errorMessage = ref('')
const alt = ref('')
const file = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const pendingImage = ref('')

const { data: categories } = await useAsyncData('admin-categories', () =>
  requestFetch<AdminCategory[]>('/api/admin/categories'),
)

const { data: product, error: loadError } = await useAsyncData(
  () => `admin-product-${sku.value}`,
  () => requestFetch<AdminProduct>(`/api/admin/products/${sku.value}`),
)

const handleSave = async (payload: ProductInput) => {
  pending.value = true
  errorMessage.value = ''
  try {
    const updated = await $fetch<AdminProduct>(`/api/admin/products/${sku.value}`, {
      method: 'PATCH',
      body: payload,
    })
    if (updated.sku !== sku.value) {
      await navigateTo(`/admin/productos/${updated.sku}`)
      return
    }
    product.value = updated
  } catch (error) {
    errorMessage.value = fetchErrorMessage(error, 'No se pudo guardar la pieza')
  } finally {
    pending.value = false
  }
}

const handleFile = (event: Event) => {
  const input = event.target
  if (!(input instanceof HTMLInputElement)) return
  file.value = input.files?.[0] ?? null
}

const handleUpload = async () => {
  if (!file.value || !product.value) return
  uploading.value = true
  errorMessage.value = ''
  const body = new FormData()
  body.set('file', file.value)
  body.set('alt', alt.value)
  try {
    product.value = await $fetch<AdminProduct>(`/api/admin/products/${product.value.sku}/images`, {
      method: 'POST',
      body,
    })
    alt.value = ''
    file.value = null
    if (fileInput.value) fileInput.value.value = ''
  } catch (error) {
    errorMessage.value = fetchErrorMessage(error, 'No se pudo subir la foto')
  } finally {
    uploading.value = false
  }
}

const handleMoveImage = async (imageId: string, direction: 'up' | 'down') => {
  if (!product.value) return
  errorMessage.value = ''
  try {
    product.value = await $fetch<AdminProduct>(`/api/admin/products/${product.value.sku}/images/${imageId}`, {
      method: 'PATCH',
      body: { direction },
    })
  } catch (error) {
    errorMessage.value = fetchErrorMessage(error, 'No se pudo ordenar la foto')
  }
}

const handleDeleteImage = async (imageId: string) => {
  if (!product.value) return
  if (pendingImage.value !== imageId) {
    pendingImage.value = imageId
    return
  }
  errorMessage.value = ''
  try {
    product.value = await $fetch<AdminProduct>(`/api/admin/products/${product.value.sku}/images/${imageId}`, {
      method: 'DELETE',
    })
    pendingImage.value = ''
  } catch (error) {
    errorMessage.value = fetchErrorMessage(error, 'No se pudo quitar la foto')
  }
}
</script>
