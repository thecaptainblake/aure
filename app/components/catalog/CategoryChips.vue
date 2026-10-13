<template>
  <nav aria-label="Categorías">
    <ul class="flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:px-0 [&::-webkit-scrollbar]:hidden">
      <li v-for="chip in chips" :key="chip.slug" class="shrink-0">
        <NuxtLink
          :to="chipTo(chip.slug)"
          class="inline-flex min-h-11 items-center border px-4 text-sm transition-colors duration-200"
          :class="{
            'border-ink bg-ink text-bone': active === chip.slug,
            'border-ink/15 bg-bone text-ink hover:border-ink': active !== chip.slug,
          }"
          :aria-current="active === chip.slug ? 'page' : undefined"
        >
          {{ chip.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { ProductCategory } from '#shared/catalog'

const route = useRoute()

const { data: categories } = await useAsyncData('categories', () =>
  $fetch<ProductCategory[]>('/api/categories'),
)

const chips = computed(() => [
  { slug: 'todos', label: 'Todos' },
  ...(categories.value ?? []).map((category) => ({
    slug: category.slug,
    label: category.name,
  })),
])

const active = computed(() => {
  if (route.path === '/catalogo') return 'todos'
  const match = route.path.match(/^\/catalogo\/([^/]+)/)
  return match?.[1] ?? ''
})

const chipTo = (slug: string) => {
  const path = slug === 'todos' ? '/catalogo' : `/catalogo/${slug}`
  const query: Record<string, string> = {}
  if (typeof route.query.price === 'string' && route.query.price) query.price = route.query.price
  if (typeof route.query.q === 'string' && route.query.q) query.q = route.query.q
  return { path, query }
}
</script>
