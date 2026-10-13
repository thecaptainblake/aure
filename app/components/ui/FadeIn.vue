<template>
  <div ref="root" class="reveal">
    <slot />
  </div>
</template>

<script setup lang="ts">
const root = ref<HTMLElement | null>(null)

onMounted(() => {
  const node = root.value
  if (!node) return

  const markVisible = () => node.classList.add('is-in')

  if (!document.documentElement.classList.contains('js-reveal')) {
    markVisible()
    return
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      markVisible()
      observer.disconnect()
    },
    { threshold: 0.12 },
  )

  observer.observe(node)
  onUnmounted(() => observer.disconnect())
})
</script>
