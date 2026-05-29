<template>
  <div class="product-pill-filters" role="group" aria-label="Filtrar por categoría">
    <button
      v-for="category in categories"
      :key="category"
      type="button"
      class="filter"
      :class="{ active: selectedCategory === category }"
      :aria-pressed="selectedCategory === category"
      @click="handleSelectCategory(category)"
    >
      {{ category }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  categories: { type: Array, required: true },
  selectedCategory: { type: String, required: true },
});

const emit = defineEmits(["update:selectedCategory"]);

/** @param {string} category */
function handleSelectCategory(category) {
  emit("update:selectedCategory", category);
}
</script>

<style scoped>
.product-pill-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  padding: 0 2rem 1.5rem;
}

.filter {
  font-family: var(--font-family-sans);
  font-weight: 300;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: transparent;
  color: var(--color-brand);
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.filter:hover {
  border-color: var(--color-brand);
}

.filter.active {
  background-color: var(--color-brand);
  border-color: var(--color-brand);
  color: var(--color-white);
}
</style>
