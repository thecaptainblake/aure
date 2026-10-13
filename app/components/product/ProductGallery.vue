<template>
  <div
    class="relative"
    tabindex="0"
    role="region"
    :aria-label="`Fotos de ${title}`"
    @keydown.left.prevent="handleGoToPrev"
    @keydown.right.prevent="handleGoToNext"
  >
    <p class="sr-only">Desliza para ver más fotos. Activa la imagen para ampliar.</p>

    <div class="relative aspect-[4/5] overflow-hidden border border-ink/10 bg-bone">
      <button
        v-if="hasMultipleSlides"
        type="button"
        class="absolute top-1/2 left-2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-ink/10 bg-bone/90 text-ink"
        aria-label="Foto anterior"
        @click="handleGoToPrev"
      >
        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path d="M14 6l-6 6 6 6" />
        </svg>
      </button>

      <div
        ref="galleryRef"
        class="flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        @scroll="handleGalleryScroll"
      >
        <div
          v-for="(image, index) in images"
          :key="image.src"
          class="h-full w-full shrink-0 snap-start"
        >
          <a
            :href="image.src"
            :data-pswp-width="image.width"
            :data-pswp-height="image.height"
            class="block h-full"
            :aria-label="`Ampliar foto ${index + 1} de ${title}`"
          >
            <NuxtImg
              :src="image.src"
              :alt="image.alt"
              width="800"
              height="1000"
              :loading="index === 0 ? 'eager' : 'lazy'"
              class="h-full w-full object-cover"
            />
          </a>
        </div>
      </div>

      <button
        v-if="hasMultipleSlides"
        type="button"
        class="absolute top-1/2 right-2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-ink/10 bg-bone/90 text-ink"
        aria-label="Foto siguiente"
        @click="handleGoToNext"
      >
        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path d="M10 6l6 6-6 6" />
        </svg>
      </button>
    </div>

    <div
      v-if="hasMultipleSlides"
      class="mt-2 flex justify-center"
      role="tablist"
      :aria-label="`Indicadores de fotos de ${title}`"
    >
      <button
        v-for="(image, index) in images"
        :key="image.src"
        type="button"
        role="tab"
        class="inline-flex h-11 w-11 items-center justify-center"
        :aria-label="`Ir a foto ${index + 1}`"
        :aria-selected="index === activeIndex"
        @click="handleGoToSlide(index)"
      >
        <span
          class="h-1.5 w-1.5 rounded-full"
          :class="{
            'bg-ink': index === activeIndex,
            'bg-ink/25': index !== activeIndex,
          }"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductImage } from '#shared/catalog'

const props = defineProps<{
  title: string
  images: ProductImage[]
}>()

const slides = computed(() => props.images.map((image) => image.src))

const {
  galleryRef,
  activeIndex,
  hasMultipleSlides,
  handleGalleryScroll,
  handleGoToSlide,
  handleGoToPrev,
  handleGoToNext,
} = useScrollGallery(slides)

usePhotoSwipeLightbox(galleryRef)
</script>
