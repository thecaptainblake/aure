<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
    <div v-if="open" class="fixed inset-0 z-50">
      <button
        type="button"
        class="absolute inset-0 bg-ink/40"
        aria-label="Cerrar filtros"
        @click="handleClose"
      />
      <aside
        id="filter-drawer"
        ref="panelRef"
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-title"
        class="absolute inset-y-0 right-0 flex w-[min(100%,22rem)] flex-col border-l border-ink/10 bg-bone motion-safe:animate-drawer-in"
      >
        <div class="flex items-center justify-between border-b border-ink/10 px-5 py-3">
          <h2 id="filter-title" class="font-serif text-3xl">Filtrar</h2>
          <button
            type="button"
            class="inline-flex h-11 w-11 items-center justify-center"
            aria-label="Cerrar filtros"
            @click="handleClose"
          >
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto px-5 py-6">
          <fieldset>
            <legend class="font-serif text-2xl">Categoría</legend>
            <label class="mt-1 flex min-h-11 cursor-pointer items-center gap-3 text-sm">
              <input v-model="draftCategory" type="radio" name="categoria" class="h-4 w-4 accent-ink" value="todos" />
              Todos
            </label>
            <label
              v-for="category in categories"
              :key="category.slug"
              class="flex min-h-11 cursor-pointer items-center gap-3 text-sm"
            >
              <input
                v-model="draftCategory"
                type="radio"
                name="categoria"
                class="h-4 w-4 accent-ink"
                :value="category.slug"
              />
              {{ category.name }}
            </label>
          </fieldset>

          <fieldset class="mt-8">
            <legend class="font-serif text-2xl">Precio</legend>
            <label
              v-for="band in priceBands"
              :key="band.id"
              class="mt-1 flex min-h-11 cursor-pointer items-center gap-3 text-sm"
            >
              <input
                v-model="draftPrice"
                type="radio"
                name="precio"
                class="h-4 w-4 accent-ink"
                :value="band.id"
              />
              {{ band.label }}
            </label>
          </fieldset>
        </div>

        <div class="flex gap-3 border-t border-ink/10 px-5 py-4">
          <button
            type="button"
            class="inline-flex min-h-11 flex-1 items-center justify-center border border-ink/20 text-sm"
            @click="handleClear"
          >
            Limpiar
          </button>
          <button
            type="button"
            class="inline-flex min-h-11 flex-1 items-center justify-center border border-ink bg-ink text-sm text-bone"
            @click="handleApply"
          >
            Aplicar
          </button>
        </div>
      </aside>
    </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { ProductCategory } from '#shared/catalog'
import { priceBands, type PriceBand } from '~/utils/catalog'

const open = defineModel<boolean>('open', { required: true })

const props = defineProps<{
  categories: ProductCategory[]
  category: string
  price: PriceBand
}>()

const emit = defineEmits<{
  apply: [filters: { category: string, price: PriceBand }]
}>()

const panelRef = ref<HTMLElement | null>(null)
const draftCategory = ref(props.category)
const draftPrice = ref<PriceBand>(props.price)

useDialog(open, panelRef)

watch(open, (isOpen) => {
  if (!isOpen) return
  draftCategory.value = props.category
  draftPrice.value = props.price
})

const handleClose = () => {
  open.value = false
}

const handleClear = () => {
  draftCategory.value = 'todos'
  draftPrice.value = 'all'
}

const handleApply = () => {
  emit('apply', {
    category: draftCategory.value,
    price: draftPrice.value,
  })
  open.value = false
}
</script>
