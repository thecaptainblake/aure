export function useLightbox() {
  const visible = ref(false)
  const images = ref<string[]>([])
  const index = ref(0)

  function open(imgs: string[], startIndex = 0) {
    images.value = imgs
    index.value = startIndex
    visible.value = true
  }

  function close() {
    visible.value = false
  }

  return { visible, images, index, open, close }
}
