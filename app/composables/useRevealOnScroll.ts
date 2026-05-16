export function useRevealOnScroll(
  target: Ref<HTMLElement | null>,
  options?: IntersectionObserverInit,
) {
  const isVisible = ref(false)

  onMounted(() => {
    const el = target.value
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      isVisible.value = true
      return
    }

    if (!('IntersectionObserver' in window)) {
      isVisible.value = true
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          isVisible.value = true
          observer.disconnect()
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
        ...options,
      },
    )

    observer.observe(el)
    onUnmounted(() => observer.disconnect())
  })

  return { isVisible }
}
