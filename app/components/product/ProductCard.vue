<template>
  <div class="product-card">
    <ProductGallery :slides="gallery" :title="title" />

    <div class="info-section">
      <h2 class="product-title">{{ title }}</h2>
      <p class="description">{{ description }}</p>
      <div class="action-bar">
        <button
          type="button"
          class="icon-button"
          :class="{ 'is-favorite': isFavorite }"
          :aria-label="
            isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'
          "
          @click="isFavorite = !isFavorite"
        >
          <Icon
            :name="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'"
            size="22"
          />
        </button>
        <span class="price">${{ price.toLocaleString() }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  gallery: { type: Array, required: true },
});

const isFavorite = ref(false);
</script>

<style scoped>
.info-section {
  text-align: right;
}

.product-title {
  font-family: var(--font-family-nesans);
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--color-brand);
  text-transform: lowercase;
  margin: 0;
}

.description {
  font-family: var(--font-family-avenir);
  font-weight: 300;
  font-size: 0.9rem;
  line-height: 1.4;
  color: var(--color-brand-muted);
  max-width: 350px;
  margin: 0.5rem 0 0.5rem auto;
}

.action-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}

.icon-button {
  display: flex;
  padding: 0;
  border: none;
  background: none;
  color: var(--color-brand-light);
  cursor: pointer;
  transition: color 0.2s ease;
}

.icon-button:hover {
  color: var(--color-brand);
}

.icon-button.is-favorite {
  color: var(--color-brand);
}

.price {
  font-family: var(--font-family-avenir);
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-brand);
}
</style>
