// https://nuxt.com/docs/api/configuration/nuxt-config
// Define tus variables clave para fácil personalización
const siteUrl = 'https://www.auremty.com'; // **¡IMPORTANTE! Reemplazar con la URL real de tu sitio**
const siteTitle = 'Aure Monterrey';
const siteDescription = 'Aure Monterrey es una tienda de joyería y accesorios online. Ofrecemos una amplia gama de productos de alta calidad para satisfacer las necesidades de nuestros clientes.';
const ogImage = `${siteUrl}/portada.jpg`; // Asegúrate de que la imagen esté en la carpeta 'public'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
      htmlAttrs: {
        lang: 'es'
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Canonical: ¡Importante para SEO!
        { rel: 'canonical', href: siteUrl },
      ],
      meta: [
        // Metadatos de SEO (Para Google y Buscadores)
        { name: 'title', content: siteTitle },
        { name: 'description', content: siteDescription },
        { name: 'robots', content: 'index, follow' },

        // Metadatos Open Graph (Para Facebook, WhatsApp, LinkedIn)
        { property: 'og:title', content: siteTitle },
        { property: 'og:description', content: siteDescription },
        { property: 'og:url', content: siteUrl },
        { property: 'og:image', content: ogImage },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'es_LA' },

        // Metadatos de Twitter Card (Para X/Twitter)
        //{ name: 'twitter:card', content: 'summary_large_image' },
        //{ name: 'twitter:site', content: '@[TU_USUARIO_TWITTER]' }, // Opcional: Reemplaza o elimina
        //{ name: 'twitter:creator', content: '@[TU_USUARIO_TWITTER]' }, // Opcional: Reemplaza o elimina
        //{ name: 'twitter:title', content: siteTitle },
        //{ name: 'twitter:description', content: siteDescription },
        //{ name: 'twitter:image', content: ogImage },
      ]
    },
  },
  modules: ['@nuxt/icon', '@nuxt/image', 'motion-v/nuxt'],
  image: {
    quality: 80,
    format: ['webp'],
  },
  css: [
    'normalize.css/normalize.css',
    '~/assets/css/fonts.css',
    'vue3-carousel/carousel.css',
    
  ],
})
