<template>
  <div class="product-card">
    <div class="image-section">
      <Carousel
        v-model="currentSlide"
        :items-to-show="1"
        :wrap-around="true"
        class="carousel"
      >
        <Slide v-for="(src, i) in slides" :key="src">
          <NuxtImg
            v-if="isSlideLoaded(i)"
            :src="src"
            :alt="`${title} ${i + 1}`"
            :loading="i === 0 ? 'eager' : 'lazy'"
            width="400"
            height="400" 
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 400px"
            class="slide-image"
          />
          <div v-else class="slide-placeholder" aria-hidden="true" />
        </Slide>
        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel> 
    </div>

    <div class="info-section">
      <h1 class="product-title">{{ title }}</h1>
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
        <span class="price">{{ price }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  gallery: { type: Array, required: true },
});

const isFavorite = ref(false);
const slides = computed(() => [...new Set([props.image, ...props.gallery])]);

const currentSlide = ref(0);
const loadedSlides = ref(new Set([0]));

function isSlideLoaded(index) {
  return loadedSlides.value.has(index);
}

function markSlidesLoaded(...indices) {
  const next = new Set(loadedSlides.value);
  let changed = false;
  for (const index of indices) {
    if (!next.has(index)) {
      next.add(index);
      changed = true;
    }
  }
  if (changed) loadedSlides.value = next;
}

watch(currentSlide, (index) => {
  const len = slides.value.length;
  markSlidesLoaded(index);
  if (len > 1) markSlidesLoaded((index + 1) % len);
});
</script>

<style scoped>
.image-section {
  overflow: hidden;
  width: 100%;
  border-radius: 0.2rem;
  aspect-ratio: 1 / 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.5rem;
}

.carousel,
.carousel :deep(.carousel__viewport) {
  height: 100%;
}

.slide-image,
.slide-placeholder {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.slide-placeholder {
  background: #e8dfd8;
}

.carousel :deep(.carousel__pagination-button) {
  background-color: #d3b59f;
}

.carousel :deep(.carousel__pagination-button--active) {
  background-color: #8f744f;
}
.carousel :deep(.carousel__prev),
.carousel :deep(.carousel__next) {
  color: #8f744f;
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
  margin: 0;
}

.description {
  font-family: var(--font-family-avenir);
  font-weight: 300;
  font-size: 0.9rem;
  line-height: 1.4;
  color: #b49577;
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
  color: #b69778;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #8f744f;
  }

  &.is-favorite {
    color: #8f744f;
  }
}

.price {
  font-family: var(--font-family-avenir);
  font-size: 1.2rem;
  font-weight: 500;
  color: #8f744f;
}
</style>
