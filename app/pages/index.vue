<template>
  <div>
    <Hero />
    <FadeIn>
      <section class="mx-auto max-w-page px-4 py-16 md:px-6" aria-labelledby="categorias-titulo">
        <h2 id="categorias-titulo" class="mb-6 font-serif text-4xl">Categorías</h2>
        <CategoryChips />
      </section>
    </FadeIn>
    <FadeIn>
      <section class="mx-auto max-w-page px-4 pb-8 md:px-6" aria-labelledby="catalogo-titulo">
        <div class="mb-8 flex items-end justify-between gap-4">
          <h2 id="catalogo-titulo" class="font-serif text-4xl">Catálogo</h2>
          <NuxtLink
            to="/catalogo"
            class="inline-flex min-h-11 items-center text-sm text-ink underline underline-offset-4"
          >
            Ver todas
          </NuxtLink>
        </div>
        <p v-if="error" role="alert" class="text-sm">No pudimos cargar el catálogo.</p>
        <p v-else-if="!pending && !featured.length" class="text-sm text-warm">El catálogo está vacío.</p>
        <ProductGrid v-else :products="featured" :loading="pending" :skeleton-count="4" />
      </section>
    </FadeIn>
    <FadeIn>
      <TrustSection />
    </FadeIn>
    <FadeIn>
      <BrandStory />
    </FadeIn>
    <FadeIn>
      <Testimonials />
    </FadeIn>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '#shared/catalog'
import { organizationSchema } from '~/utils/schema'

const { data, pending, error } = await useAsyncData('catalog', () =>
  $fetch<Product[]>('/api/products'),
)

const featured = computed(() => (data.value ?? []).slice(0, 4))

usePageSeo({
  title: 'Joyería hecha a mano',
  description:
    'Joyería hecha a mano en Monterrey. Explora aretes, collares, pulseras y anillos de Aure y consulta disponibilidad por WhatsApp.',
  path: '/',
  jsonLd: organizationSchema(),
})
</script>
