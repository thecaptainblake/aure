<template>
  <footer class="border-t border-ink/10 bg-bone">
    <div class="mx-auto grid max-w-page gap-10 px-4 py-16 md:grid-cols-3 md:px-6">
      <div>
        <p class="font-serif text-3xl">auré</p>
        <p class="mt-3 max-w-xs text-sm text-warm">
          Joyería hecha a mano en Monterrey. La compra se cierra por WhatsApp.
        </p>
      </div>

      <nav aria-label="Información">
        <ul class="flex flex-col">
          <li v-for="link in links" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="inline-flex min-h-11 items-center text-sm text-ink transition-colors duration-200 hover:text-warm"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div>
        <p class="text-sm text-warm">Contacto</p>
        <a
          :href="generalWhatsAppHref"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-2 inline-flex min-h-11 items-center gap-2 text-sm text-ink"
        >
          <Icon name="mdi:whatsapp" size="20" aria-hidden="true" />
          WhatsApp
        </a>
        <a
          :href="instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex min-h-11 items-center gap-2 text-sm text-ink"
        >
          <Icon name="mdi:instagram" size="20" aria-hidden="true" />
          Instagram
        </a>
        <a href="tel:+528119775806" class="inline-flex min-h-11 items-center text-sm text-ink">
          81 1977 5806
        </a>
      </div>
    </div>
    <p class="border-t border-ink/10 px-4 py-6 text-center text-xs text-warm">
      © {{ year }} Aure Monterrey
    </p>
  </footer>
</template>

<script setup lang="ts">
import { instagramUrl } from '~~/data/site'
import { generalWhatsAppHref } from '~/utils/whatsapp'

const year = new Date().getFullYear()

const links = [
  { label: 'Catálogo', to: '/catalogo' },
  { label: 'Aviso de privacidad', to: '/aviso-de-privacidad' },
  { label: 'Políticas', to: '/politicas' },
  { label: 'Contacto', to: '/contacto' },
]
</script>
