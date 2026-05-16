<template>
  <div class="product-card">
    <button
      type="button"
      class="image-section"
      :aria-label="`Ver fotos de ${title}`"
      @click="emit('open-gallery', gallery)"
    >
      <NuxtImg
        :src="image"
        :alt="title"
        loading="lazy"
        class="main-image"
      />
    </button>

    <div class="info-section">
      <h1 class="product-title">{{ title }}</h1>

      <p class="description">
        {{ description }}
      </p>

      <div class="action-bar">
        <button
          type="button"
          class="icon-button"
          :class="{ 'is-favorite': isFavorite }"
          :aria-label="isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'"
          @click="isFavorite = !isFavorite"
        >
          <Icon :name="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'" size="22" />
        </button>
        <span class="price">{{ price }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const isFavorite = ref(false)

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  gallery: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['open-gallery'])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400&display=swap');

.image-section {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding: 0;
  border: none;
  border-radius: 0.2rem;
  aspect-ratio: 1/1;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 0.5rem;
  cursor: pointer;
  background: none;
}

.main-image {
  width: 100%;
  height: 100%;
  display: block;
  transition: transform 0.3s ease-in-out;

  .image-section:hover & {
    transform: scale(1.1);

  }
}

.info-section {
  text-align: right;
}

.product-title {
  font-family: var(--font-family-nesans);
  font-size: 1.5rem;
  font-weight: 400;
  color: #8f744f;
  text-transform: lowercase;
  margin: 0
}

.description {
  font-family: var(--font-family-avenir);
  font-weight: 300;
  font-size: 0.9rem;
  line-height: 1.4;
  color: #b49577;
  max-width: 350px;
  margin-left: auto;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}

.action-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}

.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: none;
  color: #b69778;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #8f744f;
  }

  &.is-favorite {
    color: #8f744f;

    &:hover {
      color: #ab8e74;
    }
  }
}

.price {
  font-family: var(--font-family-avenir);
  font-size: 1.2rem;
  font-weight: 500;
  color: #8f744f;
}
</style>
