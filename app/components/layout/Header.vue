<template>
  <header ref="headerRef" class="sticky top-0 z-40 border-b border-ink/10 bg-bone">
    <div class="relative mx-auto flex h-16 max-w-page items-center justify-between px-2 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-6">
      <div class="flex items-center lg:justify-self-start">
        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center lg:hidden"
          :aria-expanded="menuOpen"
          aria-controls="menu-principal"
          :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'"
          @click="handleToggleMenu"
        >
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path v-if="menuOpen" d="M6 6l12 12M18 6L6 18" />
            <path v-else d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        <nav class="hidden items-center gap-1 lg:flex" aria-label="Principal">
          <NuxtLink
            v-for="link in desktopLinks"
            :key="link.to"
            :to="link.to"
            class="inline-flex min-h-11 items-center px-2 text-sm text-ink transition-colors duration-200 hover:text-warm"
            :class="{ 'underline underline-offset-8': isCurrent(link.to) }"
            :aria-current="isCurrent(link.to) ? 'page' : undefined"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>

      <NuxtLink
        to="/"
        class="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:justify-self-center"
        aria-label="Aure Monterrey, inicio"
      >
        <NuxtImg
          src="/logo.png"
          alt=""
          width="160"
          height="74"
          class="h-10 w-auto"
        />
      </NuxtLink>

      <div class="flex items-center gap-1 lg:justify-self-end">
        <form class="hidden md:block" role="search" @submit.prevent="handleSearch">
          <label class="sr-only" for="catalog-search-desktop">Buscar productos</label>
          <input
            id="catalog-search-desktop"
            v-model="search"
            type="search"
            name="q"
            placeholder="Buscar"
            class="h-11 w-52 border border-ink/15 bg-bone px-3 text-sm text-ink placeholder:text-warm lg:w-56"
          />
        </form>
        <a
          :href="generalWhatsAppHref"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex h-11 w-11 items-center justify-center text-ink transition-colors duration-200 hover:text-warm"
          aria-label="Escríbenos por WhatsApp"
        >
          <Icon name="mdi:whatsapp" size="22" aria-hidden="true" />
        </a>
      </div>
    </div>

    <form class="px-4 pb-3 md:hidden" role="search" @submit.prevent="handleSearch">
      <label class="sr-only" for="catalog-search">Buscar productos</label>
      <input
        id="catalog-search"
        v-model="search"
        type="search"
        name="q"
        placeholder="Buscar en el catálogo"
        class="h-11 w-full border border-ink/15 bg-bone px-3 text-sm text-ink placeholder:text-warm"
      />
    </form>

  </header>
  <Teleport to="body">
    <div
      v-if="menuOpen"
      id="menu-principal"
      ref="menuRef"
      class="fixed inset-x-0 bottom-0 z-50 overflow-y-auto bg-bone lg:hidden"
      :style="{ top: `${headerHeight}px` }"
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
    >
      <nav class="flex flex-col px-4 py-4" aria-label="Principal">
        <NuxtLink
          v-for="link in mobileLinks"
          :key="link.to"
          :to="link.to"
          class="inline-flex min-h-11 items-center border-b border-ink/10 text-base text-ink"
          :aria-current="isCurrent(link.to) ? 'page' : undefined"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { ProductCategory } from '#shared/catalog'
import { generalWhatsAppHref } from '~/utils/whatsapp'

const route = useRoute()
const menuOpen = ref(false)
const search = ref(typeof route.query.q === 'string' ? route.query.q : '')
const headerRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)
const headerHeight = ref(64)

const { data: categories } = await useAsyncData('categories', () =>
  $fetch<ProductCategory[]>('/api/categories'),
)

const desktopLinks = computed(() => [
  { label: 'Catálogo', to: '/catalogo' },
  ...(categories.value ?? []).map((category) => ({
    label: category.name,
    to: `/catalogo/${category.slug}`,
  })),
])

const mobileLinks = computed(() => [
  { label: 'Inicio', to: '/' },
  ...desktopLinks.value,
  { label: 'Contacto', to: '/contacto' },
])

useDialog(menuOpen, menuRef)

const measureHeader = () => {
  headerHeight.value = headerRef.value?.offsetHeight ?? 64
  if (window.innerWidth >= 1024) menuOpen.value = false
}

const isCurrent = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path === path
}

const handleToggleMenu = () => {
  measureHeader()
  menuOpen.value = !menuOpen.value
}

const handleSearch = async () => {
  const term = search.value.trim()
  menuOpen.value = false
  await navigateTo({ path: '/catalogo', query: term ? { q: term } : {} })
}

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
    search.value = typeof route.query.q === 'string' ? route.query.q : ''
  },
)

onMounted(() => {
  measureHeader()
  window.addEventListener('resize', measureHeader)
})

onUnmounted(() => {
  if (!import.meta.client) return
  window.removeEventListener('resize', measureHeader)
})
</script>
