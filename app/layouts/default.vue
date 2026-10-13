<template>
  <div class="flex min-h-[100svh] flex-col bg-bone">
    <a
      href="#contenido"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:inline-flex focus:min-h-11 focus:items-center focus:bg-bone focus:px-4 focus:text-sm focus:text-ink"
    >
      Saltar al contenido
    </a>
    <Header />
    <main id="contenido" class="flex-1" :class="{ 'pb-24 md:pb-0': isProduct }">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const isProduct = computed(() => route.path.startsWith('/producto/'))
</script>
