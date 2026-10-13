<template>
  <div class="mx-auto max-w-page px-4 py-8 md:px-6 md:py-16">
    <nav aria-label="Ruta" class="mb-4">
      <ol class="flex flex-wrap items-center gap-2 text-sm text-warm">
        <li>
          <NuxtLink to="/" class="inline-flex min-h-11 items-center text-ink">Inicio</NuxtLink>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <NuxtLink to="/catalogo" class="inline-flex min-h-11 items-center text-ink">Catálogo</NuxtLink>
        </li>
        <li v-if="slug !== 'todos'" aria-hidden="true">/</li>
        <li v-if="slug !== 'todos'" class="inline-flex min-h-11 items-center">{{ heading }}</li>
      </ol>
    </nav>

    <h1 class="font-serif text-4xl md:text-5xl">{{ heading }}</h1>
    <p v-if="search" class="mt-3 text-sm text-warm">Búsqueda: {{ search }}</p>

    <div class="mt-8">
      <CategoryChips />
    </div>

    <div class="mt-6 flex items-center justify-between gap-3">
      <p class="text-sm text-warm" aria-live="polite">
        <template v-if="pending">Cargando piezas</template>
        <template v-else-if="!error">{{ countLabel }}</template>
      </p>
      <button
        type="button"
        class="inline-flex min-h-11 items-center border border-ink/20 px-4 text-sm text-ink transition-colors duration-200 hover:border-ink"
        aria-controls="filter-drawer"
        :aria-expanded="drawerOpen"
        @click="handleOpenFilters"
      >
        Filtrar
        <span v-if="activeFilterCount"> ({{ activeFilterCount }})</span>
      </button>
    </div>

    <p v-if="error" role="alert" class="mt-10 text-sm text-ink">
      No pudimos cargar el catálogo. Intenta de nuevo.
    </p>
    <ProductGrid
      v-else-if="pending || visibleProducts.length"
      class="mt-8"
      :products="visibleProducts"
      :loading="pending"
    />
    <div v-else class="mt-16 border border-ink/10 px-6 py-12 text-center">
      <p class="font-serif text-3xl">No hay piezas con esos filtros</p>
      <button
        type="button"
        class="mt-6 inline-flex min-h-11 items-center border border-ink px-5 text-sm"
        @click="handleClearFilters"
      >
        Limpiar filtros
      </button>
    </div>

    <FilterDrawer
      v-model:open="drawerOpen"
      :categories="categories ?? []"
      :category="slug"
      :price="price"
      @apply="handleApplyFilters"
    />
  </div>
</template>

<script setup lang="ts">
import type { Product, ProductCategory } from '#shared/catalog'
import { filterProducts, isPriceBand, type PriceBand } from '~/utils/catalog'

const route = useRoute()

const slug = computed(() => {
  const param = route.params.category
  return typeof param === 'string' ? param : 'todos'
})

if (route.params.category === 'todos') {
  await navigateTo('/catalogo', { redirectCode: 301 })
}

const { data: categories } = await useAsyncData('categories', () =>
  $fetch<ProductCategory[]>('/api/categories'),
)

const ensureCategory = () => {
  const param = route.params.category
  if (!param) return
  if (typeof param !== 'string' || !categories.value?.some((category) => category.slug === param)) {
    throw createError({ statusCode: 404, statusMessage: 'Categoría no encontrada', fatal: true })
  }
}

ensureCategory()
watch(() => route.params.category, ensureCategory)

const { data, pending, error } = await useAsyncData('catalog', () =>
  $fetch<Product[]>('/api/products'),
)

const search = computed(() => (typeof route.query.q === 'string' ? route.query.q : ''))
const price = computed<PriceBand>(() =>
  isPriceBand(route.query.price) ? route.query.price : 'all',
)

const visibleProducts = computed(() =>
  filterProducts(data.value ?? [], {
    slug: slug.value,
    price: price.value,
    search: search.value,
  }),
)

const heading = computed(() => {
  if (slug.value === 'todos') return 'Catálogo'
  return categories.value?.find((category) => category.slug === slug.value)?.name ?? 'Catálogo'
})

const countLabel = computed(() => {
  const count = visibleProducts.value.length
  if (count === 1) return '1 pieza'
  return `${count} piezas`
})

const activeFilterCount = computed(() => (price.value === 'all' ? 0 : 1))

const description = computed(() => {
  if (slug.value === 'todos') {
    return 'Catálogo de joyería Aure Monterrey. Consulta disponibilidad y precio por WhatsApp.'
  }
  return `${heading.value} de Aure Monterrey. Consulta disponibilidad y precio por WhatsApp.`
})

const hasQueryFilters = computed(() => Boolean(search.value) || price.value !== 'all')

usePageSeo({
  title: () => heading.value,
  description,
  path: () => (slug.value === 'todos' ? '/catalogo' : `/catalogo/${slug.value}`),
  robots: () => (hasQueryFilters.value ? 'noindex, follow' : 'index, follow'),
})

const drawerOpen = ref(false)

const handleOpenFilters = () => {
  drawerOpen.value = true
}

const handleApplyFilters = async (filters: { category: string, price: PriceBand }) => {
  const path = filters.category === 'todos' ? '/catalogo' : `/catalogo/${filters.category}`
  const query: Record<string, string> = {}
  if (search.value) query.q = search.value
  if (filters.price !== 'all') query.price = filters.price
  await navigateTo({ path, query })
}

const handleClearFilters = async () => {
  const path = slug.value === 'todos' ? '/catalogo' : `/catalogo/${slug.value}`
  await navigateTo({ path })
}
</script>
