<template>
  <header>
    <div class="logo-container">
      <img src="~/assets/logo.png" alt="Aure" class="logo" />
    </div>
  </header>
  <main>
    <div class="product-page">
      <ProductCard
        v-for="product in products"
        :key="product.title"
        :title="product.title"
        :description="product.description"
        :price="product.price"
        :image="product.image"
        :gallery="product.gallery"
        @open-gallery="openLightbox"
      />
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
  <footer>
    <a
      :href="instagramUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="instagram-link"
      aria-label="Seguir en Instagram"
    >
      <Icon name="mdi:instagram" size="28" />
    </a>
    <p>Copyright 2026 Aure</p>
  </footer>
</template>

<script setup>
import ProductCard from '~/components/ProductCard.vue'
import { products } from '~/data/products'

const { visible: lightboxVisible, images: lightboxImages, index: lightboxIndex, open: openLightbox, close: closeLightbox } = useLightbox()

const whatsappUrl = 'https://wa.me/528119775806'
const instagramUrl = 'https://instagram.com/aure'
</script>

<style scoped>

header {
  background-color: #ab8e74;
  padding: 2rem;
  padding-bottom: 0;
}

footer {
  background-color: #ab8e74;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  p {
    text-align: center;
    color: #ebe7e2;
    margin: 0;
  }
}

.instagram-link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ebe7e2;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
}

.whatsapp-fab {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: #25d366;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }
}

main {
  background-color: #ab8e74;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: min(250px, 70vw);
    height: auto;
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
