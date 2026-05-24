/**
 * Horizontal scroll-snap gallery: tracks active slide and exposes navigation.
 * @param {import('vue').ComputedRef<unknown[]> | import('vue').Ref<unknown[]>} slides
 * @returns {{
 *   galleryRef: import('vue').Ref<HTMLElement | null>,
 *   activeIndex: import('vue').Ref<number>,
 *   hasMultipleSlides: import('vue').ComputedRef<boolean>,
 *   handleGalleryScroll: () => void,
 *   handleGoToSlide: (index: number) => void,
 *   handleGoToPrev: () => void,
 *   handleGoToNext: () => void
 * }}
 */
export function useScrollGallery(slides) {
  const galleryRef = ref(null);
  const activeIndex = ref(0);

  const hasMultipleSlides = computed(() => slides.value.length > 1);

  function handleGalleryScroll() {
    const gallery = galleryRef.value;
    if (!gallery || gallery.clientWidth === 0) return;

    activeIndex.value = Math.round(gallery.scrollLeft / gallery.clientWidth);
  }

  /** @param {number} index */
  function handleGoToSlide(index) {
    const gallery = galleryRef.value;
    if (!gallery) return;

    gallery.scrollTo({
      left: index * gallery.clientWidth,
      behavior: "smooth",
    });
    activeIndex.value = index;
  }

  function handleGoToPrev() {
    const count = slides.value.length;
    if (count <= 1) return;

    handleGoToSlide((activeIndex.value - 1 + count) % count);
  }

  function handleGoToNext() {
    const count = slides.value.length;
    if (count <= 1) return;

    handleGoToSlide((activeIndex.value + 1) % count);
  }

  return {
    galleryRef,
    activeIndex,
    hasMultipleSlides,
    handleGalleryScroll,
    handleGoToSlide,
    handleGoToPrev,
    handleGoToNext,
  };
}
