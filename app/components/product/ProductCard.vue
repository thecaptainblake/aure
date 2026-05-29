<template>
  <div class="product-card">
    <div class="card-img">
      <ProductGallery :slides="gallery" :title="title" />
      <button
        type="button"
        class="heart"
        :class="{ on: isFavorite }"
        :aria-label="
          isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'
        "
        @click="isFavorite = !isFavorite"
      >
        <Icon
          :name="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'"
          size="14"
        />
      </button>
    </div>

    <div class="info-section">
      <h2 class="product-title">{{ title }}</h2>
      <p class="price">${{ price.toLocaleString() }} MXN</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: false, default: "" },
  price: { type: Number, required: true },
  gallery: { type: Array, required: true },
});

const isFavorite = ref(false);
</script>

<style scoped>
.product-card {
  background: var(--color-white);
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(182, 151, 120, 0.18);
  cursor: pointer;
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-3px) scale(1.04);
}

.card-img {
  position: relative;
}

.heart {
  position: absolute;
  top: 9px;
  right: 9px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.88);
  color: #9e8577;
  cursor: pointer;
  transition: color 0.2s;
}

.heart:hover,
.heart.on {
  color: var(--color-brand-light);
}

.info-section {
  padding: 11px 14px 14px;
}

.product-title {
  font-family: var(--font-family-serif);
  font-size: 17px;
  font-weight: 400;
  color: #3a2e26;
  margin: 0 0 6px;
  line-height: 1.2;
}

.price {
  font-family: var(--font-family-sans);
  font-size: 13px;
  font-weight: 400;
  color: var(--color-brand-light);
  letter-spacing: 0.5px;
  margin: 0;
}
</style>
