import { siteUrl } from '../../data/site'
import { listCategories, listPublicProducts } from '../utils/catalog'

export default defineEventHandler(async (event) => {
  let categories: Awaited<ReturnType<typeof listCategories>> = []
  let products: Awaited<ReturnType<typeof listPublicProducts>> = []
  try {
    ;[categories, products] = await Promise.all([
      listCategories(),
      listPublicProducts(),
    ])
  } catch (error) {
    console.error(error)
  }

  const paths = [
    '/',
    '/catalogo',
    ...categories.map((category) => `/catalogo/${category.slug}`),
    ...products.map((product) => `/producto/${product.sku}`),
    '/aviso-de-privacidad',
    '/politicas',
    '/contacto',
  ]

  const urls = paths
    .map((path) => `<url><loc>${siteUrl}${path}</loc></url>`)
    .join('')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'no-store')
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`
})
