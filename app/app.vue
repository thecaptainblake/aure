<template>
  <main>
    <div id="header" class="header">
      <div class="logo-container">
        <img src="~/assets/aure_logo.png" alt="Aure" class="logo" />
      </div>
    </div>

    <div class="product-pill-filters">
      <button
        v-for="cat in categories"
        :key="cat"
        type="button"
        class="filter"
        :class="{ active: selectedCategory === cat }"
        @click="selectedCategory = cat"
      >
        {{ cat }}
      </button>
    </div>

    <div class="product-page">
      <RevealOnScroll
        v-for="(product, index) in filteredProducts"
        :key="product.title"
        :delay="index * 60"
      >
        <ProductCard
          :title="product.title"
          :description="product.description"
          :price="product.price"
          :image="product.image"
          :gallery="product.gallery"
          @open-gallery="openLightbox"
        />
      </RevealOnScroll>
    </div>
    <div class="footer">
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
    </div>
  </main>
  <ImageLightbox
    :visible="lightboxVisible"
    :images="lightboxImages"
    :index="lightboxIndex"
    @close="closeLightbox"
  />
  <a
    :href="whatsappUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="whatsapp-fab"
    aria-label="Contactar por WhatsApp"
  >
    <Icon name="mdi:whatsapp" size="28" />
  </a>
  <a
    href="#header"
    class="go-to-top-link"
    aria-label="Ir al inicio"
    @click.prevent="scrollToTop"
  >
    <Icon name="mdi:arrow-up" size="28" />
  </a>
</template>

<script setup>
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

const {
  visible: lightboxVisible,
  images: lightboxImages,
  index: lightboxIndex,
  open: openLightbox,
  close: closeLightbox,
} = useLightbox();

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
