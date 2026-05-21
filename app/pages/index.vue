<template>
  <main>
    <AppHeader />
    <CategoryFilters
      v-model:selected-category="selectedCategory"
      :categories="categories"
    />
    <ProductGrid
      :products="filteredProducts"
      :selected-category="selectedCategory"
    />
    <AppFooter />
  </main>
  <FloatingActions />
</template>

<script setup>
const { selectedCategory, categories, filteredProducts } = useProducts();
</script>
