/** Fallback dimensions for PhotoSwipe when Hygraph does not provide width/height. */
const LIGHTBOX_IMAGE_SIZE = 1600;

/**
 * Binds PhotoSwipe Lightbox to a gallery container (client-only).
 * @param {import('vue').Ref<HTMLElement | null>} galleryRef
 */
export function usePhotoSwipeLightbox(galleryRef) {
  let lightbox = null;

  onMounted(async () => {
    const gallery = galleryRef.value;
    if (!gallery) return;

    const { default: Lightbox } = await import("photoswipe/lightbox");
    lightbox = new Lightbox({
      gallery,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
  });

  onUnmounted(() => {
    lightbox?.destroy();
    lightbox = null;
  });

  return { lightboxImageSize: LIGHTBOX_IMAGE_SIZE };
}
