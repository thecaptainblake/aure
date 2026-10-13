<template>
  <div>
    <h1 class="font-serif text-4xl">Categorías</h1>

    <form class="mt-8 flex max-w-xl flex-wrap items-end gap-3" @submit.prevent="handleCreate">
      <div class="min-w-0 flex-1">
        <label class="text-sm" for="category-name">Nueva categoría</label>
        <input
          id="category-name"
          v-model="name"
          required
          maxlength="80"
          class="mt-1 h-11 w-full border border-ink/15 bg-bone px-3 text-sm"
        />
      </div>
      <button type="submit" class="inline-flex min-h-11 items-center bg-ink px-5 text-sm text-bone" :disabled="pending">
        Agregar
      </button>
    </form>

    <p v-if="loadError" role="alert" class="mt-6 text-sm">No se pudieron cargar las categorías.</p>
    <p v-else-if="!categories?.length" class="mt-6 text-sm text-warm">Todavía no hay categorías.</p>

    <ul v-else class="mt-8 divide-y divide-ink/10 border-y border-ink/10">
      <li v-for="(category, index) in categories" :key="category.id" class="flex flex-wrap items-center gap-3 py-4">
        <form class="flex min-w-0 flex-1 flex-wrap items-center gap-2" @submit.prevent="handleRename(category.id, drafts[category.id] ?? category.name)">
          <label class="sr-only" :for="`category-${category.id}`">Nombre de {{ category.name }}</label>
          <input
            :id="`category-${category.id}`"
            v-model="drafts[category.id]"
            maxlength="80"
            class="h-11 min-w-40 flex-1 border border-ink/15 bg-bone px-3 text-sm"
          />
          <button type="submit" class="inline-flex min-h-11 items-center border border-ink px-3 text-sm">
            Guardar
          </button>
        </form>
        <button
          type="button"
          class="inline-flex min-h-11 items-center border border-ink/20 px-3 text-sm disabled:opacity-40"
          :disabled="index === 0"
          :aria-label="`Subir ${category.name}`"
          @click="handleMove(category.id, 'up')"
        >
          Subir
        </button>
        <button
          type="button"
          class="inline-flex min-h-11 items-center border border-ink/20 px-3 text-sm disabled:opacity-40"
          :disabled="index === categories.length - 1"
          :aria-label="`Bajar ${category.name}`"
          @click="handleMove(category.id, 'down')"
        >
          Bajar
        </button>
        <button type="button" class="inline-flex min-h-11 items-center border border-ink/20 px-3 text-sm" @click="handleDelete(category.id)">
          {{ pendingDelete === category.id ? 'Confirmar' : 'Eliminar' }}
        </button>
      </li>
    </ul>
    <p v-if="actionError" role="alert" class="mt-4 text-sm">{{ actionError }}</p>
  </div>
</template>

<script setup lang="ts">
import type { AdminCategory } from '#shared/catalog'
import { fetchErrorMessage } from '~/utils/fetchError'

definePageMeta({ layout: 'admin' })

const requestFetch = useRequestFetch()
const name = ref('')
const pending = ref(false)
const actionError = ref('')
const pendingDelete = ref('')
const drafts = reactive<Record<string, string>>({})

const { data: categories, error: loadError, refresh } = await useAsyncData('admin-categories', () =>
  requestFetch<AdminCategory[]>('/api/admin/categories'),
)

watch(
  categories,
  (list) => {
    for (const category of list ?? []) drafts[category.id] = category.name
  },
  { immediate: true },
)

const replaceCategories = (next: AdminCategory[]) => {
  categories.value = next
}

const handleCreate = async () => {
  pending.value = true
  actionError.value = ''
  try {
    replaceCategories(await $fetch<AdminCategory[]>('/api/admin/categories', {
      method: 'POST',
      body: { name: name.value },
    }))
    name.value = ''
  } catch (error) {
    actionError.value = fetchErrorMessage(error, 'No se pudo crear la categoría')
  } finally {
    pending.value = false
  }
}

const handleRename = async (id: string, nextName: string) => {
  actionError.value = ''
  try {
    replaceCategories(await $fetch<AdminCategory[]>(`/api/admin/categories/${id}`, {
      method: 'PATCH',
      body: { name: nextName },
    }))
  } catch (error) {
    actionError.value = fetchErrorMessage(error, 'No se pudo guardar la categoría')
  }
}

const handleMove = async (id: string, direction: 'up' | 'down') => {
  actionError.value = ''
  try {
    replaceCategories(await $fetch<AdminCategory[]>('/api/admin/category-order', {
      method: 'PATCH',
      body: { id, direction },
    }))
  } catch (error) {
    actionError.value = fetchErrorMessage(error, 'No se pudo cambiar el orden')
  }
}

const handleDelete = async (id: string) => {
  if (pendingDelete.value !== id) {
    pendingDelete.value = id
    return
  }
  actionError.value = ''
  try {
    replaceCategories(await $fetch<AdminCategory[]>(`/api/admin/categories/${id}`, { method: 'DELETE' }))
    pendingDelete.value = ''
    await refresh()
  } catch (error) {
    actionError.value = fetchErrorMessage(error, 'No se pudo eliminar la categoría')
  }
}
</script>
