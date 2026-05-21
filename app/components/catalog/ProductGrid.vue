<template>
  <div class="product-page">
    <ProductCardLazy
      v-for="product in products"
      :key="`${selectedCategory}-${product.id ?? product.title}`"
      :title="product.title"
      :description="product.description"
      :price="product.price"
      :gallery="product.gallery"
    />
  </div>
</template>

<script setup>
defineProps({
  products: { type: Array, required: true },
  selectedCategory: { type: String, required: true },
});
</script>

<style scoped>
.product-page {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  align-items: stretch;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
