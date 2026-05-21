<template>
  <a
    :href="whatsappUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="whatsapp-fab"
    aria-label="Contactar por WhatsApp"
  >
    <Icon name="mdi:whatsapp" size="28" />
  </a>
  <a
    href="#header"
    class="go-to-top-link"
    aria-label="Ir al inicio"
    @click.prevent="handleScrollToTop"
  >
    <Icon name="mdi:arrow-up" size="28" />
  </a>
</template>

<script setup>
const appConfig = useAppConfig();
const whatsappUrl = appConfig.whatsappUrl;

/** Smoothly scrolls to the catalog header. */
function handleScrollToTop() {
  document
    .getElementById("header")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>

<style scoped>
.go-to-top-link {
  position: fixed;
  left: 1.5rem;
  bottom: 1rem;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: var(--color-brand);
  color: var(--color-white);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.whatsapp-fab {
  position: fixed;
  right: 1.5rem;
  bottom: 1rem;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: var(--color-whatsapp);
  color: var(--color-white);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.whatsapp-fab:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}
</style>
