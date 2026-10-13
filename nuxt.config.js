// https://nuxt.com/docs/api/configuration/nuxt-config
const supabaseHost = (() => {
  try {
    return process.env.SUPABASE_URL ? new URL(process.env.SUPABASE_URL).host : "";
  } catch {
    return "";
  }
})();

const siteUrl = "https://www.auremty.com";
const siteTitle = "Aure Monterrey";
const siteDescription =
  "Joyería hecha a mano en Monterrey. Explora aretes, collares, pulseras y anillos de Aure y consulta disponibilidad por WhatsApp.";
const ogImage = `${siteUrl}/portada.jpg`;

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  routeRules: {
    "/admin/**": {
      headers: { "X-Robots-Tag": "noindex, nofollow" },
    },
  },
  image: {
    domains: [supabaseHost].filter(Boolean),
    format: ["avif", "webp"],
    quality: 75,
  },
  app: {
    head: {
      title: siteTitle,
      titleTemplate: "%s · Aure Monterrey",
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
          href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500&display=swap",
        },
      ],
      script: [
        {
          innerHTML:
            "try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-reveal')}}catch(e){}",
          type: "text/javascript",
          tagPosition: "head",
        },
      ],
      meta: [
        { name: "description", content: siteDescription },
        { name: "theme-color", content: "#FAF8F5" },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: siteTitle },
        { property: "og:description", content: siteDescription },
        { property: "og:url", content: siteUrl },
        { property: "og:image", content: ogImage },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "es_MX" },
      ],
    },
  },
  modules: [
    ["@vueuse/nuxt", { ssrHandlers: true }],
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@nuxt/image",
  ],
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
    configPath: "tailwind.config",
  },
  css: ["photoswipe/style.css"],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});
