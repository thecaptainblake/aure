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
/** Carousel card; loads images for the active slide and the next one on demand. */
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  gallery: { type: Array, required: true },
});

const isFavorite = ref(false);
const slides = computed(() => [...props.gallery]);

const currentSlide = ref(0);
const loadedSlides = ref(new Set([0]));

/** @param {number} index */
function isSlideLoaded(index) {
  return loadedSlides.value.has(index);
}

/** Marks slides as ready so NuxtImg can mount. @param {...number} indices */
function markSlidesLoaded(...indices) {
  const next = new Set(loadedSlides.value);
  let hasChanged = false;
  for (const index of indices) {
    if (!next.has(index)) {
      next.add(index);
      hasChanged = true;
    }
  }
  if (hasChanged) loadedSlides.value = next;
}

// Preload the active slide and the next one (carousel wrap-around).
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
  background: var(--color-placeholder);
}

.carousel :deep(.carousel__pagination-button) {
  background-color: var(--color-border);
}

.carousel :deep(.carousel__pagination-button--active) {
  background-color: var(--color-brand);
}

.carousel :deep(.carousel__prev),
.carousel :deep(.carousel__next) {
  color: var(--color-brand);
}

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
