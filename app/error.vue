<template>
  <div class="flex min-h-[100svh] flex-col items-center justify-center bg-bone px-6 text-center">
    <p class="text-xs tracking-[0.22em] text-warm uppercase">Aure</p>
    <h1 class="mt-4 font-serif text-4xl">
      {{ error.statusCode === 404 ? 'No encontramos esta página' : 'Algo salió mal' }}
    </h1>
    <p class="mt-3 max-w-sm text-sm text-warm">
      El enlace no corresponde a una pieza del catálogo.
    </p>
    <button
      type="button"
      class="mt-8 inline-flex min-h-11 items-center border border-ink bg-ink px-5 text-sm text-bone"
      @click="handleHome"
    >
      Volver al inicio
    </button>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

const handleHome = () => {
  clearError({ redirect: '/' })
}
</script>
