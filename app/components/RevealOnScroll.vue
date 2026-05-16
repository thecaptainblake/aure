<template>
  <div
    ref="el"
    class="reveal"
    :class="{ 'reveal--visible': isVisible }"
    :style="delay ? { transitionDelay: `${delay}ms` } : undefined"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  delay: {
    type: Number,
    default: 0,
  },
})

const el = ref(null)
const { isVisible } = useRevealOnScroll(el)
</script>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(1.25rem);
  transition:
    opacity 0.55s ease,
    transform 0.55s ease;
  will-change: opacity, transform;
}

.reveal--visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
