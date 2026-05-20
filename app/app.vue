<template>
  <main>
    <div id="header" class="header">
      <motion.div
        class="logo-container"
        :initial="{ opacity: 0, y: -25 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 1 }"
      >
        <img src="~/assets/aure_logo.png" alt="Aure" class="logo" />
      </motion.div>
    </div>

    <motion.div class="product-pill-filters"        
        :initial="{ opacity: 0, y: -15 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: 1 }">
        <div
          v-for="(cat, index) in categories"
          :key="cat"
          type="button"
          class="filter"
          :class="{ active: selectedCategory === cat }"
          @click="selectedCategory = cat"
        >
          {{ cat }}
        </div>
      </motion.div>

    <div class="product-page">
      <motion.div
        v-for="(product, index) in filteredProducts"
        :key="`${selectedCategory}-${product.title}`"
        :initial="{ opacity: 0, y: 20}"
        :while-in-view="{ opacity: 1, y: 0 }"
        :in-view-options="{ once: true }"
        :transition="{ duration: 0.5, delay: 0.5  }"
      >
        <ProductCard
          :title="product.title"
          :description="product.description"
          :price="product.price"
          :image="product.image"
          :gallery="product.gallery"
        />
      </motion.div>
    </div>
    <motion.div class="footer"         
      :initial="{ opacity: 0, y: 20}"
      :while-in-view="{ opacity: 1, y: 0 }"
      :in-view-options="{ once: true }"
      :transition="{ duration: 0.5, delay: 0.3  }"
    >
      <a
        :href="instagramUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="instagram-link"
        aria-label="Seguir en Instagram"
      >
        <Icon name="mdi:instagram" size="28" />
      </a>
      <p>© {{ new Date().getFullYear() }} Aure Monterrey</p>
    </motion.div>
  </main>
  <motion.a
    :href="whatsappUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="whatsapp-fab"
    aria-label="Contactar por WhatsApp"
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :transition="{ duration: 0.5, delay: 1.5 }"
  >
    <Icon name="mdi:whatsapp" size="28" />
  </motion.a>
  <motion.a
    href="#header"
    class="go-to-top-link"
    aria-label="Ir al inicio"
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :transition="{ duration: 0.5, delay: 1.6 }"
    @click.prevent="scrollToTop"
  >
    <Icon name="mdi:arrow-up" size="28" />
  </motion.a>
</template>

<script setup>
import { motion } from "motion-v";
import ProductCard from "~/components/ProductCard.vue";
import { products } from "~/data/products";

const ALL_CATEGORIES = "Todos";

const selectedCategory = ref(ALL_CATEGORIES);

const categories = computed(() => {
  const unique = [...new Set(products.map((p) => p.category))];
  unique.sort((a, b) => a.localeCompare(b, "es"));
  return [ALL_CATEGORIES, ...unique];
});

const filteredProducts = computed(() => {
  if (selectedCategory.value === ALL_CATEGORIES) return products;
  return products.filter((p) => p.category === selectedCategory.value);
});

const EASE_SMOOTH = [0.22, 1, 0.36, 1];

function enterTransition(delay = 0) {
  return {
    duration: 0.5,
    ease: EASE_SMOOTH,
    delay,
  };
}

function revealTransition(index) {
  return {
    duration: 0.5,
    ease: EASE_SMOOTH,
    delay: index * 0.5,
  };
}

const whatsappUrl = "https://wa.me/528119775806";
const instagramUrl = "https://instagram.com/aure.mty";

function scrollToTop() {
  document
    .getElementById("header")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>

<style scoped>
.header {
  padding: 2rem;
}

.footer {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  p {
    font-family: var(--font-family-avenir);
    font-weight: 300;
    font-size: 1rem;
    text-align: center;
    color: #8f744f;
    margin: 0;
  }
}

.instagram-link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8f744f;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
}

.go-to-top-link {
  position: fixed;
  left: 1.5rem;
  bottom: 1rem;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #8f744f;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.whatsapp-fab {
  position: fixed;
  right: 1.5rem;
  bottom: 1rem;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #25d366;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }
}

main {
  background-color: #f2ece8;
  min-height: 100vh;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 200px;
    height: auto;
  }
}

.product-pill-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  padding: 0 2rem 1.5rem;
}

.filter {
  font-family: var(--font-family-avenir);
  font-weight: 300;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border: 1px solid #d3b59f;
  border-radius: 999px;
  background: transparent;
  color: #8f744f;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    border-color: #8f744f;
  }

  &.active {
    background-color: #8f744f;
    border-color: #8f744f;
    color: #ffffff;
  }
}

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
