<template>
  <form class="mx-auto grid max-w-md gap-4" @submit.prevent="handleSubmit">
    <h1 class="font-serif text-4xl">Entrar</h1>
    <p v-if="errorMessage" role="alert" class="text-sm">{{ errorMessage }}</p>
    <div>
      <label class="text-sm" for="admin-email">Correo</label>
      <input
        id="admin-email"
        v-model="email"
        type="email"
        autocomplete="username"
        required
        class="mt-1 h-11 w-full border border-ink/15 bg-bone px-3 text-sm"
      />
    </div>
    <div>
      <label class="text-sm" for="admin-password">Contraseña</label>
      <input
        id="admin-password"
        v-model="password"
        type="password"
        autocomplete="current-password"
        required
        class="mt-1 h-11 w-full border border-ink/15 bg-bone px-3 text-sm"
      />
    </div>
    <button
      type="submit"
      class="inline-flex min-h-11 w-fit items-center bg-ink px-5 text-sm text-bone disabled:opacity-50"
      :disabled="pending"
    >
      Entrar
    </button>
  </form>
</template>

<script setup lang="ts">
import { fetchErrorMessage } from '~/utils/fetchError'

definePageMeta({ layout: 'admin' })

const email = ref('')
const password = ref('')
const pending = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  pending.value = true
  errorMessage.value = ''
  try {
    await $fetch('/api/admin/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })
    await navigateTo('/admin')
  } catch (error) {
    errorMessage.value = fetchErrorMessage(error, 'No se pudo entrar')
  } finally {
    pending.value = false
  }
}
</script>
