<template>
  <div ref="target" class="product-card-slot">
    <LazyProductCard
      v-if="isVisible"
      :title="title"
      :description="description"
      :price="price"
      :image="image"
      :gallery="gallery"
    />
    <div v-else class="image-placeholder" aria-hidden="true" />
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  gallery: { type: Array, required: true },
});

const target = ref(null);
const isVisible = ref(false);

const { stop } = useIntersectionObserver(
  target,
  ([entry]) => {
    if (entry?.isIntersecting) {
      isVisible.value = true;
      stop();
    }
  },
  { rootMargin: "200px 0px", threshold: 0 },
);
</script>

<style scoped>
.product-card-slot {
  min-height: 0;
}

.image-placeholder {
  aspect-ratio: 1 / 1;
  border-radius: 0.2rem;
  background: #e8dfd8;
}
</style>
