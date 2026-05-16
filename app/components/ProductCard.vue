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
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500&family=Inter:wght@300;400&display=swap');

p {
  margin: 0;
}

h1 {
  margin: 0;
}

.product-card {
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: #eeeeee;
}

.image-section {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding: 0;
  border: none;
  border-radius: 0.5rem;
  aspect-ratio: 1/1;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  cursor: pointer;
  background: none;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: rotate(0.5deg);
  }
}

.main-image {
  width: 100%;
  height: 100%;
  display: block;
  transition: transform 0.3s ease-in-out;

  .image-section:hover & {
    transform: scale(1.05);
  }
}

.info-section {
  text-align: right;
}

.product-title {
  font-family: 'Syne', sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: #1a1a1a;
  text-transform: lowercase;
  margin-bottom: 0.5rem;
}

.description {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  line-height: 1.4;
  color: #4a4a4a;
  max-width: 350px;
  margin-left: auto;
  margin-bottom: 1rem;
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
  color: #1a1a1a;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #ab8e74;
  }

  &.is-favorite {
    color: #e53935;

    &:hover {
      color: #c62828;
    }
  }
}

.price {
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a1a1a;
}
</style>
