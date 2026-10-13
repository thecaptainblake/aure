<template>
  <form class="grid max-w-xl gap-4" @submit.prevent="handleSubmit">
    <p v-if="error || localError" role="alert" class="text-sm">{{ error || localError }}</p>

    <div>
      <label class="text-sm" for="product-name">Título</label>
      <input id="product-name" v-model="name" required maxlength="120" class="mt-1 h-11 w-full border border-ink/15 bg-bone px-3 text-sm" />
    </div>

    <div>
      <label class="text-sm" for="product-sku">SKU</label>
      <input
        id="product-sku"
        v-model="sku"
        required
        maxlength="80"
        autocapitalize="off"
        spellcheck="false"
        class="mt-1 h-11 w-full border border-ink/15 bg-bone px-3 text-sm"
      />
      <p class="mt-1 text-sm text-warm">Minúsculas, números y guiones. Es la dirección pública de la pieza.</p>
    </div>

    <div>
      <label class="text-sm" for="product-description">Descripción</label>
      <textarea
        id="product-description"
        v-model="description"
        rows="5"
        maxlength="5000"
        class="mt-1 w-full border border-ink/15 bg-bone px-3 py-2 text-sm"
      />
    </div>

    <div>
      <label class="text-sm" for="product-category">Categoría</label>
      <select
        id="product-category"
        v-model="categoryId"
        required
        class="mt-1 h-11 w-full border border-ink/15 bg-bone px-3 text-sm"
      >
        <option value="" disabled>Elige una categoría</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label class="text-sm" for="product-price">Precio MXN</label>
        <input
          id="product-price"
          v-model="price"
          required
          inputmode="numeric"
          class="mt-1 h-11 w-full border border-ink/15 bg-bone px-3 text-sm"
        />
      </div>
      <div>
        <label class="text-sm" for="product-stock">Stock</label>
        <input
          id="product-stock"
          v-model="stock"
          required
          inputmode="numeric"
          class="mt-1 h-11 w-full border border-ink/15 bg-bone px-3 text-sm"
        />
      </div>
    </div>

    <label class="flex min-h-11 items-center gap-3 text-sm">
      <input v-model="isVisible" type="checkbox" class="h-4 w-4 accent-ink" />
      Visible en el catálogo
    </label>
    <p class="text-sm text-warm">Con stock 0 la pieza no aparece en la tienda, aunque esté marcada como visible.</p>

    <button
      type="submit"
      class="inline-flex min-h-11 w-fit items-center bg-ink px-5 text-sm text-bone disabled:opacity-50"
      :disabled="pending || !categories.length"
    >
      Guardar
    </button>
  </form>
</template>

<script setup lang="ts">
import type { AdminCategory, AdminProduct, ProductInput } from '#shared/catalog'

const props = defineProps<{
  categories: AdminCategory[]
  product?: AdminProduct
  pending: boolean
  error: string
}>()

const emit = defineEmits<{
  save: [payload: ProductInput]
}>()

const name = ref(props.product?.name ?? '')
const sku = ref(props.product?.sku ?? '')
const description = ref(props.product?.description ?? '')
const categoryId = ref(props.product?.category.id ?? '')
const price = ref(props.product ? String(props.product.price) : '')
const stock = ref(props.product ? String(props.product.stock) : '0')
const isVisible = ref(props.product?.isVisible ?? false)
const localError = ref('')

watch(
  () => props.product,
  (product) => {
    if (!product) return
    name.value = product.name
    sku.value = product.sku
    description.value = product.description
    categoryId.value = product.category.id
    price.value = String(product.price)
    stock.value = String(product.stock)
    isVisible.value = product.isVisible
  },
)

const handleSubmit = () => {
  localError.value = ''
  const parsedPrice = Number(price.value)
  const parsedStock = Number(stock.value)
  if (!Number.isInteger(parsedPrice) || parsedPrice < 0) {
    localError.value = 'El precio debe ser un entero en pesos'
    return
  }
  if (!Number.isInteger(parsedStock) || parsedStock < 0) {
    localError.value = 'El stock debe ser un entero de 0 en adelante'
    return
  }
  emit('save', {
    name: name.value.trim(),
    sku: sku.value.trim(),
    description: description.value.trim(),
    categoryId: categoryId.value,
    price: parsedPrice,
    stock: parsedStock,
    isVisible: isVisible.value,
  })
}
</script>
