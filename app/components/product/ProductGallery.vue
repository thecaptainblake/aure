<template>
  <div class="product-gallery">
    <button
      v-if="hasMultipleSlides"
      type="button"
      class="gallery-nav gallery-nav--prev"
      aria-label="Foto anterior"
      @click="handleGoToPrev"
    >
      <Icon name="mdi:chevron-left" size="28" />
    </button>

    <div
      ref="galleryRef"
      class="gallery"
      role="group"
      :aria-label="`Fotos de ${title}`"
      @scroll="handleGalleryScroll"
    >
      <div v-for="(src, i) in slides" :key="src" class="gallery-slide">
        <NuxtImg
          :src="src"
          :alt="`${title} ${i + 1}`"
          :loading="i === 0 ? 'eager' : 'lazy'"
          width="400"
          height="400"
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 400px"
          class="slide-image"
        />
      </div>
    </div>

    <button
      v-if="hasMultipleSlides"
      type="button"
      class="gallery-nav gallery-nav--next"
      aria-label="Foto siguiente"
      @click="handleGoToNext"
    >
      <Icon name="mdi:chevron-right" size="28" />
    </button>

    <div
      v-if="hasMultipleSlides"
      class="gallery-dots"
      role="tablist"
      :aria-label="`Indicadores de fotos de ${title}`"
    >
      <button
        v-for="(_, i) in slides"
        :key="i"
        type="button"
        role="tab"
        class="gallery-dot"
        :class="{ 'is-active': i === activeIndex }"
        :aria-label="`Ir a foto ${i + 1}`"
        :aria-selected="i === activeIndex"
        @click="handleGoToSlide(i)"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  slides: { type: Array, required: true },
});

const slidesRef = computed(() => [...props.slides]);

const {
  galleryRef,
  activeIndex,
  hasMultipleSlides,
  handleGalleryScroll,
  handleGoToSlide,
  handleGoToPrev,
  handleGoToNext,
} = useScrollGallery(slidesRef);
</script>

<style scoped>
.product-gallery {
  position: relative;
  overflow: hidden;
  width: 100%;
  border-radius: 0.2rem;
  aspect-ratio: 1 / 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.5rem;
}

.gallery {
  display: flex;
  height: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.gallery::-webkit-scrollbar {
  display: none;
}

.gallery-slide {
  flex: 0 0 100%;
  height: 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.slide-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.gallery-nav {
  position: absolute;
  top: 50%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  border-radius: 50%;
  color: var(--color-brand);
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transform: translateY(-50%);
  transition: background-color 0.5s ease;
}

.gallery-nav:hover {
  background: rgba(255, 255, 255, 1);
}

.gallery-nav--prev {
  left: 0.5rem;
}

.gallery-nav--next {
  right: 0.5rem;
}

.gallery-dots {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  z-index: 1;
  display: flex;
  gap: 0.4rem;
  padding: 0.35rem 0.5rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.75);
  transform: translateX(-50%);
}

.gallery-dot {
  width: 0.5rem;
  height: 0.5rem;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: var(--color-border);
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.gallery-dot.is-active {
  background: var(--color-brand);
  transform: scale(1.15);
}
</style>
