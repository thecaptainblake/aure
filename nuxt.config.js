// https://nuxt.com/docs/api/configuration/nuxt-config
const siteUrl = "https://www.auremty.com";
const siteTitle = "Aure Monterrey";
const siteDescription =
  "Aure Monterrey es una tienda de joyería y accesorios online. Ofrecemos una amplia gama de productos de alta calidad para satisfacer las necesidades de nuestros clientes.";
const ogImage = `${siteUrl}/portada.jpg`;

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    hygraphToken: process.env.HYGRAPH_TOKEN,
    public: {
      hygraphEndpoint: process.env.HYGRAPH_ENDPOINT,
    },
  },
  image: {
    domains: ["us-west-2.graphassets.com", "media.graphassets.com"],
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1.0",
      htmlAttrs: {
        lang: "es",
      },
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap",
        },
        { rel: "canonical", href: siteUrl },
      ],
      meta: [
        { name: "title", content: siteTitle },
        { name: "description", content: siteDescription },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: siteTitle },
        { property: "og:description", content: siteDescription },
        { property: "og:url", content: siteUrl },
        { property: "og:image", content: ogImage },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "es_LA" },
      ],
    },
  },
  modules: [
    ["@vueuse/nuxt", { ssrHandlers: true }],
    "@nuxt/icon",
    "@nuxt/image",
  ],
  css: [
    "normalize.css/normalize.css",
    "~/assets/css/fonts.css",
    "~/assets/css/tokens.css",
    "photoswipe/style.css",
  ],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});
