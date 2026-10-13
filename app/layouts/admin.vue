<template>
  <div class="min-h-[100svh] bg-bone text-ink">
    <header class="border-b border-ink/10">
      <div class="mx-auto flex max-w-page flex-wrap items-center justify-between gap-3 px-4 py-3">
        <p class="font-serif text-2xl">Aure admin</p>
        <nav v-if="showNav" class="flex flex-wrap items-center gap-1" aria-label="Administración">
          <NuxtLink
            to="/admin"
            class="inline-flex min-h-11 items-center px-3 text-sm"
            :aria-current="route.path === '/admin' ? 'page' : undefined"
          >
            Catálogo
          </NuxtLink>
          <NuxtLink
            to="/admin/categorias"
            class="inline-flex min-h-11 items-center px-3 text-sm"
            :aria-current="route.path.startsWith('/admin/categorias') ? 'page' : undefined"
          >
            Categorías
          </NuxtLink>
          <button
            type="button"
            class="inline-flex min-h-11 items-center px-3 text-sm"
            @click="handleLogout"
          >
            Salir
          </button>
        </nav>
      </div>
    </header>
    <main class="mx-auto max-w-page px-4 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const showNav = computed(() => route.path !== '/admin/login')

usePageSeo({
  title: 'Admin',
  description: 'Administración del catálogo de Aure Monterrey.',
  path: () => route.path,
  robots: 'noindex, nofollow',
})

const handleLogout = async () => {
  await $fetch('/api/admin/logout', { method: 'POST' })
  await navigateTo('/admin/login')
}
</script>
