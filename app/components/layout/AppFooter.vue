<template>
  <footer class="footer">
    <a
      :href="instagramUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="instagram-link"
      aria-label="Seguir en Instagram"
    >
      <Icon name="mdi:instagram" size="28" />
    </a>
    <p>© {{ new Date().getFullYear() }} Aure Monterrey</p>
  </footer>
</template>

<script setup>
const appConfig = useAppConfig();
const instagramUrl = appConfig.instagramUrl;
</script>

<style scoped>
.footer {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.footer p {
  font-family: var(--font-family-sans);
  font-weight: 300;
  font-size: 1rem;
  text-align: center;
  color: var(--color-brand);
  margin: 0;
}

.instagram-link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-brand);
  transition: opacity 0.2s ease;
}

.instagram-link:hover {
  opacity: 0.8;
}
</style>
