import type { Product } from '#shared/catalog'
import { instagramUrl, siteName, siteUrl } from '~~/data/site'

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/android-chrome-512x512.png`,
  image: `${siteUrl}/portada.jpg`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Monterrey',
    addressRegion: 'Nuevo León',
    addressCountry: 'MX',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+52-81-1977-5806',
    contactType: 'customer service',
    areaServed: 'MX',
    availableLanguage: ['Spanish'],
  },
  sameAs: [instagramUrl],
})

export const productSchema = (product: Product) => {
  const url = `${siteUrl}/producto/${product.sku}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: product.images.map((image) => image.src),
    brand: {
      '@type': 'Brand',
      name: siteName,
    },
    category: product.category.name,
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'MXN',
      price: product.price,
      availability: 'https://schema.org/InStock',
    },
  }
}
